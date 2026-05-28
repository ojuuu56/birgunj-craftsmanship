import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import mascot from "@/assets/call-mascot.png";

const WA = "https://wa.me/9779804265197";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-fade-up mb-1">
          <a href="tel:9804265197" className="glass-strong hair-border rounded-full px-4 py-2.5 text-xs flex items-center gap-2 hover:text-primary transition">
            <Phone className="size-3.5 text-primary" /> 9804265197
          </a>
          <a href="tel:9707844686" className="glass-strong hair-border rounded-full px-4 py-2.5 text-xs flex items-center gap-2 hover:text-primary transition">
            <Phone className="size-3.5 text-primary" /> 9707844686
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2.5 text-xs flex items-center gap-2 text-white"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 30px -10px rgba(37,211,102,0.55)" }}
          >
            <MessageCircle className="size-3.5" /> WhatsApp
          </a>
        </div>
      )}

      {/* 3D mascot button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Contact"
        className="relative group"
      >
        {/* glow */}
        <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "color-mix(in oklab, var(--gold) 35%, transparent)" }} />
        <span className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 50% 60%, color-mix(in oklab, var(--gold) 28%, transparent), transparent 70%)" }} />

        <div className="relative size-24 sm:size-28 animate-float">
          <img
            src={mascot}
            alt="Call us"
            className="size-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
            width={256}
            height={256}
          />
          {open ? (
            <span className="absolute -top-1 -right-1 glass-strong rounded-full p-1.5">
              <X className="size-3" />
            </span>
          ) : (
            <span className="absolute -bottom-1 right-0 bg-gradient-gold text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md tracking-wider">
              CALL
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
