import { CONTACT, NAV } from "@/data/site";
import { logoUrl } from "@/data/media";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-12">
        <div>
          <img src={logoUrl} alt="Trio Vibe" width={900} height={225} className="h-7 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Creative &amp; growth agency. Identity, content and campaigns built as one system.
          </p>
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
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} Trio Vibe</span>
          <span>You imagine. We create.</span>
        </div>
      </div>
    </footer>
  );
}