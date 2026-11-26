import { useSiteBlock } from "@/lib/site-content";
import { Media } from "./Media";
import { Section, SectionHead } from "./Primitives";

function Row({ items, reverse, alt }: { items: string[]; reverse?: boolean; alt: string }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="marquee-track gap-4 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((key, i) => (
          <figure
            key={`${key}-${i}`}
            className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-border bg-card sm:w-[260px]"
          >
            <Media
              name={key}
              alt={alt}
              sizes="260px"
              className="aspect-square transition-transform duration-700 ease-out hover:scale-[1.05]"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

export function CreativeWall() {
  const block = useSiteBlock<{ section: { index: string; eyebrow: string; title: string; accent: string; intro: string; ariaLabel: string }; items: string[]; imageAlt: string }>("site.creative");
  const half = Math.ceil(block.items.length / 2);
  const rowA = block.items.slice(0, half);
  const rowB = block.items.slice(half);
  return (
    <Section id="creative" label={block.section.ariaLabel} className="overflow-hidden">
      <SectionHead
        index={block.section.index}
        eyebrow={block.section.eyebrow}
        title={block.section.title}
        accent={block.section.accent}
        intro={block.section.intro}
      />

      <div className="mt-14 space-y-4">
        <Row items={rowA} alt={block.imageAlt} />
        <Row items={rowB} alt={block.imageAlt} reverse />
      </div>
    </Section>
  );
}
