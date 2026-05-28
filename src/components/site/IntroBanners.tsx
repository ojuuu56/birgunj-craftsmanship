import { useEffect, useState } from "react";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import { X, ChevronRight, FastForward } from "lucide-react";

export function IntroBanners({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0); // 0 = banner1, 1 = banner2, 2 = done
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (step >= 2) {
      document.body.style.overflow = "";
      onDone();
    }
  }, [step, onDone]);

  if (step >= 2) return null;

  const banners = [
    { img: banner1, label: "Banner 01 · Brand Campaign", cta: "Continue", next: () => setStep(1) },
    { img: banner2, label: "Banner 02 · Service Showcase", cta: "Enter Website", next: () => setStep(2) },
  ];
  const b = banners[step];

  return (
    <div className={`fixed inset-0 z-[100] bg-background ${mounted ? "animate-fade-up" : "opacity-0"}`}>
      {/* metallic backdrop */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

      {/* SVG industrial strokes */}
      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="ln" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.01 250)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.86 0.01 250)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.86 0.01 250)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#ln)" strokeWidth="1" fill="none">
          <path d="M0,120 L1200,80" />
          <path d="M0,720 L1200,680" />
          <path d="M80,0 L120,800" />
          <path d="M1080,0 L1140,800" />
        </g>
      </svg>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 sm:p-6 z-10">
        <div className="glass rounded-full px-4 py-2 text-xs tracking-widest uppercase text-muted-foreground">
          {b.label}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStep(2)}
            className="glass rounded-full px-4 py-2 text-xs flex items-center gap-2 hover:bg-card transition"
            aria-label="Skip all"
          >
            <FastForward className="size-3.5" /> Skip All
          </button>
          <button
            onClick={() => setStep(2)}
            className="glass rounded-full p-2 hover:bg-card transition"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Banner image — cinematic frame */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-12 pt-20 pb-28">
        <div className="relative w-full h-full max-w-6xl rounded-2xl overflow-hidden ring-gold hair-border animate-scale-in">
          <img
            key={step}
            src={b.img}
            alt={b.label}
            className="w-full h-full object-contain bg-background"
          />
          {/* metallic overlays */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-background/30" />
          <div className="absolute inset-0 pointer-events-none shimmer opacity-30 mix-blend-overlay" />
          {/* corner brackets */}
          {["top-3 left-3","top-3 right-3 rotate-90","bottom-3 left-3 -rotate-90","bottom-3 right-3 rotate-180"].map(c => (
            <div key={c} className={`absolute ${c} size-8 border-t-2 border-l-2 border-primary/60`} />
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-center gap-3 z-10">
        <button
          onClick={() => setStep(2)}
          className="glass rounded-full px-5 py-3 text-sm flex items-center gap-2 hover:bg-card transition"
        >
          <X className="size-4" /> Close
        </button>
        <button
          onClick={b.next}
          className="bg-gradient-gold text-primary-foreground rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 ring-gold hover:scale-[1.02] transition"
        >
          {b.cta} <ChevronRight className="size-4" />
        </button>
      </div>

      {/* progress */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center gap-2">
        {[0,1].map(i => (
          <div key={i} className={`h-1 rounded-full transition-all ${i===step ? "w-10 bg-primary" : "w-4 bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}
