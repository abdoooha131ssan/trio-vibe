import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 lg:px-12", className)}
    >
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  accent,
  intro,
  right,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">
          {index} — {eyebrow}
        </p>
        <h2 className="mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
          {title}{" "}
          {accent ? <em className="text-gradient-orange not-italic italic">{accent}</em> : null}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function GlowBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute left-1/2 top-0 h-[720px] w-[1100px] -translate-x-1/2 opacity-70"
        style={{ background: "var(--gradient-halo)" }}
      />
    </div>
  );
}