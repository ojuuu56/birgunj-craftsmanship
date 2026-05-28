import { useEffect, useState } from "react";
import banner1 from "@/assets/banner-1.png";
import banner2 from "@/assets/banner-2.png";
import { X, ChevronRight, FastForward } from "lucide-react";

// Preload both banners as early as possible so they appear instantly.
const preload = (src: string) => {
  const img = new Image();
  img.src = src;
};
if (typeof window !== "undefined") {
  preload(banner1);
  preload(banner2);
}

export function IntroBanners({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    // Aggressively warm the cache for both banners
    [banner1, banner2].forEach(preload);
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
    { img: banner1, cta: "Continue", next: () => setStep(1) },
    { img: banner2, cta: "Enter Website", next: () => setStep(2) },
  ];
  const b = banners[step];

  return (
    <div className={`fixed inset-0 z-[100] bg-background ${mounted ? "animate-fade-up" : "opacity-0"}`}>
      {/* Top right controls only */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4 sm:p-6 z-10">
        <button
          onClick={() => setStep(2)}
          className="glass rounded-full px-4 py-2 text-xs flex items-center gap-2 hover:bg-card transition"
          aria-label="Skip all"
        >
          <FastForward className="size-3.5" /> Skip
        </button>
        <button
          onClick={() => setStep(2)}
          className="glass rounded-full p-2 hover:bg-card transition"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Raw banner — no frame, no ring, no aspect lock. Keeps its own ratio. */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 pt-20 pb-24">
        <img
          key={step}
          src={b.img}
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain animate-fade-up"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex items-center justify-center gap-3 z-10">
        <button
          onClick={b.next}
          className="bg-primary text-primary-foreground rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 hover:scale-[1.02] transition shadow-lg"
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
