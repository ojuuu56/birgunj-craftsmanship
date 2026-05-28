import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { IntroBanners } from "@/components/site/IntroBanners";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Shop } from "@/components/site/Shop";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { VideoSection } from "@/components/site/VideoSection";
import { About } from "@/components/site/About";
import { MapSection } from "@/components/site/MapSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/Floating";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Birgunj Aluminium & UPVC Ferbrication — We takecare of your home the real Look" },
      { name: "description", content: "Premium aluminium, UPVC, glass and fabrication craftsmanship in Birgunj, Nepal. Windows, doors, railings, ACP, false ceiling and more. Proprietor: Aftab Hawari." },
      { property: "og:title", content: "Birgunj Aluminium & UPVC Ferbrication" },
      { property: "og:description", content: "Quality you can see, service you can trust. Birgunj-15, 2nd Bypass Bharam Chowk." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  component: Page,
});

function Page() {
  const [showSite, setShowSite] = useState(false);
  return (
    <ThemeProvider>
      <I18nProvider>
        {!showSite && <IntroBanners onDone={() => setShowSite(true)} />}
        <Navbar />
        <main>
          <Hero />
          <Shop />
          <Services />
          <Gallery />
          <VideoSection />
          <About />
          <MapSection />
        </main>
        <Footer />
        <FloatingActions />
      </I18nProvider>
    </ThemeProvider>
  );
}
