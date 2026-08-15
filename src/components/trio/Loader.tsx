import { useEffect, useState } from "react";
import { logoUrl } from "@/data/media";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Branded intro curtain. Runs once per browser session, never blocks content
 * for crawlers (it renders above already-hydrated markup) and respects
 * reduced-motion preferences.
 */
export function Loader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (sessionStorage.getItem("tv-intro") === "done") return;
    sessionStorage.setItem("tv-intro", "done");
    setActive(true);
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - t, 2)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const leave = window.setTimeout(() => setLeaving(true), duration);
    const done = window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
    }, duration + 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leave);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        leaving && "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: "var(--gradient-halo)" }}
      />
      <div className="relative flex flex-col items-center">
        <img src={logoUrl} alt="" width={900} height={225} className="h-10 w-auto sm:h-12" />
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          You imagine · We create
        </p>
        <div className="relative mt-8 h-px w-56 overflow-hidden bg-border">
          <span
            className="absolute inset-y-0 left-0 bg-orange transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-orange">
          {String(progress).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
}
