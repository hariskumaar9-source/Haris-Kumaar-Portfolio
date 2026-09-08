import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Play,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';
import { retroAudio } from './retro-os';

export interface BoardTile {
  index: number;
  label: string;
  type: 'start' | 'normal' | 'ladder-bottom' | 'ladder-top' | 'snake-head' | 'snake-tail' | 'finish';
  targetIndex?: number;
  projectKey?: string;
  projectName?: string;
  liveUrl?: string;
  story: string;
  metric?: string;
}

// 36-Tile (6x6) Portfolio Walkthrough Board
export const BOARD_TILES: Record<number, BoardTile> = {
  1: {
    index: 1,
    label: 'START',
    type: 'start',
    story: '🚀 You start your journey through Haris Kumaar\'s product design studio!',
  },
  2: {
    index: 2,
    label: 'Figma Auto-Layout',
    type: 'normal',
    story: '📐 Mastered responsive auto-layout tokens and fluid typographic scale.',
  },
  3: {
    index: 3,
    label: 'Simpliaxis LMS 🪜',
    type: 'ladder-bottom',
    targetIndex: 14,
    projectKey: 'simpliaxis',
    projectName: 'Simpliaxis Dashboard',
    liveUrl: 'https://simpliaxis.com',
    metric: '+30% User Engagement',
    story: '🪜 LADDER! Shipped Simpliaxis AI learning platform. Climb straight to Tile 14!',
  },
  4: {
    index: 4,
    label: 'Design Tokens',
    type: 'normal',
    story: '🎨 Built atomic color systems and WCAG 2.1 AAA accessibility contrast matrices.',
  },
  5: {
    index: 5,
    label: 'Sprint Planning',
    type: 'snake-tail',
    story: '📝 Back to basics: Sprint retro and component taxonomy documentation.',
  },
  6: {
    index: 6,
    label: 'User Personas',
    type: 'normal',
    story: '👥 Mapped 5 distinct enterprise buyer & student cohort user journey flows.',
  },
  7: {
    index: 7,
    label: 'Micro-Interactions',
    type: 'normal',
    story: '✨ Crafted 60fps retro haptic button states and animated dialog transitions.',
  },
  8: {
    index: 8,
    label: 'Vamvora Cloud & AI 🪜',
    type: 'ladder-bottom',
    targetIndex: 22,
    projectKey: 'vamvora',
    projectName: 'Vamvora Technologies Cloud & AI',
    liveUrl: 'https://vamvoratech.com',
    metric: '+68% B2B Leads & 99.9% Migration Uptime',
    story: '🪜 LADDER! Enterprise Google & Microsoft Workspace migration deployed with zero downtime. Climb up to Tile 22!',
  },
  9: {
    index: 9,
    label: 'Wireframe Testing',
    type: 'normal',
    story: '🔍 Conducted rapid 5-second brand perception tests on high-fidelity wireframes.',
  },
  10: {
    index: 10,
    label: 'Re-aligning Layout',
    type: 'snake-tail',
    story: '📐 Refining grid rhythm after client requested layout adjustments.',
  },
  11: {
    index: 11,
    label: 'Heuristic Review',
    type: 'normal',
    story: '📋 Audited system usability against Nielsen Norman 10 usability heuristics.',
  },
  12: {
    index: 12,
    label: 'Token Desync 🐍',
    type: 'snake-head',
    targetIndex: 5,
    story: '🐍 SNAKE BITE! Figma design tokens desynced before demo. Slide back to Tile 5!',
  },
  13: {
    index: 13,
    label: 'Kanavulabs Cohort',
    type: 'normal',
    story: '💼 Led product design initiatives and student platform interfaces.',
  },
  14: {
    index: 14,
    label: 'Simpliaxis Milestone ★',
    type: 'ladder-top',
    projectKey: 'simpliaxis',
    projectName: 'Simpliaxis Dashboard',
    liveUrl: 'https://simpliaxis.com',
    story: '🎉 You landed on the Simpliaxis Milestone! 30% boost in user retention verified.',
  },
  15: {
    index: 15,
    label: 'Scope Creep Triage',
    type: 'snake-tail',
    story: '🛡️ Reprioritizing MVP backlog with engineering leads to hit ship date.',
  },
  16: {
    index: 16,
    label: 'Sowbhagya Livora',
    type: 'normal',
    projectKey: 'sowbhagya',
    projectName: 'Sowbhagya Livora Luxury Interiors',
    liveUrl: 'https://sowbhagyalivora.com',
    story: '🛋️ Editorial typography & luxury spatial showroom experience for elite architects.',
  },
  17: {
    index: 17,
    label: 'IIT Bhuvaneshwar 🪜',
    type: 'ladder-bottom',
    targetIndex: 29,
    metric: 'Grade: 8/10 (UI/UX Certification)',
    story: '🪜 LADDER! Academic rigor at IIT Bhuvaneshwar! Climb straight to Tile 29!',
  },
  18: {
    index: 18,
    label: 'Accessibility Audit',
    type: 'normal',
    story: '♿ Screen-reader friendly DOM landmarks, ARIA live tags, and focus-ring states.',
  },
  19: {
    index: 19,
    label: 'Big Logo Request 🐍',
    type: 'snake-head',
    targetIndex: 10,
    story: '🐍 SNAKE BITE! Client: "Make the logo 500% bigger!" Slide down to Tile 10.',
  },
  20: {
    index: 20,
    label: 'Healora Health 🪜',
    type: 'ladder-bottom',
    targetIndex: 33,
    projectKey: 'healora',
    projectName: 'Healora Healthcare Solutions',
    liveUrl: 'https://healora.health',
    metric: '+40% Conversion (45 Days)',
    story: '🪜 LADDER! Patient booking flow scaled 40% conversion! Climb up to Tile 33!',
  },
  21: {
    index: 21,
    label: 'Design System Ops',
    type: 'normal',
    story: '⚙️ Synchronized 140+ Tailwind CSS tokens into an enterprise component library.',
  },
  22: {
    index: 22,
    label: 'Vamvora Milestone ★',
    type: 'ladder-top',
    projectKey: 'vamvora',
    projectName: 'Vamvora Technologies Cloud & AI',
    liveUrl: 'https://vamvoratech.com',
    story: '🛡️ Vamvora Live! Enterprise AI & zero-trust cloud architecture delivering +68% B2B client inquiries.',
  },
  23: {
    index: 23,
    label: 'API Headers Hotfix',
    type: 'snake-tail',
    story: '🔧 Patched staging CORS headers and returned to peak operational velocity.',
  },
  24: {
    index: 24,
    label: 'Calli Survey AI',
    type: 'normal',
    projectKey: 'calli',
    projectName: 'Calli Survey AI',
    liveUrl: 'https://callisurvey.ai',
    metric: '94% Survey Completion Rate',
    story: '📊 Conversational survey engine cutting respondent abandonment by 35%.',
  },
  25: {
    index: 25,
    label: 'EMPOVR Spatial 3D',
    type: 'normal',
    projectKey: 'empovr',
    projectName: 'EMPOVR VR Spatial Learning',
    liveUrl: 'https://empovr.app',
    story: '🥽 3D spatial interface nodes for immersive spatial learning environments.',
  },
  26: {
    index: 26,
    label: 'Solarix CleanTech 🪜',
    type: 'ladder-bottom',
    targetIndex: 35,
    projectKey: 'solarix',
    projectName: 'Solarix Energy Solutions',
    liveUrl: 'https://solarix.energy',
    metric: '90% Bill Reduction / 20+ Homes',
    story: '🪜 LADDER! Rooftop solar quote calculator launched! Climb all the way to Tile 35!',
  },
  27: {
    index: 27,
    label: 'Riff Generative Audio',
    type: 'normal',
    projectKey: 'riff',
    projectName: 'Riff Generative Audio Synthesizer',
    liveUrl: 'https://riffmusic.app',
    story: '🎵 Web Audio synthesizer turning musical concepts into real-time soundscapes.',
  },
  28: {
    index: 28,
    label: 'Scope Creep 🐍',
    type: 'snake-head',
    targetIndex: 15,
    story: '🐍 SNAKE BITE! 12 new feature requests dropped into sprint 1! Slide back to Tile 15.',
  },
  29: {
    index: 29,
    label: 'IIT Milestone ★',
    type: 'ladder-top',
    story: '🎓 Certified UX Specialist from IIT Bhuvaneshwar (8/10 Grade achieved)!',
  },
  30: {
    index: 30,
    label: 'ARVIX Academy Hub',
    type: 'normal',
    projectKey: 'arvix',
    projectName: 'ARVIX Cohort Learning',
    liveUrl: 'https://arvix.edu',
    story: '💻 Skill 4.0 cohort dashboard connecting students to live mentor sessions.',
  },
  31: {
    index: 31,
    label: 'DigiXcare Diagnostics',
    type: 'normal',
    projectKey: 'digixcare',
    projectName: 'DigiXcare AI Diagnostics',
    liveUrl: 'https://digixcare.health',
    story: '🩻 Diagnostic radiogram classification interface for frontline health workers.',
  },
  32: {
    index: 32,
    label: 'Zero-Latency Pipeline',
    type: 'normal',
    story: '⚡ Sub-50ms React rendering pipeline with Framer Motion and pixel dithering.',
  },
  33: {
    index: 33,
    label: 'Healora Milestone ★',
    type: 'ladder-top',
    projectKey: 'healora',
    projectName: 'Healora Healthcare',
    liveUrl: 'https://healora.health',
    story: '🩺 Healora Telehealth deployed! Patient conversion escalated by +40%.',
  },
  34: {
    index: 34,
    label: 'Staging 2AM CORS 🐍',
    type: 'snake-head',
    targetIndex: 23,
    story: '🐍 SNAKE BITE! CORS error on production staging at 2 AM! Slide back to Tile 23.',
  },
  35: {
    index: 35,
    label: 'Solarix Milestone ★',
    type: 'ladder-top',
    projectKey: 'solarix',
    projectName: 'Solarix CleanTech',
    liveUrl: 'https://solarix.energy',
    story: '☀️ Clean solar quoting live! 20+ residential homes electrified with 90% savings.',
  },
  36: {
    index: 36,
    label: 'HIRED! SENIOR UX LEAD ★',
    type: 'finish',
    story: '🏆 VICTORY! You walked through Haris Kumaar\'s full career. Ready to collaborate!',
  },
};

export function SnakeLadderGame({
  onOpenCaseStudy,
  onOpenBrief,
}: {
  onOpenCaseStudy: (key: string) => void;
  onOpenBrief: () => void;
}) {
  const [playerPosition, setPlayerPosition] = useState<number>(1);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [turnCount, setTurnCount] = useState<number>(0);
  const [eventMessage, setEventMessage] = useState<string>(
    '🎲 Roll the 8-bit dice to walk through Haris Kumaar\'s case studies & design milestones!'
  );
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Play a retro synth beep for moves
  const playMoveBeep = (freq: number = 440) => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  };

  // Play fanfare when victory reached
  const playVictoryFanfare = () => {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.1, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.35);
      });
    } catch {}
  };

  // Roll the dice and advance
  const rollDice = () => {
    if (isRolling || gameWon) return;
    setIsRolling(true);
    retroAudio.click();

    let rollTicks = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      playMoveBeep(300 + rollTicks * 40);
      rollTicks++;

      if (rollTicks > 8) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        setIsRolling(false);
        setTurnCount((prev) => prev + 1);

        // Calculate target
        const nextPos = Math.min(36, playerPosition + finalRoll);
        setPlayerPosition(nextPos);
        playMoveBeep(520);

        const targetTile = BOARD_TILES[nextPos];

        // Check Ladder or Snake
        if (targetTile.type === 'ladder-bottom' && targetTile.targetIndex) {
          setTimeout(() => {
            playMoveBeep(780);
            setPlayerPosition(targetTile.targetIndex!);
            setEventMessage(
              `🪜 LADDER CLIMB! ${targetTile.story} ➔ Reached Tile ${targetTile.targetIndex}!`
            );
          }, 600);
        } else if (targetTile.type === 'snake-head' && targetTile.targetIndex) {
          setTimeout(() => {
            playMoveBeep(220);
            setPlayerPosition(targetTile.targetIndex!);
            setEventMessage(
              `🐍 SNAKE SLIDE! ${targetTile.story} ➔ Fell back to Tile ${targetTile.targetIndex}.`
            );
          }, 600);
        } else {
          setEventMessage(targetTile.story);
        }

        // Check Victory
        if (nextPos === 36 || targetTile.targetIndex === 36) {
          setGameWon(true);
          setAutoPlay(false);
          playVictoryFanfare();
        }
      }
    }, 60);
  };

  // Auto-play loop for busy clients
  useEffect(() => {
    if (autoPlay && !gameWon && !isRolling) {
      autoPlayTimer.current = setTimeout(() => {
        rollDice();
      }, 1400);
    }
    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [autoPlay, gameWon, isRolling, playerPosition]);

  // Restart Game
  const restartGame = () => {
    retroAudio.click();
    setPlayerPosition(1);
    setDiceValue(1);
    setTurnCount(0);
    setGameWon(false);
    setAutoPlay(false);
    setEventMessage('🎲 Game reset. Ready for a new walkthrough climb!');
  };

  const currentTile = BOARD_TILES[playerPosition] || BOARD_TILES[1];

  // Generate 6x6 grid in traditional snake-turn order (Row 6 at top, Row 1 at bottom)
  // Rows alternate left-to-right and right-to-left
  const gridRows: number[][] = [];
  for (let r = 5; r >= 0; r--) {
    const row: number[] = [];
    const isEvenRowFromBottom = (5 - r) % 2 === 1;
    for (let c = 0; c < 6; c++) {
      const idx = isEvenRowFromBottom ? (5 - r) * 6 + (6 - c) : (5 - r) * 6 + (c + 1);
      row.push(idx);
    }
    gridRows.push(row);
  }

  return (
    <div className="flex flex-col gap-3 font-mono text-[#111111] select-none">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-black bg-[#d8ee57] shadow-[2px_2px_0px_#000]">
            <span className="text-base font-bold">🎲</span>
          </div>
          <div>
            <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-black flex items-center gap-1.5">
              <span>Snakes &amp; Ladders: Portfolio Climb</span>
              <span className="rounded bg-black text-[#d8ee57] px-1.5 py-0.2 text-[9px] font-bold">v1.0</span>
            </h3>
            <p className="font-mono text-[10px] sm:text-[11px] text-black/75 font-semibold">
              Walk through Haris Kumaar's case studies, UX breakthroughs &amp; engineering hurdles
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoPlay(!autoPlay)}
            className={`inline-flex items-center gap-1 rounded border-2 border-black px-2.5 py-1 text-[10px] font-bold cursor-pointer shadow-[2px_2px_0px_#000] transition-colors ${
              autoPlay ? 'bg-amber-400 text-black animate-pulse' : 'bg-white hover:bg-black hover:text-white'
            }`}
            title="Auto-Play Walkthrough"
          >
            <span>{autoPlay ? '⏸ Pause Auto' : '▶ Auto Tour'}</span>
          </button>

          <button
            type="button"
            onClick={restartGame}
            className="inline-flex items-center gap-1 rounded border-2 border-black bg-white hover:bg-black hover:text-white px-2 py-1 text-[10px] font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
            title="Restart Game"
          >
            <RotateCcw size={12} strokeWidth={2.5} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Play Area: 6x6 Board + Side Controller HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* 6x6 Pixel Game Board (8 cols on desktop) */}
        <div className="lg:col-span-8 rounded border-4 border-black bg-[#faf6ee] p-1.5 sm:p-2 shadow-[4px_4px_0px_#000000]">
          <div className="grid grid-cols-6 gap-1 sm:gap-1.5 aspect-square">
            {gridRows.flat().map((tileIdx) => {
              const tile = BOARD_TILES[tileIdx];
              const isPlayerHere = playerPosition === tileIdx;
              const isLadder = tile.type === 'ladder-bottom';
              const isSnake = tile.type === 'snake-head';
              const isFinish = tile.type === 'finish';
              const isProject = Boolean(tile.projectKey);

              let bgColor = 'bg-white';
              if (isFinish) bgColor = 'bg-[#ffd166]';
              else if (isLadder) bgColor = 'bg-[#e2f0d9]';
              else if (isSnake) bgColor = 'bg-[#fed8d8]';
              else if (tileIdx % 2 === 0) bgColor = 'bg-[#f4efe4]';

              return (
                <div
                  key={tileIdx}
                  onClick={() => {
                    if (tile.projectKey) {
                      onOpenCaseStudy(tile.projectKey);
                    }
                  }}
                  className={`relative flex flex-col justify-between rounded border-2 border-black p-1 transition-all overflow-hidden ${bgColor} ${
                    isPlayerHere ? 'ring-3 ring-black ring-offset-1 z-20' : ''
                  } ${isProject ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                  title={`${tile.index}: ${tile.label}`}
                >
                  {/* Tile Number Badge */}
                  <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] font-bold text-black/75">
                    <span>{tileIdx}</span>
                    {isLadder && <span className="text-emerald-700 text-[11px]">🪜</span>}
                    {isSnake && <span className="text-rose-700 text-[11px]">🐍</span>}
                    {isFinish && <span className="text-amber-700 text-[11px]">🏆</span>}
                  </div>

                  {/* Tile Content Label */}
                  <div className="text-[8px] sm:text-[9px] font-bold leading-tight line-clamp-2 text-black my-auto">
                    {tile.label}
                  </div>

                  {/* Player Avatar Pawn Indicator */}
                  {isPlayerHere && (
                    <motion.div
                      layoutId="player-pawn"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 pointer-events-none"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg sm:text-2xl animate-bounce">👾</span>
                        <span className="rounded bg-[#d8ee57] border border-black px-1 text-[8px] font-bold text-black shadow-[1px_1px_0px_#000]">
                          YOU
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Controller HUD (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
          {/* Dice & Turn Control Card */}
          <div className="rounded border-2 border-black bg-white p-3 shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-between border-b border-black/15 pb-1.5 mb-2">
              <span className="text-[11px] font-bold text-black">CONTROLLER HUD</span>
              <span className="text-[10px] font-bold text-black/70">TURN: #{turnCount}</span>
            </div>

            {/* Interactive 3D/8-Bit Dice */}
            <div className="flex items-center justify-around py-2">
              <motion.div
                animate={isRolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
                className="flex h-14 w-14 items-center justify-center rounded-lg border-3 border-black bg-[#fafafa] shadow-[3px_3px_0px_#000000]"
              >
                {/* Dice Pip Faces */}
                <div className="grid grid-cols-3 gap-1 p-1.5 w-full h-full">
                  {diceValue === 1 && (
                    <div className="col-start-2 row-start-2 h-2.5 w-2.5 rounded-full bg-black mx-auto my-auto" />
                  )}
                  {diceValue === 2 && (
                    <>
                      <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-black" />
                      <div className="col-start-3 row-start-3 h-2 w-2 rounded-full bg-black ml-auto mt-auto" />
                    </>
                  )}
                  {diceValue === 3 && (
                    <>
                      <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-black" />
                      <div className="col-start-2 row-start-2 h-2 w-2 rounded-full bg-black mx-auto my-auto" />
                      <div className="col-start-3 row-start-3 h-2 w-2 rounded-full bg-black ml-auto mt-auto" />
                    </>
                  )}
                  {diceValue === 4 && (
                    <>
                      <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-black" />
                      <div className="col-start-3 row-start-1 h-2 w-2 rounded-full bg-black ml-auto" />
                      <div className="col-start-1 row-start-3 h-2 w-2 rounded-full bg-black mt-auto" />
                      <div className="col-start-3 row-start-3 h-2 w-2 rounded-full bg-black ml-auto mt-auto" />
                    </>
                  )}
                  {diceValue === 5 && (
                    <>
                      <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-black" />
                      <div className="col-start-3 row-start-1 h-2 w-2 rounded-full bg-black ml-auto" />
                      <div className="col-start-2 row-start-2 h-2 w-2 rounded-full bg-black mx-auto my-auto" />
                      <div className="col-start-1 row-start-3 h-2 w-2 rounded-full bg-black mt-auto" />
                      <div className="col-start-3 row-start-3 h-2 w-2 rounded-full bg-black ml-auto mt-auto" />
                    </>
                  )}
                  {diceValue === 6 && (
                    <>
                      <div className="col-start-1 row-start-1 h-2 w-2 rounded-full bg-black" />
                      <div className="col-start-3 row-start-1 h-2 w-2 rounded-full bg-black ml-auto" />
                      <div className="col-start-1 row-start-2 h-2 w-2 rounded-full bg-black my-auto" />
                      <div className="col-start-3 row-start-2 h-2 w-2 rounded-full bg-black ml-auto my-auto" />
                      <div className="col-start-1 row-start-3 h-2 w-2 rounded-full bg-black mt-auto" />
                      <div className="col-start-3 row-start-3 h-2 w-2 rounded-full bg-black ml-auto mt-auto" />
                    </>
                  )}
                </div>
              </motion.div>

              {/* Roll Trigger Button */}
              <button
                type="button"
                disabled={isRolling || gameWon}
                onClick={rollDice}
                className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-[#d8ee57] hover:bg-[#c9df44] disabled:bg-gray-200 px-4 py-2.5 text-xs font-bold text-black cursor-pointer shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>{isRolling ? 'ROLLING...' : 'ROLL DICE (1-6)'}</span>
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Current Position Pill */}
            <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-black/80 pt-1.5 border-t border-black/10">
              <span>CURRENT POSITION:</span>
              <span className="rounded bg-black text-[#d8ee57] px-2 py-0.5 font-mono">
                Tile {playerPosition} of 36
              </span>
            </div>
          </div>

          {/* Active Story & Event Card */}
          <div className="flex-1 rounded border-2 border-black bg-[#fbf8ee] p-3 shadow-[3px_3px_0px_#000] flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-black/70 border-b border-black/15 pb-1 mb-1.5">
                <span>EVENT LOG:</span>
                <span className="truncate">{currentTile.label}</span>
              </div>
              <p className="text-xs leading-relaxed font-medium text-black">
                {eventMessage}
              </p>

              {currentTile.metric && (
                <div className="mt-2 inline-flex items-center gap-1 rounded border border-black bg-[#d8ee57] px-2 py-0.5 text-[10px] font-bold text-black shadow-[1px_1px_0px_#000]">
                  <span>★ METRIC:</span>
                  <span>{currentTile.metric}</span>
                </div>
              )}
            </div>

            {/* If tile has an associated project, provide 1-click Inspect / Live Site buttons */}
            {currentTile.projectKey && (
              <div className="mt-2 pt-2 border-t border-black/15 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(currentTile.projectKey!)}
                  className="inline-flex items-center gap-1 rounded border border-black bg-black text-[#d8ee57] hover:bg-[#222] px-2 py-1 text-[10px] font-bold cursor-pointer shadow-[1px_1px_0px_#000]"
                >
                  <span>INSPECT CASE STUDY</span>
                  <Maximize2 size={10} strokeWidth={2.5} />
                </button>
                {currentTile.liveUrl && (
                  <a
                    href={currentTile.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => retroAudio.click()}
                    className="inline-flex items-center gap-1 rounded border border-black bg-[#ffd166] hover:bg-[#ffb703] text-black px-2 py-1 text-[10px] font-bold cursor-pointer shadow-[1px_1px_0px_#000]"
                  >
                    <span>LIVE SITE</span>
                    <ExternalLink size={10} strokeWidth={2.5} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Victory Finish Modal / Overlay */}
      {gameWon && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded border-3 border-black bg-[#d8ee57] p-4 text-black shadow-[6px_6px_0px_#000000]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl">🏆</span>
              <div>
                <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight">
                  HIRED! YOU COMPLETED THE PORTFOLIO CLIMB IN {turnCount} TURNS!
                </h4>
                <p className="text-xs font-semibold text-black/80 mt-0.5">
                  Haris Kumaar is primed and ready to craft high-impact UX for your next project.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  retroAudio.click();
                  onOpenBrief();
                }}
                className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-black text-[#d8ee57] hover:bg-[#222] px-3.5 py-2 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <span>DISCUSS PROJECT BRIEF</span>
                <Sparkles size={12} />
              </button>
              <button
                type="button"
                onClick={restartGame}
                className="inline-flex items-center gap-1 rounded border-2 border-black bg-white hover:bg-black hover:text-white px-2.5 py-2 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <span>Play Again</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
