import { ArrowUpRight, MessageCircle } from "lucide-react";
import { CONTACT, STATS } from "@/data/site";
import { Media } from "./Media";
import { Counter } from "./Counter";
import { GlowBackdrop } from "./Primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]" aria-label="Introduction">
      <GlowBackdrop />
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-20 pt-16 sm:px-8 md:pt-24 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-orange" />
              Creative &amp; Growth Agency
            </p>

            <h1 className="mt-7 text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.92]">
              You imagine.
              <br />
              <em className="text-gradient-orange italic">We create</em>
              <span className="text-orange">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
              A creative &amp; growth partner helping brands build stronger identities, better
              content, and campaigns designed to perform.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Start a Project
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 rounded-full border border-input px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-orange hover:text-orange"
              >
                View Our Work
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Egypt · Saudi Arabia · UAE
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-[2rem] opacity-80"
              style={{ background: "var(--gradient-halo)" }}
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
              <Media
                name="portfolio-cover"
                alt="Trio Vibe portfolio cover with the studio wordmark on a dark orange backdrop"
                sizes="(max-width: 1024px) 92vw, 540px"
                priority
                className="aspect-[1400/990]"
              />
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {[
                { k: "Best ROAS", v: "12.0×" },
                { k: "Lowest CPA", v: "7.5 SAR" },
                { k: "Cases", v: "4+" },
              ].map((s) => (
                <div key={s.k} className="bg-card px-4 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="mt-2 font-display text-2xl text-orange">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-border pt-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none text-foreground">
                <Counter
                  value={s.value}
                  decimals={"decimals" in s ? (s.decimals as number) : 0}
                  suffix={s.suffix}
                />
              </dd>
              <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}