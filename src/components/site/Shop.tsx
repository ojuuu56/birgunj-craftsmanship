import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import shop from "@/assets/shop.png";

export function Shop() {
  const { t } = useI18n();
  const full = t("hero.welcome");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [full]);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary mb-3">— Est. Birgunj, Nepal</p>
          <h2 className="text-3xl sm:text-4xl font-display text-gradient-ivory">{t("sections.shopTitle")}</h2>
          <p className="mt-5 text-base sm:text-xl font-display max-w-2xl mx-auto leading-snug">
            <span className="text-gradient-ivory font-nepali">{typed}</span>
            <span className="inline-block w-[2px] h-5 sm:h-6 bg-primary ml-1.5 animate-pulse align-middle" />
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden hair-border max-w-3xl mx-auto">
          <img
            src={shop}
            alt="Birgunj Aluminium workshop"
            loading="lazy"
            width={1760}
            height={760}
            className="w-full h-auto object-cover max-h-[360px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-4">
            <div className="glass rounded-xl px-4 py-2.5 inline-block">
              <p className="font-nepali text-xs sm:text-sm">{t("sections.shopSub")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
