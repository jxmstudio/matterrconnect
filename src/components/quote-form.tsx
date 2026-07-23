"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEnquiry } from "@/lib/actions/send-enquiry";
import type { EnquiryResult } from "@/lib/schema";
import { serviceOptions } from "@/content/services";
import { isDemoDeployment, site } from "@/content/site";
import { cn } from "@/lib/utils";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {errors[0]}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="xl" disabled={pending} className="w-full">
      {pending && <Loader2Icon className="animate-spin" aria-hidden="true" />}
      {pending ? "Sending…" : "Send enquiry"}
    </Button>
  );
}

export function QuoteForm({
  className,
  /** Preselects the dropdown when linked from a service page. */
  defaultService,
}: {
  className?: string;
  defaultService?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [state, formAction] = useActionState<EnquiryResult | null, FormData>(
    sendEnquiry,
    null,
  );

  useEffect(() => {
    if (!state) return;

    if (state.ok) {
      toast.success("Enquiry sent", {
        description: `Thanks — we'll be in touch shortly. If it's urgent, call ${site.phone.display}.`,
        duration: 8000,
      });
      formRef.current?.reset();
    } else {
      toast.error("Couldn't send that", { description: state.error });
    }
  }, [state]);

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  // React 19 resets the form once the action resolves. On failure the server
  // echoes back what was typed so nobody has to retype their message.
  const kept = state && !state.ok ? state.values : undefined;

  const id = (name: string) => `${uid}-${name}`;
  const errId = (name: string) => `${uid}-${name}-error`;
  const describedBy = (name: string) =>
    fieldErrors?.[name] ? errId(name) : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className={cn("space-y-6", className)}
    >
      {/*
        On the demo build the form validates and submits for real, but with no
        Resend key configured nothing is actually delivered. Saying so beats
        letting the client test it and wonder where the email went. This
        disappears on its own once NEXT_PUBLIC_SITE_URL points at the live
        domain.
      */}
      {isDemoDeployment && (
        <p className="border-l-2 border-clay bg-stone/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Demo site.</span>{" "}
          The form works, but enquiries aren&apos;t delivered to an inbox yet —
          that&apos;s switched on at launch.
        </p>
      )}

      {/* Honeypot. Hidden from users and from assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company")}>Company (leave blank)</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={id("name")}>
            Your name <span className="text-clay">*</span>
          </Label>
          <Input
            id={id("name")}
            name="name"
            autoComplete="name"
            defaultValue={kept?.name}
            required
            aria-invalid={!!fieldErrors?.name}
            aria-describedby={describedBy("name")}
          />
          <FieldError id={errId("name")} errors={fieldErrors?.name} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={id("phone")}>
            Phone <span className="text-clay">*</span>
          </Label>
          <Input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={kept?.phone}
            required
            aria-invalid={!!fieldErrors?.phone}
            aria-describedby={describedBy("phone")}
          />
          <FieldError id={errId("phone")} errors={fieldErrors?.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={id("email")}>Email</Label>
          <Input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue={kept?.email}
            aria-invalid={!!fieldErrors?.email}
            aria-describedby={describedBy("email")}
          />
          <FieldError id={errId("email")} errors={fieldErrors?.email} />
        </div>

        <div className="space-y-2">
          <Label htmlFor={id("suburb")}>Suburb or town</Label>
          <Input
            id={id("suburb")}
            name="suburb"
            autoComplete="address-level2"
            defaultValue={kept?.suburb}
            placeholder="e.g. Bethlehem"
            aria-invalid={!!fieldErrors?.suburb}
            aria-describedby={describedBy("suburb")}
          />
          <FieldError id={errId("suburb")} errors={fieldErrors?.suburb} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("service")}>
          What kind of work? <span className="text-clay">*</span>
        </Label>
        {/*
          A native <select> rather than the shadcn Select: it participates in
          the form's FormData automatically, works without JS, and gives the
          phone's native picker — which is a better experience on mobile,
          where most of these enquiries come from.
        */}
        <select
          id={id("service")}
          name="service"
          required
          // React applies a select's defaultValue on mount only, so after the
          // post-action reset the selection would be lost. Keying on the value
          // remounts it with the right option selected.
          key={kept?.service || defaultService || "unset"}
          defaultValue={kept?.service || defaultService || ""}
          aria-invalid={!!fieldErrors?.service}
          aria-describedby={describedBy("service")}
          className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        >
          <option value="" disabled>
            Select an option
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id={errId("service")} errors={fieldErrors?.service} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={id("message")}>
          About the job <span className="text-clay">*</span>
        </Label>
        <Textarea
          id={id("message")}
          name="message"
          rows={6}
          defaultValue={kept?.message}
          required
          placeholder="What needs doing, roughly when you'd like it done, and anything else that helps us price it."
          aria-invalid={!!fieldErrors?.message}
          aria-describedby={describedBy("message")}
        />
        <FieldError id={errId("message")} errors={fieldErrors?.message} />
      </div>

      <SubmitButton />

      <p className="text-xs leading-relaxed text-muted-foreground">
        We&apos;ll only use these details to reply to your enquiry. Prefer to
        talk?{" "}
        <a
          href={site.phone.href}
          data-analytics="call"
          data-analytics-location="quote-form"
          className="font-medium text-clay underline-offset-4 hover:underline"
        >
          Call {site.phone.display}
        </a>
        .
      </p>
    </form>
  );
}
