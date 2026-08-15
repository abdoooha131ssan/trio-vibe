import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal slider behaviour: native touch swipe + scroll snapping,
 * pointer drag on desktop, arrow controls and an active-slide index.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    setCount(items.length);
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    items.forEach((item, i) => {
      const c = item.offsetLeft + item.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setIndex(best);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    const item = el.children[Math.max(0, Math.min(i, el.children.length - 1))] as
      | HTMLElement
      | undefined;
    if (!item) return;
    el.scrollTo({
      left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  /** Pointer drag — desktop only; touch keeps native momentum scrolling. */
  const dragProps = {
    onPointerDown: (e: React.PointerEvent<T>) => {
      if (e.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      const startX = e.clientX;
      const startLeft = el.scrollLeft;
      let moved = false;
      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        el.scrollLeft = startLeft - dx;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        el.removeAttribute("data-dragging");
        if (moved) {
          const block = (ev: Event) => {
            ev.preventDefault();
            ev.stopPropagation();
          };
          el.addEventListener("click", block, { capture: true, once: true });
          window.setTimeout(() => el.removeEventListener("click", block, { capture: true }), 60);
        }
      };
      el.setAttribute("data-dragging", "true");
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
  };

  return { ref, index, count, atStart, atEnd, goTo, next, prev, dragProps };
}
