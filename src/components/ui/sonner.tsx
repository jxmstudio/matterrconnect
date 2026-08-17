"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      /*
        Pinned to light because the site is light-only — there's no
        ThemeProvider and `.dark` is never applied.

        This used to read `useTheme()`, which returns "system" when there's no
        provider. Sonner then resolved that against the visitor's
        prefers-color-scheme and stamped data-sonner-theme="dark", which pulled
        in its dark description colour (#e8e8e8) over a light toast background —
        1.23:1, effectively invisible. Only the description broke, because the
        title reads --normal-text below and never fell through to that rule.

        Anyone on a dark-mode OS saw it; anyone on light didn't. If real dark
        mode is ever added, this goes back to following the resolved theme.
      */
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
