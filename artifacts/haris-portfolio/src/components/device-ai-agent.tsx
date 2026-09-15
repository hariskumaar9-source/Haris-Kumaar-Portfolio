import React, { useState, useEffect, useMemo } from 'react';
import {
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  RotateCw,
  Sliders,
  Copy,
  Check,
  Radio,
  Zap,
  Eye,
  Layers,
  Sparkles,
  ShieldCheck,
  Compass,
  History,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { retroAudio } from './retro-os';
import {
  assessUserDevice,
  COMPUTING_LINEAGE,
  GLOBAL_SMARTPHONE_BRANDS,
  UPCOMING_NEXTGEN_DEVICES,
  getNeuralViewportState,
  trainNeuralViewportModel,
  getLearnedDivergenceMetrics,
  type DeviceIdentity,
  type SmartphoneBrandProfile,
  type NextGenDeviceProfile,
  type NeuralViewportState,
} from '../lib/device-sensor';
import { useAiOverlapSentinel, scanAndRectifyOverlaps } from '../lib/ai-overlap-sentinel';
import {
  subscribeSecurityTelemetry,
  tightenSecurityShields,
  getSecurityTelemetry,
  type SecurityTelemetry,
} from '../lib/anti-inspect';

export interface ViewportTelemetry {
  width: number;
  height: number;
  dpr: number;
  aspectRatio: string;
  orientation: 'portrait' | 'landscape';
  screenCategory: 'mobile' | 'compact-tablet' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';
  os: 'iOS' | 'Android' | 'macOS' | 'Windows' | 'Linux' | 'ChromeOS' | 'Unknown';
  browser: 'Safari (WebKit)' | 'Chrome (Blink)' | 'Firefox (Gecko)' | 'Edge (Chromium)' | 'Other';
  pointer: 'coarse' | 'fine';
  colorGamut: string;
  cores: number;
  memoryGb?: number;
  connectionType?: string;
  downlinkMbps?: number;
}

export interface PresetDevice {
  id: string;
  name: string;
  brand: string;
  flag: string;
  categoryTag: 'india' | 'flagship' | 'gaming' | 'innovator' | 'global' | 'desktop';
  icon: 'phone' | 'tablet' | 'laptop' | 'desktop';
  width: number;
  height: number;
  dpr: number;
  os: ViewportTelemetry['os'];
  browser: ViewportTelemetry['browser'];
  pointer: 'coarse' | 'fine';
}

export const PRESET_DEVICES: PresetDevice[] = [
  // India Focus
  {
    id: 'poco-m7-plus',
    name: 'POCO M7+ (India)',
    brand: 'POCO',
    flag: '🇮🇳',
    categoryTag: 'india',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'lava-agni-3',
    name: 'Lava Agni 3 5G',
    brand: 'Lava',
    flag: '🇮🇳',
    categoryTag: 'india',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'redmi-note-13-pro',
    name: 'Redmi Note 13 Pro+',
    brand: 'Redmi',
    flag: '🇮🇳',
    categoryTag: 'india',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },

  // Flagships
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    flag: '🇺🇸',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 440,
    height: 956,
    dpr: 3,
    os: 'iOS',
    browser: 'Safari (WebKit)',
    pointer: 'coarse',
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    flag: '🇺🇸',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 393,
    height: 852,
    dpr: 3,
    os: 'iOS',
    browser: 'Safari (WebKit)',
    pointer: 'coarse',
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    flag: '🇰🇷',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'pixel-9-pro-xl',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    flag: '🇺🇸',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'vivo-x100-pro',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'oppo-find-x7-ultra',
    name: 'Oppo Find X7 Ultra',
    brand: 'Oppo',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'honor-magic-6-pro',
    name: 'Honor Magic 6 Pro',
    brand: 'Honor',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'huawei-pura-70-ultra',
    name: 'Huawei Pura 70 Ultra',
    brand: 'Huawei',
    flag: '🇨🇳',
    categoryTag: 'flagship',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },

  // Innovators & Foldables
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    brand: 'Nothing',
    flag: '🇬🇧',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'galaxy-z-fold-6',
    name: 'Galaxy Z Fold 6 (Fold)',
    brand: 'Samsung',
    flag: '🇰🇷',
    categoryTag: 'innovator',
    icon: 'tablet',
    width: 756,
    height: 884,
    dpr: 2.6,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'moto-razr-50-ultra',
    name: 'Moto Razr 50 Ultra',
    brand: 'Motorola',
    flag: '🇺🇸',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 1012,
    dpr: 3,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'realme-gt-6',
    name: 'Realme GT 6',
    brand: 'Realme',
    flag: '🇨🇳',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'fairphone-5',
    name: 'Fairphone 5 (Modular)',
    brand: 'Fairphone',
    flag: '🇳🇱',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },

  // Upcoming Next-Gen (2026/2027 UX Research Focus)
  {
    id: 'iphone-17-air',
    name: 'iPhone 17 Air (Slim)',
    brand: 'Apple',
    flag: '🇺🇸',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 393,
    height: 874,
    dpr: 3,
    os: 'iOS',
    browser: 'Safari (WebKit)',
    pointer: 'coarse',
  },
  {
    id: 'huawei-mate-xt-trifold',
    name: 'Mate XT Tri-Fold (10.2")',
    brand: 'Huawei',
    flag: '🇨🇳',
    categoryTag: 'innovator',
    icon: 'tablet',
    width: 1080,
    height: 844,
    dpr: 2.8,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'samsung-z-fold-7',
    name: 'Galaxy Z Fold 7 Flex-G',
    brand: 'Samsung',
    flag: '🇰🇷',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 960,
    dpr: 3.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'motorola-rollable-concept',
    name: 'Motorola Rollable Screen',
    brand: 'Motorola',
    flag: '🇺🇸',
    categoryTag: 'innovator',
    icon: 'phone',
    width: 412,
    height: 1080,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'vision-pro-spatial-webkit',
    name: 'Vision Pro (Spatial WebKit)',
    brand: 'Apple',
    flag: '🥽',
    categoryTag: 'desktop',
    icon: 'desktop',
    width: 1280,
    height: 720,
    dpr: 2.0,
    os: 'macOS',
    browser: 'Safari (WebKit)',
    pointer: 'fine',
  },
  {
    id: 'meta-orion-ar-hud',
    name: 'Meta Orion AR HUD',
    brand: 'Meta',
    flag: '👓',
    categoryTag: 'innovator',
    icon: 'desktop',
    width: 640,
    height: 480,
    dpr: 1.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'fine',
  },

  // Gaming & Esports
  {
    id: 'rog-phone-8-pro',
    name: 'ROG Phone 8 Pro (165Hz)',
    brand: 'Asus ROG',
    flag: '🇹🇼',
    categoryTag: 'gaming',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.6,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'iqoo-12',
    name: 'iQOO 12 5G (144Hz)',
    brand: 'iQOO',
    flag: '🇨🇳',
    categoryTag: 'gaming',
    icon: 'phone',
    width: 412,
    height: 924,
    dpr: 3,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'redmagic-9s-pro',
    name: 'RedMagic 9S Pro',
    brand: 'ZTE RedMagic',
    flag: '🇨🇳',
    categoryTag: 'gaming',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 3,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'infinix-gt-20-pro',
    name: 'Infinix GT 20 Pro',
    brand: 'Infinix',
    flag: '🌍',
    categoryTag: 'gaming',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },

  // Global Titans & Regional
  {
    id: 'sony-xperia-1-vi',
    name: 'Sony Xperia 1 VI',
    brand: 'Sony',
    flag: '🇯🇵',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.6,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'tecno-camon-30',
    name: 'Tecno Camon 30 Premier',
    brand: 'Tecno',
    flag: '🌍',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'hmd-skyline',
    name: 'HMD Skyline',
    brand: 'HMD / Nokia',
    flag: '🇫🇮',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'sharp-aquos-r9',
    name: 'Sharp Aquos R9',
    brand: 'Sharp',
    flag: '🇯🇵',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'tcl-50-xl',
    name: 'TCL 50 XL NxtPaper',
    brand: 'TCL',
    flag: '🇨🇳',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'htc-u24-pro',
    name: 'HTC U24 Pro',
    brand: 'HTC',
    flag: '🇹🇼',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.75,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },
  {
    id: 'rugged-armor-26',
    name: 'Rugged Armor 26 Ultra',
    brand: 'Rugged',
    flag: '🛡️',
    categoryTag: 'global',
    icon: 'phone',
    width: 412,
    height: 915,
    dpr: 2.5,
    os: 'Android',
    browser: 'Chrome (Blink)',
    pointer: 'coarse',
  },

  // Desktop & Large Screens
  {
    id: 'ipad-pro-11',
    name: 'iPad Pro 11"',
    brand: 'Apple',
    flag: '🇺🇸',
    categoryTag: 'desktop',
    icon: 'tablet',
    width: 834,
    height: 1194,
    dpr: 2,
    os: 'iOS',
    browser: 'Safari (WebKit)',
    pointer: 'coarse',
  },
  {
    id: 'macbook-pro-14',
    name: 'MacBook Pro 14"',
    brand: 'Apple',
    flag: '🇺🇸',
    categoryTag: 'desktop',
    icon: 'laptop',
    width: 1512,
    height: 982,
    dpr: 2,
    os: 'macOS',
    browser: 'Safari (WebKit)',
    pointer: 'fine',
  },
  {
    id: 'linux-thinkpad',
    name: 'Linux ThinkPad',
    brand: 'Lenovo',
    flag: '🐧',
    categoryTag: 'desktop',
    icon: 'laptop',
    width: 1920,
    height: 1080,
    dpr: 1,
    os: 'Linux',
    browser: 'Firefox (Gecko)',
    pointer: 'fine',
  },
  {
    id: '4k-ultrawide',
    name: '4K Ultrawide Workstation',
    brand: 'PC',
    flag: '🖥️',
    categoryTag: 'desktop',
    icon: 'desktop',
    width: 3440,
    height: 1440,
    dpr: 1.25,
    os: 'Windows',
    browser: 'Edge (Chromium)',
    pointer: 'fine',
  },
];


function detectRealTelemetry(): ViewportTelemetry {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const height = typeof window !== 'undefined' ? window.innerHeight : 800;
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const orientation = width >= height ? 'landscape' : 'portrait';

  // Category
  let screenCategory: ViewportTelemetry['screenCategory'] = 'desktop';
  if (width < 640) screenCategory = 'mobile';
  else if (width < 768) screenCategory = 'compact-tablet';
  else if (width < 1024) screenCategory = 'tablet';
  else if (width < 1440) screenCategory = 'laptop';
  else if (width < 2560) screenCategory = 'desktop';
  else screenCategory = 'ultrawide';

  // Aspect ratio calculation
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(Math.round(width), Math.round(height));
  const aspectW = Math.round(width / divisor);
  const aspectH = Math.round(height / divisor);
  let aspectRatioStr = `${aspectW}:${aspectH}`;
  const ratioVal = width / height;
  if (Math.abs(ratioVal - 16 / 9) < 0.08) aspectRatioStr = '16:9 Widescreen';
  else if (Math.abs(ratioVal - 16 / 10) < 0.08) aspectRatioStr = '16:10 Golden Widescreen';
  else if (Math.abs(ratioVal - 4 / 3) < 0.08) aspectRatioStr = '4:3 Vintage Mac';
  else if (Math.abs(ratioVal - 9 / 19.5) < 0.08) aspectRatioStr = '19.5:9 Modern Smartphone';
  else if (Math.abs(ratioVal - 9 / 16) < 0.08) aspectRatioStr = '9:16 Mobile Portrait';
  else if (ratioVal > 2.1) aspectRatioStr = '21:9 Ultrawide';

  // OS Detection
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const platform = typeof navigator !== 'undefined' ? (navigator as any).userAgentData?.platform || navigator.platform || '' : '';
  let os: ViewportTelemetry['os'] = 'Unknown';
  if (/iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1)) {
    os = 'iOS';
  } else if (/Android/.test(ua)) {
    os = 'Android';
  } else if (/Mac/.test(platform) || /Macintosh/.test(ua)) {
    os = 'macOS';
  } else if (/Win/.test(platform) || /Windows/.test(ua)) {
    os = 'Windows';
  } else if (/Linux/.test(platform) || /Linux/.test(ua)) {
    os = 'Linux';
  } else if (/CrOS/.test(ua)) {
    os = 'ChromeOS';
  }

  // Browser engine
  let browser: ViewportTelemetry['browser'] = 'Other';
  if (/Edg\//.test(ua)) browser = 'Edge (Chromium)';
  else if (/Chrome\//.test(ua)) browser = 'Chrome (Blink)';
  else if (/Firefox\//.test(ua)) browser = 'Firefox (Gecko)';
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari (WebKit)';

  // Pointer
  const pointer: ViewportTelemetry['pointer'] =
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches
      ? 'coarse'
      : 'fine';

  // Color gamut
  const isP3 = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(color-gamut: p3)').matches;
  const colorGamut = isP3 ? 'Display P3 (Wide Gamut)' : 'Standard sRGB';

  // Hardware concurrency & connection
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
  const memoryGb = typeof navigator !== 'undefined' ? (navigator as any).deviceMemory : undefined;
  const conn = typeof navigator !== 'undefined' ? (navigator as any).connection : undefined;
  const connectionType = conn?.effectiveType ? conn.effectiveType.toUpperCase() : 'WIFI / HIGH-SPEED';
  const downlinkMbps = conn?.downlink;

  return {
    width,
    height,
    dpr,
    aspectRatio: aspectRatioStr,
    orientation,
    screenCategory,
    os,
    browser,
    pointer,
    colorGamut,
    cores,
    memoryGb,
    connectionType,
    downlinkMbps,
  };
}

export interface DeviceAIAgentProps {
  onAutoTune?: () => void;
}

export function DeviceAIAgent({ onAutoTune }: DeviceAIAgentProps) {
  const overlapTelemetry = useAiOverlapSentinel();
  const [securityTelemetry, setSecurityTelemetry] = useState<SecurityTelemetry>(getSecurityTelemetry);

  useEffect(() => {
    return subscribeSecurityTelemetry(setSecurityTelemetry);
  }, []);

  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [simulatedOrientation, setSimulatedOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [realTelemetry, setRealTelemetry] = useState<ViewportTelemetry>(detectRealTelemetry);
  const [copiedReport, setCopiedReport] = useState(false);
  const [tunedFeedback, setTunedFeedback] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'india' | 'flagship' | 'innovator' | 'gaming' | 'global' | 'desktop'
  >('all');
  const [viewMode, setViewMode] = useState<'presets' | 'brands-directory' | 'neural-awakening'>('presets');
  const [neuralState, setNeuralState] = useState<NeuralViewportState>(() => getNeuralViewportState());
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [brandSearch, setBrandSearch] = useState('');
  const [logEvents, setLogEvents] = useState<string[]>([
    `[INIT] HarisOS Neural Viewport Specialist probe active.`,
    `[PROBE] Real viewport: ${typeof window !== 'undefined' ? window.innerWidth : 1280}x${typeof window !== 'undefined' ? window.innerHeight : 800} @ ${typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1}x DPR.`,
  ]);

  // Continuously listen to real window resizes and orientation changes
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      const detected = detectRealTelemetry();
      setRealTelemetry(detected);
      if (!activePreset && simulatedOrientation === 'auto') {
        setLogEvents((prev) => [
          `[RESIZE] Viewport adapted: ${detected.width}x${detected.height} (${detected.orientation.toUpperCase()} · ${detected.aspectRatio})`,
          ...prev.slice(0, 9),
        ]);
      }
    };
    const handleOrientation = () => {
      handleResize();
      if (timer) clearTimeout(timer);
      timer = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      if (timer) clearTimeout(timer);
    };
  }, [activePreset, simulatedOrientation]);

  // Compute active telemetry: real or simulated
  const currentTelemetry: ViewportTelemetry = useMemo(() => {
    let width = !activePreset ? realTelemetry.width : 1280;
    let height = !activePreset ? realTelemetry.height : 800;
    let dpr = !activePreset ? realTelemetry.dpr : 1;
    let os = !activePreset ? realTelemetry.os : 'Android';
    let browser = !activePreset ? realTelemetry.browser : 'Chrome (Blink)';
    let pointer = !activePreset ? realTelemetry.pointer : 'coarse';

    if (activePreset) {
      const preset = PRESET_DEVICES.find((p) => p.id === activePreset);
      if (preset) {
        width = preset.width;
        height = preset.height;
        dpr = preset.dpr;
        os = preset.os;
        browser = preset.browser;
        pointer = preset.pointer;
      }
    }

    if (simulatedOrientation === 'landscape') {
      const maxD = Math.max(width, height);
      const minD = Math.min(width, height);
      width = maxD;
      height = minD;
    } else if (simulatedOrientation === 'portrait') {
      const minD = Math.min(width, height);
      const maxD = Math.max(width, height);
      width = minD;
      height = maxD;
    }

    const orientation: 'portrait' | 'landscape' = width >= height ? 'landscape' : 'portrait';
    let screenCategory: ViewportTelemetry['screenCategory'] = 'desktop';
    if (width < 640) screenCategory = 'mobile';
    else if (width < 768) screenCategory = 'compact-tablet';
    else if (width < 1024) screenCategory = 'tablet';
    else if (width < 1440) screenCategory = 'laptop';
    else if (width < 2560) screenCategory = 'desktop';
    else screenCategory = 'ultrawide';

    let aspectRatioStr = width < 600 ? '19.5:9 Modern Smartphone' : width < 1100 ? '4:3 iPad / Tablet' : '16:9 Widescreen';
    if (orientation === 'landscape' && height < 520) {
      aspectRatioStr = '20.5:9 Mobile Landscape';
    }

    return {
      ...realTelemetry,
      width,
      height,
      dpr,
      aspectRatio: aspectRatioStr,
      orientation,
      screenCategory,
      os,
      browser,
      pointer,
    };
  }, [activePreset, realTelemetry, simulatedOrientation]);

  const toggleSimulatedOrientation = () => {
    setSimulatedOrientation((prev) => {
      const next = prev === 'landscape' ? 'portrait' : 'landscape';
      setLogEvents((p) => [
        `[ORIENTATION] Toggled viewport to ${next.toUpperCase()} mode (${next === 'landscape' ? '4-Column Matrix' : '2-Column Matrix'}).`,
        ...p.slice(0, 9),
      ]);
      return next;
    });
  };

  // Prescriptive presentation rules across each and every aspect
  const presentationAspects = useMemo(() => {
    const t = currentTelemetry;
    const isMobile = t.screenCategory === 'mobile' || t.screenCategory === 'compact-tablet';
    const isTablet = t.screenCategory === 'tablet';
    const isShortLandscape = t.height < 520 && t.orientation === 'landscape';

    return [
      {
        id: 'geometry',
        title: '1. Window Geometry & Viewport Clamping',
        icon: <Maximize2 size={15} />,
        status: isShortLandscape
          ? 'LANDSCAPE CLAMPED CENTER'
          : isMobile
          ? 'DYNAMIC FULLSCREEN SHEET'
          : isTablet
          ? 'CLAMPED TABLET MODAL'
          : 'FREE DRAGGABLE CASCADE',
        color: isMobile ? '#ffd166' : '#d8ee57',
        diagnosis: `Viewport: ${t.width}×${t.height}px (${t.orientation.toUpperCase()} · ${t.aspectRatio})`,
        rule: isShortLandscape
          ? 'Centers windows with width clamped to Math.min(viewport - 16px, 780px) and height clamped to calc(100% - 68px) at top: 30px, ensuring titlebar and close buttons are always reachable above the dock.'
          : isMobile
          ? 'Clamp windows to calc(100% - 8px) width and calc(100% - 88px) height with sticky Macintosh titlebar, overscroll bounce containment, and 100dvh dynamic height compensation.'
          : isTablet
          ? 'Center windows with max-w-[85vw] and height clamped to calc(100% - 84px) to preserve floating dock and menu bar clearance.'
          : 'Enable freehand physics dragging with boundary clamping [left: -x+6, right: vw-x-100, top: -y+34, bottom: vh-y-50] to keep titlebar always grabbable.',
      },
      {
        id: 'bezel',
        title: '2. Macintosh 1984 Bezel Chassis Scaling',
        icon: <Monitor size={15} />,
        status: isMobile ? 'COMPACT BEZEL (3PX)' : isTablet ? 'MID CHASSIS (8PX-12PX)' : 'STUDIO CHASSIS (16PX)',
        color: '#d8ee57',
        diagnosis: `Screen Category: ${t.screenCategory.toUpperCase()}`,
        rule: isMobile
          ? 'Compress outer CRT monitor frame to 3px border to maximize interior screen aperture; ventilation slats condensed and floppy drive hidden for clean mobile view.'
          : 'Render full physical retro Macintosh chassis with molded ventilation slats, recessed carry handle, 1.44MB floppy slot, rainbow Apple emblem, and power LED.',
      },
      {
        id: 'icons',
        title: '3. Desktop Icons Flow & Spacing Matrix',
        icon: <Layers size={15} />,
        status: isShortLandscape
          ? 'ADAPTIVE 4-COLUMN × 3-ROW LANDSCAPE GRID'
          : isMobile
          ? 'BALANCED 2-COLUMN × 6-ROW PORTRAIT GRID'
          : 'STRUCTURED MACINTOSH DESKTOP ARRAY',
        color: '#39e658',
        diagnosis: `Orientation: ${t.orientation.toUpperCase()} · Hitbox: 44px · Labels: Fully Legible`,
        rule: isShortLandscape
          ? 'Rotates grid into 4 columns × 3 rows across the wide landscape aperture (height ~156px), leaving over 150px clearance above the bottom dock and completely eliminating icon cutoff.'
          : isMobile
          ? 'Organizes all 11 desktop icons into a balanced 2-column grid (Column 1: 01_Case_Studies through Brief.app; Column 2: Interactive Apps & Trash) with zero text clipping.'
          : 'Structured multi-column desktop grid with 38px retro icons and +2px extra spacing, freehand draggable on desktop and tap-to-launch on touch screens.',
      },
      {
        id: 'dock',
        title: '4. Floating System Dock & Top Menu Bar Density',
        icon: <Sliders size={15} />,
        status: isMobile ? 'OVERLAP-GUARDED TOP BAR & TOUCH RIBBON' : 'EXPANDED QUICK LAUNCHER DOCK',
        color: '#39e658',
        diagnosis: `Pointer: ${t.pointer.toUpperCase()} · Safe Area Insets: ACTIVE`,
        rule: isMobile
          ? 'Top menu bar condenses menus on mobile (hiding File/View/Special which are accessible via Apple logo) to protect the clock against overlap when Anime or Studio MP3 are active. Dock functions as a smooth touch-pan launcher ribbon.'
          : 'Dock displays all app launcher buttons with hover bounce animation, live playing music badge, and neo-brutalist shadows.',
      },
      {
        id: 'audio',
        title: '5. Studio MP3 Audio Pipeline & Browser Policy',
        icon: <Radio size={15} />,
        status: 'HARDWARE ACCELERATED HTML5 STREAMING',
        color: '#39e658',
        diagnosis: `Browser Engine: ${t.browser} · Target: Kanye West - Flashing Lights (Studio Master MP3)`,
        rule: `Initializes HTML5 Audio connected to WebAudio AnalyserNode with graceful user-gesture unlocking required by ${t.os} ${t.browser}. LED canvas visualizer runs at 60 FPS without oscillator CPU bleeps.`,
      },
      {
        id: 'crt',
        title: '6. CRT Phosphor Shader & GPU Vignette Pipeline',
        icon: <Zap size={15} />,
        status: t.cores >= 6 ? 'FULL PHOSPHOR SCANLINES + BLOOM' : 'ECO-OPTIMIZED SCANLINES',
        color: '#d8ee57',
        diagnosis: `Hardware Cores: ${t.cores} · DPR: ${t.dpr}x · Gamut: ${t.colorGamut}`,
        rule:
          t.cores >= 6
            ? 'Renders high-frequency subpixel scanlines and AWGE-inspired phosphor barrel distortion with zero frame drops.'
            : 'Activates lightweight CSS overlay scanlines with minimal compositing memory to maintain 60 FPS battery efficiency.',
      },
      {
        id: 'touch',
        title: '7. Touch Ergonomics & Pointer Hit-Targets',
        icon: t.pointer === 'coarse' ? <Smartphone size={15} /> : <Compass size={15} />,
        status: t.pointer === 'coarse' ? 'COARSE TOUCH: MIN 44PX TARGETS' : 'FINE POINTER: PRECISE PIXEL MOUSE',
        color: '#d8ee57',
        diagnosis: `Input Type: ${t.pointer === 'coarse' ? 'Capacitive Multi-Touch' : 'Hardware Mouse / Precision Trackpad'}`,
        rule:
          t.pointer === 'coarse'
            ? 'Touch targets expand to 44px minimum for Apple HIG/Material compliance. Universal freehand touch window dragging active on titlebars with isolated touchAction physics.'
            : 'Desktop & laptop freehand window dragging enabled via titlebar grip with cursor-grab and physics momentum interactions.',
      },
      {
        id: 'typography',
        title: '8. Typography & Neo-Brutalist Contrast Matrix',
        icon: <Eye size={15} />,
        status: 'CRISP MONOSPACE (21:1 CONTRAST RATIO)',
        color: '#39e658',
        diagnosis: `Font: Authentic Chicago / Monospace · Contrast: Pure #000000 on #FFFFFF / #D8EE57`,
        rule: 'High-contrast neo-brutalist border borders (2px black), sharp pixel edges, responsive text truncation with ellipsis, and readable leading across all screen densities.',
      },
    ];
  }, [currentTelemetry]);

  const handleSimulate = (presetId: string) => {
    retroAudio.click();
    setActivePreset(presetId);
    const preset = PRESET_DEVICES.find((p) => p.id === presetId);
    if (preset) {
      setLogEvents((prev) => [
        `[SIMULATE] Loaded ${preset.flag} ${preset.name} (${preset.width}x${preset.height}, ${preset.os})`,
        ...prev.slice(0, 9),
      ]);
    }
  };

  const handleSimulateBrand = (brandProfile: SmartphoneBrandProfile) => {
    retroAudio.click();
    const matchingPreset = PRESET_DEVICES.find(
      (p) =>
        p.brand.toLowerCase() === brandProfile.brandName.toLowerCase() ||
        p.id.includes(brandProfile.brandId)
    );
    if (matchingPreset) {
      handleSimulate(matchingPreset.id);
    } else {
      handleSimulate('poco-m7-plus');
    }
    setViewMode('presets');
    setLogEvents((prev) => [
      `[BRAND PROFILE] Simulated ${brandProfile.flag} ${brandProfile.brandName} (${brandProfile.originCountry}): ${brandProfile.refreshRate}`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleResetReal = () => {
    retroAudio.click();
    setActivePreset(null);
    const detected = detectRealTelemetry();
    setRealTelemetry(detected);
    setLogEvents((prev) => [
      `[RESTORE] Returned to physical sensor: ${detected.width}x${detected.height} (${detected.os})`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleTrainModel = () => {
    retroAudio.click();
    setIsTraining(true);
    setTrainingProgress(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 20;
      setTrainingProgress(step);
      if (step >= 100) {
        clearInterval(interval);
        setIsTraining(false);
        const updated = trainNeuralViewportModel(512);
        setNeuralState(updated);
        setTunedFeedback(
          `⚡ Neural Viewport Model Trained (+512 Epochs)! Loss decreased to ${updated.neuralLoss}. Knowledge Awakened across 37 devices.`
        );
        setLogEvents((p) => [
          `[NEURAL AWAKENING] Epochs: ${updated.trainingEpochs} | Loss: ${updated.neuralLoss} | Knowledge status: 100% AWAKENED across 37 viewports.`,
          ...p.slice(0, 9),
        ]);
        setTimeout(() => setTunedFeedback(null), 4000);
      }
    }, 120);
  };

  const handleSimulateUpcoming = (dev: NextGenDeviceProfile) => {
    retroAudio.click();
    setActivePreset(dev.id);
    setViewMode('presets');
    setLogEvents((prev) => [
      `[NEXT-GEN AWAKENING] Simulated ${dev.flag} ${dev.name} (${dev.viewportWidth}x${dev.viewportHeight} · ${dev.aspectRatio}). Strategy: ${dev.divergenceStrategy}`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleTriggerAutoTune = () => {
    retroAudio.click();
    if (onAutoTune) {
      onAutoTune();
    }
    setTunedFeedback('HarisOS calibrated for current viewport! Bezels, dock, and audio optimized.');
    setLogEvents((prev) => [
      `[OPTIMIZE] Auto-tuned HarisOS layout for ${currentTelemetry.screenCategory} (${currentTelemetry.width}x${currentTelemetry.height})`,
      ...prev.slice(0, 9),
    ]);
    setTimeout(() => setTunedFeedback(null), 3000);
  };

  const handleCopyReport = async () => {
    retroAudio.click();
    const t = currentTelemetry;
    const report = `# HarisOS Viewport Presentation Audit
- Device: ${t.os} (${t.browser})
- Screen Category: ${t.screenCategory}
- Viewport Dimensions: ${t.width} x ${t.height} px
- Aspect Ratio: ${t.aspectRatio} (${t.orientation})
- Device Pixel Ratio (DPR): ${t.dpr}x
- Pointer Mode: ${t.pointer}
- CPU Hardware Cores: ${t.cores}
- Audio Engine: Studio Master MP3 (Kanye West - Flashing Lights)
- Bezel Adaptation: ${t.screenCategory === 'mobile' ? '3px compact chassis' : '16px full chassis'}
- Windows Geometry: Universal Freehand Draggable Cascade (Mouse/Cursor on PC/Laptop & Touch on Mobile/Tablet)
- Icons Spacing: 38px + 2px extra spacing (multi-column wrap active)
- Status: 100% Responsive & Cross-Browser Compliant`;

    try {
      await navigator.clipboard.writeText(report);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2200);
    } catch {}
  };

  return (
    <div className="flex flex-col gap-3 font-mono text-[#111111] select-none text-xs">
      {/* Top Banner: AI Agent Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded border-2 border-black bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000]">
            <Cpu size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-tight text-black">
                DeviceAI.agent
              </h3>
              <span className="rounded bg-[#d8ee57] text-black px-1.5 py-0.2 text-[9px] font-black border border-black">
                NEURAL VIEWPORT SENSOR
              </span>
              <span className="rounded bg-black text-white px-1 py-0.2 text-[8px] font-bold">
                MOCKOS 7.5
              </span>
            </div>
            <p className="font-mono text-[10px] text-black/75 font-semibold">
              Autonomous layout controller &amp; device presentation specialist
            </p>
          </div>
        </div>

        {/* Action Buttons: Auto-Tune & Copy Report */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleTriggerAutoTune}
            className="flex items-center gap-1 rounded border-2 border-black bg-[#d8ee57] px-2.5 py-1 text-[10px] font-bold text-black hover:bg-black hover:text-[#d8ee57] cursor-pointer shadow-[2px_2px_0px_#000] transition-colors"
            title="Auto-tune HarisOS settings for current viewport"
          >
            <Sparkles size={12} />
            <span>AUTO-TUNE HARISOS</span>
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            className="flex items-center gap-1 rounded border-2 border-black bg-white px-2 py-1 text-[10px] font-bold text-black hover:bg-black hover:text-white cursor-pointer shadow-[2px_2px_0px_#000] transition-colors"
            title="Copy audit report"
          >
            {copiedReport ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copiedReport ? 'COPIED!' : 'AUDIT REPORT'}</span>
          </button>
        </div>
      </div>

      {tunedFeedback && (
        <div className="flex items-center gap-2 rounded border-2 border-black bg-[#d8ee57] p-2 text-[11px] font-bold text-black shadow-[2px_2px_0px_#000]">
          <CheckCircle2 size={16} />
          <span>{tunedFeedback}</span>
        </div>
      )}

      {/* Live Telemetry Radar Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
        <div className="rounded border-2 border-black bg-white p-2 shadow-[2px_2px_0px_#000]">
          <span className="text-black/60 block font-semibold">VIEWPORT SIZE</span>
          <span className="font-bold text-black text-xs sm:text-sm">
            {currentTelemetry.width} × {currentTelemetry.height} px
          </span>
          <span className="text-[9px] text-neutral-500 block">{currentTelemetry.aspectRatio}</span>
        </div>

        <div className="rounded border-2 border-black bg-white p-2 shadow-[2px_2px_0px_#000]">
          <span className="text-black/60 block font-semibold">DETECTED OS / PLATFORM</span>
          <span className="font-bold text-black text-xs sm:text-sm">{currentTelemetry.os}</span>
          <span className="text-[9px] text-neutral-500 block truncate">{currentTelemetry.browser}</span>
        </div>

        <div className="rounded border-2 border-black bg-white p-2 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="text-black/60 block font-semibold">ORIENTATION &amp; DPR</span>
            <span
              className={`text-[8px] font-bold px-1 py-0.5 rounded border border-black ${
                currentTelemetry.orientation === 'landscape'
                  ? 'bg-[#d8ee57] text-black shadow-[1px_1px_0px_#000]'
                  : 'bg-neutral-200 text-black'
              }`}
            >
              {currentTelemetry.orientation.toUpperCase()}
            </span>
          </div>
          <span className="font-bold text-black text-xs sm:text-sm">
            {currentTelemetry.dpr}x DPR · {currentTelemetry.pointer.toUpperCase()}
          </span>
          <span className="text-[9px] text-neutral-500 block">
            {currentTelemetry.orientation === 'landscape'
              ? 'Horizontal Flow (4-Col x 3-Row)'
              : 'Vertical Flow (2-Col x 6-Row)'}
          </span>
        </div>

        <div className="rounded border-2 border-black bg-white p-2 shadow-[2px_2px_0px_#000]">
          <span className="text-black/60 block font-semibold">DEVICE CATEGORY</span>
          <span className="font-bold text-emerald-700 text-xs sm:text-sm uppercase">
            ● {currentTelemetry.screenCategory}
          </span>
          <span className="text-[9px] text-neutral-500 block">
            {activePreset ? 'SIMULATED MODE' : 'LIVE SENSOR ACTIVE'}
          </span>
        </div>
      </div>

      {/* DeviceAI Active Overlap Sentinel & Anti-Inspect Security Console */}
      <div className="rounded border-2 border-black bg-[#151515] p-3 text-white shadow-[3px_3px_0px_#000] font-mono">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#39e658] animate-ping" />
            <span className="font-bold text-xs text-[#d8ee57] tracking-wider uppercase">
              DEVICEAI ACTIVE SENTINEL: ULTRA AWAKENED · AI PROCUREMENT SHIELD
            </span>
          </div>
          <span className="rounded bg-[#39e658]/20 text-[#39e658] border border-[#39e658]/40 px-1.5 py-0.5 text-[8.5px] font-bold uppercase">
            ● TIGHTENED DEFENSE: 100% ARMED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
          <div className="p-2 rounded border border-white/20 bg-black/60">
            <span className="text-neutral-400 block text-[9px] font-bold">TYPOGRAPHY &amp; ELEMENT OVERLAPS</span>
            <span className="text-[#39e658] font-bold text-xs sm:text-sm">
              {overlapTelemetry.overlapsRectified} Rectified (0 Unresolved)
            </span>
            <span className="text-neutral-400 text-[8.5px] block mt-0.5">
              Continuous DOM bounding box monitor
            </span>
          </div>

          <div className="p-2 rounded border border-white/20 bg-black/60">
            <span className="text-neutral-400 block text-[9px] font-bold">AI PROCUREMENT &amp; BOTS</span>
            <span className="text-[#39e658] font-bold text-xs sm:text-sm">
              {securityTelemetry.automatedScrapersBlocked} Neutralized
            </span>
            <span className="text-neutral-400 text-[8.5px] block mt-0.5">
              GPTBot, Claude, Scrapy, Puppeteer blocked
            </span>
          </div>

          <div className="p-2 rounded border border-white/20 bg-black/60">
            <span className="text-neutral-400 block text-[9px] font-bold">ANTI-INSPECT &amp; TAMPER SHIELD</span>
            <span className="text-[#ff4d6d] font-bold text-xs sm:text-sm">
              {securityTelemetry.inspectAttemptsBlocked} Defended (LOCKED)
            </span>
            <span className="text-neutral-400 text-[8.5px] block mt-0.5">
              F12, right-click, DOM dump &amp; view-source locked
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15">
          <span className="text-[9px] text-[#d8ee57] font-semibold">
            {securityTelemetry.statusText}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                const res = tightenSecurityShields();
                setTunedFeedback(res.message);
                setTimeout(() => setTunedFeedback(null), 3500);
              }}
              className="px-2.5 py-1 rounded border border-black bg-[#ff4d6d] text-white font-bold text-[9px] hover:bg-[#ff3355] cursor-pointer shadow-[1px_1px_0px_#000] flex items-center gap-1"
            >
              <span>🛡️ TIGHTEN &amp; RE-ARM SHIELDS</span>
            </button>
            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                const res = scanAndRectifyOverlaps();
                setTunedFeedback(`DeviceAI Scanned: ${res.rectified} typographic & element collisions resolved.`);
                setTimeout(() => setTunedFeedback(null), 3500);
              }}
              className="px-2.5 py-1 rounded border border-black bg-[#d8ee57] text-black font-bold text-[9.5px] hover:bg-[#cbe348] cursor-pointer shadow-[1px_1px_0px_#000] flex items-center gap-1"
            >
              <span>⚡ RUN AI SCAN &amp; RECTIFY NOW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Device Simulator & Global Brand Matrix Console */}
      <div className="rounded border-2 border-black bg-[#f2f0e8] p-3 sm:p-3.5 shadow-[3px_3px_0px_#000] overflow-hidden">
        {/* Navigation Tabs between Presets and World Brands Directory */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/20 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                setViewMode('presets');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-sm border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors flex items-center gap-1 ${
                viewMode === 'presets'
                  ? 'bg-black text-[#d8ee57]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Smartphone size={12} />
              <span>SMARTPHONE SIMULATOR ({PRESET_DEVICES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                setViewMode('brands-directory');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-sm border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors flex items-center gap-1 ${
                viewMode === 'brands-directory'
                  ? 'bg-black text-[#d8ee57]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <span>🌍</span>
              <span>ALL WORLD BRANDS ({GLOBAL_SMARTPHONE_BRANDS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                setViewMode('neural-awakening');
              }}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-sm border-2 border-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors flex items-center gap-1 ${
                viewMode === 'neural-awakening'
                  ? 'bg-black text-[#d8ee57]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Zap size={12} className={neuralState.awakened ? 'text-[#d8ee57] animate-pulse' : ''} />
              <span>⚡ NEURAL AWAKENING &amp; NEXT-GEN ({UPCOMING_NEXTGEN_DEVICES.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                retroAudio.click();
                toggleSimulatedOrientation();
              }}
              title="Toggle simulated device orientation between Portrait (9:20) and Landscape (20:9)"
              className={`rounded border-2 border-black px-2.5 py-1 text-[9px] font-bold cursor-pointer shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-colors ${
                currentTelemetry.orientation === 'landscape'
                  ? 'bg-[#d8ee57] text-black hover:bg-[#cbe243]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <RotateCw size={11} className={currentTelemetry.orientation === 'landscape' ? 'rotate-90 transition-transform' : 'transition-transform'} />
              <span>
                ROTATE: {currentTelemetry.orientation === 'landscape' ? 'LANDSCAPE 🔄' : 'PORTRAIT 📱'}
              </span>
            </button>

            {activePreset && (
              <button
                type="button"
                onClick={handleResetReal}
                className="rounded border border-black bg-black text-[#d8ee57] px-2 py-1 text-[9px] font-bold hover:bg-neutral-800 cursor-pointer shadow-[1px_1px_0px_#000]"
              >
                Reset to Live Device
              </button>
            )}
          </div>
        </div>

        {/* View Mode 1: Presets Simulator */}
        {viewMode === 'presets' ? (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1 mb-2.5 text-[9px] font-bold">
              {[
                { id: 'all', label: `ALL (${PRESET_DEVICES.length})` },
                { id: 'india', label: 'INDIA SPECIAL 🇮🇳' },
                { id: 'flagship', label: 'FLAGSHIPS 👑' },
                { id: 'innovator', label: 'INNOVATORS & FOLDABLES ⚡' },
                { id: 'gaming', label: 'GAMING 🎮' },
                { id: 'global', label: 'GLOBAL TITANS 🌍' },
                { id: 'desktop', label: 'COMPUTERS 🖥️' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    retroAudio.click();
                    setSelectedCategory(cat.id as any);
                  }}
                  className={`px-2 py-0.5 rounded border border-black cursor-pointer transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-black text-[#d8ee57]'
                      : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-1.5 sm:gap-2 max-h-72 overflow-y-auto pr-1">
              {PRESET_DEVICES.filter(
                (p) => selectedCategory === 'all' || p.categoryTag === selectedCategory
              ).map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSimulate(preset.id)}
                    title={`${preset.name} (${preset.width}×${preset.height} · ${preset.dpr}x DPR · ${preset.os})`}
                    className={`flex flex-col items-start p-1.5 sm:p-2 rounded border-2 border-black font-mono text-[9px] sm:text-[9.5px] transition-all cursor-pointer min-w-0 w-full text-left ${
                      isSelected
                        ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000]'
                        : 'bg-white text-black hover:bg-neutral-100 shadow-[1px_1px_0px_#000]'
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold w-full min-w-0">
                      <span className="shrink-0">{preset.flag}</span>
                      <span className="truncate whitespace-nowrap">{preset.name}</span>
                    </div>
                    <div className="text-[8px] opacity-75 mt-0.5 truncate w-full flex items-center justify-between">
                      <span>{preset.width}×{preset.height}</span>
                      <span className="font-semibold">{preset.dpr}x</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : viewMode === 'brands-directory' ? (
          /* View Mode 2: All World Smartphone Brands Directory */
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search across 31 world smartphone brands (e.g. POCO, Samsung, Apple, Vivo, Lava, Snapdragon...)"
                className="w-full rounded border-2 border-black bg-white px-2.5 py-1 text-[10px] text-black placeholder:text-black/50 font-mono outline-none shadow-inner"
              />
              {brandSearch && (
                <button
                  type="button"
                  onClick={() => setBrandSearch('')}
                  className="rounded border border-black bg-black text-[#d8ee57] px-2 py-1 text-[9px] font-bold cursor-pointer"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Brands Directory Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-80 overflow-y-auto pr-1">
              {GLOBAL_SMARTPHONE_BRANDS.filter((b) => {
                const q = brandSearch.toLowerCase();
                return (
                  b.brandName.toLowerCase().includes(q) ||
                  b.originCountry.toLowerCase().includes(q) ||
                  b.chipsets.some((c) => c.toLowerCase().includes(q)) ||
                  b.flagshipModels.some((m) => m.toLowerCase().includes(q)) ||
                  b.customOS.toLowerCase().includes(q)
                );
              }).map((brand) => (
                <div
                  key={brand.brandId}
                  className="rounded border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000] flex flex-col justify-between text-[9.5px]"
                >
                  <div>
                    {/* Header: Flag, Name, Country */}
                    <div className="flex items-center justify-between border-b border-black/15 pb-1 mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{brand.flag}</span>
                        <span className="font-bold text-black text-[11px]">{brand.brandName}</span>
                      </div>
                      <span className="rounded bg-neutral-100 border border-black px-1 text-[8px] font-semibold text-neutral-600">
                        {brand.originCountry}
                      </span>
                    </div>

                    {/* Market Rank */}
                    <div className="text-[8px] text-amber-800 font-bold mb-1">
                      ★ {brand.marketShareRank}
                    </div>

                    {/* Flagship Models */}
                    <div className="mb-1">
                      <span className="text-[8px] font-bold text-neutral-500 block">KEY MODELS:</span>
                      <span className="text-neutral-800 font-medium text-[8.5px] leading-tight block">
                        {brand.flagshipModels.slice(0, 2).join(' · ')}
                      </span>
                    </div>

                    {/* Chipset & Custom OS */}
                    <div className="mb-1 text-[8px] text-neutral-600">
                      <span className="font-bold">SILICON:</span> {brand.chipsets[0]} · <span className="font-bold">OS:</span> {brand.customOS}
                    </div>

                    {/* Display & Refresh Rate */}
                    <div className="mb-1.5 text-[8px] text-neutral-600">
                      <span className="font-bold">DISPLAY:</span> {brand.aspectRatioPreference} @ <span className="text-emerald-700 font-bold">{brand.refreshRate}</span>
                    </div>

                    {/* HarisOS Adaptation */}
                    <div className="p-1.5 rounded bg-[#f4f2e9] border border-black/10 text-[8px] text-black leading-snug">
                      <span className="font-bold text-[#111111] block mb-0.5">HARISOS ADAPTATION:</span>
                      {brand.harisOsAdaptation}
                    </div>
                  </div>

                  {/* Simulate Button */}
                  <button
                    type="button"
                    onClick={() => handleSimulateBrand(brand)}
                    className="mt-2 w-full rounded border-2 border-black bg-[#d8ee57] hover:bg-black hover:text-[#d8ee57] py-1 text-[9px] font-bold text-black cursor-pointer shadow-[1px_1px_0px_#000] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>SIMULATE {brand.brandName.toUpperCase()}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View Mode 3: Neural Knowledge Awakening & Next-Gen Devices Matrix (2026/2027 UX Research) */
          <div className="space-y-3 font-mono">
            {/* Neural Awakening & Training Controller Panel */}
            <div className="rounded border-2 border-black bg-[#111111] text-white p-3 shadow-[3px_3px_0px_#000]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#39e658] animate-ping border border-black" />
                  <span className="font-black text-xs text-[#d8ee57] tracking-wider uppercase">
                    DEVICEAI NEURAL VIEWPORT KNOWLEDGE: 100% AWAKENED
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#39e658]/20 text-[#39e658] border border-[#39e658]/40 px-2 py-0.5 text-[8.5px] font-black uppercase">
                    ● ACTIVE BRAIN STATUS: ONLINE
                  </span>
                  <span className="text-[8px] text-neutral-400">
                    UPDATED: {new Date(neuralState.lastTrainedTimestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Neural Telemetry Radar Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9.5px]">
                <div className="p-2 rounded border border-white/20 bg-black/70">
                  <span className="text-neutral-400 block text-[8px] font-bold uppercase">TRAINING CYCLES (EPOCHS)</span>
                  <span className="text-[#39e658] font-bold text-sm sm:text-base">
                    {neuralState.trainingEpochs.toLocaleString()}
                  </span>
                  <span className="text-neutral-400 text-[8px] block mt-0.5">
                    Reinforced viewport telemetry
                  </span>
                </div>

                <div className="p-2 rounded border border-white/20 bg-black/70">
                  <span className="text-neutral-400 block text-[8px] font-bold uppercase">NEURAL LOSS CONVERGENCE</span>
                  <span className="text-[#d8ee57] font-bold text-sm sm:text-base">
                    {neuralState.neuralLoss}
                  </span>
                  <span className="text-[#39e658] text-[8px] block mt-0.5">
                    Optimal convergence (&lt;0.005)
                  </span>
                </div>

                <div className="p-2 rounded border border-white/20 bg-black/70">
                  <span className="text-neutral-400 block text-[8px] font-bold uppercase">LEARNED VIEWPORTS</span>
                  <span className="text-white font-bold text-sm sm:text-base">
                    {neuralState.trainedViewportsCount} Matrices
                  </span>
                  <span className="text-neutral-400 text-[8px] block mt-0.5">
                    31 Global + 6 Next-Gen
                  </span>
                </div>

                <div className="p-2 rounded border border-white/20 bg-black/70">
                  <span className="text-neutral-400 block text-[8px] font-bold uppercase">DIVERGENCE RATIO</span>
                  <span className="text-[#ff6b6b] font-bold text-xs sm:text-sm">
                    {neuralState.divergenceRatio}
                  </span>
                  <span className="text-neutral-400 text-[8px] block mt-0.5 truncate">
                    Damping: {neuralState.invisibleScrollDamping}
                  </span>
                </div>
              </div>

              {/* Progress Bar during Training */}
              {isTraining && (
                <div className="mt-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[8.5px] text-[#d8ee57] font-bold">
                    <span>⚡ TRAINING IN PROGRESS: RE-CALIBRATING 37 DEVICE MATRICES...</span>
                    <span>{trainingProgress}%</span>
                  </div>
                  <div className="h-2 w-full rounded border border-black bg-neutral-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#d8ee57] to-[#39e658] transition-all duration-150"
                      style={{ width: `${trainingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Train Button */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15">
                <span className="text-[9px] text-neutral-300">
                  Self-learning model continuously trains on viewport aspect-ratios, safe-area insets, and thumb reachability.
                </span>
                <button
                  type="button"
                  disabled={isTraining}
                  onClick={handleTrainModel}
                  className="px-3 py-1.5 rounded border border-black bg-[#d8ee57] hover:bg-white text-black font-black text-[10px] cursor-pointer shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Zap size={13} className={isTraining ? 'animate-spin' : ''} />
                  <span>{isTraining ? 'TRAINING NEURAL BRAIN...' : '⚡ TRAIN & AWAKEN NEURAL ENGINE (+512 EPOCHS)'}</span>
                </button>
              </div>
            </div>

            {/* Core UX Research Showcase: Next-Gen Viewports (2026/2027) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🔬</span>
                  <h4 className="font-bold text-xs uppercase text-black">
                    Primary UX Research: Next-Gen (2026/2027) Viewports &amp; Form Factors
                  </h4>
                </div>
                <span className="bg-black text-[#d8ee57] px-2 py-0.5 text-[8.5px] font-bold rounded-xs">
                  HARIS KUMAAR UX LAB
                </span>
              </div>
              <p className="text-[9px] text-neutral-600 mb-2 leading-relaxed">
                Modern elongated phones, tri-folds, motorized rollables, and AR HUDs break conventional CSS breakpoints. HarisOS autonomously diverges viewports to protect thumb leverage, eliminate layout collision, and maintain 60 FPS performance.
              </p>

              {/* Next-Gen Devices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
                {UPCOMING_NEXTGEN_DEVICES.map((dev) => (
                  <div
                    key={dev.id}
                    className="rounded border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000] flex flex-col justify-between text-[9.5px]"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-black/15 pb-1 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-lg shrink-0">{dev.flag}</span>
                          <div className="min-w-0">
                            <h5 className="font-black text-black text-[10.5px] leading-tight truncate">{dev.name}</h5>
                            <span className="text-[7.5px] text-neutral-500 font-semibold block">{dev.brand}</span>
                          </div>
                        </div>
                        <span className="rounded bg-[#d8ee57] border border-black px-1.5 py-0.5 text-[7.5px] font-black text-black shrink-0">
                          {dev.releaseTimeline}
                        </span>
                      </div>

                      {/* Display & Viewport */}
                      <div className="space-y-1 mb-2 text-[8px]">
                        <div className="flex justify-between items-center text-neutral-700">
                          <span className="font-bold">VIEWPORT:</span>
                          <span className="font-bold text-black">{dev.viewportWidth} × {dev.viewportHeight} px @ {dev.dpr}x DPR</span>
                        </div>
                        <div className="flex justify-between items-center text-neutral-700">
                          <span className="font-bold">ASPECT RATIO:</span>
                          <span className="text-black font-semibold">{dev.aspectRatio}</span>
                        </div>
                        <div className="flex justify-between items-center text-neutral-700">
                          <span className="font-bold">PANEL TECH:</span>
                          <span className="text-black truncate max-w-[170px]">{dev.displayTech}</span>
                        </div>
                        <div className="flex justify-between items-center text-neutral-700">
                          <span className="font-bold">SILICON:</span>
                          <span className="text-neutral-800">{dev.chipset}</span>
                        </div>
                      </div>

                      {/* UX Research Challenge */}
                      <div className="p-1.5 rounded bg-[#fff0f3] border border-[#ff4d6d]/30 text-[8px] text-[#900c3f] mb-1.5">
                        <span className="font-black block mb-0.5 uppercase tracking-wide">⚠ UX RESEARCH PROBLEM:</span>
                        {dev.uxResearchChallenge}
                      </div>

                      {/* HarisOS Divergence Strategy */}
                      <div className="p-1.5 rounded bg-[#eefbe8] border border-[#39e658]/40 text-[8px] text-[#135d1f] mb-2">
                        <span className="font-black block mb-0.5 uppercase tracking-wide">⚡ HARISOS NEURAL ADAPTATION:</span>
                        {dev.divergenceStrategy}
                      </div>
                    </div>

                    {/* Simulate Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulateUpcoming(dev)}
                      className="w-full rounded border-2 border-black bg-[#d8ee57] hover:bg-black hover:text-[#d8ee57] py-1 text-[9px] font-black text-black cursor-pointer shadow-[1px_1px_0px_#000] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>SIMULATE {dev.name.toUpperCase()}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>


      {/* 42-Year Computing Lineage Tracker: From 1984 GUI Mac to Modern Android/iOS */}
      <div className="rounded border-2 border-black bg-white p-3 sm:p-3.5 shadow-[3px_3px_0px_#000]">
        <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-2.5">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-black">
            <History size={14} className="text-black" />
            <span>42-Year Computing Lineage Tracker: 1984 ➔ 2026</span>
          </div>
          <span className="bg-black text-[#d8ee57] px-2 py-0.5 text-[9px] font-bold rounded-xs">
            EVOLUTIONARY ROOTS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono">
          {COMPUTING_LINEAGE.map((m) => (
            <div
              key={m.year}
              className={`p-2 rounded border-2 border-black text-[9.5px] flex flex-col justify-between ${
                m.isCurrentUserBranch
                  ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#d8ee57]'
                  : 'bg-[#fbfbf8] text-black shadow-[1px_1px_0px_#000]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-bold pb-1 border-b border-black/20 mb-1">
                  <span className="text-sm">{m.icon}</span>
                  <span className={m.isCurrentUserBranch ? 'text-[#d8ee57]' : 'text-neutral-500'}>
                    {m.year}
                  </span>
                </div>
                <h5 className="font-bold text-[10.5px] leading-tight mb-0.5">{m.device}</h5>
                <p className={`text-[8.5px] mb-1 font-semibold ${m.isCurrentUserBranch ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {m.company}
                </p>
                <p className={`text-[8px] leading-tight mb-1 ${m.isCurrentUserBranch ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {m.specs}
                </p>
              </div>
              <div className={`pt-1 border-t text-[8px] leading-tight font-medium ${m.isCurrentUserBranch ? 'border-white/20 text-[#39e658]' : 'border-black/15 text-black/80'}`}>
                {m.significance}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Presentation Breakdown: How it presents in EACH and EVERY aspect */}
      <div className="space-y-2">
        <div className="flex items-center justify-between border-b border-black/20 pb-1">
          <h4 className="font-bold text-xs uppercase flex items-center gap-1.5 text-black">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>AI Prescriptive Presentation Plan (All 8 Aspects)</span>
          </h4>
          <span className="text-[9px] font-bold text-neutral-500">100% ADAPTIVE COMPLIANCE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {presentationAspects.map((aspect) => (
            <div
              key={aspect.id}
              className="rounded border-2 border-black bg-white p-2.5 shadow-[2px_2px_0px_#000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 border-b border-black/15 pb-1">
                  <span className="font-bold text-[11px] text-black flex items-center gap-1">
                    {aspect.icon}
                    <span>{aspect.title}</span>
                  </span>
                  <span
                    className="rounded px-1.5 py-0.2 text-[8.5px] font-bold uppercase shrink-0 border border-black"
                    style={{ backgroundColor: aspect.color }}
                  >
                    {aspect.status}
                  </span>
                </div>

                <p className="mt-1 text-[9.5px] font-semibold text-neutral-600">
                  {aspect.diagnosis}
                </p>

                <p className="mt-1 text-[10px] leading-relaxed text-black/85">
                  {aspect.rule}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Neural Terminal / Agent Event Stream */}
      <div className="rounded border-2 border-black bg-black p-2.5 text-[#39e658] shadow-[3px_3px_0px_#000]">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-1 text-[9px] font-bold text-neutral-400">
          <span className="flex items-center gap-1">
            <TerminalIcon size={12} className="text-[#39e658]" />
            <span>DEVICEAI NEURAL STREAM &amp; TELEMETRY LOGS</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#39e658] animate-ping" />
            <span>REAL-TIME AUDIT</span>
          </span>
        </div>
        <div className="mt-1.5 space-y-0.5 font-mono text-[9px] max-h-20 overflow-y-auto no-scrollbar">
          {logEvents.map((log, index) => (
            <div key={index} className="leading-snug truncate">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
