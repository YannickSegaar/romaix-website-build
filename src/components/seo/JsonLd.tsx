/**
 * JsonLd — server component for injecting JSON-LD structured data.
 * No "use client" — renders server-side into <head> or inline.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
