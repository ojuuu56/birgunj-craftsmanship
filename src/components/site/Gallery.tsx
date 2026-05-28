import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { X, Play } from "lucide-react";
import g1 from "@/assets/gallery-1.jpeg";
import g2 from "@/assets/gallery-2.jpeg";
import g3 from "@/assets/gallery-3.jpeg";
import g4 from "@/assets/gallery-4.jpeg";

type Item =
  | { type: "img"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

const items: Item[] = [
  { type: "img", src: g1, alt: "Glass railing with decorative panels" },
  { type: "video", src: "/videos/gallery-1.mp4", alt: "Project video 1" },
  { type: "img", src: g2, alt: "Red canopy roof structure" },
  { type: "img", src: g3, alt: "False ceiling with cove lighting" },
  { type: "video", src: "/videos/gallery-2.mp4", alt: "Project video 2" },
  { type: "img", src: g4, alt: "Blue polycarbonate entrance canopy" },
];

export function Gallery() {
  const { t } = useI18n();
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary mb-3">— Portfolio</p>
          <h2 className="text-3xl sm:text-4xl text-gradient-ivory font-nepali">{t("sections.galleryTitle")}</h2>
          <p className="mt-2 text-xs text-muted-foreground tracking-wider font-nepali">{t("sections.gallerySub")}</p>
        </div>

        {/* Clean uniform grid — smaller tiles, no chaotic spans */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setOpen(it)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden hair-border glass hover:-translate-y-0.5 transition-all duration-500"
            >
              {it.type === "img" ? (
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <>
                  <video src={it.src} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/30 group-hover:bg-ink/10 transition">
                    <div className="size-12 rounded-full glass-strong flex items-center justify-center">
                      <Play className="size-4 ml-0.5 text-primary" />
                    </div>
                  </div>
                </>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent">
                <p className="text-[10px] tracking-widest uppercase text-foreground/85">{String(i + 1).padStart(2, "0")} · {it.type === "video" ? "Film" : "Build"}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-up" onClick={() => setOpen(null)}>
          <button className="absolute top-4 right-4 glass-strong rounded-full p-2" onClick={() => setOpen(null)} aria-label="Close">
            <X className="size-5" />
          </button>
          <div className="max-w-5xl w-full max-h-[85vh]" onClick={e => e.stopPropagation()}>
            {open.type === "img" ? (
              <img src={open.src} alt={open.alt} className="w-full max-h-[85vh] object-contain rounded-2xl" />
            ) : (
              <video src={open.src} controls autoPlay className="w-full max-h-[85vh] rounded-2xl bg-black" />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
