/**
 * Renders a structured-data script tag.
 *
 * The payload is always built from our own typed content files in src/content
 * — never from user input — so serialising it directly is safe.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
