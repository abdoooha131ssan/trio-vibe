import { useEffect, useState } from "react";
import { useInView } from "./Reveal";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Counts up once the number scrolls into view. The final value is the initial
 * state, so the figure is never rendered as a placeholder zero.
 */
export function Counter({ value, decimals = 0, prefix = "", suffix = "" }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    setDisplay(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
