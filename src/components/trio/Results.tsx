import { CASE_STUDIES, STATS } from "@/data/site";
import { useDragScroll } from "@/hooks/useDragScroll";
import { Media } from "./Media";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";
import { SliderControls } from "./SliderControls";

export function Results() {
  const s = useDragScroll<HTMLDivElement>();

  return (
    <Section id="results" className="relative overflow-hidden" label="Performance proof">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-[520px] opacity-70"
        style={{ background: "var(--gradient-halo)" }}
      />

      <SectionHead
        index="02"
        eyebrow="Performance proof"
        title="Numbers we can"
        accent="stand behind."
        intro="Documented outcomes from live campaigns — swipe through the cases, not the claims."
      />

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 70} className="bg-card px-6 py-8">
            <dd className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-foreground">
              <Counter
                value={stat.value}
                decimals={"decimals" in stat ? (stat.decimals as number) : 0}
                suffix={stat.suffix}
              />
            </dd>
            <dt className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
              {stat.label}
            </dt>
            <p className="mt-2 text-xs text-muted-foreground">{stat.note}</p>
          </Reveal>
        ))}
      </dl>

      <div
        ref={s.ref}
        {...s.dragProps}
        className="drag-x mt-14 gap-5 pb-2"
        aria-label="Case study slider"
      >
        {CASE_STUDIES.map((p) => (
          <article
            key={p.slug}
            className="w-[86vw] max-w-[720px] overflow-hidden rounded-2xl border border-border bg-card sm:w-[62vw] lg:w-[560px]"
          >
            <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden">
                <Media
                  name={p.image}
                  alt={p.alt}
                  sizes="(max-width: 640px) 90vw, 260px"
                  className="h-full min-h-[180px] object-cover"
                />
              </div>
              <div className="p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                  {p.discipline}
                </p>
                <h3 className="mt-3 text-3xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.caseStudy?.result ?? p.summary}
                </p>
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-5">
                  {p.caseStudy?.metrics?.map((m) => (
                    <div key={m.label}>
                      <dd className="font-display text-3xl text-orange">{m.value}</dd>
                      <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {m.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        ))}
      </div>

      <SliderControls
        index={s.index}
        count={s.count}
        atStart={s.atStart}
        atEnd={s.atEnd}
        onPrev={s.prev}
        onNext={s.next}
        onDot={s.goTo}
        label="Case"
      />
    </Section>
  );
}
