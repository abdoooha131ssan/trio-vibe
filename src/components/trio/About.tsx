import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";
import { useSiteBlock } from "@/lib/site-content";

export function About() {
  const block = useSiteBlock<{ section: { index: string; eyebrow: string; title: string; accent: string }; paragraphs: string[]; image: string; imageAlt: string; pillars: { title: string; body: string }[] }>("site.about");
  return (
    <Section id="about">
      <SectionHead
        index={block.section.index}
        eyebrow={block.section.eyebrow}
        title={block.section.title}
        accent={block.section.accent}
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <Reveal className="max-w-2xl space-y-6 text-[1.0625rem] leading-relaxed text-muted-foreground">
          {block.paragraphs.map((paragraph, index) => <p key={`${index}-${paragraph}`} className={index === 0 ? "text-[1.25rem] leading-snug text-foreground" : index === block.paragraphs.length - 1 ? "text-foreground" : undefined}>{paragraph}</p>)}
        </Reveal>

        <div className="space-y-8">
          <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
            <Media
              name={block.image}
              alt={block.imageAlt}
              sizes="(max-width: 1024px) 92vw, 460px"
              className="aspect-[1400/990]"
            />
          </Reveal>
          <dl className="divide-y divide-border border-y border-border">
            {block.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
                  {p.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}