import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/trio/Navbar";
import { Hero } from "@/components/trio/Hero";
import { About } from "@/components/trio/About";
import { Services } from "@/components/trio/Services";
import { Work } from "@/components/trio/Work";
import { CreativeWall } from "@/components/trio/CreativeWall";
import { Process } from "@/components/trio/Process";
import { Trio } from "@/components/trio/Trio";
import { Contact } from "@/components/trio/Contact";
import { Footer } from "@/components/trio/Footer";

const TITLE = "Trio Vibe — Creative & Growth Agency";
const DESCRIPTION =
  "Trio Vibe builds brand identity, social content and performance campaigns that grow businesses — with documented results up to 12× ROAS.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Trio Vibe",
          description: DESCRIPTION,
          email: "triiovibe@gmail.com",
          telephone: "+20 109 426 2726",
          sameAs: [
            "https://www.instagram.com/triio_vibe/",
            "https://www.facebook.com/share/1Ew3LBxjUp/?mibextid=wwXIfr",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <CreativeWall />
        <Services />
        <About />
        <Process />
        <Trio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
