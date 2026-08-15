import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/data/site";
import { Section, SectionHead } from "./Primitives";
import { cn } from "@/lib/utils";

/** Scroll-driven process walkthrough: the active stage tracks the viewport. */
export function Method() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = items.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = nodes.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <Section id="process">
      <SectionHead
        index="07"
        eyebrow="How we work"
        title="Analysis first."
        accent="Execution second."
        intro="Our working philosophy. Depth varies by engagement — not every project needs every stage."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
          <ol className="space-y-4">
            {PROCESS.map((p, i) => (
              <li key={p.step} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-px transition-all duration-500",
                    i === active ? "w-10 bg-orange" : "w-4 bg-border",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500",
                    i === active ? "text-orange" : "text-muted-foreground",
                  )}
                >
                  {p.step} — {p.title}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 h-px w-full bg-border">
            <div
              className="h-px bg-orange transition-all duration-700"
              style={{ width: `${((active + 1) / PROCESS.length) * 100}%` }}
            />
          </div>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {PROCESS.map((p, i) => (
            <li
              key={p.step}
              ref={(el) => {
                items.current[i] = el;
              }}
              data-active={i === active}
              className="group grid gap-4 py-10 transition-opacity duration-500 data-[active=false]:opacity-55 md:grid-cols-[110px_1fr] md:gap-8"
            >
              <span
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-500",
                  i === active ? "text-orange" : "text-muted-foreground",
                )}
              >
                {p.step}
              </span>
              <div>
                <h3 className="text-[clamp(1.85rem,4vw,2.75rem)] transition-colors duration-500 group-hover:text-orange">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
