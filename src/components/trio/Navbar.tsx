import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { CONTACT, NAV } from "@/data/site";
import { logoUrl } from "@/lib/logo";
import { cn } from "@/lib/utils";

const IDS = NAV.map((n) => n.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
      >
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label="Trio Vibe — home">
          <img
            src={logoUrl}
            alt="Trio Vibe"
            width={900}
            height={225}
            className="h-7 w-auto sm:h-8"
            decoding="async"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive ? "text-orange" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-orange transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:sha[...]"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="mx-auto flex w-full max-w-[1240px] flex-col px-5 py-4 sm:px-8">
          {NAV.map((item, i) => (
            <li key={item.href} className="border-b border-border last:border-0">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 text-2xl text-foreground transition-colors hover:text-orange"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-orange">
                  0{i + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground"
            >
              <MessageCircle className="size-3.5" aria-hidden="true" />
              Start a project
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
