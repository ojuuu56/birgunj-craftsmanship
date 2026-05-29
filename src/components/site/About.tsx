import aboutFull from "@/assets/about-full.png";

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase text-primary mb-4 sm:mb-6">— Proprietor</p>
        <div className="rounded-2xl overflow-hidden hair-border ring-gold mx-auto inline-block max-w-full">
          <img
            src={aboutFull}
            alt="Pro. Aftab Hawari — Birgunj Aluminium & UPVC Ferbrication"
            loading="lazy"
            className="block w-full h-auto max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
