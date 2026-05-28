import { useI18n } from "@/lib/i18n";
import workshop from "@/assets/about-workshop.jpg";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden hair-border ring-gold">
          <img src={workshop} alt="Birgunj Aluminium workshop" loading="lazy" className="w-full h-full object-cover aspect-[4/5]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
        <div>
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary mb-3">— About</p>
          <h2 className="text-4xl sm:text-5xl text-gradient-ivory font-nepali">{t("sections.aboutTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground font-nepali leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
          <div className="mt-8 glass-strong hair-border rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Proprietor</p>
            <p className="text-2xl font-display mt-1">Aftab Hawari</p>
            <p className="text-sm text-muted-foreground font-nepali mt-1">{t("about.p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
