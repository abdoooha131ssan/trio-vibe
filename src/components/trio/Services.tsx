import { SERVICES } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

const GROUPS = ["Brand", "Content", "Growth"] as const;

export function Services() {
  return (
    <Section id="services">
      <SectionHead
        index="05"
        eyebrow="Capabilities"
        title="What we"
        accent="do."
        intro="Twelve capabilities across three disciplines — handled together so identity, content and paid distribution never drift apart."
      />

      <div className="mt-16 space-y-16">
        {GROUPS.map((group, gi) => (
          <div key={group} className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                0{gi + 1} / {group}
              </p>
              <div aria-hidden="true" className="mt-4 h-px w-16 bg-orange" />
            </div>

            <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {SERVICES.filter((s) => s.group === group).map((s, i) => (
                <li key={s.title}>
                  <Reveal
                    delay={i * 50}
                    className="group relative h-full bg-card p-7 transition-colors duration-300 hover:bg-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <h3 className="font-sans text-lg font-medium tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}