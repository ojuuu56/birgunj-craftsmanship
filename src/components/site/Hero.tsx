import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/lib/i18n";

const YT_ID = "dZys0Zd1HjY";
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
      {/* Background image — premium gold-on-noir glass facade */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        width={1920}
        height={1080}
      />

      {/* YouTube subtle backdrop */}
      <div className="absolute inset-0 overflow-hidden opacity-30 mix-blend-luminosity">
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

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(80% 60% at 50% 50%, transparent 0%, color-mix(in oklab, var(--background) 70%, transparent) 100%)"
      }} />

      {/* Hairline corners */}
      <div className="absolute top-6 left-6 size-10 border-t border-l border-gold/40 hidden sm:block" />
      <div className="absolute top-6 right-6 size-10 border-t border-r border-gold/40 hidden sm:block" />
      <div className="absolute bottom-6 left-6 size-10 border-b border-l border-gold/40 hidden sm:block" />
      <div className="absolute bottom-6 right-6 size-10 border-b border-r border-gold/40 hidden sm:block" />

      {/* Center content — just the logo (no big frame), and welcome */}
      <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-float">
          <img
            src={logo}
            alt="Birgunj Aluminium & UPVC Ferbrication"
            className="size-32 sm:size-44 md:size-52 mx-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            width={208}
            height={208}
          />
        </div>

        <div className="mt-10 sm:mt-12 max-w-3xl">
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-primary/80 mb-4">— Est. Birgunj, Nepal</p>
          <p className="text-xl sm:text-3xl md:text-4xl font-display leading-snug">
            <span className="text-gradient-ivory font-nepali">{typed}</span>
            <span className="inline-block w-[2px] h-6 sm:h-8 bg-primary ml-1.5 animate-pulse align-middle" />
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
        <span className="inline-block animate-pulse">— scroll —</span>
      </div>
    </section>
  );
}
