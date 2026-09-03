import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  Folder,
  FileText,
  Terminal,
  Mail,
  Trash2,
  HardDrive,
  Sparkles,
  Volume2,
  VolumeX,
  Tv,
  Maximize2,
  Minus,
  X,
  Clock,
  Layers,
  Wrench,
  Disc3,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

// Web Audio API Retro Sound Generator (No external files needed)
class RetroAudio {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {}

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public click() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public windowOpen() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {}
  }

  public windowClose() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {}
  }

  public error() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(140, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }
}

export const retroAudio = new RetroAudio();

// Retro Macintosh Top Menu Bar
export function MacMenuBar({
  onOpenWindow,
  crtEnabled,
  onToggleCrt,
  soundEnabled,
  onToggleSound,
  dark,
  onToggleTheme,
  animeEnabled,
  onToggleAnime,
  lowLatency,
  onToggleLowLatency,
  eightBit,
  onToggleEightBit,
  bezelEnabled,
  onToggleBezel,
  bgmPlaying,
  onToggleBgm,
}: {
  onOpenWindow: (id: string) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  dark: boolean;
  onToggleTheme: () => void;
  animeEnabled?: boolean;
  onToggleAnime?: () => void;
  lowLatency?: boolean;
  onToggleLowLatency?: () => void;
  eightBit?: boolean;
  onToggleEightBit?: () => void;
  bezelEnabled?: boolean;
  onToggleBezel?: () => void;
  bgmPlaying?: boolean;
  onToggleBgm?: () => void;
}) {
  const [time, setTime] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
      setTime(`${formattedHours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menus = [
    {
      id: 'apple',
      label: '',
      items: [
        { label: 'About HarisOS 7.5', action: () => onOpenWindow('about') },
        { label: 'Selected Work', action: () => onOpenWindow('work') },
        { label: 'Work Experience', action: () => onOpenWindow('experience') },
        { label: 'Toolkit & Skills', action: () => onOpenWindow('skills') },
        { label: 'Contact Desk', action: () => onOpenWindow('contact') },
        { label: 'Discuss Project Brief', action: () => onOpenWindow('project-modal') },
      ],
    },
    {
      id: 'file',
      label: 'File',
      items: [
        { label: 'Open Work Showcase', action: () => onOpenWindow('work') },
        { label: 'Open Experience Log', action: () => onOpenWindow('experience') },
        { label: 'Open Contact Desk', action: () => onOpenWindow('contact') },
        { label: 'View Resume Info', action: () => onOpenWindow('about') },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        { label: bgmPlaying ? '✓ 🎵 Kanye - Stronger (8-Bit BGM: ON)' : '🎵 Kanye - Stronger (8-Bit BGM: OFF)', action: () => onToggleBgm && onToggleBgm() },
        { label: bezelEnabled ? '✓ Vintage Mac Monitor Bezel (ON)' : '🖥 Vintage Mac Monitor Bezel (OFF)', action: () => onToggleBezel && onToggleBezel() },
        { label: eightBit ? '✓ 8-Bit Retro Anime Shader (ON)' : '👾 8-Bit Retro Anime Shader (OFF)', action: () => onToggleEightBit && onToggleEightBit() },
        { label: lowLatency ? '✓ Zero-Latency Eco Mode (ACTIVE)' : '⚡ Zero-Latency Eco Mode (Fast)', action: () => onToggleLowLatency && onToggleLowLatency() },
        { label: animeEnabled ? '✓ 80s Slam Dunk Anime Loop (ON)' : '80s Slam Dunk Anime Loop (OFF)', action: () => onToggleAnime && onToggleAnime() },
        { label: crtEnabled ? '✓ CRT Scanlines (ON)' : 'CRT Scanlines (OFF)', action: onToggleCrt },
        { label: soundEnabled ? '✓ System Audio (ON)' : 'System Audio (OFF)', action: onToggleSound },
        { label: dark ? 'Switch to Classic Light Mac' : 'Switch to Dark Mac', action: onToggleTheme },
      ],
    },
    {
      id: 'special',
      label: 'Special',
      items: [
        { label: bgmPlaying ? '✓ Pause 8-Bit "Stronger" (Kanye West)' : '▶ Play 8-Bit "Stronger" (Kanye West)', action: () => onToggleBgm && onToggleBgm() },
        { label: 'Clean Up Desktop', action: () => { window.location.hash = '#top'; } },
        { label: 'Restart HarisOS', action: () => window.location.reload() },
        { label: 'Empty Trash', action: () => onOpenWindow('trash') },
      ],
    },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 z-40 flex h-8 items-center justify-between border-b-2 border-black bg-[#f0f0f0] px-2 sm:px-3 font-mono text-[12px] text-black shadow-sm select-none">
      <div className="flex items-center gap-0.5 sm:gap-1.5">
        {menus.map((menu) => (
          <div key={menu.id} className="relative">
            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                setActiveMenu(activeMenu === menu.id ? null : menu.id);
              }}
              onMouseEnter={() => {
                if (activeMenu) setActiveMenu(menu.id);
              }}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 font-bold transition-colors cursor-pointer text-[11px] sm:text-[12px] ${
                activeMenu === menu.id ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
              }`}
            >
              {menu.label}
            </button>
            {activeMenu === menu.id && (
              <div
                className="absolute left-0 top-7 z-50 min-w-[240px] border-2 border-black bg-[#f5f5f5] py-1 shadow-[4px_4px_0px_#000000]"
                onMouseLeave={() => setActiveMenu(null)}
              >
                {menu.items.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      retroAudio.click();
                      item.action();
                      setActiveMenu(null);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-[11px] font-semibold text-black hover:bg-black hover:text-white cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="hidden items-center gap-2 pl-4 text-[11px] font-semibold text-black/85 md:flex">
          <span className="font-bold text-black">Haris Kumaar</span>
          <span>/</span>
          <span>AI-Integrated UX &amp; Product Design</span>
        </div>
      </div>

      {/* Right controls - fully responsive & compact on mobile */}
      <div className="flex items-center gap-1 sm:gap-2.5 font-mono text-[10px] sm:text-[11px]">

        {/* Low-Latency Eco Mode Toggle */}
        {onToggleLowLatency && (
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              onToggleLowLatency();
            }}
            title="Toggle Low-Latency Eco Mode (For Low-Spec Devices)"
            className={`hidden lg:flex items-center gap-1 rounded-sm border border-black px-1.5 py-0.5 text-[10px] font-bold cursor-pointer ${
              lowLatency ? 'bg-[#d8ee57] text-black' : 'bg-[#e0e0e0] text-black hover:bg-black hover:text-white'
            }`}
          >
            <span>⚡ {lowLatency ? 'Eco ON' : 'Eco'}</span>
          </button>
        )}

        {onToggleAnime && (
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              onToggleAnime();
            }}
            title="Toggle 80s Retro Anime (Slam Dunk) Background Loop"
            className={`flex items-center gap-1 rounded-sm border border-black px-1.5 sm:px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
              animeEnabled ? 'bg-black text-[#d8ee57]' : 'bg-[#e0e0e0] text-black hover:bg-black hover:text-white'
            }`}
          >
            <span>🏀</span>
            <span className="hidden sm:inline">Slam Dunk</span>
          </button>
        )}

        {onToggleEightBit && animeEnabled && (
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              onToggleEightBit();
            }}
            title="Toggle 8-Bit Retro Pixelated Anime Shader"
            className={`flex items-center gap-1 rounded-sm border border-black px-1.5 sm:px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
              eightBit ? 'bg-black text-[#d8ee57]' : 'bg-[#e0e0e0] text-black hover:bg-black hover:text-white'
            }`}
          >
            <span>👾</span>
            <span className="hidden sm:inline">8-Bit</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            retroAudio.click();
            onToggleCrt();
          }}
          title="Toggle CRT Screen Tube Effect"
          className={`flex items-center gap-0.5 sm:gap-1 rounded-sm border border-black px-1.5 sm:px-2 py-0.5 text-[10px] font-bold cursor-pointer ${
            crtEnabled ? 'bg-black text-[#d8ee57]' : 'bg-[#e0e0e0] text-black hover:bg-black hover:text-white'
          }`}
        >
          <Tv size={11} />
          <span className="hidden sm:inline">CRT {crtEnabled ? 'ON' : 'OFF'}</span>
          <span className="sm:hidden">CRT</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onToggleSound();
            retroAudio.click();
          }}
          title="Toggle Vintage Macintosh Audio"
          className="flex items-center gap-1 rounded-sm border border-black bg-[#e0e0e0] px-1.5 sm:px-2 py-0.5 text-[10px] font-bold hover:bg-black hover:text-white cursor-pointer text-black"
        >
          {soundEnabled ? <Volume2 size={11} /> : <VolumeX size={11} />}
          <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
        </button>

        {/* 8-Bit Kanye West - Stronger BGM Audio Toggle */}
        {onToggleBgm && (
          <button
            type="button"
            onClick={() => {
              retroAudio.click();
              onToggleBgm();
            }}
            title="Play / Stop 8-Bit Hip Hop: Kanye West - Stronger"
            className={`mac-button flex items-center gap-1 rounded-sm border border-black px-1.5 sm:px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
              bgmPlaying ? 'bg-black text-[#d8ee57]' : 'bg-[#e0e0e0] text-black hover:bg-black hover:text-white'
            }`}
          >
            <span>{bgmPlaying ? '🔊' : '🎵'}</span>
            <span className="font-bold">
              {bgmPlaying ? 'Stronger [ON]' : 'Stronger'}
            </span>
            {bgmPlaying && (
              <span className="hidden md:inline-flex items-center text-[9px] font-pixel text-[#d8ee57] animate-pulse">
                ♫ ▂▃▅
              </span>
            )}
          </button>
        )}

        <div className="flex items-center gap-1 font-bold text-[10px] sm:text-[12px] text-black pl-0.5 sm:pl-1">
          <Clock size={11} className="hidden sm:inline" />
          <span>{time || '12:00 PM'}</span>
        </div>
      </div>
    </div>
  );
}

// Retro Desktop Icon with Bouncy Physics
export function DesktopIcon({
  id,
  title,
  icon,
  onClick,
  isSelected,
}: {
  id: string;
  title: string;
  icon: 'folder' | 'document' | 'terminal' | 'mail' | 'trash' | 'harddrive' | 'sparkles';
  onClick: () => void;
  isSelected?: boolean;
}) {
  const getIcon = () => {
    switch (icon) {
      case 'folder':
        return <Folder size={36} strokeWidth={2} className="fill-[#ffea88] text-[#111111]" />;
      case 'document':
        return <FileText size={36} strokeWidth={2} className="fill-[#f5f5f5] text-[#111111]" />;
      case 'terminal':
        return <Terminal size={36} strokeWidth={2} className="fill-[#222222] text-[#78ff88]" />;
      case 'mail':
        return <Mail size={36} strokeWidth={2} className="fill-[#d4e4ff] text-[#111111]" />;
      case 'trash':
        return <Trash2 size={36} strokeWidth={2} className="fill-[#e8e8e8] text-[#111111]" />;
      case 'harddrive':
        return <HardDrive size={36} strokeWidth={2} className="fill-[#c8c8c8] text-[#111111]" />;
      case 'sparkles':
        return <Sparkles size={36} strokeWidth={2} className="fill-[#d8ee57] text-[#111111]" />;
      default:
        return <Folder size={36} strokeWidth={2} className="fill-[#ffea88] text-[#111111]" />;
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      onClick={() => {
        retroAudio.click();
        onClick();
      }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
      className="group flex flex-col items-center justify-center p-1.5 text-center select-none cursor-grab active:cursor-grabbing focus:outline-none"
    >
      <div className="relative mb-1 flex h-12 w-12 items-center justify-center rounded transition-transform group-hover:-translate-y-0.5 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.7)]">
        {getIcon()}
      </div>
      <span
        className={`px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold leading-tight max-w-[100px] break-words border-2 border-black ${
          isSelected
            ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000000]'
            : 'bg-white text-black shadow-[2px_2px_0px_rgba(0,0,0,0.85)] group-hover:bg-black group-hover:text-white'
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
}

// Bouncy Retro Macintosh Window with Dynamic Adaptive Mobile Positioning
// Bouncy Retro Macintosh Window with Authentic Freehand Drag
export function MacWindow({
  id,
  title,
  isOpen,
  onClose,
  zIndex,
  onFocus,
  defaultPos = { x: 40, y: 50 },
  defaultSize = { width: 720, height: 520 },
  children,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  defaultPos?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const dragControls = useDragControls();

  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const isCompact = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1024;
  const numDefaultWidth = typeof defaultSize.width === 'number' ? defaultSize.width : 720;
  const numDefaultHeight = typeof defaultSize.height === 'number' ? defaultSize.height : 520;

  // Safe starting coordinates for mobile, tablet, desktop
  const initialX = isCompact ? 4 : isTablet ? Math.max(6, Math.min(defaultPos.x, viewport.width - 660)) : Math.max(8, Math.min(defaultPos.x, viewport.width - Math.min(numDefaultWidth, viewport.width - 24)));
  const initialY = isCompact ? 34 : Math.max(34, Math.min(defaultPos.y, viewport.height - 350));
  const responsiveWidth = isCompact ? 'calc(100% - 8px)' : isTablet ? Math.min(numDefaultWidth, viewport.width - 24) : Math.min(numDefaultWidth, viewport.width - 24);
  const responsiveHeight = isCompact ? 'calc(100% - 46px)' : Math.min(numDefaultHeight, viewport.height - 70);

  return (
    <motion.div
      drag={!isCompact && !maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={true}
      dragElastic={0.06}
      dragConstraints={{
        left: -initialX + 6,
        right: Math.max(0, viewport.width - initialX - 100),
        top: -initialY + 34,
        bottom: Math.max(34, viewport.height - initialY - 50),
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.94, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 28,
      }}
      style={{
        zIndex,
        position: 'absolute',
        left: maximized ? 0 : initialX,
        top: maximized ? 32 : initialY,
        width: maximized ? '100%' : responsiveWidth,
        height: maximized ? 'calc(100% - 32px)' : collapsed ? 'auto' : responsiveHeight,
        maxWidth: maximized ? '100%' : isCompact ? 'calc(100% - 8px)' : 'calc(100% - 12px)',
        maxHeight: maximized ? 'calc(100% - 32px)' : isCompact ? 'calc(100% - 46px)' : 'calc(100% - 44px)',
        touchAction: isCompact ? 'pan-y' : 'auto',
        transform: maximized ? 'none' : undefined,
      }}
      className="border-2 border-black bg-[#ededed] text-black mac-window-frame shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] overflow-hidden select-text rounded-none"
    >
      {/* Macintosh Pinstripe Title Bar - ONLY dragging this handle moves the window */}
      <div
        className={`flex h-8 items-center justify-between border-b-2 border-black bg-[#e2e2e2] px-2 select-none ${
          !isCompact && !maximized ? 'cursor-move' : ''
        }`}
        onPointerDown={(e) => {
          onFocus();
          if (!isCompact && !maximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => setMaximized(!maximized)}
      >
        {/* Close Button (Classic Square) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            retroAudio.windowClose();
            onClose();
          }}
          title="Close Window"
          className="flex h-4 w-4 shrink-0 items-center justify-center border-2 border-black bg-white shadow-[1px_1px_0px_#000000] hover:bg-black hover:text-white active:translate-y-px cursor-pointer"
        >
          <X size={10} strokeWidth={3} />
        </button>

        {/* Pinstripe with Title Box */}
        <div className="relative mx-1.5 sm:mx-2 flex flex-1 items-center justify-center h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-3.5 mac-pinstripes" />
          <span className="relative z-10 bg-[#e2e2e2] px-2 sm:px-3.5 font-mono text-[11px] sm:text-[12px] font-bold text-black border-x-2 border-black/50 truncate max-w-[180px] sm:max-w-none">
            {title}
          </span>
        </div>

        {/* Window controls: collapse and zoom */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.click();
              setCollapsed(!collapsed);
            }}
            title="Collapse"
            className="flex h-4 w-4 items-center justify-center border-2 border-black bg-white shadow-[1px_1px_0px_#000000] hover:bg-black hover:text-white active:translate-y-px cursor-pointer"
          >
            <Minus size={10} strokeWidth={3} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              retroAudio.click();
              setMaximized(!maximized);
            }}
            title="Zoom / Maximize"
            className="flex h-4 w-4 items-center justify-center border-2 border-black bg-white shadow-[1px_1px_0px_#000000] hover:bg-black hover:text-white active:translate-y-px cursor-pointer"
          >
            <Maximize2 size={10} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Window Body with Bouncy Spring Scroll - Pure Native Interaction, Never Drags Window */}
      {!collapsed && (
        <div className="h-[calc(100%-32px)] overflow-y-auto mac-scrollbar bg-[#ffffff] p-4 sm:p-7 text-[#111111] overscroll-contain select-text cursor-auto">
          {children}
        </div>
      )}
    </motion.div>
  );
}

// CRT Screen Effects (AWGE Aesthetic)
export function CrtOverlay({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <>
      <div className="crt-scanlines pointer-events-none opacity-30" />
      <div className="crt-vignette pointer-events-none opacity-30" />
    </>
  );
}

// 80s/90s Retro Anime Slam Dunk Background Animated Loop with 8-Bit Pixelation & Macintosh Dotted Overlay
export function SlamDunkBackground({
  enabled = true,
  lowLatency = false,
  eightBit = true,
}: {
  enabled?: boolean;
  lowLatency?: boolean;
  eightBit?: boolean;
}) {
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none will-change-transform">
      {/* High-Performance Looping Video (Paused/Disabled in Low-Latency Eco Mode) */}
      {!lowLatency && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover opacity-30 sm:opacity-35 transition-opacity duration-500 will-change-transform ${
            eightBit ? 'retro-8bit-screen' : 'retro-anime-backdrop'
          }`}
          poster="https://media.tenor.com/5oVACB0JkrUAAAAe/hanamichi-sakuragi.png"
        >
          <source
            src="https://media.tenor.com/5oVACB0JkrUAAAPo/hanamichi-sakuragi.mp4"
            type="video/mp4"
          />
          <source
            src="https://media.tenor.com/5oVACB0JkrUAAAPs/hanamichi-sakuragi.webm"
            type="video/webm"
          />
          <img
            src="https://media1.tenor.com/m/5oVACB0JkrUAAAAC/hanamichi-sakuragi.gif"
            alt="Slam Dunk 80s/90s Anime Loop"
            className={`absolute inset-0 w-full h-full object-cover opacity-35 ${
              eightBit ? 'retro-8bit-screen' : ''
            }`}
            loading="lazy"
          />
        </video>
      )}

      {/* 8-Bit Pixel Dither Matrix Texture */}
      {eightBit && (
        <>
          <div className="retro-8bit-dither absolute inset-0 w-full h-full opacity-60 pointer-events-none" />
          <div className="retro-8bit-scanlines absolute inset-0 w-full h-full opacity-35 pointer-events-none" />
        </>
      )}

      {/* Macintosh Dotted Micro-Grid Halftone Matrix Overlay (Butter-Smooth 0% Latency) */}
      <div className="mac-dotted-overlay absolute inset-0 w-full h-full opacity-70" />

      {/* Dark Macintosh Atmospheric Gradient for pristine text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b2b35]/70 via-transparent to-[#101b22]/80" />
    </div>
  );
}

// Authentic Classic Macintosh CRT Monitor Chassis / Bezel System (Inspired by Areeb Ali's Physical Device Framing)
export function MacintoshBezelFrame({
  children,
  bezelEnabled = true,
  onToggleBezel,
}: {
  children: ReactNode;
  bezelEnabled?: boolean;
  onToggleBezel?: () => void;
}) {
  if (!bezelEnabled) {
    return <div className="fixed inset-0 h-[100dvh] w-[100dvw] overflow-hidden">{children}</div>;
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-[100dvw] bg-[#d9d5cb] border-[5px] sm:border-[10px] md:border-[14px] lg:border-[18px] border-[#b4afa2] shadow-[inset_0_2px_0_rgba(255,255,255,0.7),_inset_0_-3px_0_rgba(0,0,0,0.35)] flex flex-col select-none overflow-hidden transition-all duration-300">
      {/* Top Chassis Ventilation Slats & Recessed Handle */}
      <div className="shrink-0 h-5 sm:h-6 md:h-7 px-2 sm:px-6 flex items-center justify-between bg-[#d9d5cb] border-b border-[#c4bfae]">
        {/* Top Cooling Grille / Slats */}
        <div className="flex items-center gap-1 opacity-70">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1 sm:h-1.5 w-4 sm:w-8 md:w-10 rounded-full bg-[#a8a396] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
          ))}
        </div>

        {/* Recessed Handle Indent */}
        <div className="h-1.5 sm:h-2 w-20 sm:w-36 md:w-44 rounded-full bg-[#9e998b] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)] border-t border-[#c4bfae]" />

        {/* Right Cooling Grille */}
        <div className="flex items-center gap-1 opacity-70">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-1 sm:h-1.5 w-4 sm:w-8 md:w-10 rounded-full bg-[#a8a396] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
          ))}
        </div>
      </div>

      {/* CRT Screen Bezel Aperture - Fills 100% of Screen Edge-to-Edge */}
      <div className="flex-1 w-full relative overflow-hidden rounded-xs sm:rounded-md md:rounded-lg border-2 sm:border-4 md:border-[5px] border-[#36383b] bg-black shadow-[inset_0_4px_16px_rgba(0,0,0,0.95)]">
        {/* Subtle CRT Glass Glare / Vignette Corner Depth */}
        <div className="pointer-events-none absolute inset-0 z-35 rounded-xs sm:rounded-md md:rounded-lg shadow-[inset_0_0_20px_rgba(0,0,0,0.85)]" />
        
        {/* HarisOS Desktop Content Container - ALL SCREEN CONTENT STRICTLY CONFINED HERE */}
        <div className="relative h-full w-full overflow-hidden">
          {children}
        </div>
      </div>

      {/* Bottom Chassis Chin: Apple Rainbow Logo, Macintosh Haris badge, Floppy Slot, Power LED */}
      <div className="shrink-0 h-8 sm:h-9 md:h-11 px-2.5 sm:px-6 flex items-center justify-between bg-[#d9d5cb] border-t border-[#c5c1b5] font-mono select-none">
        {/* Vintage Rainbow Apple Logo & Macintosh Haris typography */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Classic 6-Color Retro Apple Emblem */}
          <div className="flex h-3.5 sm:h-4 md:h-5 w-3 sm:w-3.5 md:w-4 flex-col overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#61bb46]" />
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#fdb827]" />
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#f5821f]" />
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#e03a3e]" />
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#963d97]" />
            <div className="h-[2px] sm:h-[2.6px] md:h-[3.3px] bg-[#009ddc]" />
          </div>

          {/* Embossed Macintosh Title */}
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[11px] sm:text-xs md:text-sm font-bold tracking-tight text-[#423f39] drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
              Macintosh <span className="font-sans font-semibold">Haris</span>
            </span>
            <span className="text-[7px] sm:text-[7.5px] md:text-[8px] font-bold uppercase tracking-widest text-[#736f65] hidden sm:block">
              System 7.5 · 16MHz Edition
            </span>
          </div>
        </div>

        {/* Molded Floppy Drive Slot (Classic 1.44MB SuperDrive) */}
        <div className="hidden md:flex items-center gap-2 rounded border border-[#8a8577] bg-[#a8a396] px-2 sm:px-2.5 py-0.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
          <div className="h-1 w-20 sm:w-24 md:w-28 rounded-xs bg-[#242628] shadow-[inset_0_1px_2px_#000]" />
          <div className="h-2 w-2 rounded-xs bg-[#807b6e] border border-[#555] shadow-xs" title="Eject Disk" />
          <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-wider text-[#38352e]">1.44MB FD</span>
        </div>

        {/* Status & Power Indicators */}
        <div className="flex items-center gap-2 sm:gap-3.5 text-[9px] sm:text-[10px] font-bold text-[#444]">
          {/* Green CRT Power Phosphor LED */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#39e658] border border-[#238a36] shadow-[0_0_6px_#39e658] animate-pulse" />
            <span className="text-[#3c3933] text-[8.5px] sm:text-[9.5px] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">READY</span>
          </div>

          {/* Bezel Toggle */}
          {onToggleBezel && (
            <button
              type="button"
              onClick={onToggleBezel}
              className="mac-button hidden md:inline-flex rounded border border-[#8a8577] bg-[#cfcbbf] px-2 py-0.5 text-[9px] font-bold text-[#333] hover:bg-[#222] hover:text-white cursor-pointer"
              title="Toggle Bezel Frame / Borderless"
            >
              Borderless [⤢]
            </button>
          )}

          {/* Speaker Grille Dots */}
          <div className="hidden lg:grid grid-cols-4 gap-1 opacity-60">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[#6a665a] shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.8)]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
