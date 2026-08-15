import { TOOL_GROUPS } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

const MARQUEE = TOOL_GROUPS.flatMap((g) => g.items);

export function Ecosystem() {
  return (
    <Section id="ecosystem" className="relative overflow-hidden">
      <SectionHead
        index="10"
        eyebrow="Ecosystem"
        title="The stack behind"
        accent="the output."
        intro="Production, distribution and measurement tools we work in every day."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {TOOL_GROUPS.map((g, i) => (
          <Reveal key={g.group} delay={i * 70} className="bg-card p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
              {g.group}
            </p>
            <ul className="mt-5 space-y-3">
              {g.items.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-orange/70" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="relative mt-12 overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="marquee-track gap-10">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
