import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
} from 'lucide-react';
import { retroAudio } from './retro-os';

export interface AnimeStreamItem {
  id: number;
  channel: string;
  title: string;
  character: string;
  description: string;
  url: string;
  year: string;
}

export const SLAM_DUNK_STREAMS: AnimeStreamItem[] = [
  {
    id: 1,
    channel: 'CH 01',
    title: 'Sakuragi Signature Slam Dunk',
    character: 'Hanamichi Sakuragi #10',
    description: 'The iconic powerhouse dunk from the red-haired self-proclaimed basketball genius.',
    url: '/anime/slam-dunk-01.gif',
    year: '1993 · Slam Dunk · Toei',
  },
  {
    id: 2,
    channel: 'CH 02',
    title: 'Rukawa Isolation Dribble',
    character: 'Kaede Rukawa #11',
    description: 'Shohoku\'s freshman superstar executing rapid isolation dribbles.',
    url: '/anime/slam-dunk-02.gif',
    year: '1993 · Slam Dunk · Ep 24',
  },
  {
    id: 3,
    channel: 'CH 03',
    title: 'Miyagi Lightning Crossover',
    character: 'Ryota Miyagi #7',
    description: 'Lightning-fast point guard breaking full-court press defensive traps.',
    url: '/anime/slam-dunk-03.gif',
    year: '1994 · Slam Dunk · Ep 61',
  },
  {
    id: 4,
    channel: 'CH 04',
    title: 'Sakuragi "Tensai" Arrogance',
    character: 'Hanamichi Sakuragi #10',
    description: 'Classic comedic swagger celebrating an unexpected play as Kanagawa\'s #1 genius.',
    url: '/anime/slam-dunk-04.gif',
    year: '1995 · Slam Dunk · Ep 84',
  },
  {
    id: 5,
    channel: 'CH 05',
    title: 'Musashi Miyamoto Blade Strike',
    character: 'Miyamoto Musashi',
    description: 'Takehiko Inoue\'s legendary samurai epic animated in brutal brushwork mastery.',
    url: '/anime/slam-dunk-05.gif',
    year: '1998 · Vagabond · Takehiko Inoue',
  },
  {
    id: 6,
    channel: 'CH 06',
    title: 'Wandering Ronin Duel Stance',
    character: 'Musashi & Sasaki Kojiro',
    description: 'Quiet blade tension before an explosive one-strike samurai duel.',
    url: '/anime/slam-dunk-06.gif',
    year: '2000 · Vagabond · Motion Manga',
  },
  {
    id: 7,
    channel: 'CH 07',
    title: 'Major Motoko Kusanagi Awakes',
    character: 'Major Motoko Kusanagi',
    description: 'Iconic 1995 cyberpunk cinema masterpiece directed by Mamoru Oshii.',
    url: '/anime/slam-dunk-07.gif',
    year: '1995 · Ghost in the Shell · Production I.G',
  },
  {
    id: 8,
    channel: 'CH 08',
    title: 'Section 9 Net Dive & Camo',
    character: 'Major Kusanagi',
    description: 'Thermoptic camouflage rooftop leap diving into the vast digital ocean.',
    url: '/anime/slam-dunk-08.gif',
    year: '1995 · Ghost in the Shell · Section 9',
  },
  {
    id: 9,
    channel: 'CH 09',
    title: 'Mach 5 Hydraulic Jump Jacks',
    character: 'Speed (Go Mifune)',
    description: 'Vintage 1960s anime racing classic activating the Mach 5 auto-jacks at top speed.',
    url: '/anime/slam-dunk-09.gif',
    year: '1967 · Speed Racer · Tatsunoko',
  },
  {
    id: 10,
    channel: 'CH 10',
    title: 'Tetsuwan Atom Rocket Flight',
    character: 'Astro Boy (Atom)',
    description: 'The historic pioneer of Japanese anime rocketing through futuristic skies.',
    url: '/anime/slam-dunk-10.gif',
    year: '1963 · Astro Boy · Osamu Tezuka',
  },
];

export function SlamDunkTvPlayer({
  activeStreamIndex = 0,
  onStreamChange,
  onSyncWallpaper,
}: {
  activeStreamIndex?: number;
  onStreamChange?: (index: number) => void;
  onSyncWallpaper?: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(activeStreamIndex);
  const [isAutoStreaming, setIsAutoStreaming] = useState<boolean>(true);
  const [streamProgress, setStreamProgress] = useState<number>(0);
  const [eightBitShader, setEightBitShader] = useState<boolean>(true);

  // Sync external prop if changed
  useEffect(() => {
    setCurrentIndex(activeStreamIndex);
  }, [activeStreamIndex]);

  // Back-to-Back Streaming Loop (Cycles to next GIF every 5.5 seconds)
  useEffect(() => {
    if (!isAutoStreaming) {
      setStreamProgress(0);
      return;
    }

    const durationMs = 5500;
    const intervalMs = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalMs;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setStreamProgress(pct);

      if (elapsed >= durationMs) {
        elapsed = 0;
        setCurrentIndex((prev) => {
          const next = (prev + 1) % SLAM_DUNK_STREAMS.length;
          if (onStreamChange) onStreamChange(next);
          return next;
        });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isAutoStreaming, onStreamChange]);

  const selectChannel = (index: number) => {
    retroAudio.click();
    setCurrentIndex(index);
    setStreamProgress(0);
    if (onStreamChange) onStreamChange(index);
  };

  const nextChannel = () => {
    retroAudio.click();
    const next = (currentIndex + 1) % SLAM_DUNK_STREAMS.length;
    setCurrentIndex(next);
    setStreamProgress(0);
    if (onStreamChange) onStreamChange(next);
  };

  const prevChannel = () => {
    retroAudio.click();
    const prev = (currentIndex - 1 + SLAM_DUNK_STREAMS.length) % SLAM_DUNK_STREAMS.length;
    setCurrentIndex(prev);
    setStreamProgress(0);
    if (onStreamChange) onStreamChange(prev);
  };

  const currentStream = SLAM_DUNK_STREAMS[currentIndex];

  return (
    <div className="flex flex-col gap-3 font-mono text-[#111111] select-none">
      {/* Top TV Tuner Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-black bg-[#ff6b6b] text-white shadow-[2px_2px_0px_#000]">
            <Tv size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-black">
                Retro Anime TV · 90s Broadcast
              </h3>
              <span className="rounded bg-red-600 text-white px-1.5 py-0.2 text-[9px] font-bold animate-pulse">
                ● LIVE BROADCAST
              </span>
            </div>
            <p className="font-mono text-[10px] sm:text-[11px] text-black/75 font-semibold">
              10 Hand-Drawn Anime Streams: Slam Dunk, Vagabond, Ghost in the Shell, Speed Racer, Astro Boy
            </p>
          </div>
        </div>

        {/* Streaming Speed & Shader Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setEightBitShader(!eightBitShader)}
            className={`inline-flex items-center gap-1 rounded border-2 border-black px-2 py-1 text-[10px] font-bold cursor-pointer shadow-[2px_2px_0px_#000] ${
              eightBitShader ? 'bg-black text-[#d8ee57]' : 'bg-white hover:bg-black/10'
            }`}
          >
            <span>👾 {eightBitShader ? '8-Bit ON' : 'Cel Anime'}</span>
          </button>

          {onSyncWallpaper && (
            <button
              type="button"
              onClick={() => onSyncWallpaper(currentIndex)}
              className="inline-flex items-center gap-1 rounded border-2 border-black bg-[#ffd166] hover:bg-[#ffb703] px-2 py-1 text-[10px] font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
              title="Set current scene as desktop background"
            >
              <span>🖼️ Set Wallpaper</span>
            </button>
          )}
        </div>
      </div>

      {/* Main CRT Television Chassis */}
      <div className="relative rounded border-4 border-black bg-[#262626] p-3 sm:p-4 text-white shadow-[6px_6px_0px_#000000]">
        {/* Antenna & Trinitron Vents */}
        <div className="flex items-center justify-between border-b border-neutral-700 pb-2 mb-3 text-[10px] text-neutral-400 font-bold">
          <span className="flex items-center gap-1">
            <Radio size={12} />
            <span>SONY TRINITRON 1993 · NTSC-J BROADCAST</span>
          </span>
          <span className="text-[#d8ee57]">{currentStream.year}</span>
        </div>

        {/* CRT Screen Display Container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-md border-3 border-black bg-black shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentStream.id}
              src={currentStream.url}
              alt={currentStream.title}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              initial={{ opacity: 0.4, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.4, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className={`absolute inset-0 w-full h-full object-cover ${
                eightBitShader ? 'retro-8bit-screen' : ''
              }`}
              loading="eager"
            />
          </AnimatePresence>

          {/* Scanline & Dither Overlays */}
          {eightBitShader && (
            <>
              <div className="retro-8bit-dither absolute inset-0 pointer-events-none opacity-40" />
              <div className="retro-8bit-scanlines absolute inset-0 pointer-events-none opacity-30" />
            </>
          )}
          <div className="mac-dotted-overlay absolute inset-0 pointer-events-none opacity-50" />

          {/* On-Screen Display (OSD) Channel & Scene Title */}
          <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1">
            <span className="rounded border border-black bg-black/80 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-[#d8ee57] backdrop-blur-sm shadow-[1px_1px_0px_#000]">
              {currentStream.channel} · {currentStream.title}
            </span>
            <span className="rounded border border-black bg-black/80 px-2 py-0.5 text-[9px] font-semibold text-white/90 backdrop-blur-sm max-w-[280px] truncate">
              ★ {currentStream.character}
            </span>
          </div>

          {/* Stream Progress Bar at Bottom of CRT Screen */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
            <div
              className="h-full bg-[#d8ee57] transition-all duration-100 ease-linear"
              style={{ width: `${streamProgress}%` }}
            />
          </div>
        </div>

        {/* TV Knob / Hardware Controls */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-700">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevChannel}
              className="flex items-center gap-1 rounded border-2 border-black bg-white hover:bg-neutral-200 text-black px-2.5 py-1 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
              title="Previous Channel"
            >
              <SkipBack size={12} strokeWidth={2.5} />
              <span>PREV</span>
            </button>

            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                setIsAutoStreaming(!isAutoStreaming);
              }}
              className={`flex items-center gap-1.5 rounded border-2 border-black px-3.5 py-1 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000] transition-colors ${
                isAutoStreaming
                  ? 'bg-[#d8ee57] text-black hover:bg-[#c9df44]'
                  : 'bg-[#ff6b6b] text-white hover:bg-[#fa5252]'
              }`}
            >
              {isAutoStreaming ? <Pause size={12} strokeWidth={2.5} /> : <Play size={12} strokeWidth={2.5} />}
              <span>{isAutoStreaming ? 'STREAMING: AUTO (5s)' : 'STREAM: PAUSED'}</span>
            </button>

            <button
              type="button"
              onClick={nextChannel}
              className="flex items-center gap-1 rounded border-2 border-black bg-white hover:bg-neutral-200 text-black px-2.5 py-1 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
              title="Next Channel"
            >
              <span>NEXT</span>
              <SkipForward size={12} strokeWidth={2.5} />
            </button>
          </div>

          <div className="text-[10px] font-bold text-neutral-400">
            CHANNEL {currentIndex + 1} OF {SLAM_DUNK_STREAMS.length}
          </div>
        </div>
      </div>

      {/* 10 Quick Channel Tuner Buttons (CH 01 to CH 10) */}
      <div className="rounded border-2 border-black bg-white p-3 shadow-[3px_3px_0px_#000]">
        <div className="flex items-center justify-between border-b border-black/15 pb-1 mb-2 text-[10px] font-bold text-black/70">
          <span>10-CHANNEL QUICK TUNER (CLICK TO TUNE IN):</span>
          <span>TOEI ANIMATION 1993—1996</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {SLAM_DUNK_STREAMS.map((stream, idx) => (
            <button
              key={stream.id}
              type="button"
              onClick={() => selectChannel(idx)}
              className={`flex flex-col rounded border border-black p-1.5 text-left cursor-pointer transition-all ${
                currentIndex === idx
                  ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000] scale-[1.02]'
                  : 'bg-[#f4f4f4] text-black hover:bg-[#e4e4e4]'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-bold">
                <span>{stream.channel}</span>
                {currentIndex === idx && <span className="text-[8px] animate-pulse">● ON AIR</span>}
              </div>
              <span className="text-[10px] font-bold truncate mt-0.5">{stream.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Scene Information Footer */}
      <div className="rounded border-2 border-black bg-[#fbf8ee] p-2.5 shadow-[2px_2px_0px_#000] text-xs">
        <div className="font-bold text-black flex items-center gap-1">
          <Sparkles size={12} className="text-amber-500" />
          <span>{currentStream.title} ({currentStream.character})</span>
        </div>
        <p className="text-[11px] text-black/80 font-medium leading-relaxed mt-0.5">
          {currentStream.description}
        </p>
      </div>
    </div>
  );
}
