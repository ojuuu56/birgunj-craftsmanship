import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import logo from "@/assets/logo.png";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#services", label: t("nav.services") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-7xl px-4 transition-all ${scrolled ? "" : ""}`}>
        <nav className={`flex items-center justify-between rounded-2xl px-3 sm:px-5 py-2.5 ${scrolled ? "glass-strong" : "glass"} metallic-border`}>
          <a href="#home" className="flex items-center gap-2.5 min-w-0">
            <img src={logo} alt="Birgunj Aluminium" className="size-9 sm:size-10 object-contain" width={40} height={40} />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[13px] font-bold tracking-tight">BIRGUNJ ALUMINIUM</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase">& UPVC Ferbrication</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLang(lang === "ne" ? "en" : "ne")}
              className="glass rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-card transition"
              aria-label="Toggle language"
            >
              <Languages className="size-3.5" />
              {lang === "ne" ? "EN" : "NE"}
            </button>
            <button
              onClick={toggle}
              className="glass rounded-full p-2 hover:bg-card transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden glass rounded-full p-2"
              aria-label="Menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-2 animate-fade-up">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm hover:bg-card rounded-xl">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
