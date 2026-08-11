import Script from "next/script";

/**
 * Google Tag Manager container ID.
 *
 * Public by design — it ships in the page HTML on every site that uses GTM, so
 * there's nothing to protect. Defaults to the real container so a fresh deploy
 * is tagged without extra configuration; override with NEXT_PUBLIC_GTM_ID (set
 * it empty to turn tagging off entirely).
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-ML32GVVQ";

/**
 * The GTM loader. GTM's own instructions say "as high in the <head> as
 * possible"; in the App Router the equivalent is next/script with
 * `afterInteractive`, which injects the tag early without blocking first paint.
 * Hand-rolled rather than pulling in @next/third-parties for one snippet.
 *
 * NOTE ON GA4: configure GA4 as a tag *inside* the GTM container rather than
 * also setting NEXT_PUBLIC_GA_ID — running both loads Google Analytics twice
 * and double-counts every page view.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * The paired <noscript> fallback. Must be the first thing inside <body>, per
 * GTM's install instructions.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
