import aftab from "@/assets/aftab.png";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.5em] uppercase text-primary mb-6">— Proprietor</p>
        <div className="relative">
          <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "color-mix(in oklab, var(--primary) 30%, transparent)" }} />
          <img
            src={aftab}
            alt="Pro. Aftab Hawari"
            loading="lazy"
            width={380}
            height={380}
            className="relative size-56 sm:size-72 object-cover rounded-full ring-gold hair-border"
          />
        </div>
        <h2 className="mt-8 text-4xl sm:text-5xl font-display text-gradient-ivory">Pro. Aftab Hawari</h2>
        <p className="mt-2 text-xs sm:text-sm tracking-[0.35em] uppercase text-muted-foreground">
          Birgunj Aluminium &amp; UPVC Ferbrication
        </p>
      </div>
    </section>
  );
}
