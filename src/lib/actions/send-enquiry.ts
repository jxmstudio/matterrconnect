"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { rateLimit } from "@/lib/rate-limit";
import {
  enquirySchema,
  type EnquiryResult,
  type EnquiryValues,
} from "@/lib/schema";
import { site } from "@/content/site";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ENQUIRY_TO = process.env.ENQUIRY_TO ?? site.email;
// Must be a domain verified in Resend. Until matterconnect.net is verified,
// Resend's shared onboarding sender works for testing.
const ENQUIRY_FROM =
  process.env.ENQUIRY_FROM ?? "Matter Construction <onboarding@resend.dev>";

/**
 * Handles a quote request.
 *
 * Deliberate behaviours:
 * - Re-validates server-side. Client validation is UX, not a trust boundary.
 * - Honeypot hits return success without sending, so bots get no signal.
 * - With no RESEND_API_KEY set, logs the enquiry and returns success. That
 *   keeps the demo fully working locally and on a preview deploy before Jack's
 *   domain is verified — no silent failures, no fake error states.
 */
export async function sendEnquiry(
  _prev: EnquiryResult | null,
  formData: FormData,
): Promise<EnquiryResult> {
  const text = (key: string) => String(formData.get(key) ?? "");

  const values: EnquiryValues = {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    suburb: text("suburb"),
    service: text("service"),
    message: text("message"),
  };

  const parsed = enquirySchema.safeParse({
    ...values,
    company: text("company"),
  });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    // A filled honeypot is a bot, not a user with a validation problem.
    if (fieldErrors.company) return { ok: true };

    return {
      ok: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const enquiry = parsed.data;

  if (enquiry.company) return { ok: true };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip).allowed) {
    return {
      ok: false,
      error: `You've sent a few enquiries already. Give us a call on ${site.phone.display} and we'll pick it up from there.`,
      values,
    };
  }

  const subject = `Quote request — ${enquiry.name} (${enquiry.service})`;
  const lines = [
    `Name:     ${enquiry.name}`,
    `Phone:    ${enquiry.phone}`,
    `Email:    ${enquiry.email || "—"}`,
    `Suburb:   ${enquiry.suburb || "—"}`,
    `Service:  ${enquiry.service}`,
    "",
    "Message:",
    enquiry.message,
    "",
    "—",
    `Sent from ${site.domain}`,
  ].join("\n");

  if (!RESEND_API_KEY) {
    console.info(
      `[enquiry] RESEND_API_KEY not set — enquiry logged instead of sent.\n${subject}\n${lines}`,
    );
    return { ok: true };
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: ENQUIRY_FROM,
      to: ENQUIRY_TO,
      subject,
      text: lines,
      // Lets Jack hit reply and land straight in the customer's inbox.
      ...(enquiry.email ? { replyTo: enquiry.email } : {}),
    });

    if (error) {
      console.error("[enquiry] Resend rejected the send:", error);
      return {
        ok: false,
        error: `Something went wrong sending that. Please call us on ${site.phone.display}.`,
        values,
      };
    }

    return { ok: true };
  } catch (cause) {
    console.error("[enquiry] Unexpected failure:", cause);
    return {
      ok: false,
      error: `Something went wrong sending that. Please call us on ${site.phone.display}.`,
      values,
    };
  }
}
