import { Facebook, Instagram } from "lucide-react";
import { useSiteBlock } from "@/lib/site-content";
import { resolveUrl } from "@/lib/assets";

type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
  contact: { email: string; whatsapp: string; phoneDisplay: string; instagram: string; facebook: string };
  navigation: { label: string; href: string }[];
  footer: { intro: string; explore: string; contact: string; tagline: string };
};

export function Footer() {
  const brand = useSiteBlock<Brand>("site.brand");
  const logoSrc = resolveUrl(brand.logo) ?? brand.logo;
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 h-[320px] opacity-60" style={{ background: "var(--gradient-halo)" }} />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-12">
        <div>
          <img src={logoSrc} alt={brand.logoAlt} width={900} height={225} className="h-7 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{brand.footer.intro}</p>
          <div className="mt-6 flex items-center gap-2">
            <a href={brand.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${brand.name} on Instagram`} className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange"><Instagram className="size-4" aria-hidden="true" /></a>
            <a href={brand.contact.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${brand.name} on Facebook`} className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange"><Facebook className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{brand.footer.explore}</p>
          <ul className="mt-4 space-y-2.5">
            {brand.navigation.map((item) => <li key={item.href}><a href={item.href} className="text-sm text-foreground transition-colors hover:text-orange">{item.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{brand.footer.contact}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={`mailto:${brand.contact.email}`} className="text-foreground transition-colors hover:text-orange">{brand.contact.email}</a></li>
            <li><a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-foreground transition-colors hover:text-orange">{brand.contact.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} {brand.name}</span><span>{brand.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}