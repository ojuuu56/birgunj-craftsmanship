import { useEffect, useRef, useState } from "react";
import {
  Play, Pause, Volume2, VolumeX, Volume1, Maximize2, Minimize2,
  X, ChevronDown, Settings, SkipBack, SkipForward,
} from "lucide-react";

const SRC = "/videos/shop-cinematic.mp4";

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const floatRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [rateOpen, setRateOpen] = useState(false);
  const [fs, setFs] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const [showFloating, setShowFloating] = useState(true); // float by default (incl. home)
  const [floatingClosed, setFloatingClosed] = useState(false);

  // Float when cinematic section is NOT in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting;
      if (inView) setShowFloating(false);
      else if (!floatingClosed) setShowFloating(true);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [floatingClosed]);

  // Autoplay muted so the floating mini works on first paint (home)
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
      if (main.buffered.length) setBuffered(main.buffered.end(main.buffered.length - 1));
      if (floatRef.current && Math.abs(floatRef.current.currentTime - main.currentTime) > 1) {
        floatRef.current.currentTime = main.currentTime;
      }
    };
    main.addEventListener("timeupdate", onTime);
    main.addEventListener("loadedmetadata", onTime);
    main.addEventListener("progress", onTime);
    return () => {
      main.removeEventListener("timeupdate", onTime);
      main.removeEventListener("loadedmetadata", onTime);
      main.removeEventListener("progress", onTime);
    };
  }, []);

  // Fullscreen state listener
  useEffect(() => {
    const onFs = () => setFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!playing) { setShowControls(true); return; }
    const id = setTimeout(() => setShowControls(false), 2500);
    return () => clearTimeout(id);
  }, [playing, progress]);

  const togglePlay = () => {
    const v = mainRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = mainRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (floatRef.current) floatRef.current.muted = v.muted;
  };
  const setVol = (val: number) => {
    setVolume(val);
    if (mainRef.current) { mainRef.current.volume = val; mainRef.current.muted = val === 0; }
    if (floatRef.current) floatRef.current.volume = val;
    setMuted(val === 0);
  };
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (mainRef.current) mainRef.current.currentTime = t;
  };
  const skip = (delta: number) => {
    if (!mainRef.current) return;
    mainRef.current.currentTime = Math.max(0, Math.min(duration, mainRef.current.currentTime + delta));
  };
  const changeRate = (r: number) => {
    setRate(r); setRateOpen(false);
    if (mainRef.current) mainRef.current.playbackRate = r;
  };
  const fullscreen = () => {
    const el = playerRef.current; if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  const fmt = (n: number) => {
    if (!Number.isFinite(n)) return "0:00";
    const m = Math.floor(n / 60); const s = Math.floor(n % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const pct = duration ? (progress / duration) * 100 : 0;
  const bufPct = duration ? (buffered / duration) * 100 : 0;

  return (
    <section id="cinematic" ref={sectionRef} className="relative py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-6">
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary">— Cinematic</p>
        </div>

        <div
          ref={playerRef}
          className="relative rounded-2xl overflow-hidden hair-border bg-black group/player"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => playing && setShowControls(false)}
        >
          <video
            ref={mainRef}
            src={SRC}
            playsInline
            muted={muted}
            loop
            preload="metadata"
            className="w-full aspect-video object-cover"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* YouTube-style control bar */}
          <div className={`absolute inset-x-0 bottom-0 px-3 sm:px-4 pb-2 pt-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}>
            {/* Progress bar with buffered indicator */}
            <div className="relative h-1.5 w-full group/bar cursor-pointer">
              <div className="absolute inset-0 bg-white/20 rounded-full" />
              <div className="absolute top-0 bottom-0 bg-white/40 rounded-full" style={{ width: `${bufPct}%` }} />
              <div className="absolute top-0 bottom-0 bg-primary rounded-full" style={{ width: `${pct}%` }} />
              <input
                type="range"
                min={0}
                max={duration || 100}
                step="0.05"
                value={progress}
                onChange={seek}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Seek"
              />
              <div
                className="absolute -top-1 size-3.5 rounded-full bg-primary shadow-md pointer-events-none opacity-0 group-hover/bar:opacity-100 transition"
                style={{ left: `calc(${pct}% - 7px)` }}
              />
            </div>

            <div className="flex items-center gap-3 mt-2 text-white">
              <button onClick={togglePlay} aria-label="Play/Pause" className="hover:text-primary transition">
                {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <button onClick={() => skip(-10)} aria-label="Back 10s" className="hover:text-primary transition hidden sm:block">
                <SkipBack className="size-4" />
              </button>
              <button onClick={() => skip(10)} aria-label="Forward 10s" className="hover:text-primary transition hidden sm:block">
                <SkipForward className="size-4" />
              </button>

              <div className="flex items-center gap-1.5 group/vol">
                <button onClick={toggleMute} aria-label="Mute" className="hover:text-primary transition">
                  {muted || volume === 0 ? <VolumeX className="size-5" /> :
                    volume < 0.5 ? <Volume1 className="size-5" /> : <Volume2 className="size-5" />}
                </button>
                <input
                  type="range" min={0} max={1} step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => setVol(Number(e.target.value))}
                  className="w-0 group-hover/vol:w-20 transition-all accent-[var(--primary)] cursor-pointer"
                  aria-label="Volume"
                />
              </div>

              <span className="text-[11px] tabular-nums text-white/80">{fmt(progress)} / {fmt(duration)}</span>

              <div className="ml-auto flex items-center gap-3 relative">
                <button onClick={() => setRateOpen(o => !o)} aria-label="Playback speed" className="text-xs hover:text-primary transition tabular-nums flex items-center gap-1">
                  <Settings className="size-4" /> {rate}x
                </button>
                {rateOpen && (
                  <div className="absolute bottom-7 right-12 bg-black/90 rounded-md py-1 text-xs min-w-[70px] z-10">
                    {RATES.map(r => (
                      <button
                        key={r}
                        onClick={() => changeRate(r)}
                        className={`block w-full text-left px-3 py-1 hover:bg-white/10 ${r === rate ? "text-primary" : ""}`}
                      >
                        {r}x
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={fullscreen} aria-label="Fullscreen" className="hover:text-primary transition">
                  {fs ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
                </button>
              </div>
            </div>
          </div>

          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 flex items-center justify-center bg-black/40"
            >
              <span className="size-16 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition shadow-2xl">
                <Play className="size-7 ml-0.5 text-primary-foreground" />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Floating PiP — video portal that follows the user */}
      {showFloating && (
        <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 w-56 sm:w-72 animate-scale-in">
          <div className="relative rounded-2xl overflow-hidden glass-strong hair-border shadow-2xl">
            <div className="relative bg-black">
              <video
                ref={floatRef}
                src={SRC}
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover cursor-pointer"
                onClick={() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                onLoadedMetadata={() => {
                  if (floatRef.current && mainRef.current) floatRef.current.currentTime = mainRef.current.currentTime;
                }}
              />
              {/* portal ring glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--primary) 40%, transparent), 0 30px 60px -20px color-mix(in oklab, var(--primary) 35%, transparent)" }} />

              <div className="absolute top-1.5 left-1.5 right-1.5 flex justify-between items-center">
                <span className="glass rounded-full px-2 py-0.5 text-[9px] tracking-[0.3em] uppercase text-primary flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" /> Live
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                    className="glass rounded-full p-1.5 text-white hover:text-primary transition"
                    aria-label="Open in cinematic section"
                    title="Open in cinematic section"
                  >
                    <ChevronDown className="size-3" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFloatingClosed(true); setShowFloating(false); }}
                    className="glass rounded-full p-1.5 text-white hover:text-primary transition"
                    aria-label="Close mini player"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 px-2 py-1.5 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-[10px] text-white/80">
                <span className="font-display italic">Workshop · Birgunj</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="hover:text-primary transition"
                  aria-label="Mute"
                >
                  {muted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
