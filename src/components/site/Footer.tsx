import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.png";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact" className="relative pt-24 pb-10 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent), transparent 65%)" }} />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Classy serif marquee with separators */}
        <div className="overflow-hidden mb-16">
          <div className="flex gap-10 animate-marquee whitespace-nowrap items-center">
            {Array.from({ length: 3 }).map((_, k) => (
              <div key={k} className="flex gap-10 items-center text-3xl sm:text-5xl font-display text-foreground/15">
                <span className="italic">Birgunj Aluminium</span>
                <span className="text-primary text-2xl">✦</span>
                <span>UPVC Ferbrication</span>
                <span className="text-primary text-2xl">✦</span>
                <span className="italic">Quality you can see</span>
                <span className="text-primary text-2xl">✦</span>
                <span>Service you can trust</span>
                <span className="text-primary text-2xl">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Birgunj Aluminium" className="size-12 object-contain" />
              <div className="leading-tight">
                <p className="font-display text-lg">Birgunj Aluminium</p>
                <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">UPVC · Ferbrication</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground italic font-display">
              "We take care of your home — the real look."
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 flex items-center gap-2"><MapPin className="size-3"/> {t("footer.addr")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">Birgunj-15, 2nd Bypass Bharam Chowk<br/>Near OM Party Palace</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 flex items-center gap-2"><Phone className="size-3"/> {t("footer.contact")}</p>
            <div className="flex flex-col gap-1.5 text-sm tabular-nums">
              <a href="tel:9804265197" className="hover:text-primary text-muted-foreground transition">+977 9804265197</a>
              <a href="tel:9707844686" className="hover:text-primary text-muted-foreground transition">+977 9707844686</a>
              <a href="https://wa.me/9779804265197" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"><MessageCircle className="size-3.5"/> WhatsApp</a>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3 flex items-center gap-2"><Clock className="size-3"/> {t("footer.hours")}</p>
            <p className="text-sm text-muted-foreground font-nepali">{t("footer.sunFri")}</p>
            <p className="text-sm text-muted-foreground font-nepali">{t("footer.sat")}</p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Birgunj Aluminium & UPVC Ferbrication</p>
          <p className="flex items-center gap-1.5">
            {t("footer.made")}{" "}
            <a href="https://www.instagram.com/risephoenixmedia" target="_blank" rel="noopener noreferrer" className="text-gradient-gold font-medium hover:opacity-80 transition">
              RisePhoenixMedia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
