import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

const PHONE_1 = "9804265197";
const PHONE_2 = "9707844686";
const WA = "https://wa.me/9779804265197";
const YT_ID = "dZys0Zd1HjY";

// chromeless embed
const ytSrc = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${YT_ID}&playsinline=1&disablekb=1&fs=0&cc_load_policy=0`;

export function Hero() {
  const { t } = useI18n();
  const full = t("hero.welcome");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [full]);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image fallback */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" width={1920} height={1080} />

      {/* YouTube chromeless cover */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[300vh] sm:w-[180vw] sm:h-[180vh] md:w-[120vw] md:h-[120vh]">
          <iframe
            src={ytSrc}
            title="Birgunj Aluminium showcase"
            allow="autoplay; encrypted-media; picture-in-picture"
            className="absolute inset-0 w-full h-full pointer-events-none"
            frameBorder={0}
          />
        </div>
      </div>

      {/* Overlays — kill YT chrome edges */}
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Center content — only logo, number, welcome typing */}
      <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 text-center pt-24 pb-32">
        <div className="animate-float">
          <div className="glass-strong metallic-border rounded-3xl p-6 sm:p-8 ring-glow">
            <img src={logo} alt="Birgunj Aluminium & UPVC Ferbrication" className="size-28 sm:size-36 mx-auto object-contain" width={144} height={144} />
          </div>
        </div>

        <h1 className="mt-8 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
          <span className="text-gradient-silver">BIRGUNJ ALUMINIUM</span>
          <span className="block text-gradient-royal mt-1">& UPVC FERBRICATION</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-muted-foreground italic max-w-2xl">
          "{t("hero.tagline")}"
        </p>

        <div className="mt-6 min-h-[2.5rem] text-base sm:text-lg font-medium">
          <span className="text-gradient-silver font-nepali">{typed}</span>
          <span className="inline-block w-0.5 h-5 bg-royal-glow ml-1 animate-pulse align-middle" />
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex gap-2">
            <a
              href={`tel:${PHONE_1}`}
              className="bg-gradient-royal text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 ring-glow hover:scale-[1.03] transition"
            >
              <Phone className="size-4" /> {t("hero.callNow")} {PHONE_1}
            </a>
            <a
              href={`tel:${PHONE_2}`}
              className="glass-strong rounded-full px-4 py-3 text-sm font-medium hidden sm:flex items-center gap-2 hover:bg-card transition"
            >
              <Phone className="size-4" /> {PHONE_2}
            </a>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong metallic-border rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-card transition"
          >
            <MessageCircle className="size-4 text-emerald-400" /> {t("hero.whatsapp")}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-[0.3em] uppercase animate-pulse">
        Scroll
      </div>
    </section>
  );
}
