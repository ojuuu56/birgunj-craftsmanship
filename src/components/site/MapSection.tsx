import { useI18n } from "@/lib/i18n";
import { MapPin, Phone, MessageCircle } from "lucide-react";

const WA = "https://wa.me/9779804265197";

export function MapSection() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">— Visit</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient-ivory font-nepali">{t("sections.mapTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("sections.mapSub")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden hair-border ring-gold">
            <iframe
              title="Birgunj Aluminium & UPVC windows & Doors location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1777.152747251166!2d84.89095429999999!3d27.020511000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399355f2973ca633%3A0x22842605bae92e09!2sBirgunj%20Aluminium%20%26%20UPVC%20windows%20%26%20Doors!5e0!3m2!1sen!2snp!4v1779988949881!5m2!1sen!2snp"
              width="100%"
              height="500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0, display: "block" }}
              allowFullScreen
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/20 rounded-3xl" />
          </div>

          <div className="glass-strong hair-border rounded-3xl p-6 flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Address</p>
              <h3 className="mt-1 font-display text-xl font-semibold">Birgunj Aluminium & UPVC Ferbrication</h3>
              <p className="flex items-start gap-2 mt-3 text-sm text-muted-foreground">
                <MapPin className="size-4 mt-0.5 text-primary" />
                <span>Birgunj-15, 2nd Bypass Bharam Chowk<br/>Near OM Party Palace</span>
              </p>
            </div>

            <div className="border-t border-border/60 pt-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Call us</p>
              <div className="flex flex-col gap-2">
                <a href="tel:9804265197" className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-card transition">
                  <Phone className="size-4 text-primary" /> <span className="font-medium">9804265197</span>
                </a>
                <a href="tel:9707844686" className="glass rounded-xl px-4 py-3 flex items-center gap-3 hover:bg-card transition">
                  <Phone className="size-4 text-primary" /> <span className="font-medium">9707844686</span>
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="bg-gradient-gold text-primary-foreground rounded-xl px-4 py-3 flex items-center gap-3 ring-gold">
                  <MessageCircle className="size-4" /> <span className="font-semibold">WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
