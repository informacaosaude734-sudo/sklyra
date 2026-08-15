import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { reels, site } from "@/content";

/**
 * Portfolio pieces are rendered through Instagram's official embed endpoint
 * (instagram.com/reel/<shortcode>/embed) — nothing is re-hosted here.
 */

/**
 * Instagram sizes each reel's media from the iframe WIDTH, while the account
 * header and the likes/comment footer stay a fixed pixel height. So the iframe
 * is over-widened until the media alone fills the 4:5 window, then centred and
 * pulled up past the header — the chrome ends up outside the clip and only the
 * video shows. The ratio differs per reel, hence the per-reel `zoom` in
 * src/content.ts.
 */
const DEFAULT_ZOOM = 152;
/** Height of the embed's account header, in px. */
const HEADER_PX = 54;
/** Slack so the footer always lands below the clipped window. */
const FOOTER_PX = 520;
export function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <span className="eyebrow">Portfolio</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display max-w-3xl text-[clamp(2.3rem,7vw,5.5rem)]">
                Proof, <span className="text-brand">not promises.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a href={site.instagram} target="_blank" rel="noreferrer noopener">
              <Button variant="outline" className="group">
                See the rest on Instagram
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel, i) => (
            <Reveal key={reel.id} delay={i * 0.08}>
              <figure className="group">
                {/* phone frame */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black p-2 transition-colors duration-300 group-hover:border-brand/40">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black">
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                      title={reel.caption}
                      loading="lazy"
                      allowFullScreen
                      scrolling="no"
                      className="absolute border-0"
                      style={{
                        width: `${reel.zoom ?? DEFAULT_ZOOM}%`,
                        left: `${-((reel.zoom ?? DEFAULT_ZOOM) - 100) / 2}%`,
                        top: -HEADER_PX,
                        height: `calc(100% + ${HEADER_PX + FOOTER_PX}px)`,
                      }}
                    />
                  </div>
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-[12px] font-medium tracking-wide text-white/40">
                  <span>{reel.caption}</span>
                  <span className="text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
