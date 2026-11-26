import { Mail, MessageCircle, Phone } from "lucide-react";
import { useSiteBlock } from "@/lib/site-content";
import { Reveal } from "./Reveal";
import { Section } from "./Primitives";

type ContactContent = { eyebrow: string; title: string; accent: string; description: string; whatsappLabel: string; emailLabel: string };
type BrandContact = { contact: { whatsapp: string; email: string; phoneDisplay: string } };

export function Contact() {
  const contact = useSiteBlock<ContactContent>("site.contact");
  const brand = useSiteBlock<BrandContact>("site.brand");
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[560px] opacity-90" style={{ background: "var(--gradient-halo)" }} />
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">{contact.eyebrow}</p>
        <h2 className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95]">{contact.title}<br /><em className="text-gradient-orange italic">{contact.accent}</em><span className="text-orange">.</span></h2>
        <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">{contact.description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={brand.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow"><MessageCircle className="size-4" aria-hidden="true" />{contact.whatsappLabel}</a>
          <a href={`mailto:${brand.contact.email}`} className="inline-flex items-center gap-2.5 rounded-full border border-input px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-orange hover:text-orange"><Mail className="size-4" aria-hidden="true" />{contact.emailLabel}</a>
        </div>
        <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"><Phone className="size-3.5" aria-hidden="true" />{brand.contact.phoneDisplay}</p>
      </Reveal>
    </Section>
  );
}