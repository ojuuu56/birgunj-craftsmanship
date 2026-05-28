import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const WA = "https://wa.me/9779804265197";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="flex flex-col gap-2 animate-fade-up">
          <a href="tel:9804265197" className="glass-strong rounded-full px-4 py-2.5 text-sm flex items-center gap-2 metallic-border">
            <Phone className="size-4 text-royal-glow" /> 9804265197
          </a>
          <a href="tel:9707844686" className="glass-strong rounded-full px-4 py-2.5 text-sm flex items-center gap-2 metallic-border">
            <Phone className="size-4 text-royal-glow" /> 9707844686
          </a>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Call"
          className="size-14 rounded-full bg-gradient-royal ring-glow flex items-center justify-center hover:scale-105 transition"
        >
          <Phone className="size-6 text-white" />
        </button>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="relative size-14 rounded-full flex items-center justify-center hover:scale-105 transition"
          style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 10px 40px -10px rgba(37,211,102,0.6)" }}
        >
          <MessageCircle className="size-7 text-white" />
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(37,211,102,0.4)" }} />
        </a>
      </div>
    </div>
  );
}
