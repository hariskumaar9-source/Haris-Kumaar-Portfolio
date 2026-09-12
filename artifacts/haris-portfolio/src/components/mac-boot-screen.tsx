import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FastForward,
  Sparkles,
  Terminal,
  Cpu,
  Smartphone,
  Layers,
  Activity,
  CheckCircle2,
  Radio,
  Monitor,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  assessUserDevice,
  calculateEndToEndProspects,
  getUserLineage,
} from '../lib/device-sensor';

const BRAD_PITT_QUOTES = [
  {
    movie: 'Fight Club (Tyler Durden)',
    quote: 'First rule of Haris Kumaar\'s portfolio: You don\'t talk about bad UX. Second rule: You ship pixel-perfect products.',
  },
  {
    movie: 'Ocean\'s Eleven (Rusty Ryan)',
    quote: 'You think you just need a UI designer? You need someone who can walk in, read the room, and architect the entire product before breakfast.',
  },
  {
    movie: 'Inglourious Basterds (Lt. Aldo Raine)',
    quote: 'I don\'t just push pixels, kid. I build software users actually love. Sit tight, the system is booting up.',
  },
  {
    movie: 'Once Upon a Time in Hollywood (Cliff Booth)',
    quote: 'Don\'t sweat in front of the stakeholders, and never let your frame rate drop below 60fps.',
  },
  {
    movie: 'Moneyball (Billy Beane)',
    quote: 'How can you not be romantic about clean design tokens and high-conversion user flows?',
  },
  {
    movie: 'Ocean\'s Twelve (Rusty Ryan)',
    quote: 'We\'re about to rob bad UX blind. Grab a soda, don\'t blink.',
  },
];

const EXTENSIONS = [
  { name: 'Finder 7.5', icon: '📁' },
  { name: 'QuickTime', icon: '🎬' },
  { name: 'AfterDark', icon: '🌙' },
  { name: 'SoundMgr', icon: '🔊' },
  { name: 'HarisAI.kext', icon: '⚡' },
  { name: 'FigmaTokens', icon: '🎨' },
  { name: 'VamvoraCloud', icon: '☁️' },
  { name: 'ChiptuneJuke', icon: '🎹' },
];

export function playMacStartupChime() {
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    // Classic C-Major / F-Major warm Macintosh startup chime
    const freqs = [174.61, 261.63, 349.23, 523.25, 698.46]; // F3, C4, F4, C5, F5
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx < 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);
      
      const vol = 0.08 / (idx + 1);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    });
  } catch {}
}

export function MacBootScreen({
  onBootComplete,
  isOpen = true,
}: {
  onBootComplete: () => void;
  isOpen?: boolean;
}) {
  // All hooks MUST be declared unconditionally at the very top (React Rules of Hooks)
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [loadedExtCount, setLoadedExtCount] = useState(1);
  const chimePlayed = useRef(false);

  const detectedDevice = useMemo(() => assessUserDevice(), []);
  const prospects = useMemo(() => calculateEndToEndProspects(detectedDevice), [detectedDevice]);
  const lineage = useMemo(() => getUserLineage(detectedDevice), [detectedDevice]);

  // Terminal log lines revealed proportionally with progress (1 to 11 lines)
  const revealedLogsCount = Math.min(
    prospects.terminalLogSteps.length,
    Math.max(1, Math.floor((progress / 100) * prospects.terminalLogSteps.length) + 1)
  );
  const currentLogs = useMemo(
    () => prospects.terminalLogSteps.slice(0, revealedLogsCount),
    [prospects.terminalLogSteps, revealedLogsCount]
  );

  // Play chime on mount
  useEffect(() => {
    if (!chimePlayed.current && isOpen) {
      chimePlayed.current = true;
      playMacStartupChime();
    }
  }, [isOpen]);

  // Cycle Brad Pitt quotes smoothly every 3.8 seconds so user can comfortably read them
  useEffect(() => {
    if (!isOpen) return;
    setQuoteIdx(Math.floor(Math.random() * BRAD_PITT_QUOTES.length));

    const quoteTimer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % BRAD_PITT_QUOTES.length);
    }, 3800);

    return () => clearInterval(quoteTimer);
  }, [isOpen]);

  // Progress smoothly advances over ~7.5 seconds (gives ample reading time)
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() < 0.4 ? 2 : 1;
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onBootComplete();
          }, 1400); // 1.4s comfortable pause after 100%
          return 100;
        }
        return next;
      });
    }, 75);

    return () => clearInterval(interval);
  }, [isOpen, onBootComplete]);

  // Sync Extension icons with progress
  useEffect(() => {
    const extTarget = Math.min(
      EXTENSIONS.length,
      Math.floor((progress / 100) * EXTENSIONS.length) + 1
    );
    setLoadedExtCount(extTarget);
  }, [progress]);

  // Handle ESC key to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBootComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBootComplete]);

  // Safe early exit AFTER all hooks are declared
  if (!isOpen) return null;

  const currentQuote = BRAD_PITT_QUOTES[quoteIdx];

  // Dynamic status message based on percentage & sensed device
  let stageText = `Awakening DeviceAI Sensor for ${detectedDevice.fullName}...`;
  if (progress > 22 && progress <= 48) {
    stageText = `Calibrating Viewport Aperture (${detectedDevice.width}×${detectedDevice.height} CSS · ${detectedDevice.aspectRatio})...`;
  } else if (progress > 48 && progress <= 72) {
    stageText = `Tracing 42-Yr Computing Lineage from 1984 Mac to ${detectedDevice.model}...`;
  } else if (progress > 72 && progress <= 94) {
    stageText = 'Harmonizing Full-Height Responsive Desktop Matrix & Studio MP3...';
  } else if (progress > 94) {
    stageText = `✨ All Systems Calibrated & Ready for ${detectedDevice.fullName}! Entering HarisOS...`;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#242628] p-2 sm:p-4 select-none font-mono overflow-hidden"
        style={{
          width: '100vw',
          height: '100dvh',
          maxWidth: '100vw',
          maxHeight: '100dvh',
          backgroundImage: `radial-gradient(#444648 18%, transparent 19%), radial-gradient(#333537 18%, transparent 19%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 4px 4px',
          boxSizing: 'border-box',
        }}
        onClick={() => {
          if (!chimePlayed.current) {
            chimePlayed.current = true;
            playMacStartupChime();
          }
        }}
      >
        {/* Vintage Macintosh Welcome Dialog (Guaranteed zero overflow / zero viewport breakout) */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-[calc(100vw-20px)] sm:w-full max-w-sm sm:max-w-md md:max-w-lg rounded-sm border-2 sm:border-4 border-black bg-[#eadecc] p-2.5 sm:p-4 shadow-[4px_4px_0px_#000000] sm:shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col gap-2 sm:gap-2.5 max-h-[calc(100dvh-20px)] box-border"
        >
          {/* Top Title Bar of Dialog */}
          <div className="flex items-center justify-between border-b-2 border-black pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full border border-black bg-[#d8ee57] animate-pulse" />
              <span className="font-bold text-black text-xs sm:text-sm tracking-wide">
                STARTUP SEQUENCE · SYSTEM 7.5.3
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBootComplete();
              }}
              className="inline-flex items-center gap-1.5 rounded-sm border-2 border-black bg-white hover:bg-black hover:text-[#d8ee57] px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors"
            >
              <span>{progress >= 100 ? 'ENTER NOW ➔' : 'SKIP [ESC]'}</span>
              <FastForward size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* Welcome Header & Happy Mac */}
          <div className="flex items-center gap-2.5 sm:gap-3 border-b-2 border-black/15 pb-2">
            {/* 8-Bit Happy Mac Computer Icon */}
            <div className="shrink-0 rounded-sm border-2 border-black bg-[#fbf8ee] p-1.5 shadow-[2px_2px_0px_#000]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 128 128"
                shapeRendering="crispEdges"
                className="w-9 h-9 sm:w-10 sm:h-10"
              >
                <rect x="16" y="16" width="96" height="100" rx="6" fill="#111111" />
                <rect x="14" y="12" width="96" height="98" rx="6" fill="#E8DEC8" stroke="#111111" strokeWidth="4" />
                <rect x="18" y="16" width="88" height="4" fill="#FBF8EE" />
                <rect x="18" y="16" width="4" height="88" fill="#FBF8EE" />
                <rect x="26" y="24" width="72" height="56" rx="4" fill="#1A1F24" stroke="#111111" strokeWidth="4" />
                <rect x="30" y="28" width="64" height="48" fill="#0D1318" />
                <rect x="42" y="40" width="8" height="8" fill="#D8EE57" />
                <rect x="44" y="42" width="4" height="4" fill="#0D1318" />
                <rect x="74" y="40" width="8" height="8" fill="#D8EE57" />
                <rect x="76" y="42" width="4" height="4" fill="#0D1318" />
                <rect x="60" y="46" width="4" height="8" fill="#D8EE57" />
                <rect x="64" y="50" width="4" height="4" fill="#D8EE57" />
                <rect x="42" y="56" width="6" height="4" fill="#D8EE57" />
                <rect x="46" y="60" width="6" height="4" fill="#D8EE57" />
                <rect x="52" y="62" width="20" height="4" fill="#D8EE57" />
                <rect x="72" y="60" width="6" height="4" fill="#D8EE57" />
                <rect x="76" y="56" width="6" height="4" fill="#D8EE57" />
                <rect x="52" y="90" width="46" height="5" rx="1" fill="#111111" />
                <rect x="54" y="91" width="38" height="2" fill="#4B5563" />
                <rect x="94" y="91" width="3" height="3" fill="#D8EE57" />
              </svg>
            </div>

            {/* Welcome Typography */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-black truncate">
                  Welcome to Mockintosh™
                </h1>
                <span className="rounded border border-black bg-black text-[#d8ee57] px-1 py-0.2 text-[8px] sm:text-[9px] font-bold shadow-[1px_1px_0px_#000] shrink-0">
                  SYSTEM 7.5.3
                </span>
              </div>
              <p className="font-mono text-[9.5px] sm:text-[10.5px] font-semibold text-black/75 truncate">
                Haris Kumaar Portfolio · Awakened AI Viewport Specialist
              </p>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* BRAD PITT HOLLYWOOD SWAGGER CARD (FRONT & CENTER WITH READING TIME)   */}
          {/* ===================================================================== */}
          <div className="rounded-sm border-2 border-black bg-white p-2 sm:p-2.5 shadow-[2px_2px_0px_#000] shrink-0">
            <div className="flex items-center justify-between gap-1.5 border-b border-black/15 pb-1 mb-1">
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-black">
                <Sparkles size={11} className="text-amber-500 shrink-0" />
                <span className="tracking-wide">HOLLYWOOD SWAGGER &amp; QUOTE:</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-black bg-[#d8ee57] px-1.5 py-0.5 rounded border border-black truncate">
                🎬 {currentQuote.movie}
              </span>
            </div>
            <div className="min-h-[34px] sm:min-h-[42px] flex items-center">
              <p className="text-[11px] sm:text-[13px] font-bold italic leading-snug text-black/90">
                "{currentQuote.quote}"
              </p>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* COMPACT DEVICE AI SENSOR & VIEWPORT SCREENING RADAR                   */}
          {/* ===================================================================== */}
          <div className="rounded border-2 border-black bg-[#0e1117] p-1.5 sm:p-2.5 text-white shadow-[2px_2px_0px_#000] shrink-0">
            {/* Header with Identified Brand */}
            <div className="flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-bold text-[#d8ee57] border-b border-white/15 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5 truncate">
                <Cpu size={12} className="animate-pulse text-[#d8ee57] shrink-0" />
                <span className="truncate">AI SENSOR: {detectedDevice.flag} {detectedDevice.fullName}</span>
              </div>
              <span className="bg-[#39e658] text-black px-1.5 py-0.2 rounded-xs text-[8px] font-black uppercase shrink-0">
                {detectedDevice.os} · {detectedDevice.orientation.toUpperCase()}
              </span>
            </div>

            {/* 4 Crisp Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[8.5px] sm:text-[9px] font-mono text-neutral-300">
              <div className="bg-black/60 px-1.5 py-1 rounded border border-white/10 truncate">
                <span className="text-neutral-500 block text-[7.5px]">VIEWPORT</span>
                {detectedDevice.width}×{detectedDevice.height} CSS
              </div>
              <div className="bg-black/60 px-1.5 py-1 rounded border border-white/10 truncate">
                <span className="text-neutral-500 block text-[7.5px]">ASPECT</span>
                {detectedDevice.aspectRatio}
              </div>
              <div className="bg-black/60 px-1.5 py-1 rounded border border-white/10 truncate">
                <span className="text-neutral-500 block text-[7.5px]">SUBPIXEL DPR</span>
                {detectedDevice.dpr}x Raster Scale
              </div>
              <div className="bg-black/60 px-1.5 py-1 rounded border border-white/10 truncate">
                <span className="text-neutral-500 block text-[7.5px]">DESKTOP GRID</span>
                Full-Height Matrix
              </div>
            </div>

            {/* Live streaming line */}
            <div className="mt-1 flex items-center justify-between font-mono text-[8px] sm:text-[8.5px] text-[#39e658] bg-black/80 px-1.5 py-0.5 rounded border border-white/10 truncate">
              <span className="truncate">&gt; {currentLogs[currentLogs.length - 1] || 'Neural probe active...'}</span>
              <span className="text-neutral-500 ml-1 shrink-0">STEP {revealedLogsCount}/{prospects.terminalLogSteps.length}</span>
            </div>
          </div>

          {/* Stage Status & Percentage */}
          <div>
            <div className="flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-bold text-black mb-1">
              <span className="truncate max-w-[80%]">⚙ {stageText}</span>
              <span className="font-mono bg-black text-[#d8ee57] px-1.5 py-0.2 rounded-xs text-[9.5px] sm:text-[10px]">
                {progress}%
              </span>
            </div>

            {/* Classic Vintage Mac Dithered Progress Bar */}
            <div className="w-full h-4 sm:h-4.5 rounded border-2 border-black bg-white p-0.5 shadow-inner overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-75 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    #d8ee57,
                    #d8ee57 6px,
                    #111111 6px,
                    #111111 12px
                  )`,
                }}
              />
            </div>
          </div>

          {/* System Extensions Marching Across the Bottom */}
          <div className="flex items-center justify-between gap-1 pt-1 border-t border-black/15">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {EXTENSIONS.slice(0, loadedExtCount).map((ext) => (
                <span
                  key={ext.name}
                  className="inline-flex items-center gap-0.5 rounded border border-black bg-white px-1 py-0.2 text-[8px] font-bold text-black shrink-0"
                  title={ext.name}
                >
                  <span>{ext.icon}</span>
                  <span className="truncate max-w-[50px]">{ext.name}</span>
                </span>
              ))}
            </div>
            <span className="text-[8px] font-bold text-black/60 shrink-0">
              {loadedExtCount}/8 EXT
            </span>
          </div>

          {/* Bottom Footnote */}
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] font-semibold text-black/60 pt-1 border-t border-black/10">
            <span>Press ESC or Tap anywhere to enter immediately</span>
            <span className="text-black font-bold">Haris Kumaar © 2026</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

