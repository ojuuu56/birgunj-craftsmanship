import { useI18n } from "@/lib/i18n";
import shop from "@/assets/shop.png";

export function Shop() {
  const { t } = useI18n();
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">— Workshop</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient-ivory font-nepali">{t("sections.shopTitle")}</h2>
        </div>
        <div className="relative rounded-3xl overflow-hidden hair-border ring-gold">
          <img src={shop} alt="Birgunj Aluminium workshop" loading="lazy" width={1760} height={760} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8">
            <div className="glass-strong rounded-2xl px-5 py-4 inline-block">
              <p className="font-nepali text-sm sm:text-base">{t("sections.shopSub")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
