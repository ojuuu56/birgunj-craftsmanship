import { useI18n } from "@/lib/i18n";
import sAlu from "@/assets/service-aluminium-windows.jpg";
import sUpvc from "@/assets/service-upvc.jpg";
import sCement from "@/assets/service-cement-wall.jpg";
import sSteel from "@/assets/service-steel-railing.jpg";
import sCeil from "@/assets/service-false-ceiling.jpg";
import sKit from "@/assets/service-kitchen.jpg";
import sPart from "@/assets/service-glass-partition.jpg";
import sShower from "@/assets/service-shower.jpg";
import sTough from "@/assets/service-toughened-glass.jpg";
import sAcp from "@/assets/service-acp.jpg";
import sGlaze from "@/assets/service-glazing.jpg";
import sWood from "@/assets/service-wood-glass.jpg";
import sGlass from "@/assets/service-glasswork.jpg";

type S = { img: string; ne: string; en: string; descNe: string; descEn: string };
const services: S[] = [
  { img: sAlu, ne: "अल्युमिनियम झ्याल तथा ढोका", en: "Aluminium Windows & Doors", descNe: "बलियो र वास्तुकलात्मक एल्युमिनियम फ्रेम।", descEn: "Robust, architectural aluminium frames built to last." },
  { img: sUpvc, ne: "UPVC झ्याल तथा ढोका", en: "UPVC Windows & Doors", descNe: "मौसम–प्रतिरोधी, ध्वनी–सुरक्षित UPVC जडान।", descEn: "Weather-sealed, sound-insulated UPVC systems." },
  { img: sCement, ne: "रेडिमेड सिमेन्ट वाल", en: "Readymade Cement Wall", descNe: "हल्का, छिटो जडान हुने प्रिकास्ट प्यानल।", descEn: "Lightweight precast panels for rapid installs." },
  { img: sSteel, ne: "स्टिल रेलिङ", en: "Steel Railing", descNe: "स्टेनलेस स्टिल रेलिङ — चिल्लो र दीर्घकालीन।", descEn: "Mirror-polished stainless steel railings, built for years." },
  { img: sCeil, ne: "फल्स सिलिङ", en: "False Ceiling", descNe: "ज्यामितीय फल्स सिलिङ कोभ–लाइटिङ सहित।", descEn: "Geometric false ceilings with hidden cove lighting." },
  { img: sKit, ne: "किचन क्याबिनेट", en: "Kitchen Cabinet", descNe: "मोडुलर किचन क्याबिनेट — एल्युमिनियम र ग्लास।", descEn: "Modular kitchen cabinets in aluminium and glass." },
  { img: sPart, ne: "ग्लास पार्टिसन तथा रेलिङ", en: "Glass Partition & Railing", descNe: "फ्रेमलेस ग्लास पार्टिसन र रेलिङ।", descEn: "Frameless glass partitions and railings." },
  { img: sShower, ne: "बाथरुम इन्क्लोजर", en: "Bathroom Enclosure", descNe: "फ्रेमलेस सावर ग्लास इन्क्लोजर।", descEn: "Frameless shower glass enclosures." },
  { img: sTough, ne: "टफन ग्लास", en: "Toughened Glass", descNe: "हाई–स्ट्रेंथ टेम्पर्ड ग्लास।", descEn: "High-strength tempered glass for any span." },
  { img: sAcp, ne: "ACP बोर्ड", en: "ACP Board", descNe: "एल्युमिनियम कम्पोजिट प्यानल क्लाडिङ।", descEn: "Aluminium composite panel cladding facades." },
  { img: sGlaze, ne: "ग्लास ग्लेजिङ", en: "Glass Glazing", descNe: "स्ट्रक्चरल ग्लास ग्लेजिङ प्रणाली।", descEn: "Structural glass glazing systems." },
  { img: sWood, ne: "काठको झ्यालमा सिसा जडान", en: "Glass Fit on Wood Frames", descNe: "काठको फ्रेममा सटीक सिसा जडान।", descEn: "Precision glass fitting on existing wood frames." },
  { img: sGlass, ne: "सामान्य ग्लासवर्क", en: "General Glasswork", descNe: "सबै प्रकारका कस्टम ग्लास काम।", descEn: "All forms of custom decorative glasswork." },
];

export function Services() {
  const { t, lang } = useI18n();
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">— 13 services</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient-ivory">{t("sections.servicesTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("sections.servicesSub")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article
              key={s.en}
              className="group glass hair-border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={lang === "ne" ? s.ne : s.en}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] tracking-widest uppercase text-muted-foreground">
                  0{(i+1).toString().padStart(2,'0').slice(-2)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold font-nepali">
                  {lang === "ne" ? s.ne : s.en}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground font-nepali">
                  {lang === "ne" ? s.descNe : s.descEn}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
