import { useI18n } from "@/lib/i18n";
import desk from "@/assets/banner-1.png";
import mob from "@/assets/banner-2.png";

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden metallic-border ring-glow">
          <img src={desk} alt="Birgunj Aluminium" loading="lazy" className="hidden sm:block w-full h-full object-cover" />
          <img src={mob} alt="Birgunj Aluminium" loading="lazy" className="sm:hidden w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-royal-glow mb-3">— About Us</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient-silver font-nepali">{t("sections.aboutTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground font-nepali leading-relaxed">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
          <div className="mt-8 glass-strong metallic-border rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Proprietor</p>
            <p className="text-xl font-display font-semibold mt-1">Aftab Hawari</p>
            <p className="text-sm text-muted-foreground font-nepali mt-1">{t("about.p3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
