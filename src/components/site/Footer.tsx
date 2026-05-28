import { useI18n } from "@/lib/i18n";
import logo from "@/assets/logo.png";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative pt-20 pb-8 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-royal/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* marquee */}
        <div className="overflow-hidden mb-12">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-3xl sm:text-5xl font-display font-bold text-gradient-silver/40">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                <span>BIRGUNJ ALUMINIUM</span><span>•</span>
                <span>UPVC FERBRICATION</span><span>•</span>
                <span>QUALITY YOU CAN SEE</span><span>•</span>
                <span>SERVICE YOU CAN TRUST</span><span>•</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="size-12 object-contain" />
              <div className="leading-tight">
                <p className="font-display font-bold">BIRGUNJ ALUMINIUM</p>
                <p className="text-xs text-muted-foreground tracking-widest">& UPVC FERBRICATION</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground italic">"We takecare of your home the real Look"</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-royal-glow mb-3 flex items-center gap-2"><MapPin className="size-3.5"/> {t("footer.addr")}</p>
            <p className="text-sm text-muted-foreground">Birgunj-15, 2nd Bypass Bharam Chowk<br/>Near OM Party Palace</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-royal-glow mb-3 flex items-center gap-2"><Phone className="size-3.5"/> {t("footer.contact")}</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href="tel:9804265197" className="hover:text-foreground text-muted-foreground transition">9804265197</a>
              <a href="tel:9707844686" className="hover:text-foreground text-muted-foreground transition">9707844686</a>
              <a href="https://wa.me/9779804265197" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"><MessageCircle className="size-3.5"/> WhatsApp</a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-royal-glow mb-3 flex items-center gap-2"><Clock className="size-3.5"/> {t("footer.hours")}</p>
            <p className="text-sm text-muted-foreground font-nepali">{t("footer.sunFri")}</p>
            <p className="text-sm text-muted-foreground font-nepali">{t("footer.sat")}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Birgunj Aluminium & UPVC Ferbrication. All rights reserved.</p>
          <p>
            {t("footer.made")}{" "}
            <a href="https://www.instagram.com/risephoenixmedia" target="_blank" rel="noopener noreferrer" className="text-royal-glow hover:text-foreground transition font-semibold">
              RisePhoenixMedia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
