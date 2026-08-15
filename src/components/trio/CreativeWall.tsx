import { CREATIVE_WALL } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

export function CreativeWall() {
  return (
    <Section id="creative" label="Creative wall">
      <SectionHead
        index="07"
        eyebrow="Creative wall"
        title="Feed systems, built as"
        accent="a set."
        intro="A cross-section of social design produced for clinics, agencies and retail brands."
      />

      <div className="mt-14 columns-2 gap-4 md:columns-3 lg:columns-4">
        {CREATIVE_WALL.map((key, i) => (
          <Reveal
            key={key}
            delay={(i % 4) * 60}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card"
          >
            <Media
              name={key}
              alt="Social media design produced by Trio Vibe"
              sizes="(max-width: 768px) 46vw, 280px"
              className="transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}