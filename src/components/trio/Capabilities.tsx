import { useState } from "react";
import { DISCIPLINES, SERVICES } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";
import { cn } from "@/lib/utils";

const BLURB: Record<(typeof DISCIPLINES)[number], string> = {
  Brand: "Identity work that fixes how the business is understood before anything is produced.",
  Content: "The output engine — feeds, film and copy produced as one recognisable system.",
  Growth: "Paid distribution and strategy managed against tracked return, not reach.",
};

export function Capabilities() {
  const [tab, setTab] = useState<(typeof DISCIPLINES)[number]>("Brand");
  const items = SERVICES.filter((s) => s.group === tab);

  return (
    <Section id="services">
      <SectionHead
        index="05"
        eyebrow="Capabilities"
        title="What we"
        accent="do."
        intro="Twelve capabilities across three disciplines — handled together so identity, content and paid distribution never drift apart."
      />

      <div
        role="tablist"
        aria-label="Capability disciplines"
        className="mt-12 flex flex-wrap gap-2"
      >
        {DISCIPLINES.map((d, i) => (
          <button
            key={d}
            type="button"
            role="tab"
            aria-selected={tab === d}
            onClick={() => setTab(d)}
            className={cn(
              "group relative overflow-hidden rounded-full border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300",
              tab === d
                ? "border-orange bg-primary text-primary-foreground shadow-glow"
                : "border-input text-muted-foreground hover:border-orange hover:text-foreground",
            )}
          >
            0{i + 1} / {d}
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{BLURB[tab]}</p>

      <ul
        key={tab}
        className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((s, i) => (
          <li
            key={s.title}
            className="enter-up group relative bg-card p-7 transition-colors duration-300 hover:bg-secondary"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-4 font-sans text-lg font-medium tracking-tight text-foreground">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </li>
        ))}
      </ul>

      <Reveal className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {items.length} capabilities in {tab.toLowerCase()}
      </Reveal>
    </Section>
  );
}
