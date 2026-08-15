import { Facebook, Instagram } from "lucide-react";
import { CONTACT, NAV } from "@/data/site";
import { logoUrl } from "@/lib/logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[320px] opacity-60"
        style={{ background: "var(--gradient-halo)" }}
      />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-12">
        <div>
          <img src={logoUrl} alt="Trio Vibe" width={900} height={225} className="h-7 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Creative &amp; growth agency. Identity, content and campaigns built as one system.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trio Vibe on Instagram"
              className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange"
            >
              <Instagram className="size-4" aria-hidden="true" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Trio Vibe on Facebook"
              className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange"
            >
              <Facebook className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-sm text-foreground transition-colors hover:text-orange"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-foreground transition-colors hover:text-orange"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-orange"
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-8 lg[...]
          <span>© {new Date().getFullYear()} Trio Vibe</span>
          <span>You imagine. We create.</span>
        </div>
      </div>
    </footer>
  );
}
