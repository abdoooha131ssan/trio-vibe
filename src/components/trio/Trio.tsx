import { FOUNDERS } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

export function Trio() {
  return (
    <Section id="trio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[520px] opacity-80"
        style={{ background: "var(--gradient-halo)" }}
      />
      <SectionHead
        index="08"
        eyebrow="The Trio"
        title="Three specialists."
        accent="One direction."
        intro="Each founder covers a distinct discipline, so nothing gets handled in isolation."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FOUNDERS.map((f, i) => (
          <Reveal key={f.name} delay={i * 90} className="group [perspective:1200px]">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:[transform:rotateX(4deg)] group-hover:shadow-lift">
              <Media
                name={f.image}
                alt={f.alt}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                className="aspect-square transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(70% 60% at 80% 70%, oklch(0.723 0.181 48.5 / 0.28), transparent 70%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6 pt-16">
                <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-2xl text-foreground">{f.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                  {f.role}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}