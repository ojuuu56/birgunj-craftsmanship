import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ChevronDown } from "lucide-react";

const SRC = "/videos/shop-cinematic.mp4";

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const floatRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFloating, setShowFloating] = useState(false);
  const [floatingClosed, setFloatingClosed] = useState(false);
  const [inSection, setInSection] = useState(true);

  // Show floating PiP whenever main section is out of view (including hero/home)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      setInSection(inView);
      if (inView) setShowFloating(false);
      else if (!floatingClosed) setShowFloating(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [floatingClosed]);

  // Auto-play muted on load so floating PiP can show on home section too
  useEffect(() => {
    const v = mainRef.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

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
    <section id="cinematic" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary">— Cinematic</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden hair-border ring-gold bg-black group/player">
          <video
            ref={mainRef}
            src={SRC}
            playsInline
            muted={muted}
            loop
            className="w-full aspect-video object-cover"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* YouTube-style control bar */}
          <div className="absolute inset-x-0 bottom-0 px-3 sm:px-4 pb-2 pt-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover/player:opacity-100 transition">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step="0.1"
              value={progress}
              onChange={seek}
              className="w-full h-1 accent-[var(--gold)] cursor-pointer"
            />
            <div className="flex items-center gap-3 mt-1.5 text-white">
              <button onClick={togglePlay} aria-label="Play/Pause" className="hover:text-primary transition">
                {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <button onClick={toggleMute} aria-label="Mute" className="hover:text-primary transition">
                {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
              <span className="text-[11px] tabular-nums text-white/80">{fmt(progress)} / {fmt(duration)}</span>
              <button onClick={fullscreen} aria-label="Fullscreen" className="ml-auto hover:text-primary transition">
                <Maximize2 className="size-5" />
              </button>
            </div>
          </div>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center bg-black/35"
            >
              <span className="size-16 rounded-full bg-gradient-gold ring-gold flex items-center justify-center hover:scale-105 transition">
                <Play className="size-7 ml-0.5 text-primary-foreground" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Floating PiP — YouTube-style mini player */}
      {showFloating && (
        <div className="fixed bottom-4 right-4 z-40 w-52 sm:w-64 rounded-xl overflow-hidden glass-strong hair-border ring-gold animate-scale-in">
          <div className="relative bg-black">
            <video
              ref={floatRef}
              src={SRC}
              autoPlay
              muted={muted}
              loop
              playsInline
              className="w-full aspect-video object-cover cursor-pointer"
              onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth" })}
              onLoadedMetadata={() => {
                if (floatRef.current && mainRef.current) floatRef.current.currentTime = mainRef.current.currentTime;
              }}
            />
            <div className="absolute top-1 left-1 right-1 flex justify-between items-center">
              <button
                onClick={(e) => { e.stopPropagation(); sectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className="glass rounded-full p-1.5 text-white"
                aria-label="Open in section"
                title="Open in cinematic section"
              >
                <ChevronDown className="size-3" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setFloatingClosed(true); setShowFloating(false); }}
                className="glass rounded-full p-1.5 text-white"
                aria-label="Close mini player"
              >
                <X className="size-3" />
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 px-2 py-1 bg-gradient-to-t from-black/90 to-transparent text-[9px] tracking-[0.3em] uppercase text-primary">
              Live · Workshop
            </div>
          </div>
        </div>
      )}

      {/* prevent floating from showing forever; keep state in sync hint */}
      {!inSection && floatingClosed && null}
    </section>
  );
}
