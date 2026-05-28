import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "ne" | "en";

const dict = {
  nav: {
    home: { ne: "गृह", en: "Home" },
    services: { ne: "सेवाहरू", en: "Services" },
    gallery: { ne: "ग्यालरी", en: "Gallery" },
    about: { ne: "हाम्रोबारे", en: "About" },
    contact: { ne: "सम्पर्क", en: "Contact" },
  },
  hero: {
    tagline: { ne: "तपाईंको घरको वास्तविक रूप हाम्रो जिम्मा", en: "We takecare of your home the real Look" },
    callNow: { ne: "अहिले कल गर्नुहोस्", en: "Call Now" },
    whatsapp: { ne: "ह्वाट्सएप", en: "WhatsApp" },
    welcome: { ne: "Birgunj Aluminium र UPVC झ्याल तथा ढोकामा स्वागत छ", en: "Welcome To Birgunj Aluminium & UPVC Windows & Doors" },
  },
  sections: {
    shopTitle: { ne: "हाम्रो पसल", en: "Our Workshop" },
    shopSub: { ne: "Birgunj-१५, २nd Bypass भरम चोक, OM Party Palace नजिकै", en: "Birgunj-15, 2nd Bypass Bharam Chowk, Near OM Party Palace" },
    servicesTitle: { ne: "हाम्रा सेवाहरू", en: "Our Services" },
    servicesSub: { ne: "Quality you can see, service you can trust", en: "Quality you can see, service you can trust" },
    galleryTitle: { ne: "हाम्रा कामहरू – Project Gallery", en: "Our Work – Project Gallery" },
    gallerySub: { ne: "भिडियो र फोटोहरू", en: "Videos & Photos" },
    aboutTitle: { ne: "हाम्रोबारे", en: "About Us" },
    mapTitle: { ne: "हाम्रो स्थान", en: "Our Location" },
    mapSub: { ne: "Visit Our Location", en: "Visit Our Location" },
    videoTitle: { ne: "हाम्रो पसल — सिनेमाटिक दृश्य", en: "Our Workshop — Cinematic View" },
  },
  about: {
    p1: {
      ne: "Birgunj Aluminium & UPVC Ferbrication गुणस्तरीय एल्युमिनियम, UPVC, ग्लास र फेब्रिकेशन सेवाहरूमा बर्षौंको अनुभव बोकेको एक विश्वसनीय नाम हो।",
      en: "Birgunj Aluminium & UPVC Ferbrication is a trusted name in premium aluminium, UPVC, glass and fabrication craftsmanship — built on years of dedicated workmanship.",
    },
    p2: {
      ne: "हाम्रो टोलीले प्रत्येक झ्याल, ढोका, रेलिङ र ग्लास संरचनालाई वास्तुकलात्मक सटीकता र हस्तकलाको सम्मानका साथ बनाउँछ।",
      en: "Our team handcrafts every window, door, railing and glass structure with architectural precision and a deep respect for the craft.",
    },
    p3: {
      ne: "प्रोप्राइटर — आफताब हवारी",
      en: "Proprietor — Aftab Hawari",
    },
  },
  footer: {
    hours: { ne: "खुल्ने समय", en: "Opening Hours" },
    sunFri: { ne: "आइतवार – शुक्रवार: ९:०० बिहान – ७:०० बेलुका", en: "Sunday – Friday: 9:00 AM – 7:00 PM" },
    sat: { ne: "शनिवार: बन्द", en: "Saturday: Closed" },
    contact: { ne: "सम्पर्क", en: "Contact" },
    addr: { ne: "ठेगाना", en: "Address" },
    made: { ne: "बनाएको", en: "Made by" },
  },
} as const;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const I18nCtx = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || "en";
    setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (path: string): string => {
    const parts = path.split(".");
    // deno-lint-ignore no-explicit-any
    let cur: any = dict;
    for (const p of parts) cur = cur?.[p];
    if (cur && typeof cur === "object" && "ne" in cur) return cur[lang];
    return path;
  };
  return <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
