import { z } from "zod";

import { serviceOptions } from "@/content/services";

/**
 * Enquiry validation for the quote form.
 *
 * Kept deliberately short: every extra required field costs conversions, and
 * the only things Jack actually needs to call someone back are a name, a way
 * to reach them, and a rough idea of the job.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is too long"),

  phone: z
    .string()
    .trim()
    .min(6, "Please enter a contact number")
    .max(24, "That number is too long")
    // Permissive on purpose — NZ numbers get written a dozen different ways
    // and rejecting a real customer's number is far worse than accepting junk.
    .regex(/^[0-9+()\s-]+$/, "Please enter a valid phone number"),

  email: z
    .string()
    .trim()
    .max(120, "That email address is too long")
    .email("Please enter a valid email address")
    .or(z.literal(""))
    .optional(),

  suburb: z
    .string()
    .trim()
    .max(80, "That's too long")
    .optional()
    .or(z.literal("")),

  service: z.enum(serviceOptions, {
    message: "Please choose the type of work",
  }),

  message: z
    .string()
    .trim()
    .min(10, "A sentence or two about the job helps us quote accurately")
    .max(2000, "Please keep this under 2000 characters"),

  /**
   * Honeypot. Hidden from real users; bots fill it in. Never surfaced as a
   * validation error — the submit handler silently accepts and discards
   * instead, so the bot has no signal that it was caught.
   *
   * Named `_gotcha` to match the field JXM Forms looks for, so the same input
   * serves as the trap on both sides.
   */
  _gotcha: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/**
 * What the user typed, echoed back on failure.
 *
 * React 19 resets a form once its action resolves, so without this a customer
 * who fat-fingers their email loses the paragraph they just wrote about their
 * job. The form re-seeds its defaultValues from here.
 */
export type EnquiryValues = Record<
  "name" | "phone" | "email" | "suburb" | "service" | "message",
  string
>;

export type EnquiryResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      values?: EnquiryValues;
    };
