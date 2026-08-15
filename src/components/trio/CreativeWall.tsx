import { CREATIVE_WALL } from "@/data/site";
import { Media } from "./Media";
import { Section, SectionHead } from "./Primitives";

const half = Math.ceil(CREATIVE_WALL.length / 2);
const ROW_A = CREATIVE_WALL.slice(0, half);
const ROW_B = CREATIVE_WALL.slice(half);

function Row({ items, reverse }: { items: typeof CREATIVE_WALL; reverse?: boolean }) {
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
              alt="Social media design produced by Trio Vibe"
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
  return (
    <Section id="creative" label="Creative wall" className="overflow-hidden">
      <SectionHead
        index="03"
        eyebrow="Creative wall"
        title="Feed systems, built as"
        accent="a set."
        intro="A cross-section of social design produced for clinics, agencies and retail brands."
      />

      <div className="mt-14 space-y-4">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>
    </Section>
  );
}
