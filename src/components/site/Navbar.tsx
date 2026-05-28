import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#services", label: t("nav.services") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#cinematic", label: "Cinematic" },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <>
      {/* Floating right-side controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setLang(lang === "ne" ? "en" : "ne")}
          className="glass-strong hair-border rounded-full px-3 py-2 text-[11px] font-medium flex items-center gap-1.5 hover:text-primary transition"
          aria-label="Toggle language"
        >
          <Languages className="size-3.5" />
          {lang === "ne" ? "EN" : "ने"}
        </button>
        <button
          onClick={toggle}
          className="glass-strong hair-border rounded-full p-2 hover:text-primary transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <button
          onClick={() => setOpen(true)}
          className="glass-strong hair-border rounded-full p-2 hover:text-primary transition"
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </button>
      </div>

      {/* Side drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-0 right-0 h-full w-[88%] sm:w-[420px] glass-strong border-l border-border flex flex-col transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <p className="text-[10px] tracking-[0.45em] uppercase text-primary/80">Menu</p>
            <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-secondary transition" aria-label="Close menu">
              <X className="size-4" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 py-3 border-b border-border/60 hover:pl-2 transition-all"
              >
                <span className="text-[10px] tabular-nums text-muted-foreground tracking-wider">0{i + 1}</span>
                <span className="text-2xl sm:text-3xl font-display group-hover:text-gradient-gold transition">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="p-6 border-t border-border text-xs text-muted-foreground space-y-1">
            <p className="text-primary tracking-widest uppercase text-[10px]">Birgunj — Nepal</p>
            <p>Birgunj-15, 2nd Bypass Bharam Chowk</p>
            <p className="tabular-nums">+977 9804265197 · 9707844686</p>
          </div>
        </aside>
      </div>
    </>
  );
}
