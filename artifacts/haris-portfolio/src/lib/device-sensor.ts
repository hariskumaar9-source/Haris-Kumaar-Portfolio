export interface DeviceIdentity {
  brand: string;
  model: string;
  fullName: string;
  flag?: string;
  originCountry?: string;
  os: 'Android' | 'iOS' | 'macOS' | 'Windows' | 'Linux' | 'ChromeOS' | 'Unknown';
  osVersion: string;
  browser: 'Chrome (Blink)' | 'Safari (WebKit)' | 'Firefox (Gecko)' | 'Edge (Chromium)' | 'Brave' | 'Other';
  gpuRenderer: string;
  category: 'mobile' | 'compact-tablet' | 'tablet' | 'laptop' | 'desktop' | 'ultrawide';
  isPoco: boolean;
  isTouch: boolean;
  dpr: number;
  width: number;
  height: number;
  physicalWidth: number;
  physicalHeight: number;
  aspectRatio: string;
  orientation: 'portrait' | 'landscape';
  cores: number;
  memoryGb?: number;
  connectionSpeed?: string;
  lineageStage: 'first-gui-mac-1984' | 'first-iphone-2007' | 'first-android-2008' | 'poco-disruptor-2018' | 'modern-flagship-2026';
}

export interface SmartphoneBrandProfile {
  brandId: string;
  brandName: string;
  originCountry: string;
  flag: string;
  marketShareRank: string;
  flagshipModels: string[];
  chipsets: string[];
  customOS: string;
  screenCategory: 'mobile' | 'foldable';
  aspectRatioPreference: string;
  refreshRate: string;
  touchOptimization: string;
  harisOsAdaptation: string;
}

export const GLOBAL_SMARTPHONE_BRANDS: SmartphoneBrandProfile[] = [
  {
    brandId: 'poco',
    brandName: 'POCO',
    originCountry: 'India / Global',
    flag: '🇮🇳',
    marketShareRank: 'Top Indian Flagship Disruptor',
    flagshipModels: ['POCO M7+ 5G (India Edition)', 'POCO F6 Pro', 'POCO X6 Pro 5G'],
    chipsets: ['Snapdragon 4 Gen 2 AE (4nm)', 'Snapdragon 8s Gen 3', 'Dimensity 8300 Ultra'],
    customOS: 'Xiaomi HyperOS (India Custom)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20.5:9 Ultra-Tall Display',
    refreshRate: '120Hz Adaptive AMOLED',
    touchOptimization: '480Hz Instant Touch Sampling Rate',
    harisOsAdaptation: 'Clamped mobile height calc(100% - 100px), 2-column icon grid, zero menubar clock overlap.',
  },
  {
    brandId: 'apple',
    brandName: 'Apple',
    originCountry: 'United States',
    flag: '🇺🇸',
    marketShareRank: 'Global Flagship Leader',
    flagshipModels: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro', 'iPhone SE 3'],
    chipsets: ['Apple A18 Pro (3nm)', 'A17 Pro', 'A16 Bionic'],
    customOS: 'iOS 18 / Dynamic Island UI',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.5:9 Super Retina XDR',
    refreshRate: '120Hz ProMotion',
    touchOptimization: 'Capacitive Multi-Touch (Apple HIG 44px Hit-Box)',
    harisOsAdaptation: 'Dynamic Island safe-area padding (top: 34px), touch feedback on app icons, glass retro bevels.',
  },
  {
    brandId: 'samsung',
    brandName: 'Samsung',
    originCountry: 'South Korea',
    flag: '🇰🇷',
    marketShareRank: 'Global Volume Leader',
    flagshipModels: ['Galaxy S24 Ultra', 'Galaxy Z Fold 6', 'Galaxy Z Flip 6', 'Galaxy A55 5G'],
    chipsets: ['Snapdragon 8 Gen 3 for Galaxy', 'Exynos 2400 (4nm)'],
    customOS: 'One UI 6.1 (Galaxy AI)',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.5:9 Dynamic AMOLED 2X',
    refreshRate: '120Hz LTPO (1-120Hz)',
    touchOptimization: '240Hz Touch Response + S-Pen Digitizer',
    harisOsAdaptation: 'S-Pen hover pointer support, Edge-panel safe padding, foldable responsive inner/outer viewport swap.',
  },
  {
    brandId: 'google',
    brandName: 'Google Pixel',
    originCountry: 'United States',
    flag: '🇺🇸',
    marketShareRank: 'AI Pioneer',
    flagshipModels: ['Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 8a', 'Pixel 9 Pro Fold'],
    chipsets: ['Google Tensor G4 (Titan M2)', 'Tensor G3'],
    customOS: 'Pure Android 15 (Material You)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 Super Actua Display',
    refreshRate: '120Hz Smooth Display',
    touchOptimization: 'High-sensitivity touch with haptic pulse engine',
    harisOsAdaptation: 'Material You token synchronization, system bar contrast compliance, gesture navigation margin.',
  },
  {
    brandId: 'oneplus',
    brandName: 'OnePlus',
    originCountry: 'China / India',
    flag: '🇨🇳',
    marketShareRank: 'Premium Speed Pioneer',
    flagshipModels: ['OnePlus 12', 'OnePlus 12R', 'OnePlus Open (Fold)', 'Nord 4 5G'],
    chipsets: ['Snapdragon 8 Gen 3', 'Snapdragon 8 Gen 2', 'Snapdragon 7+ Gen 3'],
    customOS: 'OxygenOS 14 (Trinity Engine)',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.8:9 ProXDR Display',
    refreshRate: '120Hz 4th-Gen LTPO',
    touchOptimization: 'Aqua Touch (Wet Finger Tracking)',
    harisOsAdaptation: 'Alert Slider sound mode sync, rapid frame rate pacing, dual-pane layout on OnePlus Open fold.',
  },
  {
    brandId: 'nothing',
    brandName: 'Nothing / CMF',
    originCountry: 'United Kingdom',
    flag: '🇬🇧',
    marketShareRank: 'Design Innovation Disruptor',
    flagshipModels: ['Nothing Phone (2)', 'Nothing Phone (2a) Plus', 'CMF Phone 1'],
    chipsets: ['Snapdragon 8+ Gen 1', 'MediaTek Dimensity 7350 Pro', 'Dimensity 7300'],
    customOS: 'Nothing OS 2.6 (Monochrome & Glyph)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 Flexible AMOLED',
    refreshRate: '120Hz Adaptive',
    touchOptimization: '240Hz Touch Sampling',
    harisOsAdaptation: 'Dot-matrix typographic aesthetic harmony, high-contrast monochrome dark theme alignment.',
  },
  {
    brandId: 'xiaomi',
    brandName: 'Xiaomi',
    originCountry: 'China',
    flag: '🇨🇳',
    marketShareRank: 'Top 3 Global Smartphone Titan',
    flagshipModels: ['Xiaomi 14 Ultra (Leica)', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Mix Fold 4'],
    chipsets: ['Snapdragon 8 Gen 3', 'Dimensity 9200+'],
    customOS: 'Xiaomi HyperOS',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 C8 LTPO OLED',
    refreshRate: '120Hz (3000 nits Peak)',
    touchOptimization: '2160Hz Instant Touch Response',
    harisOsAdaptation: 'High-dynamic-range image rendering, 2-column icon grid, clamped window physics.',
  },
  {
    brandId: 'redmi',
    brandName: 'Redmi',
    originCountry: 'China / India',
    flag: '🇮🇳',
    marketShareRank: 'India & Global Value Champion',
    flagshipModels: ['Redmi Note 13 Pro+ 5G', 'Redmi Note 14 Pro', 'Redmi K70 Pro', 'Redmi 13C 5G'],
    chipsets: ['MediaTek Dimensity 7200 Ultra', 'Snapdragon 7s Gen 2'],
    customOS: 'Xiaomi HyperOS India',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 1.5K Curved AMOLED',
    refreshRate: '120Hz High Refresh',
    touchOptimization: '1920Hz High-Frequency PWM Dimming',
    harisOsAdaptation: 'Energy-optimized scanline shaders, low-latency audio buffering, unclipped dock geometry.',
  },
  {
    brandId: 'vivo',
    brandName: 'Vivo',
    originCountry: 'China / India',
    flag: '🇨🇳',
    marketShareRank: 'Mobile Photography Leader',
    flagshipModels: ['Vivo X100 Pro (Zeiss)', 'Vivo V40 Pro', 'Vivo V30', 'Vivo T3 5G'],
    chipsets: ['MediaTek Dimensity 9300', 'Dimensity 9200', 'Snapdragon 7 Gen 3'],
    customOS: 'Funtouch OS 14 / OriginOS',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 8T LTPO Display',
    refreshRate: '120Hz Ultra Vision',
    touchOptimization: '300Hz Touch Sampling',
    harisOsAdaptation: 'Ultra-wide color fidelity calibration, touch target elevation for curved display edges.',
  },
  {
    brandId: 'iqoo',
    brandName: 'iQOO',
    originCountry: 'China / India',
    flag: '🇨🇳',
    marketShareRank: 'High-Performance Gaming Champion',
    flagshipModels: ['iQOO 12 5G (Supercomputing Q1)', 'iQOO Neo 9 Pro', 'iQOO Z9 Turbo'],
    chipsets: ['Snapdragon 8 Gen 3', 'Snapdragon 8 Gen 2', 'Dimensity 9300+'],
    customOS: 'Funtouch OS (Monster Mode)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 144Hz AMOLED',
    refreshRate: '144Hz Esports Display',
    touchOptimization: '2000Hz Instant Touch Response',
    harisOsAdaptation: 'Uncapped 144fps rendering loop, hardware-accelerated CRT scanline shaders.',
  },
  {
    brandId: 'oppo',
    brandName: 'Oppo',
    originCountry: 'China / Global',
    flag: '🇨🇳',
    marketShareRank: 'Global Innovation Giant',
    flagshipModels: ['Find X7 Ultra (Dual Periscope)', 'Reno 12 Pro', 'Find N3 (Fold)'],
    chipsets: ['Snapdragon 8 Gen 3', 'MediaTek Dimensity 9300'],
    customOS: 'ColorOS 14 (Aquamorphic)',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.8:9 ProXDR Display',
    refreshRate: '120Hz LTPO',
    touchOptimization: 'Splash Touch Architecture',
    harisOsAdaptation: 'Fluid physics animations, menubar clock shielding, 2-column icon distribution.',
  },
  {
    brandId: 'realme',
    brandName: 'Realme',
    originCountry: 'China / India',
    flag: '🇨🇳',
    marketShareRank: 'Youth Performance Trendsetter',
    flagshipModels: ['Realme GT 6', 'Realme GT Neo 6', 'Realme 13 Pro+ 5G', 'Narzo 70 Pro 5G'],
    chipsets: ['Snapdragon 8s Gen 3', 'Snapdragon 7s Gen 2'],
    customOS: 'Realme UI 5.0',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.8:9 6000-nit Ultra Display',
    refreshRate: '120Hz 8T LTPO',
    touchOptimization: '2500Hz Turbo Touch',
    harisOsAdaptation: 'High-brightness text contrast enhancement, clamped window coordinates.',
  },
  {
    brandId: 'motorola',
    brandName: 'Motorola / Lenovo',
    originCountry: 'United States',
    flag: '🇺🇸',
    marketShareRank: 'Foldable Pioneer & Global Icon',
    flagshipModels: ['Motorola Razr 50 Ultra', 'Edge 50 Ultra (Pantone)', 'Moto G85 5G', 'ThinkPhone 25'],
    chipsets: ['Snapdragon 8s Gen 3', 'Snapdragon 7s Gen 2', 'Dimensity 7030'],
    customOS: 'Hello UI / Ready For Desktop',
    screenCategory: 'foldable',
    aspectRatioPreference: '22:9 Ultra-Tall Foldable & 19.5:9 Edge',
    refreshRate: '165Hz pOLED',
    touchOptimization: '360Hz Gaming Touch Sampling',
    harisOsAdaptation: 'External cover screen adaptive scaling, Ready For desktop mode responsive expansion.',
  },
  {
    brandId: 'honor',
    brandName: 'Honor',
    originCountry: 'China / Global',
    flag: '🇨🇳',
    marketShareRank: 'Global Ultra-Slim Foldable Leader',
    flagshipModels: ['Honor Magic 6 Pro', 'Honor Magic V3 (Thinnest Fold)', 'Honor 200 Pro'],
    chipsets: ['Snapdragon 8 Gen 3', 'Snapdragon 8s Gen 3'],
    customOS: 'MagicOS 8.0 (AI Portal)',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.69:9 Eye-Comfort Display',
    refreshRate: '120Hz 4320Hz PWM Dimming',
    touchOptimization: 'Zero-Risk Eye Safety Touch',
    harisOsAdaptation: 'Foldable multi-window dual split, ultra-safe notch margin bounds.',
  },
  {
    brandId: 'huawei',
    brandName: 'Huawei',
    originCountry: 'China',
    flag: '🇨🇳',
    marketShareRank: 'Independent Silicon Innovator',
    flagshipModels: ['Huawei Pura 70 Ultra', 'Huawei Mate 60 Pro', 'Huawei Pocket 2'],
    chipsets: ['Kirin 9010 (Maleoon 910 GPU)', 'Kirin 9000S'],
    customOS: 'HarmonyOS NEXT / HarmonyOS 4.2',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 Xuanwu Tempered OLED',
    refreshRate: '120Hz LTPO',
    touchOptimization: '300Hz Multi-Touch Sampling',
    harisOsAdaptation: 'HarmonyOS web view compatibility, subpixel text anti-aliasing.',
  },
  {
    brandId: 'sony',
    brandName: 'Sony Xperia',
    originCountry: 'Japan',
    flag: '🇯🇵',
    marketShareRank: 'Cinematography Specialist',
    flagshipModels: ['Sony Xperia 1 VI', 'Sony Xperia 5 V', 'Sony Xperia 10 VI'],
    chipsets: ['Snapdragon 8 Gen 3', 'Snapdragon 8 Gen 2'],
    customOS: 'Sony Pure Android (Creator Mode)',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.5:9 Powered by Bravia OLED',
    refreshRate: '120Hz LTPO',
    touchOptimization: '240Hz Motion Blur Reduction Touch',
    harisOsAdaptation: 'Lossless 44.1/48kHz audio pipeline, notchless screen edge-to-edge layout utilization.',
  },
  {
    brandId: 'asus',
    brandName: 'Asus / ROG',
    originCountry: 'Taiwan',
    flag: '🇹🇼',
    marketShareRank: 'Extreme Hardcore Gaming Titan',
    flagshipModels: ['ROG Phone 8 Pro', 'Asus Zenfone 11 Ultra', 'Zenfone 10 (Compact)'],
    chipsets: ['Snapdragon 8 Gen 3', 'AniMe Vision Matrix'],
    customOS: 'ROG Gaming UI / ZenUI',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 165Hz Samsung E6 AMOLED',
    refreshRate: '165Hz Gaming Refresh',
    touchOptimization: '720Hz Touch Sampling (23ms Latency)',
    harisOsAdaptation: 'AirTrigger touch zone clearance, 165Hz ultra-high framerate audio analyzer.',
  },
  {
    brandId: 'tecno',
    brandName: 'Tecno',
    originCountry: 'Transsion / Global',
    flag: '🌍',
    marketShareRank: 'Emerging Markets Leader',
    flagshipModels: ['Tecno Camon 30 Premier', 'Phantom V Fold 2', 'Pova 6 Pro 5G'],
    chipsets: ['MediaTek Dimensity 8200 Ultimate', 'Dimensity 6080'],
    customOS: 'HiOS 14 (Transsion)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 1.5K LTPO AMOLED',
    refreshRate: '144Hz AMOLED',
    touchOptimization: 'Wet Hand Touch Technology',
    harisOsAdaptation: 'Low-bandwidth edge asset compression, clamped mobile window geometry.',
  },
  {
    brandId: 'infinix',
    brandName: 'Infinix',
    originCountry: 'Transsion / Global',
    flag: '🌍',
    marketShareRank: 'Gen-Z Gaming Value Leader',
    flagshipModels: ['Infinix GT 20 Pro (Esports)', 'Note 40 Pro+ 5G', 'Zero 30 5G'],
    chipsets: ['MediaTek Dimensity 8200 Ultimate (Pixelworks X5 Turbo)', 'Dimensity 7020'],
    customOS: 'XOS 14 (Cyber Mecha Design)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 144Hz Bezel-Less Display',
    refreshRate: '144Hz High Refresh',
    touchOptimization: '360Hz Gaming Touch Rate',
    harisOsAdaptation: 'Cyberpunk LED animation sync, balanced dual-column icon matrix.',
  },
  {
    brandId: 'itel',
    brandName: 'Itel',
    originCountry: 'Transsion / Global',
    flag: '🌍',
    marketShareRank: 'Accessible 5G Handheld Pioneer',
    flagshipModels: ['Itel ColorPro 5G (IVCO Technology)', 'Itel S24', 'Itel P55+ 5G'],
    chipsets: ['MediaTek Dimensity 6080', 'Unisoc T606'],
    customOS: 'itelOS 13',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 HD+ Punch-Hole',
    refreshRate: '90Hz Smooth Display',
    touchOptimization: '180Hz Multi-Touch',
    harisOsAdaptation: 'Lightweight CSS scanline fallback, instant response on entry-level silicon.',
  },
  {
    brandId: 'lava',
    brandName: 'Lava',
    originCountry: 'India',
    flag: '🇮🇳',
    marketShareRank: 'Make In India Smartphone Champion',
    flagshipModels: ['Lava Agni 3 5G (Dual Screen)', 'Lava Agni 2 5G', 'Blaze Curve 5G', 'Yuva 3 Pro'],
    chipsets: ['MediaTek Dimensity 7300', 'Dimensity 7050'],
    customOS: 'Clean Stock Android 14 (No Ads / No Bloat)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 1.5K Curved AMOLED + 1.74" Rear Screen',
    refreshRate: '120Hz 3D Curved AMOLED',
    touchOptimization: 'Zero-Bloat Direct Touch Pipeline',
    harisOsAdaptation: 'Curved edge touch-rejection padding, pure stock Android window compatibility.',
  },
  {
    brandId: 'micromax',
    brandName: 'Micromax',
    originCountry: 'India',
    flag: '🇮🇳',
    marketShareRank: 'Indian Hardware Pioneer',
    flagshipModels: ['Micromax IN Note 2', 'Micromax IN 2c'],
    chipsets: ['MediaTek Helio G95', 'Unisoc T610'],
    customOS: 'Pure Android Stock',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 FHD+ AMOLED',
    refreshRate: '60Hz AMOLED',
    touchOptimization: 'Standard Multi-Touch',
    harisOsAdaptation: 'High-efficiency CSS animations, unclipped 2-column icon grid.',
  },
  {
    brandId: 'hmd',
    brandName: 'HMD / Nokia',
    originCountry: 'Finland',
    flag: '🇫🇮',
    marketShareRank: 'European Repairability Leader',
    flagshipModels: ['HMD Skyline (Gen2 Repairable)', 'HMD Pulse Pro', 'Nokia XR21 (Mil-Spec)'],
    chipsets: ['Snapdragon 7s Gen 2', 'Unisoc T606'],
    customOS: 'HMD Android (Detox Mode)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 144Hz pOLED',
    refreshRate: '144Hz pOLED',
    touchOptimization: 'Glove Touch Supported (Nokia Heritage)',
    harisOsAdaptation: 'High-contrast Nordic typography mode, modular UI card layout.',
  },
  {
    brandId: 'zte',
    brandName: 'ZTE / RedMagic / Nubia',
    originCountry: 'China',
    flag: '🇨🇳',
    marketShareRank: 'Under-Display Camera & Gaming King',
    flagshipModels: ['RedMagic 9S Pro', 'Nubia Z60 Ultra (No Notch)', 'Z50S Pro'],
    chipsets: ['Snapdragon 8 Gen 3 Leading Version (3.4GHz)', 'ICE 13.5 Cooling'],
    customOS: 'REDMAGIC OS 9.5 / MyOS',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 True Full-Screen (Under-Display Camera)',
    refreshRate: '120Hz BOE Q9+ Display',
    touchOptimization: '2000Hz Multi-Finger Touch + 520Hz Shoulder Triggers',
    harisOsAdaptation: 'Zero notch obstruction — maximum full-screen desktop utilization.',
  },
  {
    brandId: 'meizu',
    brandName: 'Meizu',
    originCountry: 'China',
    flag: '🇨🇳',
    marketShareRank: 'Symmetrical Design Cult Classic',
    flagshipModels: ['Meizu 21 Pro', 'Meizu 20 Infinity (Titanium)'],
    chipsets: ['Snapdragon 8 Gen 3', 'Snapdragon 8 Gen 2'],
    customOS: 'Flyme AIOS',
    screenCategory: 'mobile',
    aspectRatioPreference: '21:9 2K+ True Color Display',
    refreshRate: '120Hz LTPO',
    touchOptimization: 'mEngine 4.0 Ultra-Haptics',
    harisOsAdaptation: 'White bezel symmetrical aesthetic matching, balanced icon alignment.',
  },
  {
    brandId: 'fairphone',
    brandName: 'Fairphone',
    originCountry: 'Netherlands',
    flag: '🇳🇱',
    marketShareRank: 'Ethical & Modular Handheld Leader',
    flagshipModels: ['Fairphone 5 (10-Year Support)', 'Fairphone 4'],
    chipsets: ['Qualcomm QCM6490 (Industrial-Grade)'],
    customOS: 'Fairphone OS (Clean Android 14)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 90Hz OLED',
    refreshRate: '90Hz OLED',
    touchOptimization: 'Standard Multi-Touch (Modular Digitizer)',
    harisOsAdaptation: 'Low-footprint eco-friendly CSS scanlines, repair-friendly UX design.',
  },
  {
    brandId: 'sharp',
    brandName: 'Sharp',
    originCountry: 'Japan',
    flag: '🇯🇵',
    marketShareRank: 'Japanese Display Master',
    flagshipModels: ['Sharp Aquos R9 (Leica)', 'Aquos sense8', 'Aquos wish3'],
    chipsets: ['Snapdragon 7+ Gen 3', 'Snapdragon 6 Gen 1'],
    customOS: 'Sharp Pure Android',
    screenCategory: 'mobile',
    aspectRatioPreference: '19.5:9 Pro IGZO OLED (1-240Hz)',
    refreshRate: '240Hz Pro IGZO OLED',
    touchOptimization: 'High-precision IGZO Touch',
    harisOsAdaptation: '240Hz variable refresh rate buffer, ultra-sharp subpixel icon rendering.',
  },
  {
    brandId: 'kyocera',
    brandName: 'Kyocera',
    originCountry: 'Japan',
    flag: '🇯🇵',
    marketShareRank: 'Ultra-Rugged Mil-Spec Specialist',
    flagshipModels: ['Kyocera DuraForce Pro 3', 'Kyocera Torque G06'],
    chipsets: ['Snapdragon 7 Gen 1'],
    customOS: 'Kyocera Android Enterprise',
    screenCategory: 'mobile',
    aspectRatioPreference: '18:9 Sapphire Shield FHD+',
    refreshRate: '60Hz Industrial Display',
    touchOptimization: 'Glove & Wet Touch Operation',
    harisOsAdaptation: 'Large 48px hit-targets, high-contrast monochrome visibility, clamped windows.',
  },
  {
    brandId: 'tcl',
    brandName: 'TCL / Alcatel',
    originCountry: 'China / Global',
    flag: '🇨🇳',
    marketShareRank: 'Paper-Like Eye Care Display Leader',
    flagshipModels: ['TCL 50 XL 5G', 'TCL 40 NxtPaper 5G', 'Alcatel 1V'],
    chipsets: ['MediaTek Dimensity 6100+', 'Helio G88'],
    customOS: 'TCL UI (NxtPaper Matte Engine)',
    screenCategory: 'mobile',
    aspectRatioPreference: '20.5:9 NxtPaper Anti-Glare Matte Display',
    refreshRate: '120Hz Matte FHD+',
    touchOptimization: 'Paper-Like Pen & Touch',
    harisOsAdaptation: 'Paper-like retro ink color profile, glare-reduced high-contrast typography.',
  },
  {
    brandId: 'htc',
    brandName: 'HTC',
    originCountry: 'Taiwan',
    flag: '🇹🇼',
    marketShareRank: 'Android Genesis Pioneer',
    flagshipModels: ['HTC U24 Pro', 'HTC Desire 22 Pro (Viverse)'],
    chipsets: ['Snapdragon 7 Gen 3'],
    customOS: 'HTC Sense Android',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 120Hz OLED',
    refreshRate: '120Hz OLED',
    touchOptimization: 'Capacitive Multi-Touch',
    harisOsAdaptation: 'Lineage tribute: Tracing heritage from 2008 HTC Dream directly to HarisOS.',
  },
  {
    brandId: 'rugged',
    brandName: 'Rugged Handhelds',
    originCountry: 'Global Rugged',
    flag: '🛡️',
    marketShareRank: 'Heavy-Duty & Massive Battery Beasts',
    flagshipModels: ['Ulefone Armor 26 Ultra', 'Blackview BV9300', 'Doogee V30 Pro', 'Unihertz Tank 3'],
    chipsets: ['MediaTek Dimensity 8020 / Dimensity 7050', '22000mAh Battery'],
    customOS: 'Duraspeed Rugged OS',
    screenCategory: 'mobile',
    aspectRatioPreference: '20:9 Heavy-Armor FHD+',
    refreshRate: '120Hz Glove-Touch IPS/OLED',
    touchOptimization: 'Reinforced Gorilla Glass Victus Touch',
    harisOsAdaptation: 'Extended hit-box allowances, zero accidental trigger margins, high-contrast badges.',
  },
];


export interface LineageMilestone {
  year: string;
  era: string;
  device: string;
  company: string;
  specs: string;
  significance: string;
  icon: string;
  isCurrentUserBranch?: boolean;
}

export const COMPUTING_LINEAGE: LineageMilestone[] = [
  {
    year: '1984',
    era: 'THE GUI REVOLUTION',
    device: 'Macintosh 128K',
    company: 'Apple Computer',
    specs: 'Motorola 68000 @ 8MHz · 128KB RAM · 512×342 1-bit B&W CRT',
    significance: 'First mass-market personal computer with graphical windows, icons, and mouse pointer. The aesthetic foundation of HarisOS.',
    icon: '🖥️',
  },
  {
    year: '2007',
    era: 'THE MOBILE TOUCH DAWN',
    device: 'iPhone (Original 2G)',
    company: 'Apple Inc.',
    specs: 'Samsung ARM 412MHz · 128MB RAM · 3.5" 320×480 Capacitive Multi-Touch',
    significance: 'Eliminated physical phone keyboards and stylus pens in favor of fluid, inertial multi-touch UI.',
    icon: '📱',
  },
  {
    year: '2008',
    era: 'THE OPEN-SOURCE MOBILE ERA',
    device: 'HTC Dream (T-Mobile G1)',
    company: 'Google / HTC / Open Handset Alliance',
    specs: 'Qualcomm MSM7201A 528MHz · 192MB RAM · Android 1.0 "Apple Pie" · 320×480',
    significance: 'First commercially released Android smartphone, initiating the lineage of over 3.9 billion Android devices today.',
    icon: '🤖',
  },
  {
    year: '2018',
    era: 'THE FLAGSHIP DISRUPTOR',
    device: 'POCO F1 (Pocophone)',
    company: 'POCO / Xiaomi',
    specs: 'Snapdragon 845 · LiquidCool Technology · 4000mAh · Flagship Speed Pioneer',
    significance: 'Disrupted the Indian and global mobile market by delivering pure flagship speed and thermal architecture at accessible reach.',
    icon: '⚡',
  },
  {
    year: '2026',
    era: 'MODERN 5G INTELLIGENCE',
    device: 'POCO M7+ 5G (India Edition)',
    company: 'POCO India / Xiaomi',
    specs: 'Snapdragon 4 Gen 2 AE (4nm) · 120Hz FHD+ (1080×2460) · 5000mAh · Adreno GPU',
    significance: 'High-density 120Hz mobile viewport. HarisOS autonomously clamps window bounds, balances dual icon columns, and prevents top-bar overlap.',
    icon: '🔥',
    isCurrentUserBranch: true,
  },
];

function getGpuInfo(): string {
  if (typeof window === 'undefined') return 'Standard WebGL Renderer';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'Standard Display Adapter';
    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'Generic Hardware Accelerated GPU';
    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return typeof renderer === 'string' ? renderer : 'Generic GPU';
  } catch {
    return 'Standard GPU Pipeline';
  }
}

export function assessUserDevice(): DeviceIdentity {
  const isClient = typeof window !== 'undefined';
  const width = isClient ? window.innerWidth : 1280;
  const height = isClient ? window.innerHeight : 800;
  const dpr = isClient ? window.devicePixelRatio || 1 : 1;
  const physicalWidth = Math.round(width * dpr);
  const physicalHeight = Math.round(height * dpr);

  const ua = isClient ? navigator.userAgent || '' : '';
  const navAny = isClient ? (navigator as any) : {};
  const platform = navAny.userAgentData?.platform || (isClient ? navigator.platform || '' : '');
  const maxTouchPoints = isClient ? navigator.maxTouchPoints || 0 : 0;
  const isTouch = maxTouchPoints > 0 || (isClient && window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  const gpu = getGpuInfo();

  // Screen Category
  let category: DeviceIdentity['category'] = 'desktop';
  if (width < 640) category = 'mobile';
  else if (width < 768) category = 'compact-tablet';
  else if (width < 1024) category = 'tablet';
  else if (width < 1440) category = 'laptop';
  else if (width < 2560) category = 'desktop';
  else category = 'ultrawide';

  // OS Detection
  let os: DeviceIdentity['os'] = 'Unknown';
  let osVersion = '';
  if (/iPad|iPhone|iPod/.test(ua) || (platform === 'MacIntel' && isTouch)) {
    os = 'iOS';
    const match = ua.match(/OS (\d+[_.]\d+)/);
    osVersion = match ? match[1].replace('_', '.') : '17+';
  } else if (/Android/.test(ua)) {
    os = 'Android';
    const match = ua.match(/Android\s([0-9.]+)/);
    osVersion = match ? match[1] : '14+';
  } else if (/Mac/.test(platform) || /Macintosh/.test(ua)) {
    os = 'macOS';
  } else if (/Win/.test(platform) || /Windows/.test(ua)) {
    os = 'Windows';
  } else if (/Linux/.test(platform) || /Linux/.test(ua)) {
    os = 'Linux';
  } else if (/CrOS/.test(ua)) {
    os = 'ChromeOS';
  }

  // Browser Detection
  let browser: DeviceIdentity['browser'] = 'Other';
  if (/Brave/.test(ua) || (navAny.brave && typeof navAny.brave.isBrave === 'function')) {
    browser = 'Brave';
  } else if (/Edg\//.test(ua)) {
    browser = 'Edge (Chromium)';
  } else if (/Chrome\//.test(ua)) {
    browser = 'Chrome (Blink)';
  } else if (/Firefox\//.test(ua)) {
    browser = 'Firefox (Gecko)';
  } else if (/Safari\//.test(ua)) {
    browser = 'Safari (WebKit)';
  }

  // Detect specific model and brand
  let brand = 'Universal Hardware';
  let model = 'Web Viewport';
  let flag = '🌐';
  let originCountry = 'Global';
  let isPoco = false;

  const orientation: 'portrait' | 'landscape' = width >= height ? 'landscape' : 'portrait';
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);
  const minPhysDim = Math.min(physicalWidth, physicalHeight);
  const maxPhysDim = Math.max(physicalWidth, physicalHeight);

  // 1. POCO India / Global detection (including Poco M7+ Indian version - orientation independent)
  const isPocoDimensions =
    os === 'Android' &&
    ((minPhysDim >= 1000 && minPhysDim <= 1200 && maxPhysDim >= 2300 && maxPhysDim <= 2600) ||
      (minDim >= 380 && minDim <= 430 && maxDim >= 780 && maxDim <= 960));

  const isPocoOrXiaomiPattern =
    /POCO|2406|2404|2312|2201|2109|M2\d{3}|2410|2412/i.test(ua) ||
    /POCO/i.test(navAny.userAgentData?.model || '') ||
    (os === 'Android' && /Adreno\s*(613|619)/i.test(gpu));

  if (isPocoOrXiaomiPattern || (os === 'Android' && isPocoDimensions)) {
    isPoco = true;
    brand = 'POCO';
    model = 'POCO M7+ 5G (India Edition)';
    flag = '🇮🇳';
    originCountry = 'India / Global';
  } else if (/Redmi|2307|2309|2311|2405|2407/i.test(ua) || /Redmi/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Redmi';
    model = 'Redmi Note 13 / 14 Pro+ 5G';
    flag = '🇮🇳';
    originCountry = 'India / Xiaomi';
  } else if (/Xiaomi|Mi\s|2204|2208|2304/i.test(ua) || /Xiaomi/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Xiaomi';
    model = 'Xiaomi 14 Ultra';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Samsung|SM-[A-Z0-9]+|Galaxy|GT-[A-Z0-9]+/i.test(ua) || /Samsung/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Samsung';
    model = 'Galaxy S24 Ultra / A-Series';
    flag = '🇰🇷';
    originCountry = 'South Korea';
  } else if (/Pixel\s*(9|8|7|6|5|4|3|Fold|Pro|a)?/i.test(ua) || /Pixel/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Google';
    model = 'Pixel 9 Pro XL';
    flag = '🇺🇸';
    originCountry = 'United States';
  } else if (/OnePlus|ONEPLUS|CPH2581|CPH2609|NE2211/i.test(ua) || /OnePlus/i.test(navAny.userAgentData?.model || '')) {
    brand = 'OnePlus';
    model = 'OnePlus 12 / Open';
    flag = '🇨🇳';
    originCountry = 'China / India';
  } else if (/Nothing|A063|A065|A142|CMF/i.test(ua) || /Nothing/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Nothing';
    model = 'Nothing Phone (2a) / CMF Phone 1';
    flag = '🇬🇧';
    originCountry = 'United Kingdom';
  } else if (/Motorola|Moto\s|XT2\d{3}|XT1\d{3}|Razr|Edge\s*50/i.test(ua) || /Motorola/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Motorola';
    model = 'Edge 50 Ultra / Razr 50';
    flag = '🇺🇸';
    originCountry = 'United States';
  } else if (/iQOO|I22|I23/i.test(ua) || /iQOO/i.test(navAny.userAgentData?.model || '')) {
    brand = 'iQOO';
    model = 'iQOO 12 / Neo 9 Pro';
    flag = '🇨🇳';
    originCountry = 'China / India';
  } else if (/Vivo|V23|V22|V21|V20/i.test(ua) || /Vivo/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Vivo';
    model = 'Vivo X100 Pro / V40';
    flag = '🇨🇳';
    originCountry = 'China / India';
  } else if (/Realme|RMX\d{4}/i.test(ua) || /Realme/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Realme';
    model = 'Realme GT 6 / 13 Pro+';
    flag = '🇨🇳';
    originCountry = 'China / India';
  } else if (/Oppo|CPH\d{4}|Find\s*X/i.test(ua) || /Oppo/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Oppo';
    model = 'Find X7 Ultra / Reno 12';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Honor|ANY-LX|BKL-|BVY-/i.test(ua) || /Honor/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Honor';
    model = 'Honor Magic 6 Pro';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Huawei|HMA-|VOG-|ELS-|Pura|Mate\s*60/i.test(ua) || /Huawei/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Huawei';
    model = 'Huawei Pura 70 Ultra';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Sony|Xperia|XQ-[A-Z0-9]+/i.test(ua) || /Sony/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Sony';
    model = 'Xperia 1 VI (Bravia OLED)';
    flag = '🇯🇵';
    originCountry = 'Japan';
  } else if (/ASUS|ROG\s*Phone|Zenfone/i.test(ua) || /ASUS/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Asus ROG';
    model = 'ROG Phone 8 Pro (165Hz)';
    flag = '🇹🇼';
    originCountry = 'Taiwan';
  } else if (/TECNO|CK|LH|KJ/i.test(ua) || /TECNO/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Tecno';
    model = 'Tecno Camon 30 Premier';
    flag = '🌍';
    originCountry = 'Transsion';
  } else if (/Infinix|X6\d{3}|X5\d{3}/i.test(ua) || /Infinix/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Infinix';
    model = 'Infinix GT 20 Pro';
    flag = '🌍';
    originCountry = 'Transsion';
  } else if (/itel|W\d{4}|S\d{4}/i.test(ua) || /itel/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Itel';
    model = 'Itel ColorPro 5G';
    flag = '🌍';
    originCountry = 'Transsion';
  } else if (/LAVA|LXX|Agni|Blaze|Yuva/i.test(ua) || /Lava/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Lava';
    model = 'Lava Agni 3 5G';
    flag = '🇮🇳';
    originCountry = 'India';
  } else if (/Micromax|IN\s*Note|YU/i.test(ua) || /Micromax/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Micromax';
    model = 'Micromax IN Note 2';
    flag = '🇮🇳';
    originCountry = 'India';
  } else if (/HMD|Nokia|TA-\d{4}/i.test(ua) || /HMD|Nokia/i.test(navAny.userAgentData?.model || '')) {
    brand = 'HMD / Nokia';
    model = 'HMD Skyline / Nokia XR21';
    flag = '🇫🇮';
    originCountry = 'Finland';
  } else if (/ZTE|Nubia|REDMAGIC|NX\d{3}/i.test(ua) || /Nubia|REDMAGIC/i.test(navAny.userAgentData?.model || '')) {
    brand = 'ZTE RedMagic';
    model = 'RedMagic 9S Pro / Nubia Z60';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Meizu|M\d{3}|MEIZU/i.test(ua) || /Meizu/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Meizu';
    model = 'Meizu 21 Pro';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/Fairphone|FP[345]/i.test(ua) || /Fairphone/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Fairphone';
    model = 'Fairphone 5 (Modular)';
    flag = '🇳🇱';
    originCountry = 'Netherlands';
  } else if (/Sharp|SH-\d{2}|AQUOS/i.test(ua) || /Sharp/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Sharp';
    model = 'Sharp Aquos R9';
    flag = '🇯🇵';
    originCountry = 'Japan';
  } else if (/Kyocera|KYV|DuraForce/i.test(ua) || /Kyocera/i.test(navAny.userAgentData?.model || '')) {
    brand = 'Kyocera';
    model = 'Kyocera DuraForce Pro 3';
    flag = '🇯🇵';
    originCountry = 'Japan';
  } else if (/TCL|Alcatel|T\d{3}/i.test(ua) || /TCL/i.test(navAny.userAgentData?.model || '')) {
    brand = 'TCL';
    model = 'TCL 50 XL NxtPaper';
    flag = '🇨🇳';
    originCountry = 'China';
  } else if (/HTC|2Q\d{3}/i.test(ua) || /HTC/i.test(navAny.userAgentData?.model || '')) {
    brand = 'HTC';
    model = 'HTC U24 Pro';
    flag = '🇹🇼';
    originCountry = 'Taiwan';
  } else if (/Blackview|Ulefone|Doogee|Oukitel|Unihertz/i.test(ua)) {
    brand = 'Rugged Handheld';
    model = 'Armor 26 Ultra / BV9300';
    flag = '🛡️';
    originCountry = 'Global Rugged';
  } else if (os === 'Android') {
    brand = 'Android Handheld';
    model = 'Modern 5G Handheld';
    flag = '🤖';
    originCountry = 'Global';
  } else if (os === 'iOS') {
    brand = 'Apple';
    flag = '🇺🇸';
    originCountry = 'United States';
    if (category === 'tablet') {
      model = 'iPad Pro / Air';
    } else if (maxDim >= 890 || maxPhysDim >= 1290) {
      model = 'iPhone 16 Pro Max (Super Retina XDR)';
    } else if (maxDim >= 840) {
      model = 'iPhone 16 Pro (Super Retina XDR)';
    } else {
      model = 'iPhone Retina Display';
    }
  } else if (os === 'macOS') {
    brand = 'Apple';
    flag = '🇺🇸';
    originCountry = 'United States';
    model = /Apple/.test(gpu) ? 'MacBook Pro (Apple Silicon)' : 'Macintosh Desktop';
  } else if (os === 'Windows') {
    brand = 'PC';
    flag = '💻';
    originCountry = 'Global';
    model = category === 'ultrawide' ? '4K Ultrawide Workstation' : 'Windows 11 Laptop / PC';
  } else if (os === 'Linux') {
    brand = 'Linux';
    flag = '🐧';
    originCountry = 'Global';
    model = 'ThinkPad / Developer Rig';
  }

  // Aspect ratio calculation
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const div = gcd(Math.round(width), Math.round(height));
  let aspectRatio = `${Math.round(width / div)}:${Math.round(height / div)}`;
  const ratioVal = width / height;
  if (Math.abs(ratioVal - 9 / 20.5) < 0.1 || Math.abs(ratioVal - 9 / 19.5) < 0.1) {
    aspectRatio = '20.5:9 Tall Mobile Screen';
  } else if (Math.abs(ratioVal - 20.5 / 9) < 0.15 || Math.abs(ratioVal - 19.5 / 9) < 0.15) {
    aspectRatio = '20.5:9 Mobile Landscape';
  } else if (Math.abs(ratioVal - 9 / 16) < 0.08) {
    aspectRatio = '9:16 Standard Mobile';
  } else if (Math.abs(ratioVal - 16 / 9) < 0.08) {
    aspectRatio = '16:9 Widescreen';
  } else if (Math.abs(ratioVal - 16 / 10) < 0.08) {
    aspectRatio = '16:10 Golden Display';
  } else if (ratioVal > 2.1 && height >= 600) {
    aspectRatio = '21:9 Cinematic Ultrawide';
  } else if (ratioVal > 2.1) {
    aspectRatio = '20.5:9 Panoramic Landscape';
  }

  const fullName = `${brand} ${model}`;
  const cores = isClient ? navigator.hardwareConcurrency || 8 : 8;
  const memoryGb = navAny.deviceMemory;
  const conn = navAny.connection;
  const connectionSpeed = conn?.effectiveType ? `${conn.effectiveType.toUpperCase()} (5G Ready)` : 'High-Speed Broadband';

  let lineageStage: DeviceIdentity['lineageStage'] = 'modern-flagship-2026';
  if (isPoco) lineageStage = 'modern-flagship-2026';
  else if (os === 'Android') lineageStage = 'modern-flagship-2026';
  else if (os === 'iOS') lineageStage = 'modern-flagship-2026';

  return {
    brand,
    model,
    fullName,
    flag,
    originCountry,
    os,
    osVersion,
    browser,
    gpuRenderer: gpu,
    category,
    isPoco,
    isTouch,
    dpr,
    width,
    height,
    physicalWidth,
    physicalHeight,
    aspectRatio,
    orientation,
    cores,
    memoryGb,
    connectionSpeed,
    lineageStage,
  };
}

export interface DeviceProspectCalculations {
  viewportCSS: string;
  viewportPhysical: string;
  dprScale: string;
  aspectRatioLabel: string;
  screenCategoryLabel: string;
  chipsetGPU: string;
  computeCores: string;
  memoryRAM: string;
  networkPipeline: string;
  pointerErgonomics: string;
  colorGamut: string;
  windowGeometryPlan: string;
  iconGridMatrixPlan: string;
  menubarGuardPlan: string;
  audioPipelinePlan: string;
  crtShaderPlan: string;
  lineageSummary: string;
  terminalLogSteps: string[];
}

export function calculateEndToEndProspects(d: DeviceIdentity): DeviceProspectCalculations {
  const isMobile = d.category === 'mobile' || d.category === 'compact-tablet';
  const isP3 = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(color-gamut: p3)').matches;
  const isLandscape = d.orientation === 'landscape';
  const isShortLandscape = d.height < 520 && isLandscape;

  return {
    viewportCSS: `${d.width} × ${d.height} px (${d.orientation.toUpperCase()})`,
    viewportPhysical: `${d.physicalWidth} × ${d.physicalHeight} native px`,
    dprScale: `${d.dpr}x Subpixel Density`,
    aspectRatioLabel: d.aspectRatio,
    screenCategoryLabel:
      d.category === 'mobile'
        ? isLandscape
          ? 'Mobile Handheld (Landscape Mode)'
          : 'Mobile Handheld (Portrait Mode)'
        : d.category === 'compact-tablet'
        ? 'Compact Tablet / Foldable'
        : d.category === 'tablet'
        ? 'Tablet Canvas'
        : d.category === 'laptop'
        ? 'Laptop Screen'
        : d.category === 'desktop'
        ? 'Desktop Monitor'
        : 'Ultrawide Panoramic Display',
    chipsetGPU: d.gpuRenderer.length > 30 ? d.gpuRenderer.slice(0, 30) + '...' : d.gpuRenderer,
    computeCores: `${d.cores} Logical Hardware Cores`,
    memoryRAM: d.memoryGb ? `${d.memoryGb} GB Hardware Memory` : 'Hardware Accelerated Buffer',
    networkPipeline: `${d.connectionSpeed} · Direct Cloudflare Edge CDN`,
    pointerErgonomics: d.isTouch
      ? 'Capacitive Multi-Touch (44px Minimum Apple HIG & Google Material Targets)'
      : 'Hardware Mouse / Trackpad (Subpixel Pointer Precision)',
    colorGamut: isP3 ? 'Display P3 Wide Color (1.07B Colors)' : 'Standard sRGB Matrix (16.7M Colors)',
    windowGeometryPlan: isShortLandscape
      ? 'Clamped to calc(100% - 68px) height at top: 32px (Safely centered between menubar & dock)'
      : isMobile
      ? 'Clamped to calc(100% - 100px) height at top: 34px (Safely above floating dock)'
      : 'Freehand physics draggable cascade with titlebar edge clamping',
    iconGridMatrixPlan: isShortLandscape
      ? 'Adaptive 4-Column × 3-Row Landscape Grid · Full Horizontal Spread · Zero Dock Collision'
      : isMobile
      ? 'Balanced 2-Column Grid (Portfolio Col 1, Apps Col 2) · Zero Cutoffs · Trash anchored'
      : 'Structured multi-column desktop array with 38px retro icons & +2px spacing',
    menubarGuardPlan: isMobile
      ? 'Compressed menus (<640px) hiding File/View/Special (accessible via Apple logo) · Zero Clock Overlap'
      : 'Expanded desktop menubar with studio music badge and real-time clock',
    audioPipelinePlan: 'HTML5 Audio + 16-Band Real-Time LED Analyser (Kanye West - Flashing Lights)',
    crtShaderPlan: d.cores >= 6
      ? 'High-frequency subpixel scanlines with phosphor glass barrel distortion'
      : 'Eco-optimized CSS scanlines for 60 FPS battery efficiency',
    lineageSummary: `1984 Mac 128K ➔ 2007 iPhone ➔ 2008 Android HTC Dream ➔ 2018 POCO F1 ➔ 2026 ${d.model}`,
    terminalLogSteps: [
      `[0.1s] PROBE: Haris Neural Device Sensor initialized.`,
      `[0.3s] HARDWARE: Identified ${d.flag || '📱'} ${d.fullName} (${d.originCountry || d.os}).`,
      `[0.5s] ORIENTATION: ${d.orientation.toUpperCase()} detected (${d.width}x${d.height} CSS @ ${d.aspectRatio}).`,
      `[0.7s] BRAND PROFILE: Calibrated layout for worldwide smartphone profile.`,
      `[0.9s] GPU TIER: ${d.gpuRenderer.slice(0, 32)} (WebGL Hardware Accelerated).`,
      `[1.3s] ERGONOMICS: ${d.isTouch ? 'Capacitive touch verified. Min 44px hit-targets engaged.' : 'Precision mouse pointer engaged.'}`,
      `[1.7s] 42-YR LINEAGE: Traced branch from 1984 Macintosh to ${d.model}.`,
      `[2.1s] APERTURE: ${isShortLandscape ? 'Window clamped to calc(100% - 68px) for landscape mobile.' : 'Window heights clamped above floating dock.'}`,
      `[2.4s] DESKTOP MATRIX: ${isShortLandscape ? 'Engaged 4-Column x 3-Row landscape grid.' : 'Balanced 2-column icon grid locked.'}`,
      `[2.7s] MENUBAR GUARD: Pinned clock protected against Anime/Music overlap.`,
      `[3.0s] AUDIO STREAM: HTML5 Studio Master MP3 pipeline unlocked and ready.`,
      `[3.2s] CALIBRATION COMPLETE: Viewport 100% tailored for Haris Kumaar Portfolio.`,
    ],
  };
}

export function getUserLineage(d: DeviceIdentity): LineageMilestone[] {
  const customMilestone: LineageMilestone = {
    year: '2026',
    era: d.isPoco ? 'MODERN 5G DISRUPTION' : 'MODERN INTELLIGENT HARDWARE',
    device: `${d.flag ? d.flag + ' ' : ''}${d.fullName}`,
    company: `${d.brand}${d.originCountry ? ' (' + d.originCountry + ')' : ''}`,
    specs: d.isPoco
      ? 'Snapdragon 4 Gen 2 AE (4nm) · 120Hz FHD+ (1080×2460) · 5000mAh · Adreno GPU'
      : `${d.width}×${d.height}px CSS (${d.physicalWidth}×${d.physicalHeight} native @ ${d.dpr}x DPR) · ${d.os} Platform`,
    significance: `Active viewport detected. HarisOS autonomously tailored UI geometry, clamped window coordinates, and balanced dual-column icon matrix.`,
    icon: d.category === 'mobile' ? (d.flag || '📱') : d.category === 'tablet' ? '📟' : '💻',
    isCurrentUserBranch: true,
  };

  return [
    ...COMPUTING_LINEAGE.slice(0, 4),
    customMilestone,
  ];
}

// ============================================================================
// UPCOMING / NEXT-GEN DEVICE VIEWPORTS (2026-2027 UX RESEARCH ROADMAP)
// ============================================================================

export interface UpcomingDeviceProfile {
  id: string;
  name: string;
  brand: string;
  releaseTimeline: string;
  flag: string;
  category: 'ultra-thin' | 'tri-fold' | 'foldable' | 'rollable' | 'spatial' | 'ar-glasses';
  viewportWidth: number;
  viewportHeight: number;
  dpr: number;
  aspectRatio: string;
  displayTech: string;
  chipset: string;
  uxResearchChallenge: string;
  divergenceStrategy: string;
}

export type NextGenDeviceProfile = UpcomingDeviceProfile;

export const UPCOMING_NEXTGEN_DEVICES: UpcomingDeviceProfile[] = [
  {
    id: 'iphone-17-air',
    name: 'Apple iPhone 17 Air / Slim',
    brand: 'Apple',
    releaseTimeline: 'Fall 2026 Flagship',
    flag: '🇺🇸',
    category: 'ultra-thin',
    viewportWidth: 416,
    viewportHeight: 908,
    dpr: 3.0,
    aspectRatio: '20:9 Ultra-Tall Profile',
    displayTech: '6.6" 120Hz ProMotion Super Retina XDR (5.5mm Titanium chassis)',
    chipset: 'Apple A19 Pro Neural Bionic (2nm TSMC)',
    uxResearchChallenge: 'Ultra-thin chassis reduces thumb leverage by 24%, making top-screen UI elements harder to reach during one-handed operation.',
    divergenceStrategy: '2-Half Mobile Viewport Divergence with invisible momentum scroll. Top half hosts classic desktop; bottom half docks interactive multimedia deck within thumb reach.',
  },
  {
    id: 'huawei-mate-xt-trifold',
    name: 'Huawei Mate XT Ultimate Tri-Fold',
    brand: 'Huawei',
    releaseTimeline: '2026 Commercial Tri-Fold',
    flag: '🇨🇳',
    category: 'tri-fold',
    viewportWidth: 1080,
    viewportHeight: 844,
    dpr: 2.8,
    aspectRatio: '16:11 (Unfolded 10.2" 3K OLED)',
    displayTech: '3-Screen Z-Hinge Dual-Joint Flexible LTPO OLED',
    chipset: 'Kirin 9010 5G Neural Architecture',
    uxResearchChallenge: 'Dynamic aspect ratio transformations across 3 states: 1-screen phone (20.5:9) ➔ 2-screen square (10:11) ➔ 3-screen widescreen (16:11).',
    divergenceStrategy: 'Polymorphic Viewport Engine: Automatically switches from 2-half invisible vertical scroll on single screen to side-by-side desktop console when unfolded.',
  },
  {
    id: 'samsung-z-fold-7',
    name: 'Samsung Galaxy Z Fold 7 Flex-G',
    brand: 'Samsung',
    releaseTimeline: 'Mid 2026 Flagship',
    flag: '🇰🇷',
    category: 'foldable',
    viewportWidth: 412,
    viewportHeight: 960,
    dpr: 3.5,
    aspectRatio: '22:9 Ultra-Tall Cover Screen',
    displayTech: '6.3" Outer 22:9 LTPO + 7.8" Inner 18:22 Dynamic AMOLED 2X',
    chipset: 'Snapdragon 8 Gen 4 for Galaxy (3nm)',
    uxResearchChallenge: '22:9 cover screen is excessively elongated, causing extreme vertical visual sprawl if content is unsegmented.',
    divergenceStrategy: 'Snap-Diverged Viewport Split: Upper 50% displays active portfolio OS; lower 50% anchors quick-switch media deck without visible scrollbars.',
  },
  {
    id: 'motorola-rollable-concept',
    name: 'Motorola / Tecno Rollable Concept',
    brand: 'Motorola / Tecno',
    releaseTimeline: '2026-2027 Experimental',
    flag: '🇺🇸',
    category: 'rollable',
    viewportWidth: 412,
    viewportHeight: 1080,
    dpr: 2.75,
    aspectRatio: 'Motorized Expansion (18:9 ➔ 23.5:9)',
    displayTech: '5.0" Compact Expanding to 6.5" Continuous Rollable pOLED',
    chipset: 'Snapdragon 8s Gen 4 Neural Engine',
    uxResearchChallenge: 'Viewport physical height expands dynamically in real-time during user interaction as the internal micro-motor unrolls.',
    divergenceStrategy: 'Adaptive Damping Invisible Scroll: Dynamically recalibrates snap thresholds as the viewport rolls open, keeping bezel frame aligned.',
  },
  {
    id: 'vision-pro-spatial-webkit',
    name: 'Apple Vision Pro (Spatial WebKit)',
    brand: 'Apple',
    releaseTimeline: 'visionOS 3 (2026)',
    flag: '🥽',
    category: 'spatial',
    viewportWidth: 1280,
    viewportHeight: 720,
    dpr: 2.0,
    aspectRatio: '16:9 Floating Spatial Window',
    displayTech: 'Dual 4K Micro-OLED (23 Million Pixels) Spatial Canvas',
    chipset: 'Apple M2 + R1 Real-Time Dual Core',
    uxResearchChallenge: 'Eye-tracking gaze pointers induce saccadic eye fatigue if layout requires continuous vertical scanning across tall bounds.',
    divergenceStrategy: 'Centralized Spatial Gaze Clustering: Keeps core interactive elements within comfortable 30° ocular field, with translucent retro CRT bezel.',
  },
  {
    id: 'meta-orion-ar-hud',
    name: 'Meta Orion Holographic AR Glasses',
    brand: 'Meta',
    releaseTimeline: '2027 Consumer Developer Edition',
    flag: '👓',
    category: 'ar-glasses',
    viewportWidth: 640,
    viewportHeight: 480,
    dpr: 1.5,
    aspectRatio: '4:3 Micro-HUD Waveguide',
    displayTech: 'Silicon Carbide Optical Waveguides + Micro-LED Projectors (70° FoV)',
    chipset: 'Custom Meta AR Neural Compute Silicon',
    uxResearchChallenge: 'Optical see-through ambient wash: complex graphics become illegible in direct sunlight.',
    divergenceStrategy: 'Ultra-High-Contrast Retro Monochromatic Mode: High-contrast green phosphor CRT styling with neural voice & ring-gesture navigation.',
  },
];

// ============================================================================
// DEVICEAI NEURAL VIEWPORT LEARNING & KNOWLEDGE AWAKENING ENGINE
// ============================================================================

export interface NeuralViewportState {
  awakened: boolean;
  trainingEpochs: number;
  neuralLoss: number;
  lastTrainedTimestamp: string;
  trainedViewportsCount: number;
  activeProfile: string;
  divergenceRatio: string;
  invisibleScrollDamping: number;
  safeInsetTop: number;
  safeInsetBottom: number;
}

const STORAGE_KEY = 'haris_device_ai_neural_knowledge_v1';

export function getNeuralViewportState(currentDevice?: DeviceIdentity): NeuralViewportState {
  if (typeof window === 'undefined') {
    return {
      awakened: true,
      trainingEpochs: 1024,
      neuralLoss: 0.0034,
      lastTrainedTimestamp: new Date().toISOString(),
      trainedViewportsCount: GLOBAL_SMARTPHONE_BRANDS.length + UPCOMING_NEXTGEN_DEVICES.length,
      activeProfile: 'POCO M7+ (India Edition)',
      divergenceRatio: '50/50 Dual-Half',
      invisibleScrollDamping: 0.88,
      safeInsetTop: 34,
      safeInsetBottom: 24,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed;
    }
  } catch {}

  const device = currentDevice || assessUserDevice();
  const defaultState: NeuralViewportState = {
    awakened: true,
    trainingEpochs: 1024,
    neuralLoss: 0.0042,
    lastTrainedTimestamp: new Date().toISOString(),
    trainedViewportsCount: GLOBAL_SMARTPHONE_BRANDS.length + UPCOMING_NEXTGEN_DEVICES.length,
    activeProfile: device.fullName,
    divergenceRatio: '50/50 Dual-Half Split',
    invisibleScrollDamping: 0.88,
    safeInsetTop: device.category === 'mobile' ? 34 : 12,
    safeInsetBottom: device.category === 'mobile' ? 24 : 8,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  } catch {}

  return defaultState;
}

export function trainNeuralViewportModel(epochsToAdd = 256): NeuralViewportState {
  const current = getNeuralViewportState();
  const newEpochs = current.trainingEpochs + epochsToAdd;
  const newLoss = Math.max(0.0012, Number((current.neuralLoss * 0.82).toFixed(4)));

  const updated: NeuralViewportState = {
    ...current,
    awakened: true,
    trainingEpochs: newEpochs,
    neuralLoss: newLoss,
    lastTrainedTimestamp: new Date().toISOString(),
    trainedViewportsCount: GLOBAL_SMARTPHONE_BRANDS.length + UPCOMING_NEXTGEN_DEVICES.length,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }

  return updated;
}

export function getLearnedDivergenceMetrics(width: number, height: number): {
  divergenceRatio: string;
  snapDamping: number;
  isUltraTall: boolean;
  recommendedHalfHeight: string;
  bezelExtensionPadding: string;
} {
  const ratio = height / (width || 1);
  const isUltraTall = ratio >= 2.05; // 20.5:9 or taller

  return {
    divergenceRatio: isUltraTall ? '50/50 Ultra-Tall Diverged' : '52/48 Balanced Diverged',
    snapDamping: isUltraTall ? 0.92 : 0.85,
    isUltraTall,
    recommendedHalfHeight: 'min-h-[100dvh]',
    bezelExtensionPadding: isUltraTall ? 'pb-8' : 'pb-4',
  };
}




