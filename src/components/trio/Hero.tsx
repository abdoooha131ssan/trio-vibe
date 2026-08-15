import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";
import { Media } from "./Media";
import { GlowBackdrop } from "./Primitives";

const WORDS = ["Brand identity", "Content systems", "Performance campaigns"];

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, 800)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]" aria-label="Introduction">
      <GlowBackdrop />
      <div
        aria-hidden="true"
        className="hairline-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
      />

      <div className="mx-auto w-full max-w-[1240px] px-5 pb-16 pt-16 sm:px-8 md:pt-24 lg:px-12 lg:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow enter-up flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-orange" />
              Creative &amp; Growth Agency
            </p>

            <h1
              className="enter-up mt-7 text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.92]"
              style={{ animationDelay: "120ms" }}
            >
              You imagine.
              <br />
              <em className="text-gradient-orange italic">We create</em>
              <span className="text-orange">.</span>
            </h1>

            <p
              className="enter-up mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              A creative &amp; growth partner helping brands build stronger identities, better
              content, and campaigns designed to perform.
            </p>

            <ul
              className="enter-up mt-8 flex flex-wrap gap-x-6 gap-y-2"
              style={{ animationDelay: "300ms" }}
            >
              {WORDS.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-orange" />
                  {w}
                </li>
              ))}
            </ul>

            <div
              className="enter-up mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "380ms" }}
            >
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:shadow-glow"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Start a Project
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full border border-input px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-orange hover:text-orange"
              >
                View Our Work
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <p
              className="enter-up mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
              style={{ animationDelay: "460ms" }}
            >
              Egypt · Saudi Arabia · UAE
            </p>
          </div>

          <div className="relative" style={{ transform: `translate3d(0, ${offset * -0.06}px, 0)` }}>
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

            <div className="animate-float-soft absolute -bottom-6 -left-4 hidden rounded-2xl border border-border bg-background/85 px-6 py-4 backdrop-blur-xl sm:block">
              <p className="font-display text-3xl text-orange">12×</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Best documented ROAS
              </p>
            </div>
          </div>
        </div>

        <a
          href="#results"
          className="mt-14 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-orange"
        >
          <span className="grid size-9 place-items-center rounded-full border border-input">
            <ArrowDown className="size-3.5 animate-bounce" aria-hidden="true" />
          </span>
          Scroll to the proof
        </a>
      </div>
    </section>
  );
}
