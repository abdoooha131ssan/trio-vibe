import { PROCESS } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

export function Process() {
  return (
    <Section id="process">
      <SectionHead
        index="08"
        eyebrow="How we work"
        title="Analysis first."
        accent="Execution second."
        intro="Our working philosophy. Depth varies by engagement — not every project needs every stage."
      />

      <ol className="mt-16 divide-y divide-border border-y border-border">
        {PROCESS.map((p, i) => (
          <li key={p.step}>
            <Reveal
              delay={i * 60}
              className="group grid gap-4 py-8 md:grid-cols-[120px_260px_1fr] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange">
                {p.step}
              </span>
              <h3 className="text-[clamp(1.85rem,4vw,2.6rem)] transition-colors duration-300 group-hover:text-orange">
                {p.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}