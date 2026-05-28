import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, X } from "lucide-react";

const SRC = "/videos/shop-cinematic.mp4";

export function VideoSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const floatRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFloating, setShowFloating] = useState(false);
  const [floatingClosed, setFloatingClosed] = useState(false);

  // sync float visibility on scroll out of section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      if (inView) setShowFloating(false);
      else if (playing && !floatingClosed) setShowFloating(true);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [playing, floatingClosed]);

  // sync time between main and floating
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const onTime = () => {
      setProgress(main.currentTime);
      setDuration(main.duration || 0);
      if (floatRef.current && Math.abs(floatRef.current.currentTime - main.currentTime) > 1) {
        floatRef.current.currentTime = main.currentTime;
      }
    };
    main.addEventListener("timeupdate", onTime);
    main.addEventListener("loadedmetadata", onTime);
    return () => {
      main.removeEventListener("timeupdate", onTime);
      main.removeEventListener("loadedmetadata", onTime);
    };
  }, []);

  const togglePlay = () => {
    const v = mainRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = mainRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (floatRef.current) floatRef.current.muted = v.muted;
  };
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (mainRef.current) mainRef.current.currentTime = t;
  };
  const fullscreen = () => {
    const v = mainRef.current; if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen();
  };
  const fmt = (n: number) => {
    if (!Number.isFinite(n)) return "0:00";
    const m = Math.floor(n / 60); const s = Math.floor(n % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section id="cinematic" ref={sectionRef} className="relative py-24 bg-card/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-royal-glow mb-3">— Cinematic</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient-silver font-nepali">{t("sections.videoTitle")}</h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden metallic-border ring-glow bg-black group/player">
          <video
            ref={mainRef}
            src={SRC}
            playsInline
            muted={muted}
            className="w-full aspect-video object-cover"
            onClick={togglePlay}
          />

          {/* Custom YouTube-style controls */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover/player:opacity-100 transition">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step="0.1"
              value={progress}
              onChange={seek}
              className="w-full h-1 accent-royal-glow cursor-pointer"
            />
            <div className="flex items-center gap-3 mt-2 text-white">
              <button onClick={togglePlay} aria-label="Play/Pause" className="hover:scale-110 transition">
                {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <button onClick={toggleMute} aria-label="Mute" className="hover:scale-110 transition">
                {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
              <span className="text-xs tabular-nums">{fmt(progress)} / {fmt(duration)}</span>
              <button onClick={fullscreen} aria-label="Fullscreen" className="ml-auto hover:scale-110 transition">
                <Maximize2 className="size-5" />
              </button>
            </div>
          </div>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <span className="size-20 rounded-full bg-gradient-royal ring-glow flex items-center justify-center hover:scale-110 transition">
                <Play className="size-9 ml-1 text-white" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Floating PiP player */}
      {showFloating && (
        <div className="fixed bottom-4 left-4 z-40 w-56 sm:w-72 rounded-2xl overflow-hidden glass-strong metallic-border ring-glow animate-scale-in">
          <div className="relative">
            <video
              ref={floatRef}
              src={SRC}
              autoPlay
              muted={muted}
              playsInline
              className="w-full aspect-video object-cover cursor-pointer"
              onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              onLoadedMetadata={() => {
                if (floatRef.current && mainRef.current) floatRef.current.currentTime = mainRef.current.currentTime;
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setFloatingClosed(true); setShowFloating(false); }}
              className="absolute top-1.5 right-1.5 glass rounded-full p-1.5"
              aria-label="Close mini player"
            >
              <X className="size-3.5" />
            </button>
            <div className="absolute bottom-1.5 right-1.5 glass rounded px-1.5 py-0.5 text-[10px]">
              <Minimize2 className="size-3 inline mr-1" /> Mini
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
