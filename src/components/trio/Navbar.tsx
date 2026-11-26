import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useSiteBlock, useSiteCMS } from "@/lib/site-content";
import { resolveUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

type Brand = {
  name: string;
  logo: string;
  logoAlt: string;
  contact: { whatsapp: string };
  navigation: { label: string; href: string }[];
  headerCta: string;
  editSite: string;
  labels: { logoHome: string };
};

export function Navbar() {
  const brand = useSiteBlock<Brand>("site.brand");
  const { role } = useSiteCMS();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const ids = brand.navigation.map((item) => item.href.slice(1));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [brand.navigation]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const logoSrc = resolveUrl(brand.logo) ?? brand.logo;
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "border-b border-transparent")}>
      <nav aria-label="Primary" className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={brand.labels.logoHome}>
          <img src={logoSrc} alt={brand.logoAlt} width={900} height={225} className="h-7 w-auto sm:h-8" decoding="async" />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {brand.navigation.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a href={item.href} aria-current={isActive ? "true" : undefined} className={cn("relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300", isActive ? "text-orange" : "text-muted-foreground hover:text-foreground")}>
                  {item.label}
                  <span aria-hidden="true" className={cn("absolute inset-x-4 -bottom-0.5 h-px origin-left bg-orange transition-transform duration-500", isActive ? "scale-x-100" : "scale-x-0")} />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground transition-all duration-300 hover:shadow-glow lg:inline-flex">
            <MessageCircle className="size-3.5" aria-hidden="true" />{brand.headerCta}
          </a>
          {role === "admin" ? <a href="/admin" className="hidden rounded-full border border-input px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-orange hover:text-orange sm:inline-flex">{brand.editSite}</a> : null}
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="grid size-10 place-items-center rounded-full border border-input text-foreground transition-colors hover:border-orange hover:text-orange lg:hidden">
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>
      <div className={cn("overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden", open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0")}>
        <ul className="mx-auto flex w-full max-w-[1240px] flex-col px-5 py-4 sm:px-8">
          {brand.navigation.map((item, index) => (
            <li key={item.href} className="border-b border-border last:border-0">
              <a href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4 text-2xl text-foreground transition-colors hover:text-orange">
                <span className="font-mono text-[10px] tracking-[0.2em] text-orange">{String(index + 1).padStart(2, "0")}</span>{item.label}
              </a>
            </li>
          ))}
          <li className="flex flex-wrap gap-3 pt-5">
            <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground"><MessageCircle className="size-3.5" aria-hidden="true" />{brand.headerCta}</a>
            {role === "admin" ? <a href="/admin" onClick={() => setOpen(false)} className="inline-flex items-center rounded-full border border-input px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">{brand.editSite}</a> : null}
          </li>
        </ul>
      </div>
    </header>
  );
}