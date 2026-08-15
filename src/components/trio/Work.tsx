import { useMemo, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS, WORK_CATEGORIES, type Project } from "@/data/site";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const spanClass: Record<Project["span"], string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  regular: "",
};

export function Work() {
  const [filter, setFilter] = useState<(typeof WORK_CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section id="work">
      <SectionHead
        index="06"
        eyebrow="Selected work"
        title="The"
        accent="portfolio."
        intro="Identity systems, feed design, performance creative and video — produced by Trio Vibe."
      />

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
        {WORK_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
              filter === c
                ? "border-orange bg-primary text-primary-foreground"
                : "border-input text-muted-foreground hover:border-orange hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid auto-rows-[minmax(0,auto)] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => {
          const clickable = Boolean(p.caseStudy);
          const Wrapper = clickable ? "button" : "div";
          return (
            <Reveal key={p.slug} delay={(i % 6) * 50} className={cn("group", spanClass[p.span])}>
              <Wrapper
                {...(clickable
                  ? { type: "button" as const, onClick: () => setActive(p) }
                  : {})}
                className={cn(
                  "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors duration-300 hover:border-orange/60",
                  clickable && "cursor-pointer",
                )}
                aria-label={clickable ? `Read the ${p.title} case study` : undefined}
              >
                <div className="relative overflow-hidden">
                  <Media
                    name={p.image}
                    alt={p.alt}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-2xl text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{clickable ? "Read case study" : p.discipline}</span>
                    {clickable ? (
                      <ArrowUpRight
                        className="size-4 text-orange transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto border-border bg-card p-0">
          {active ? (
            <article>
              <div className="relative">
                <Media
                  name={active.image}
                  alt={active.alt}
                  sizes="(max-width: 768px) 96vw, 768px"
                />
              </div>
              <div className="p-7 sm:p-9">
                <DialogHeader className="space-y-3 text-left">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                    {active.discipline}
                  </p>
                  <DialogTitle className="font-display text-4xl font-normal tracking-tight">
                    {active.title}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground">
                    {active.summary}
                  </DialogDescription>
                </DialogHeader>

                {active.caseStudy?.metrics?.length ? (
                  <dl className="mt-7 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                    {active.caseStudy.metrics.map((m) => (
                      <div key={m.label} className="bg-card px-5 py-4">
                        <dd className="font-display text-3xl text-orange">{m.value}</dd>
                        <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {m.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-8 space-y-6">
                  {(
                    [
                      ["Challenge", active.caseStudy?.challenge],
                      ["Strategy", active.caseStudy?.strategy],
                      ["Execution", active.caseStudy?.execution],
                      ["Result", active.caseStudy?.result],
                    ] as const
                  ).map(([k, v]) =>
                    v ? (
                      <div key={k} className="border-t border-border pt-5">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                          {k}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</p>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </article>
          ) : null}
        </DialogContent>
      </Dialog>
    </Section>
  );
}