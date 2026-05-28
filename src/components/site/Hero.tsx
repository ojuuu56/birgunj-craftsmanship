import logo from "@/assets/logo.png";

const YT_ID = "dZys0Zd1HjY";
const ytSrc = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&loop=1&playlist=${YT_ID}&playsinline=1&disablekb=1&fs=0&cc_load_policy=0`;

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Crisp full-bleed YouTube background — no blur, no gold rays */}
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

      {/* Subtle bottom fade only (so next section blends), no heavy vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      {/* Center: just the logo, clean */}
      <div className="relative z-10 min-h-[100svh] flex items-center justify-center px-6">
        <div className="animate-float">
          <img
            src={logo}
            alt="Birgunj Aluminium & UPVC Ferbrication"
            className="size-32 sm:size-44 md:size-52 mx-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            width={208}
            height={208}
          />
        </div>
      </div>
    </section>
  );
}
