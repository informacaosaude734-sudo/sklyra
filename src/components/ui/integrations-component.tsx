import * as React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Adapted from the cnblocks "Integrations" block. Three changes were needed:
 *
 * 1. `next/link` → react-router's `Link` (this is a Vite SPA, not Next).
 * 2. The original pairs every colour with a `dark:` variant, but this site is
 *    dark by default and never sets the `.dark` class — those variants would
 *    never fire, so the dark values are applied directly.
 * 3. `bg-radial` is a Tailwind v4 utility and this project is on v3, so the
 *    fade is an inline radial-gradient instead.
 */
export const IntegrationCard = ({
  children,
  className,
  borderClassName,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  /** Names the tile for assistive tech and on hover, since it shows no text. */
  label?: string;
}) => {
  return (
    <div
      // size-16 on phones: a 4-tile row at size-20 is wider than a 375px screen.
      className={cn("relative flex size-16 rounded-xl sm:size-20", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      title={label}
    >
      <div
        role="presentation"
        className={cn(
          "absolute inset-0 rounded-xl border border-white/25",
          borderClassName
        )}
      />
      {/* `*:size-*` sizes the icon — keep it the DIRECT child or it overflows. */}
      <div className="relative z-20 m-auto size-fit *:size-7 sm:*:size-8">
        {children}
      </div>
    </div>
  );
};

/**
 * The clustered layout: centred rows of tiles behind a radial fade, with the
 * heading, copy and CTA underneath. Pass `rows` as an array of tile arrays —
 * e.g. [[a, b], [c, d, e], [f, g]] renders 2 / 3 / 2.
 */
export function IntegrationsSection({
  rows,
  header,
  title,
  description,
  ctaLabel,
  ctaHref = "#",
  className,
}: {
  rows: React.ReactNode[][];
  /** Rendered above the cluster — use it to match the site's other sections. */
  header?: React.ReactNode;
  /** Rendered below the cluster, like the original block. Omit when using `header`. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}) {
  const hasFooter = Boolean(title || description || ctaLabel);

  return (
    <section className={className}>
      <div className="py-16 px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          {header}
          <div className="relative mx-auto w-fit">
            {/* fades the outer tiles into the page background */}
            <div
              role="presentation"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 20%, hsl(var(--background)) 78%)",
              }}
            />
            {rows.map((row, i) => (
              <div
                key={i}
                className="mx-auto flex w-fit justify-center gap-2 py-1"
              >
                {row}
              </div>
            ))}
          </div>

          {hasFooter && (
            <div className="mx-auto mt-8 max-w-lg space-y-6 text-center">
              {title && (
                <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
              {ctaLabel && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={ctaHref}>{ctaLabel}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default IntegrationsSection;
