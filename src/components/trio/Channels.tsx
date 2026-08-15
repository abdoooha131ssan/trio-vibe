import { CHANNELS } from "@/data/site";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

export function Channels() {
  return (
    <Section id="channels">
      <SectionHead
        index="05"
        eyebrow="Distribution"
        title="Where the work"
        accent="goes live."
        intro="Creative is only half of it. These are the channels we produce for and buy on."
      />

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {CHANNELS.map((c, i) => (
          <li key={c.name}>
            <Reveal
              delay={(i % 3) * 70}
              className="group relative h-full bg-card p-8 transition-colors duration-300 hover:bg-secondary"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(70% 80% at 20% 0%, oklch(0.723 0.181 48.5 / 0.16), transparent 70%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <h3 className="font-sans text-xl font-medium tracking-tight text-foreground">
                  {c.name}
                </h3>
                <span className="shrink-0 rounded-full border border-input px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {c.tag}
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                {c.detail}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
