"use client";

import {
  enquirySchema,
  type EnquiryResult,
  type EnquiryValues,
} from "@/lib/schema";
import { site } from "@/content/site";

/**
 * JXM Forms endpoint for this site. The key is public by design — it only
 * identifies which inbox a submission belongs to, and the request is made from
 * the visitor's browser, so there is nowhere to hide it. Spam filtering,
 * storage and the email notification all happen on the JXM side.
 */
const ENDPOINT = "https://jxm-forms.vercel.app/api/submit/matter-construction";
const API_KEY = "UoLXOgRJU2yGOiz07rBseMYseRnYTzFp";

/**
 * Handles a quote request.
 *
 * Runs in the browser: `useActionState` accepts any async (prev, formData)
 * function, not only a server action, so the form keeps its pending state,
 * inline field errors and echoed-back values without any server code.
 *
 * Deliberate behaviours:
 * - Validates with the shared Zod schema. That is UX only now — JXM is the
 *   real trust boundary, and it re-checks on its side.
 * - A filled honeypot returns success without posting, so bots get no signal.
 * - On failure the typed values come back out, because React 19 resets a form
 *   once its action resolves and losing a typed message loses the enquiry.
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

  const parsed = enquirySchema.safeParse({ ...values, _gotcha: text("_gotcha") });

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();

    // A filled honeypot is a bot, not a user with a validation problem.
    if (fieldErrors._gotcha) return { ok: true };

    return {
      ok: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const enquiry = parsed.data;

  if (enquiry._gotcha) return { ok: true };

  const failure: EnquiryResult = {
    ok: false,
    error: `Something went wrong sending that. Please call us on ${site.phone.display}.`,
    values,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        name: enquiry.name,
        // Reply-To on the notification email. Optional on this form — phone is
        // the required contact method — so it can legitimately be empty.
        email: enquiry.email ?? "",
        phone: enquiry.phone,
        suburb: enquiry.suburb ?? "",
        service: enquiry.service,
        message: enquiry.message,
        // JXM's own bot trap. Always empty by the time it gets here; a filled
        // one short-circuits above.
        _gotcha: "",
      }),
    });

    if (!response.ok) {
      console.error(
        `[enquiry] JXM Forms rejected the send: ${response.status} ${response.statusText}`,
      );
      return failure;
    }

    return { ok: true };
  } catch (cause) {
    console.error("[enquiry] Unexpected failure:", cause);
    return failure;
  }
}
