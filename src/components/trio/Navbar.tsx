import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { CONTACT, NAV } from "@/data/site";
import { logoUrl } from "@/data/media";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Trio Vibe — home">
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
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow sm:inline-flex"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Start a Project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-4 sm:px-8">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-display text-3xl text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground"
            >
              <MessageCircle className="size-3.5" aria-hidden="true" />
              Start a Project
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}