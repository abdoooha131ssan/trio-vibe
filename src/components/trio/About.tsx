import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { Section, SectionHead } from "./Primitives";

const PILLARS = [
  { k: "Analysis first", v: "We audit before we build. What works, what blocks, what changes." },
  { k: "Strategy second", v: "Positioning and direction decided before a single deliverable." },
  { k: "Execution that ships", v: "Identity, content and campaigns produced as one system." },
  { k: "Growth you can track", v: "We measure by outcomes, not by volume of output." },
];

export function About() {
  return (
    <Section id="about">
      <SectionHead
        index="06"
        eyebrow="Positioning"
        title="We don't just create. We"
        accent="analyze, build, and grow."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <Reveal className="max-w-2xl space-y-6 text-[1.0625rem] leading-relaxed text-muted-foreground">
          <p className="text-[1.25rem] leading-snug text-foreground">
            Most brands don't fail because they're weak — they fail because no one analyzed them
            properly before starting to build.
          </p>
          <p>
            Trio Vibe isn't a service vendor. We're a strategic partner. We start by auditing your
            brand: what's working, what's holding you back, and what needs to change before we touch
            a single deliverable.
          </p>
          <p>
            Whether your brand is a blank page or an existing business that needs restructuring, the
            process starts the same way — analysis first, execution second.
          </p>
          <p>
            Three specialists, one direction. Trio Vibe combines visual identity, branding strategy,
            performance advertising and content to help brands build stronger identities and
            campaigns that perform.
          </p>
          <p className="text-foreground">
            We don't measure success by output. We measure it by growth you can track.
          </p>
        </Reveal>

        <div className="space-y-8">
          <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
            <Media
              name="capabilities-overview"
              alt="Trio Vibe capabilities overview covering logo design, social media design and ads and media buying"
              sizes="(max-width: 1024px) 92vw, 460px"
              className="aspect-[1400/990]"
            />
          </Reveal>
          <dl className="divide-y divide-border border-y border-border">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 60} className="py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
                  {p.k}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}