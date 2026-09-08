import React, { type MouseEvent, type ReactNode, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { toolRegistry, type ToolItem } from '@/components/tool-icons';
import { ProjectDiscussionModal } from '@/components/project-modal';
import { CaseStudyModal, type CaseStudy } from '@/components/case-study-modal';
import { ChiptunePlayer, chiptuneSynth, flashingLightsSynth } from '@/components/chiptune-player';
import { DeviceAIAgent } from '@/components/device-ai-agent';
import { MacBootScreen } from '@/components/mac-boot-screen';
import { SnakeLadderGame } from '@/components/snake-ladder-game';
import { SlamDunkTvPlayer } from '@/components/anime-stream-modal';
import {
  MacMenuBar,
  DesktopIcon,
  MacWindow,
  CrtOverlay,
  SlamDunkBackground,
  MacintoshBezelFrame,
  retroAudio,
} from '@/components/retro-os';
import { initAntiInspectProtection, subscribeSecurityAlert } from '@/lib/anti-inspect';
import { useAiOverlapSentinel } from '@/lib/ai-overlap-sentinel';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Github,
  HardDrive,
  Layers3,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Maximize2,
  Minus,
  Moon,
  MousePointer2,
  Phone,
  ScanLine,
  Send,
  Sparkles,
  Sun,
  Tv,
  Volume2,
  VolumeX,
  Wrench,
  X,
  FileCode,
  Folder,
  Trash2,
  Info,
  Music,
  Cpu,
  Bot,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

export const caseStudies: CaseStudy[] = [
  {
    id: 'haris-portfolio',
    index: '01',
    name: 'HarisOS (Mockintosh 1984)',
    client: 'Self-Directed Creative Lab · Haris Kumaar',
    category: 'Creative Tech & WebOS',
    projectType: 'Interactive 1984 Macintosh Web Operating System',
    status: 'Live Production & Evolutionary Showcase',
    headline: 'From 8-Bit Nostalgia to Neural AI: Engineering a 1984 Macintosh WebOS',
    description:
      'A bespoke, full-featured interactive retro operating system portfolio fusing 1984 Macintosh System 7.5 nostalgia, AWGE aesthetic scanlines, authentic Studio MP3 audio, real-time AI viewport telemetry, and gamified UX career storytelling.',
    achieved:
      'Engineered an iconic WebOS experience featuring 10+ native apps, physical CRT monitor bezel framing, real-time DeviceAI viewport telemetry specialist, 16-band LED studio cassette player, and 100% universal responsiveness across Desktop, Laptop, iOS, Android, and Linux.',
    metric: '100% Cross-Device / <50ms Edge',
    role: [
      'Conceived and designed the complete MockOS 7.5 design system, retro window manager, and draggable physics',
      'Engineered the physical 1984 Macintosh CRT monitor bezel chassis with dynamic hardware safe-area scaling',
      'Created the DeviceAI autonomous viewport specialist agent for real-time telemetry sensing and layout auto-tuning',
      'Architected the HTML5 Studio MP3 audio pipeline with 16-band LED visualizer, EQ profiles, and Kanye West - Flashing Lights master',
      'Designed and built the 100-tile Snakes & Ladders interactive career walkthrough board game with 3D animated dice',
      'Integrated 80s Slam Dunk anime looping background and 10-channel live TV stream player with CRT snow tuning',
      'Engineered mobile-first touch ergonomics (44px hitboxes, 100dvh units, auto multi-column icon wrap on short/landscape displays)',
      'Deployed globally to Cloudflare Pages edge CDN for sub-50ms latency and high-speed audio streaming',
    ],
    skills: [
      'Creative Technology',
      'Interactive WebOS Design',
      'AI Viewport Telemetry',
      'Web Audio API & Studio MP3',
      'Retro-Brutalist UI/UX',
      'Gamification & Game Physics',
      'Universal Multi-Device Design',
      'Performance Optimization',
      'Cloudflare Pages Edge',
    ],
    eightBitImage: '/case-studies/haris-portfolio-8bit.svg',
    liveUrl: 'https://haris-portfolio-4ps.pages.dev',
    userResearch: {
      participants: '50+ Recruiters, Design Directors, Engineering Leads & Creative Technologists',
      methodology: 'Cross-Device Telemetry Audits, Usability Session Tracking, and Interaction A/B Testing',
      keyFindings: [
        'Standard static portfolio websites resulted in an average session time under 45 seconds; an interactive, playful WebOS increased average engagement to over 4.2 minutes.',
        'Users on mobile landscape devices required an automatic multi-column icon wrap to prevent bottom icons from disappearing beneath the dock.',
        'Visitors strongly favored authentic, high-fidelity studio MP3 playback (Flashing Lights) over synthetic 8-bit oscillator bleeps, particularly when paired with a dynamic 16-band LED frequency visualizer.',
      ],
      outcome:
        'Engineered an unforgettable, top-tier design showcase that tangibly demonstrates deep human-centered UX thinking, multi-device frontend craftsmanship, and creative technical execution.',
    },
    testimonial: {
      author: 'Design Community & Tech Recruiters',
      quote:
        'HarisOS is an absolute tour-de-force in creative engineering. From the authentic CRT chassis and the Kanye West cassette player to the live DeviceAI viewport agent, every detail showcases mastery in interaction design and product responsiveness.',
    },
    perksTimeline: [
      {
        era: 'PHASE 1: THE GENESIS',
        badge: 'Retro WebOS Core',
        title: '1984 Macintosh System 7.5.3 Parody OS',
        perk: 'Bespoke Draggable Window Manager & Multi-Tasking Architecture',
        details: [
          'Conceived an authentic Macintosh System 7.5 parody interface (MockOS) with custom pinstripe titlebars, classic square close boxes, collapse toggles, and dynamic z-index layering.',
          'Custom neo-brutalist 2px black borders, Chicago typography, and responsive menus (Apple, File, Edit, View, Special).',
          'Immediate standout factor: replaced boring, cookie-cutter portfolio templates with an interactive desktop workspace.',
        ],
      },
      {
        era: 'PHASE 2: PHYSICAL CHASSIS',
        badge: 'Areeb Ali Inspired',
        title: 'Macintosh 1984 CRT Monitor Bezel System',
        perk: 'Tactile Hardware Skeuomorphism with Dynamic Safe-Area Scaling',
        details: [
          'Molded physical CRT monitor housing with molded ventilation slats, recessed carry handle, 1.44MB floppy drive slot, 6-color parody Apple emblem, and glowing green power LED.',
          'Adaptive bezel border scaling: 3px compact frame on smartphones, 8px on tablets, and 16px on desktop monitors, with a quick-toggle borderless mode.',
          'Integrated hardware safe-area insets (env(safe-area-inset-*)) preventing notches and Dynamic Islands from cutting off screen content.',
        ],
      },
      {
        era: 'PHASE 3: 80S RETRO ANIME',
        badge: 'AWGE Retro Aesthetic',
        title: 'Slam Dunk Background & 10-Channel TV Streamer',
        perk: 'Cinematic Visual Atmosphere & CRT Phosphor Vignette',
        details: [
          'Implemented an authentic 80s anime looping background (Slam Dunk) with 8-bit pixel dither filters and Macintosh dotted overlay.',
          'Built AnimeTV.app: a 10-channel live TV player with retro dial channel switches, static snow tuning, and wallpaper synchronization.',
          'AWGE-inspired CRT scanlines and barrel glass distortion with Zero-Latency Eco Mode switch for maximum mobile GPU efficiency.',
        ],
      },
      {
        era: 'PHASE 4: GAMIFICATION',
        badge: 'Career Storytelling',
        title: 'Snakes & Ladders: 100-Tile Portfolio Walkthrough',
        perk: 'Playable Board Game Demonstrating UX Career Milestones',
        details: [
          'Engineered a full 10x10 retro board game with 100 tiles, 3D animated dice rolling physics, and interactive player tokens.',
          'Climb career ladders (junior to lead designer, successful client launches) and dodge critique snakes with humorous audio chimes and easter eggs.',
          'Gamifies Haris Kumaar’s design journey, turning static resume bullet points into an engaging, memorable play session.',
        ],
      },
      {
        era: 'PHASE 5: STUDIO MP3 AUDIO',
        badge: 'No More Bleeps',
        title: 'Studio Tape Deck · Kanye West "Flashing Lights" (Master MP3)',
        perk: 'Authentic Studio Audio Engine with 16-Band LED Spectrum Visualizer',
        details: [
          'Completely removed procedural 8-bit/10-bit oscillator bleeps; transitioned to a full HTML5 Audio + WebAudio pipeline playing authentic studio MP3 master (6.7MB local CDN cached).',
          'Real-time 16-band LED canvas visualizer analyzing actual audio frequencies at 60 FPS.',
          'Interactive time scrubber with mm:ss progress display, dual spinning cassette spools, 4 studio EQ presets (Studio, Bass+, Vinyl Warmth, Lo-Fi), and synced real lyrics.',
        ],
      },
      {
        era: 'PHASE 6: NEURAL AI AGENT',
        badge: 'Self-Adaptive Layout',
        title: 'DeviceAI.agent — HarisOS Neural Viewport Specialist',
        perk: 'Real-Time Viewport Sensing & Autonomous Layout Prescriptions',
        details: [
          'Senses device telemetry in real time: width, height, DPR, aspect ratio, orientation, OS (iOS, Android, macOS, Windows, Linux), and browser engine (WebKit, Blink, Gecko).',
          'Prescribes detailed presentation rules across all 8 aspects (Geometry, Bezels, Icons, Dock, Audio, CRT, Touch, Typography).',
          'Interactive Device Simulator: allows recruiters to test simulated viewports for iPhone 16 Pro, Galaxy S24 Ultra, iPad Pro 11", MacBook Pro 14", Linux ThinkPad, and 4K Ultrawide.',
          'One-click "Auto-Tune HarisOS Now" layout calibration and real-time streaming neural terminal.',
        ],
      },
      {
        era: 'PHASE 7: UNIVERSAL ERGONOMICS',
        badge: 'Cross-Device Mastery',
        title: 'Responsive Grid, Landscape Auto-Wrap & Touch Compliance',
        perk: 'Flawless Operation on Any Screen Size & Orientation',
        details: [
          'Dynamic viewport units (100dvh / 100dvw) eliminate layout jumps when mobile URL bars expand or collapse.',
          'Auto multi-column wrapping (flex-col flex-wrap max-h-[calc(100dvh-130px)]) ensures desktop icons never get cut off on landscape phones.',
          'Fixed 38px icon size with +2px extra padding, and minimum 44px touch hitboxes conforming to Apple HIG and Google Material standards.',
          'Custom cross-browser retro scrollbars with zero clipping and overscroll-behavior: none.',
        ],
      },
      {
        era: 'PHASE 8: EDGE DEPLOYMENT',
        badge: 'Lightning Fast',
        title: 'Cloudflare Pages Global Edge Infrastructure',
        perk: 'Sub-50ms Global Delivery, Zero CORS Overhead & Instant Audio Streaming',
        details: [
          'Deployed globally across Cloudflare’s distributed edge network with Brotli/Gzip compression.',
          'Direct same-origin audio streaming eliminates cross-origin latency and playback blocking.',
          'Automated production build and verification pipeline guarantees 100% uptime and instant feature delivery.',
        ],
      },
    ],
    isFeatured: true,
    date: '2024 — 2026',
  },
  {
    id: 'vamvora',
    index: '02',
    name: 'Vamvora Technologies',
    client: 'Vamvora Technologies',
    category: 'Cloud, AI & Cybersecurity',
    projectType: 'Enterprise Cloud, Workspace, AI & Cybersecurity Platform',
    status: 'Live Site & Enterprise Production',
    headline: 'Enterprise Cloud Transformation, Workspace Integration & AI-Driven Security',
    description:
      'A scalable enterprise digital platform and technical infrastructure design for Vamvora Technologies, delivering seamless Google Workspace & Microsoft 365 migrations, custom enterprise AI automation agents, zero-trust cybersecurity, and modern cloud solutions.',
    achieved:
      'Engineered enterprise client onboarding flows, cloud migration assessment visualizers, and zero-trust security architectures, driving a 68% surge in B2B enterprise lead inquiries while sustaining 99.9% migration uptime.',
    metric: '+68% Enterprise Leads / 99.9% Uptime',
    role: [
      'Architected end-to-end user journeys for Google Workspace and Microsoft 365 cloud migrations',
      'Designed technical solution visualizers for custom enterprise AI workflow automations and LLM agents',
      'Structured zero-trust cybersecurity compliance blueprints and IAM endpoint security frameworks',
      'Created interactive cloud cost and consolidation calculators for enterprise IT decision-makers',
      'Conducted field interviews with 22 enterprise CTOs and IT directors to eliminate migration friction',
    ],
    skills: [
      'Google Workspace Migration',
      'Microsoft 365 Architecture',
      'Enterprise AI & Automation',
      'Zero-Trust Cybersecurity',
      'Cloud Solutions (GCP/Azure)',
      'Enterprise B2B Product Design',
      'Information Architecture',
      'Conversion Rate Optimization',
    ],
    eightBitImage: '/case-studies/vamvora-8bit.svg',
    liveUrl: 'https://vamvoratech.com',
    userResearch: {
      participants: '22 Enterprise IT Directors & CTOs',
      methodology: 'Contextual Inquiries, Cloud Migration Journey Mapping, and Security Protocol Audits',
      keyFindings: [
        'Enterprise decision-makers demanded transparent, zero-downtime migration roadmaps between Google and Microsoft ecosystems.',
        'CTOs required explicit architectural diagrams mapping zero-trust compliance, IAM, and data loss prevention before vendor onboarding.',
        'SME clients converted 3x higher when provided interactive AI workflow calculators to quantify cost savings from legacy tool consolidation.',
      ],
      outcome:
        'Delivered interactive migration roadmaps and certified cloud solution matrices, producing a +68% lift in enterprise consultation requests and 40+ production deployments.',
    },
    testimonial: {
      author: 'Vamvora Technologies Leadership',
      quote:
        'Haris seamlessly translated our complex cloud, AI, and cybersecurity stack into an intuitive, high-converting digital experience. Clients immediately grasp the power of our Google & Microsoft solutions.',
    },
    isFeatured: true,
    date: '2024 — 2026',
  },
  {
    id: 'simpliaxis',
    index: '02',
    name: 'Simpliaxis Dashboard',
    client: 'Simpliaxis Learning Solutions',
    category: 'AI & LMS',
    projectType: 'AI-Assisted LMS UX Design',
    status: 'Live Product Experience',
    headline: 'Simplifying Certification Learning with Scalable AI Workflows',
    description:
      'An enterprise learning management platform designed to simplify certification learning through structured dashboards, personalized learning paths, and progress-driven user experiences.',
    achieved:
      'Successfully redesigned a scalable learner-centric dashboard experience that improved onboarding clarity, enhanced learning navigation, streamlined user journeys, and created a more structured certification ecosystem for learners and trainers.',
    metric: '30% Boost in Engagement',
    role: [
      'Led the end-to-end UX design process from research and wireframing to final UI delivery',
      'Conducted usability analysis and competitor benchmarking to identify user pain points',
      'Designed scalable dashboard systems and responsive learning interfaces',
      'Built modular UI components and interaction patterns for future scalability',
      'Integrated Claude AI into research, UX writing, ideation, and workflow optimization',
      'Collaborated with developers to ensure seamless implementation and responsiveness',
    ],
    skills: [
      'Wireframing & Prototyping',
      'UX Strategy',
      'AI-Assisted UX Workflow',
      'Responsive Dashboard Design',
      'Accessibility Optimization',
      'Usability Testing',
    ],
    eightBitImage: '/case-studies/simpliaxis-8bit.svg',
    liveUrl: 'https://simpliaxis.com',
    testimonial: {
      author: 'Lakshman Srikanth.D',
      quote:
        'Working with Haris Kumaar is fun. He understands use cases in depth, asks good questions and has regular meetings till the design is functional and ready for handoff. Plus, he is fast.',
    },
    isFeatured: true,
    date: 'Dec 2024 — Jun 2025',
  },
  {
    id: 'solarix',
    index: '02',
    name: 'Solarix',
    client: 'Solarix Energy Solutions',
    category: 'CleanTech',
    projectType: 'Renewable Energy Digital Platform',
    status: 'Live Marketing Website',
    headline: '"Let The Sun Pay your Bill" — Switch to Solar Energy',
    description:
      'Solarix is a renewable energy platform designed to educate users about solar adoption while simplifying access to residential and commercial solar solutions.',
    achieved:
      'Successfully designed a modern conversion-focused renewable energy platform that improved service communication, strengthened brand trust, enhanced mobile responsiveness, and created a scalable digital experience for residential and commercial solar users.',
    metric: '90% Bill Reduction / 20+ Homes',
    role: [
      'Led the UI/UX design process for the complete website experience',
      'Structured responsive layouts and modular landing page systems',
      'Designed conversion-focused user journeys and CTA placements',
      'Created AI-assisted CTA copy, service descriptions, and FAQ content systems',
      'Refined conversion messaging and readability for user engagement',
      'Structured information architecture for solar plans, subsidies, and services',
      'Generated accessibility improvement recommendations and mobile UX refinements',
    ],
    skills: [
      'Information Hierarchy',
      'Adobe Creative Suite',
      'Claude AI Integration',
      'Responsive Design',
      'AI-Assisted Content Strategy',
      'User Research',
    ],
    eightBitImage: '/case-studies/solarix-8bit.svg',
    liveUrl: 'https://solarix.energy',
    testimonial: {
      author: 'Ar. Krishna Prasath',
      quote:
        'Precise, sharp and smart. Very good in communication and understands the user needs. All these qualities make me want to work with Haris Kumaar again.',
    },
    isFeatured: true,
    date: '2024',
  },
  {
    id: 'sowbhagya-livora',
    index: '03',
    name: 'Sowbhagya Livora',
    client: 'Sowbhagya Livora Interiors',
    category: 'Luxury & Brand',
    projectType: 'Luxury Interior Experience Website',
    status: 'Concept & Brand Experience',
    headline: 'Spaces That Reflect You — Premium Residential Living',
    description:
      'Sowbhagya Livora is a luxury interior experience website crafted to showcase premium residential spaces through immersive storytelling, editorial-inspired layouts, and cinematic visual presentation.',
    achieved:
      'Successfully designed a premium editorial-style website experience that strengthened luxury brand perception, improved visual storytelling, enhanced responsive interactions, and created an immersive digital showcase for high-end interior projects.',
    metric: 'Editorial Brand Experience',
    role: [
      'Led the visual direction and luxury brand experience design',
      'Designed editorial-inspired layouts and immersive storytelling sections',
      'Built responsive UI systems focused on elegance and readability',
      'Refined typography hierarchy and content readability for luxury presentation',
      'Assisted in structuring storytelling flow and emotional user experience',
      'Accelerated creative exploration for layout composition and content refinement',
    ],
    skills: [
      'Editorial UI Design',
      'Luxury Brand Direction',
      'Visual Storytelling',
      'Typography Systems',
      'Layout Composition',
      'Art Direction',
    ],
    eightBitImage: '/case-studies/sowbhagya-8bit.svg',
    liveUrl: 'https://sowbhagyalivora.com',
    testimonial: {
      author: 'Ar. Kiruthiga',
      quote:
        "Haris Kumaar improved our product's user experience with his creative designs and teamwork, helping us engage users better.",
    },
    isFeatured: true,
    date: '2024',
  },
  {
    id: 'healora',
    index: '04',
    name: 'Healora',
    client: 'Healora Healthcare Solutions',
    category: 'Healthcare',
    projectType: 'AI-Powered Pharmacy Ecosystem',
    status: 'Live Mobile & Web Experience',
    headline: 'Intelligent Medicine Discovery & Frictionless Health Commerce',
    description:
      'Healora is an AI-powered pharmacy and healthcare ecosystem designed to simplify digital medicine purchases, improve healthcare accessibility, and streamline customer experiences across mobile and web platforms.',
    achieved:
      'Successfully redesigned a scalable healthcare eCommerce ecosystem that improved medicine discovery, simplified purchasing workflows, enhanced mobile usability, and increased mobile conversion rates by 40% within 45 days through a cleaner and more intuitive healthcare experience.',
    metric: '+40% Conversion (45 Days)',
    role: [
      'Optimized product discovery and checkout user journeys',
      'Integrated Claude AI into research, UX writing, and workflow ideation',
      'Collaborated with developers to ensure accessibility and responsive implementation',
      'Worked with a multidisciplinary team to ensure the platform was user-friendly and effective for rural populations',
      'Led the UX design process from concept to implementation, ensuring solutions were practical and scalable',
    ],
    skills: [
      'eCommerce UX',
      'Healthcare UX Design',
      'Mobile App Design',
      'Prototyping',
      'User Research',
      'User Mapping',
      'Usability Testing',
    ],
    eightBitImage: '/case-studies/healora-8bit.svg',
    liveUrl: 'https://healora.health',
    testimonial: {
      author: 'M. Abishek',
      quote:
        "Haris Kumaar improved our product's user experience with his creative designs and teamwork, helping us engage users better.",
    },
    isFeatured: true,
    date: '2024',
  },
  {
    id: 'empovr',
    index: '05',
    name: 'EMPOVR (VR App)',
    client: 'Spatial Research Lab',
    category: 'Spatial & VR',
    projectType: 'VR-Based Spatial Experience',
    status: 'Live Prototype',
    headline: 'Spatial Computing & 3D Interactive Nodes',
    description:
      'A spatial computing application designed for immersive headsets, featuring 3D nodal navigation, hand gestures, and holographic information layers.',
    achieved:
      'Engineered an intuitive spatial UI that reduces cognitive fatigue and establishes clear interaction hierarchy in 6DoF environments.',
    metric: 'Spatial 3D UI',
    role: ['Spatial UX architecture', '3D gesture prototyping', 'Field-of-view information hierarchy'],
    skills: ['Spatial Computing', 'VR UX Design', 'Figma', 'Prototyping'],
    eightBitImage: '/case-studies/empovr-8bit.svg',
    liveUrl: 'https://empovr.app',
    isFeatured: false,
    date: 'March 2024',
  },
  {
    id: 'calli-survey',
    index: '06',
    name: 'Calli Survey',
    client: 'Calli AI Studio',
    category: 'AI & Voice',
    projectType: 'AI Voice Feedback Platform',
    status: 'Live Product Experience',
    headline: 'AI Calls that Take Customer Feedback at Scale',
    description:
      'A voice-first automated survey platform that conducts intelligent customer satisfaction interviews at scale with sentiment analysis.',
    achieved:
      'Achieved a 94% response completion rate through conversational UX prompts and frictionless voice interaction.',
    metric: '94% Response Rate',
    role: ['Voice conversation design', 'Survey flow optimization', 'Audio state indicators'],
    skills: ['Voice UX', 'AI Integration', 'Conversation Flow', 'Dashboard Design'],
    eightBitImage: '/case-studies/calli-8bit.svg',
    liveUrl: 'https://callisurvey.ai',
    isFeatured: false,
    date: 'Dec 2024',
  },
  {
    id: 'arvix',
    index: '07',
    name: 'ARVIX',
    client: 'Skill 4.0 Academy',
    category: 'AI & LMS',
    projectType: 'Live Hands-On Tech Training Platform',
    status: 'Live Product Experience',
    headline: 'Shaping Student Futures with Live Skill 4.0 Training',
    description:
      'An education cohort platform designed for interactive engineering cohorts, live code execution, and peer-to-peer mentoring.',
    achieved:
      'Increased cohort graduation rates by 35% with visual milestones, gamified progress trees, and seamless live video labs.',
    metric: '35% Cohort Completion',
    role: ['Cohort dashboard UX', 'Peer review interaction flows', 'Live session interface'],
    skills: ['EdTech UX', 'Wireframing', 'User Research', 'Figma'],
    eightBitImage: '/case-studies/arvix-8bit.svg',
    liveUrl: 'https://arvix.edu',
    isFeatured: false,
    date: 'Sep 2024',
  },
  {
    id: 'riff',
    index: '08',
    name: 'Riff',
    client: 'Riff Audio Labs',
    category: 'Creative Tech',
    projectType: 'Generative Audio & Music App',
    status: 'Live Prototype',
    headline: 'Create Music that Suits Your Vibe',
    description:
      'An interactive generative music synthesizer and audio studio that generates personalised beats and ambient tracks tailored to creative flow.',
    achieved:
      'Designed responsive sound wave visualizers and touch-friendly synth controls for seamless amateur and pro audio creation.',
    metric: 'Vibe-First Synthesis',
    role: ['Sound visualizer design', 'Equalizer & keypad UX', 'Audio state feedback'],
    skills: ['Sound Design UX', 'Interactive Prototyping', 'Framer', 'Motion'],
    eightBitImage: '/case-studies/riff-8bit.svg',
    liveUrl: 'https://riffmusic.app',
    isFeatured: false,
    date: 'July 2024',
  },
  {
    id: 'digixcare',
    index: '09',
    name: 'DigiXcare',
    client: 'DigiX Healthcare Systems',
    category: 'Healthcare',
    projectType: 'AI X-Ray Medical Diagnostic Mobile App',
    status: 'Live Mobile & Web Experience',
    headline: 'Empower Your Wellness with X-Ray to AI Insights',
    description:
      'A clinical decision support mobile application that analyses radiological X-rays to detect acute anomalies in under 3.5 seconds.',
    achieved:
      'Streamlined emergency triage workflows, enabling medical teams to review preliminary diagnostic heatmaps with 99.2% accuracy.',
    metric: '<3.5s AI Triage',
    role: ['Radiology review interface', 'Emergency alert UX', 'Patient privacy flows'],
    skills: ['Clinical UX', 'Healthcare Mobile App', 'Usability Testing', 'Design Systems'],
    eightBitImage: '/case-studies/digixcare-8bit.svg',
    liveUrl: 'https://digixcare.health',
    isFeatured: false,
    date: '2023',
  },
];

const capabilities = [
  { number: '01', title: 'Human-centred design', detail: 'A bias for the person using the thing, not the person presenting it.' },
  { number: '02', title: 'Research & sense-making', detail: 'Finding the useful signal in messy conversations, journeys, and data.' },
  { number: '03', title: 'Interaction & motion', detail: 'Making interfaces feel clear, responsive, and quietly alive.' },
];

const experiences = [
  {
    period: 'July 2025 — Present',
    role: 'Product Designer',
    company: 'Freelancer',
    place: 'Remote',
    detail:
      'Redesigning UI/UX experiences for certification platforms, improving user engagement and accessibility through intuitive and responsive interfaces. Collaborating with development teams to ensure pixel-perfect implementation and consistency across web platforms.',
    mark: '01',
    highlight: 'Current Role',
  },
  {
    period: 'Dec 2024 — Jun 2025',
    role: 'Product Designer',
    company: 'Simpliaxis Solutions Private Limited',
    place: 'Bengaluru, KA',
    detail:
      'Redesigned UI/UX experiences for an enterprise certification learning platform. Streamlined user journeys, integrated Claude AI into research & UX writing, and improved platform engagement metrics by 30%.',
    mark: '02',
    highlight: 'Enterprise LMS',
  },
  {
    period: 'Jul 2023 — Aug 2024',
    role: 'Junior Product Designer',
    company: 'Kanavulabs Private Limited',
    place: 'Erode, TN',
    detail:
      'Designed user interfaces for IoT and industrial products, creating seamless interactions between hardware and software systems. Worked closely with engineers and stakeholders to improve usability and reduce user errors by 25%.',
    mark: '03',
    highlight: 'IoT & Industrial',
  },
];

const educations = [
  {
    period: 'Jun 2022 — May 2023',
    degree: 'Certification In UI/UX Design',
    institution: 'IIT Bhuvaneshwar (Teachnook Regime)',
    score: 'Grade Points: 8 / 10',
    detail: 'Specialized in Human-Centred Design, Wireframing, UX Strategy, Prototyping, and Usability Testing.',
  },
  {
    period: '2017 — 2022',
    degree: 'Bachelor in Mechanical Engineering',
    institution: 'Sri Shakthi Institute of Engineering & Technology',
    score: 'Grade: 7.58 CGPA',
    detail: 'Foundational systems thinking, analytical problem solving, and ergonomic human-factor principles.',
  },
  {
    period: 'May 2017',
    degree: 'Secondary School Certificate (Class 12)',
    institution: 'Tamil Nadu State Board',
    score: 'Grade: 7.5 CGPA',
    detail: 'Mathematics, Science, and Computer Science foundation.',
  },
];

const coreSkillsList = [
  'UX Research',
  'Wireframing & Prototyping',
  'Design Thinking',
  'Responsive Design',
  'SaaS Design',
  'Accessibility Design (WCAG)',
  'Usability Testing',
  'AI Integration',
  'UX Writing',
  'LMS Platform Design',
  'Domain Expertise',
];

const softSkillsList = [
  'Leadership',
  'Team Player',
  'Problem Solver',
  'Quick Learner',
  'Critical Thinking',
  'Time Management',
  'User Empathy',
  'Presentation Skills',
  'AI-Assisted Workflow Adaptabilities',
  'Innovation Mindset',
];

function Home() {
  const [dark, setDark] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [animeEnabled, setAnimeEnabled] = useState(true);
  const [lowLatency, setLowLatency] = useState(false);
  const [eightBit, setEightBit] = useState(true);
  const [bezelEnabled, setBezelEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'design' | 'research'>('all');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [workFilter, setWorkFilter] = useState<'all' | 'featured' | 'gallery' | 'ai' | 'clean' | 'health' | 'research' | 'webos'>('all');
  const [flashingLightsPlaying, setFlashingLightsPlaying] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState(chiptuneSynth.currentSong.title);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    return chiptuneSynth.subscribe(() => {
      setFlashingLightsPlaying(chiptuneSynth.isPlaying);
      setCurrentSongTitle(chiptuneSynth.currentSong.title);
    });
  }, []);

  // DeviceAI Active Overlap Sentinel & Anti-Inspect Protection
  const overlapTelemetry = useAiOverlapSentinel();
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);

  useEffect(() => {
    const cleanupAntiInspect = initAntiInspectProtection();
    const unsubAlert = subscribeSecurityAlert((msg) => {
      setSecurityAlert(msg);
      setTimeout(() => setSecurityAlert(null), 3800);
    });
    return () => {
      cleanupAntiInspect();
      unsubAlert();
    };
  }, []);

  // Window State Management
  const [windows, setWindows] = useState({
    sysinfo: true,
    about: true,
    work: false,
    experience: false,
    skills: false,
    contact: false,
    music: false,
    trash: false,
    game: false,
    anime: false,
    deviceAI: false,
  });

  const [topZ, setTopZ] = useState(35);
  const [zIndices, setZIndices] = useState<Record<string, number>>({
    sysinfo: 31,
    about: 32,
    work: 30,
    experience: 30,
    skills: 30,
    contact: 30,
    music: 30,
    trash: 30,
    game: 30,
    anime: 30,
    deviceAI: 30,
  });

  const [activeAnimeStream, setActiveAnimeStream] = useState(0);

  const bringToFront = (id: string) => {
    const targetId = id === 'device-ai' ? 'deviceAI' : id;
    setTopZ((prev) => {
      const next = prev + 1;
      setZIndices((z) => ({ ...z, [targetId]: next }));
      return next;
    });
  };

  const openWindow = (id: string) => {
    const targetId = id === 'device-ai' ? 'deviceAI' : id;
    if (targetId === 'project-modal') {
      setIsModalOpen(true);
      return;
    }
    retroAudio.windowOpen();
    setWindows((prev) => ({ ...prev, [targetId]: true }));
    bringToFront(targetId);
  };

  const closeWindow = (id: string) => {
    const targetId = id === 'device-ai' ? 'deviceAI' : id;
    setWindows((prev) => ({ ...prev, [targetId]: false }));
  };

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem('haris-theme');
    setDark(stored === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('haris-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroAudio.setEnabled(next);
  };

  const copyEmail = async () => {
    retroAudio.click();
    await navigator.clipboard?.writeText('hariskum_ar@zohomail.in');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setFormFeedback('Please fill out all required fields.');
      return;
    }

    setFormStatus('sending');
    setFormFeedback('');

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        user_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        user_email: formData.email,
        subject: formData.subject || 'New Portfolio Inquiry (HarisOS)',
        project_type: formData.subject || 'General Inquiry',
        message: formData.message,
        content: formData.message,
      };

      await emailjs.send('service_u830gki', 'template_mc4invn', templateParams, {
        publicKey: 'YL2lgxieH9RZa6qay',
      });

      setFormStatus('success');
      setFormFeedback('Message delivered directly to Gmail! Haris will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      retroAudio.windowOpen();
    } catch (err: unknown) {
      const errorMsg = err && typeof err === 'object' && 'text' in err ? String((err as { text: string }).text) : '';
      setFormStatus('error');
      setFormFeedback(errorMsg || 'Failed to dispatch via EmailJS. Please write directly to hariskum_ar@zohomail.in.');
    }
  };

  const filteredTools =
    selectedCategory === 'all' ? toolRegistry : toolRegistry.filter((t) => t.category === selectedCategory);

  return (
    <div className={`fixed inset-0 h-screen w-screen overflow-hidden select-none font-mono ${dark ? 'dark' : ''}`}>
      {/* Retro Macintosh CRT Monitor Chassis / Bezel System (Inspired by areebali.com physical device showcase) */}
      <MacintoshBezelFrame
        bezelEnabled={bezelEnabled}
        onToggleBezel={() => setBezelEnabled(!bezelEnabled)}
      >
        {/* Retro Macintosh Top Menu Bar - INSIDE CRT SCREEN */}
        <MacMenuBar
          onOpenWindow={openWindow}
          crtEnabled={crtEnabled}
          onToggleCrt={() => setCrtEnabled(!crtEnabled)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          dark={dark}
          onToggleTheme={() => setDark(!dark)}
          animeEnabled={animeEnabled}
          onToggleAnime={() => setAnimeEnabled(!animeEnabled)}
          lowLatency={lowLatency}
          onToggleLowLatency={() => setLowLatency(!lowLatency)}
          eightBit={eightBit}
          onToggleEightBit={() => setEightBit(!eightBit)}
          bezelEnabled={bezelEnabled}
          onToggleBezel={() => setBezelEnabled(!bezelEnabled)}
          flashingLightsPlaying={flashingLightsPlaying}
          onToggleFlashingLights={() => chiptuneSynth.toggle()}
          currentSongTitle={currentSongTitle}
          onReplayBoot={() => setIsBooting(true)}
        />

        {/* DeviceAI Security Alert Toast: Blocks Inspect, F12, DevTools Shortcuts */}
        <AnimatePresence>
          {securityAlert && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] max-w-sm sm:max-w-md w-full px-3 py-2 rounded border-2 border-black bg-black text-[#d8ee57] font-mono text-[11px] font-bold shadow-[4px_4px_0px_#000000] flex items-center gap-2 select-none"
            >
              <span className="text-base shrink-0">🔒</span>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] text-[#ff4d6d] font-black uppercase tracking-wider">
                  MOCKOS DEVICEAI SECURITY GUARD
                </div>
                <div className="truncate text-white text-[10.5px]">{securityAlert}</div>
              </div>
              <button
                type="button"
                onClick={() => setSecurityAlert(null)}
                className="text-white hover:text-[#d8ee57] font-black px-1 text-sm cursor-pointer shrink-0"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Apple-Style 8-Bit Boot Screen with Brad Pitt Humor Quotes & Startup Chime */}
        <MacBootScreen
          isOpen={isBooting}
          onBootComplete={() => setIsBooting(false)}
        />

        {/* CRT Scanline & Vignette Effect (AWGE Inspired) - INSIDE CRT SCREEN GLASS */}
        <CrtOverlay enabled={crtEnabled} />

        {/* Pop-up Conversation & Project Discussion Modal - INSIDE CRT SCREEN */}
        <ProjectDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* 8-Bit Case Study Deep-Dive Modal */}
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
          onOpenProjectBrief={() => openWindow('project-modal')}
        />

        {/* Desktop Workspace Canvas - Fills 100% of CRT Screen Aperture Dynamically */}
        <div className="relative h-full w-full overflow-hidden">
          <main className="mac-desktop-bg relative h-full w-full overflow-hidden pt-9 sm:pt-10 pb-16 px-2 sm:px-4">
            {/* 80s Retro Anime (Slam Dunk) Looping Background with 8-Bit Pixelation & Macintosh Dotted Overlay - INSIDE CRT SCREEN */}
            <SlamDunkBackground
              enabled={animeEnabled}
              lowLatency={lowLatency}
              eightBit={eightBit}
              activeStreamIndex={activeAnimeStream}
            />

        {/* Desktop Icons Array: Single Vertical Column One-by-One from Top Menu Bar to Lower Bezel */}
        <div className="relative z-10 select-none max-w-full h-full overflow-visible pointer-events-none">
          <div className="flex flex-col justify-between h-full w-max max-w-full overflow-visible pointer-events-auto py-0.5">
            {/* Column 1 (Primary Career & Case Studies Portfolio) */}
            <DesktopIcon
              id="work"
              title="01_Case_Studies.fldr"
              icon="folder"
              onClick={() => openWindow('work')}
              isSelected={windows.work}
            />
            <DesktopIcon
              id="experience"
              title="02_Exp.log"
              icon="terminal"
              onClick={() => openWindow('experience')}
              isSelected={windows.experience}
            />
            <DesktopIcon
              id="skills"
              title="03_Skills.sys"
              icon="document"
              onClick={() => openWindow('skills')}
              isSelected={windows.skills}
            />
            <DesktopIcon
              id="about"
              title="04_About.txt"
              icon="document"
              onClick={() => openWindow('about')}
              isSelected={windows.about}
            />
            <DesktopIcon
              id="contact"
              title="05_Mail.app"
              icon="mail"
              onClick={() => openWindow('contact')}
              isSelected={windows.contact}
            />
            <DesktopIcon
              id="brief"
              title="Brief.app"
              icon="sparkles"
              onClick={() => openWindow('project-modal')}
              isSelected={isModalOpen}
            />

            {/* Column 2 (Interactive OS Applications & System Tools) */}
            <DesktopIcon
              id="deviceAI"
              title="DeviceAI.agent"
              icon="ai"
              onClick={() => openWindow('deviceAI')}
              isSelected={windows.deviceAI}
            />
            <DesktopIcon
              id="music"
              title="Jukebox.app"
              icon="music"
              onClick={() => openWindow('music')}
              isSelected={windows.music}
            />
            <DesktopIcon
              id="anime"
              title="AnimeTV.app"
              icon="tv"
              onClick={() => openWindow('anime')}
              isSelected={windows.anime}
            />
            <DesktopIcon
              id="game"
              title="SnakeLadder.game"
              icon="game"
              onClick={() => openWindow('game')}
              isSelected={windows.game}
            />
            <DesktopIcon
              id="trash"
              title="Trash"
              icon="trash"
              onClick={() => openWindow('trash')}
              isSelected={windows.trash}
            />
          </div>
        </div>

        {/* =========================================================================
            WINDOW: System Info Widget (Top Right)
            ========================================================================= */}
        <MacWindow
          id="sysinfo"
          title="MockOS 7.5.3 — Mockintosh Parody (Not Apple™)"
          isOpen={windows.sysinfo}
          onClose={() => closeWindow('sysinfo')}
          zIndex={zIndices.sysinfo}
          onFocus={() => bringToFront('sysinfo')}
          defaultPos={{ x: 740, y: 55 }}
          defaultSize={{ width: 360, height: 350 }}
        >
          <div className="space-y-3 font-mono text-xs text-[#111111]">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded border-2 border-black bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000]">
                <HardDrive size={20} />
              </div>
              <div className="leading-tight">
                <h3 className="font-bold text-black text-sm uppercase">MockOS 7.5.3</h3>
                <p className="text-[10px] text-black/75 font-semibold">Mockintosh System Software · 16MHz (Parody Edition)</p>
              </div>
            </div>

            <div className="rounded border-2 border-black bg-[#f4f4f4] p-2.5 text-[11px] leading-relaxed shadow-[2px_2px_0px_#000]">
              <p className="font-bold text-black">Welcome to Haris Kumaar's Studio.</p>
              <p className="mt-1 text-black/85 font-medium">
                Running on Mockintosh Haris™ · 100% Bogus Parody OS (No Apple™ Rights).
              </p>
            </div>

            {/* System Memory & Hardware Stats */}
            <div className="space-y-1.5 border-t border-black/25 pt-2 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-black/70">Built-in Memory:</span>
                <span className="font-bold text-black">Memory: 128 MB RAM</span>
              </div>
              <div className="w-full bg-[#e0e0e0] border border-black h-3 rounded-xs overflow-hidden">
                <div className="bg-black h-full w-[38%]" title="In Use: 48 MB" />
              </div>
              <div className="flex justify-between text-[10px] text-black/70 font-semibold">
                <span>In Use: 48 MB</span>
                <span>Free: 80 MB</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1.5 text-[10px]">
                <div className="border border-black bg-white p-1.5 rounded-xs">
                  <span className="text-black/60 block">Processor:</span>
                  <span className="font-bold text-black">Motorola 68040</span>
                </div>
                <div className="border border-black bg-white p-1.5 rounded-xs">
                  <span className="text-black/60 block">Location:</span>
                  <span className="font-bold text-black">Erode, TN (638004)</span>
                </div>
                <div className="border border-black bg-white p-1.5 rounded-xs">
                  <span className="text-black/60 block">Screen Mode:</span>
                  <span className="font-bold text-black">8-Bit Pixel Dither</span>
                </div>
                <div className="border border-black bg-white p-1.5 rounded-xs">
                  <span className="text-black/60 block">Status:</span>
                  <span className="font-bold text-emerald-700">● Online &amp; Ready</span>
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW 1: Case_Studies.fldr (All Case Studies, User Research & Live Links)
            ========================================================================= */}
        <MacWindow
          id="work"
          title="Case_Studies.fldr — 11 Case Studies, System Evolution & Live Sites"
          isOpen={windows.work}
          onClose={() => closeWindow('work')}
          zIndex={zIndices.work}
          onFocus={() => bringToFront('work')}
          defaultPos={{ x: 40, y: 30 }}
          defaultSize={{ width: 1040, height: 700 }}
        >
          <div className="space-y-6 sm:space-y-8 text-[#111111]">
            {/* Finder Toolbar & Filter Tabs */}
            <div className="border-b-2 border-black pb-4 sm:pb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-black text-[#d8ee57] px-2.5 py-1 text-[10px] font-bold rounded-xs shadow-[1px_1px_0px_#000]">
                      FINDER: CASE_STUDIES.FLDR
                    </span>
                    <span className="font-mono text-xs font-bold text-black/75">
                      11 Items · System Evolution Decks · 8-Bit Previews · Live Cloud Links
                    </span>
                  </div>
                  <h2 className="mt-1.5 font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
                    All Case Studies, System Evolution &amp; Live Sites
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openWindow('project-modal')}
                  className="mac-button self-start sm:self-auto flex items-center gap-2 rounded border-2 border-black bg-[#d8ee57] px-4 py-2 font-mono text-xs font-bold text-black hover:bg-black hover:text-[#d8ee57] cursor-pointer shadow-[3px_3px_0px_#000] transition-colors shrink-0"
                >
                  <Sparkles size={14} /> Discuss a Project
                </button>
              </div>

              {/* Filter Pills with Smooth Horizontal Flow & Breathing Space */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-mono text-xs">
                {[
                  { id: 'all', label: 'All Items (11)' },
                  { id: 'webos', label: '⚡ HarisOS Evolution' },
                  { id: 'research', label: '📋 User Research (2)' },
                  { id: 'featured', label: '★ Featured (6)' },
                  { id: 'gallery', label: 'Project Gallery (5)' },
                  { id: 'ai', label: 'AI & LMS' },
                  { id: 'clean', label: 'CleanTech' },
                  { id: 'health', label: 'Healthcare' },
                ].map((tab) => {
                  const isActive = workFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        retroAudio.click();
                        setWorkFilter(tab.id as any);
                      }}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full border-2 border-black font-bold cursor-pointer transition-all shrink-0 whitespace-nowrap text-[11px] sm:text-xs ${
                        isActive
                          ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000]'
                          : 'bg-white text-black hover:bg-neutral-100 shadow-[1px_1px_0px_#000]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Case Studies Grid - Generous Breathing Space & Adaptive Columns */}
            <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
              {caseStudies
                .filter((cs) => {
                  if (workFilter === 'webos') return cs.id === 'haris-portfolio' || cs.category.includes('WebOS');
                  if (workFilter === 'research') return Boolean(cs.userResearch) || cs.category.includes('Architecture');
                  if (workFilter === 'featured') return cs.isFeatured;
                  if (workFilter === 'gallery') return !cs.isFeatured;
                  if (workFilter === 'ai') return cs.category.includes('AI') || cs.category.includes('LMS');
                  if (workFilter === 'clean') return cs.category.includes('CleanTech');
                  if (workFilter === 'health') return cs.category.includes('Health');
                  return true;
                })
                .map((cs) => (
                  <motion.div
                    key={cs.id}
                    whileHover={{ y: -3, scale: 1.008 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex flex-col justify-between rounded-lg border-2 border-black bg-white p-5 sm:p-6 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] transition-all overflow-hidden"
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/15">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="rounded bg-black px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#d8ee57] shrink-0">
                            {cs.index}
                          </span>
                          <span className="rounded border border-black bg-[#f0f0f0] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-black shrink-0">
                            {cs.category}
                          </span>
                        </div>
                        <span className="rounded bg-emerald-100 border border-emerald-800 text-emerald-900 px-2.5 py-0.5 font-mono text-[9.5px] font-bold shrink-0">
                          {cs.status}
                        </span>
                      </div>

                      {/* 8-Bit Pixel Image Canvas with Spacious Aspect Ratio */}
                      <div
                        onClick={() => {
                          retroAudio.click();
                          setActiveCaseStudy(cs);
                        }}
                        className="group relative mt-4 h-48 sm:h-56 w-full cursor-pointer overflow-hidden rounded-md border-2 border-black bg-[#0d0d14] shadow-[2px_2px_0px_#000]"
                        title="Click to inspect full 8-Bit Case Study"
                      >
                        <img
                          src={cs.eightBitImage}
                          alt={`${cs.name} 8-Bit Preview`}
                          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <span className="rounded border-2 border-black bg-[#d8ee57] px-4 py-1.5 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_#000]">
                            🔍 Inspect 8-Bit Case Study
                          </span>
                        </div>
                      </div>

                      {/* Project Title & Client */}
                      <div className="mt-4 space-y-1">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h3 className="font-mono text-lg sm:text-xl font-bold text-black leading-snug">
                            {cs.name}
                          </h3>
                          <span className="font-mono text-xs font-bold text-black/60 shrink-0">
                            {cs.date}
                          </span>
                        </div>
                        <p className="font-mono text-xs font-bold text-black/75">
                          Client: {cs.client}
                        </p>
                        <p className="mt-2 font-mono text-xs sm:text-[13px] font-normal leading-relaxed text-[#222222] line-clamp-3">
                          {cs.description}
                        </p>
                      </div>

                      {/* Key Metric & Research Badges */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-2">
                        {cs.metric && (
                          <div className="inline-flex items-center gap-1.5 rounded border border-black bg-[#d8ee57] px-3 py-1 font-mono text-[10.5px] font-bold text-black shadow-[1.5px_1.5px_0px_#000]">
                            <span>★ IMPACT:</span>
                            <span>{cs.metric}</span>
                          </div>
                        )}

                        {cs.userResearch && (
                          <div className="inline-flex items-center gap-1.5 rounded border border-emerald-700 bg-emerald-100 px-3 py-1 font-mono text-[10.5px] font-bold text-emerald-950 shadow-[1.5px_1.5px_0px_#000]">
                            <span>📋 User Research Included</span>
                          </div>
                        )}
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5 items-center">
                        {cs.skills.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-black/30 bg-[#f5f5f5] px-2 py-0.5 font-mono text-[9.5px] font-semibold text-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions: Live Link + Case Study Details */}
                    <div className="mt-5 pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={cs.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => retroAudio.click()}
                        className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-[#ffd166] hover:bg-[#ffb703] px-3.5 sm:px-4 py-2 font-mono text-xs font-bold text-black cursor-pointer shadow-[2px_2px_0px_#000] transition-colors"
                      >
                        <span>VISIT LIVE SITE</span>
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          retroAudio.click();
                          setActiveCaseStudy(cs);
                        }}
                        className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-black hover:bg-[#222] text-[#d8ee57] px-3.5 sm:px-4 py-2 font-mono text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000] transition-colors"
                      >
                        <span>{cs.userResearch ? 'CASE STUDY & RESEARCH' : 'CASE STUDY'}</span>
                        <Maximize2 size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW 2: 02_Experience.log
            ========================================================================= */}
        <MacWindow
          id="experience"
          title="02_Experience.log — Terminal History & Credentials"
          isOpen={windows.experience}
          onClose={() => closeWindow('experience')}
          zIndex={zIndices.experience}
          onFocus={() => bringToFront('experience')}
          defaultPos={{ x: 120, y: 55 }}
          defaultSize={{ width: 860, height: 620 }}
        >
          <div className="space-y-6 text-[#111111] font-mono">
            {/* Header Terminal Banner */}
            <div className="border-b-2 border-black pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-block rounded border border-black bg-black px-2.5 py-0.5 text-[10px] font-bold text-[#d8ee57]">
                  LOG: SYSTEM_EXPERIENCE // 2Y+ INDUSTRY RECORD
                </span>
                <span className="text-[11px] font-bold text-black/70">
                  30+ Total Projects Completed
                </span>
              </div>
              <h2 className="mt-2 text-xl font-bold uppercase tracking-tight text-black">
                Work Experience &amp; Academic Credentials
              </h2>
              <p className="text-xs font-medium text-[#222222]">
                Passionate about blending creativity and technology to craft meaningful experiences and solve complex problems.
              </p>
            </div>

            {/* Section 1: Work Experience */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#d8ee57] text-black border border-black px-2 py-0.5 text-[10px] font-bold">
                  01. INDUSTRY_EXPERIENCE
                </span>
                <span className="text-xs font-bold text-black">Full Career Chronology</span>
              </div>

              <div className="space-y-3">
                {experiences.map((item) => (
                  <motion.div
                    key={item.mark}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded bg-black px-2 py-0.5 text-[11px] font-bold text-white">
                          {item.mark}
                        </span>
                        <h3 className="text-sm font-bold text-black">{item.role}</h3>
                        <span className="text-xs font-bold text-black/75">/ {item.company}</span>
                        <span className="rounded bg-[#f0f0f0] border border-black px-1.5 py-0.2 text-[9px] font-bold text-black">
                          {item.highlight}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="rounded border border-black bg-[#ffd166] px-2.5 py-0.5 text-[10px] font-bold text-black">
                          {item.period}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-[#1a1a1a]">
                      {item.detail}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold text-black/80">
                      <MapPin size={12} />
                      <span>{item.place}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Section 2: Education & Degrees */}
            <div className="space-y-3 pt-3 border-t-2 border-black/20">
              <div className="flex items-center gap-2">
                <span className="bg-[#d8ee57] text-black border border-black px-2 py-0.5 text-[10px] font-bold">
                  02. FORMAL_ACADEMIA
                </span>
                <span className="text-xs font-bold text-black">Educational Foundations &amp; Specializations</span>
              </div>

              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded bg-black px-2 py-0.5 text-[11px] font-bold text-white">
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-black">{edu.degree}</h3>
                      </div>
                      <span className="rounded border border-black bg-[#ffd166] px-2.5 py-0.5 text-[10px] font-bold text-black">
                        {edu.period}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-black">{edu.institution}</p>
                    <p className="mt-1 text-xs text-[#222222]">{edu.detail}</p>
                    {edu.score && (
                      <div className="mt-2 inline-block rounded bg-[#e8f5e9] border border-emerald-700 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        {edu.score}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW 3: 03_Skills.sys
            ========================================================================= */}
        <MacWindow
          id="skills"
          title="03_Skills &amp; Toolkit.sys — System Capabilities"
          isOpen={windows.skills}
          onClose={() => closeWindow('skills')}
          zIndex={zIndices.skills}
          onFocus={() => bringToFront('skills')}
          defaultPos={{ x: 200, y: 100 }}
          defaultSize={{ width: 860, height: 600 }}
        >
          <div className="space-y-6 text-[#111111]">
            <div className="border-b-2 border-black pb-3">
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-black">Toolkit &amp; Core Capabilities</h2>
              <p className="font-mono text-xs font-medium text-[#222222]">
                Working at the intersection of human behaviour, emerging AI technologies, and interaction rhythm.
              </p>
            </div>

            {/* Core Capabilities */}
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black mb-3">
                Core Philosophies
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {capabilities.map((cap) => (
                  <div
                    key={cap.number}
                    className="rounded border-2 border-black bg-white p-3.5 shadow-[3px_3px_0px_#000000]"
                  >
                    <span className="font-mono text-xs font-bold text-emerald-800">{cap.number}</span>
                    <h4 className="mt-1 font-mono text-sm font-bold text-black">{cap.title}</h4>
                    <p className="mt-1.5 font-mono text-xs font-medium leading-relaxed text-[#222222]">{cap.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Filterable Tool Registry */}
            <div className="pt-3 border-t border-black/20">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black">
                  Software Stack &amp; Workflow Tools
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'design', 'ai', 'research'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        retroAudio.click();
                        setSelectedCategory(cat);
                      }}
                      className={`px-3 py-1 font-mono text-xs font-bold rounded-xs border border-black cursor-pointer transition-colors ${
                        selectedCategory === cat
                          ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000]'
                          : 'bg-white text-black hover:bg-black/10'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-4">
                {filteredTools.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col justify-between rounded border-2 border-black bg-white p-3 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-black">{t.name}</span>
                      <span className="rounded bg-[#f0f0f0] border border-black px-1.5 py-0.2 text-[9px] font-bold text-black">
                        {t.category.toUpperCase()}
                      </span>
                    </div>
                    <span className="mt-2 inline-block font-mono text-[10px] font-semibold text-emerald-800">
                      ★ {t.tagline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hard Skills & Soft Skills Matrices */}
            <div className="grid gap-4 pt-3 border-t border-black/20 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black mb-2">
                  Technical &amp; UX Core Competencies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {coreSkillsList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-black bg-[#f0f0f0] px-2 py-1 font-mono text-xs font-semibold text-black shadow-[1px_1px_0px_#000]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-black mb-2">
                  Operational &amp; Professional Strengths
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {softSkillsList.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-black bg-[#fff275] px-2 py-1 font-mono text-xs font-semibold text-black shadow-[1px_1px_0px_#000]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW 4: 04_About.txt
            ========================================================================= */}
        <MacWindow
          id="about"
          title="04_About.txt — TextEdit"
          isOpen={windows.about}
          onClose={() => closeWindow('about')}
          zIndex={zIndices.about}
          onFocus={() => bringToFront('about')}
          defaultPos={{ x: 120, y: 65 }}
          defaultSize={{ width: 740, height: 560 }}
        >
          <div className="space-y-6 text-[#111111]">
            <div className="border-b-2 border-black pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-black">
                <FileCode size={14} />
                <span>TextEdit Document · UTF-8 Plain Text</span>
              </div>
              <h2 className="mt-2 font-mono text-2xl font-bold leading-tight text-black">
                "I like the part where <span className="underline decoration-[#e97857] decoration-2">it clicks.</span>"
              </h2>
              <p className="mt-2 font-mono text-xs font-medium leading-relaxed text-[#1a1a1a]">
                The moment a product stops asking to be understood and starts making sense. That is the bit I am always chasing — through research, prototypes, odd sketches, and healthy curiosity.
              </p>
            </div>

            {/* Current Position & Background */}
            <div className="grid gap-4 rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000] sm:grid-cols-2">
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white mr-2">NOW</span>
                  <span className="font-bold text-black">Freelance product design &amp; UX</span>
                </div>
                <div>
                  <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white mr-2">BEFORE</span>
                  <span className="font-semibold text-black">Simpliaxis · Kanavulabs</span>
                </div>
                <div>
                  <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white mr-2">BASE</span>
                  <span className="font-semibold text-black">Erode — 638004, Tamil Nadu, India</span>
                </div>
                <div>
                  <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white mr-2">CALL</span>
                  <a href="tel:+919360430764" className="font-bold underline text-black hover:text-[#e97857]">
                    +91 9360430764
                  </a>
                </div>
              </div>

              <div className="border-t border-black/25 pt-3 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0 text-xs space-y-3">
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-black block">Education</span>
                  <p className="font-bold text-black mt-0.5">Sri Shakthi Institute of Engineering &amp; Technology</p>
                  <p className="text-black/80 font-medium text-[11px]">B.E. Mechanical Engineering · 2017 — 2022</p>
                  <p className="font-bold text-black mt-2">Teachnook · IIT Bhubaneswar Regime</p>
                  <p className="text-black/80 font-medium text-[11px]">UI/UX, Graphic &amp; Motion Design · 2023</p>
                </div>
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-black block">Languages</span>
                  <p className="text-sm font-bold text-black">English / Tamil</p>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => openWindow('contact')}
                className="mac-button flex items-center gap-1.5 rounded border-2 border-black bg-black px-4 py-2 text-xs font-bold text-white hover:bg-[#222222] cursor-pointer"
              >
                <Mail size={13} /> Open Contact Desk
              </button>
              <button
                type="button"
                onClick={() => openWindow('project-modal')}
                className="mac-button flex items-center gap-1.5 rounded border-2 border-black bg-[#d8ee57] px-4 py-2 text-xs font-bold text-black hover:bg-[#cbe348] cursor-pointer"
              >
                <Sparkles size={13} /> Open Project Discussion
              </button>
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW 5: 05_Contact_Desk.app (Vintage Macintosh Mail Dispatcher)
            ========================================================================= */}
        <MacWindow
          id="contact"
          title="05_Mail_Dispatch.app — Macintosh System 7.5 Mail Gateway"
          isOpen={windows.contact}
          onClose={() => closeWindow('contact')}
          zIndex={zIndices.contact}
          onFocus={() => bringToFront('contact')}
          defaultPos={{ x: 180, y: 70 }}
          defaultSize={{ width: 840, height: 620 }}
        >
          <div className="space-y-4 text-[#111111] font-mono">
            {/* Vintage Macintosh Mail App Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black bg-[#ececec] p-2 text-xs rounded-sm">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => retroAudio.click()}
                  className="mac-button flex items-center gap-1 rounded border border-black bg-white px-2.5 py-1 text-[11px] font-bold text-black hover:bg-black hover:text-white cursor-pointer"
                >
                  <Mail size={12} /> New Message
                </button>
                <button
                  type="button"
                  onClick={() => {
                    retroAudio.click();
                    openWindow('about');
                  }}
                  className="mac-button flex items-center gap-1 rounded border border-black bg-white px-2.5 py-1 text-[11px] font-bold text-black hover:bg-black hover:text-white cursor-pointer"
                >
                  <MapPin size={12} /> Haris vCard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    retroAudio.click();
                    openWindow('project-modal');
                  }}
                  className="mac-button flex items-center gap-1 rounded border border-black bg-[#d8ee57] px-2.5 py-1 text-[11px] font-bold text-black hover:bg-[#cbe348] cursor-pointer"
                >
                  <Sparkles size={12} /> Full Project Brief
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold text-black/70">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>SMTP PORT 587 · ONLINE</span>
              </div>
            </div>

            {/* Macintosh Envelope Header with Vintage Airmail Postal Stamp */}
            <div className="relative rounded border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000000]">
              {/* Retro Airmail Postage Stamp */}
              <div className="absolute right-3 top-3 hidden rounded border-2 border-dashed border-black/60 bg-[#fbfbf8] p-2 text-center text-[9px] font-bold leading-tight text-black/80 sm:block">
                <div className="tracking-widest uppercase text-[8px] text-[#e97857]">PAR AVION // 1993</div>
                <div className="mt-0.5 border-t border-black/40 pt-0.5">ERODE · INDIA</div>
                <div className="text-[8px] text-black/50">AIR DISPATCH</div>
              </div>

              {/* Envelope Routing Details */}
              <div className="space-y-2 pr-0 sm:pr-32 text-xs">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="w-16 font-bold uppercase tracking-wider text-[10px] text-black/60">TO:</span>
                  <span className="font-bold text-black">Haris Kumaar</span>
                  <span className="rounded border border-black bg-black px-1.5 py-0.5 text-[10px] font-bold text-[#d8ee57]">
                    hariskumaar.9@gmail.com
                  </span>
                  <span className="rounded border border-black/40 bg-[#f0f0f0] px-1.5 py-0.5 text-[9px] font-bold text-black/70">
                    [PRIMARY TARGET]
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="w-16 font-bold uppercase tracking-wider text-[10px] text-black/60">CHANNELS:</span>
                  <a
                    href="mailto:hariskum_ar@zohomail.in"
                    className="font-bold underline text-black hover:text-[#e97857]"
                  >
                    hariskum_ar@zohomail.in
                  </a>
                  <span className="text-black/40">·</span>
                  <a
                    href="tel:+919360430764"
                    className="font-bold underline text-black hover:text-[#e97857]"
                  >
                    +91 9360430764
                  </a>
                  <span className="text-black/40">·</span>
                  <span className="text-black/75">Erode, TN, India</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mac-button inline-flex items-center gap-1 rounded border border-black bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-bold text-black hover:bg-black hover:text-white cursor-pointer"
                  >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Direct Email'}</span>
                  </button>
                  <a
                    href="tel:+919360430764"
                    className="mac-button inline-flex items-center gap-1 rounded border border-black bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-bold text-black hover:bg-black hover:text-white"
                  >
                    <Phone size={11} /> Call +91 9360430764
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Transmission Form */}
            <form onSubmit={handleContactSubmit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[11px] font-bold uppercase text-black mb-1">
                    FROM: (Your Name / Entity) *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin / Product Lead"
                    className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000000]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[11px] font-bold uppercase text-black mb-1">
                    REPLY-TO: (Your Email Address) *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@studio.design"
                    className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000000]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="contact-subject" className="block font-mono text-[11px] font-bold uppercase text-black">
                    SUBJECT: (Project Thread / Scope)
                  </label>
                  <span className="font-mono text-[10px] text-black/60 hidden sm:inline">Click tag to append:</span>
                </div>

                {/* Quick Subject Tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  {[
                    'AI-Integrated UX',
                    'Product Redesign',
                    'Design Systems',
                    'Design Consultation',
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        retroAudio.click();
                        setFormData((prev) => ({
                          ...prev,
                          subject: prev.subject ? `${prev.subject} · ${tag}` : tag,
                        }));
                      }}
                      className="mac-button rounded border border-black bg-[#f0f0f0] px-2 py-0.5 font-mono text-[10px] font-semibold text-black hover:bg-black hover:text-white cursor-pointer"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>

                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI-Integrated SaaS Platform UX Redesign"
                  className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {/* Message Memo Pad */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="contact-message" className="block font-mono text-[11px] font-bold uppercase text-black">
                    MEMORANDUM / MESSAGE BODY *
                  </label>
                  <span className="font-mono text-[10px] font-semibold text-black/60">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your transmission here. Share project objectives, timelines, team context, or questions..."
                  className="w-full rounded border-2 border-black bg-[#ffffff] p-3 font-mono text-xs text-black font-medium leading-relaxed placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black shadow-[2px_2px_0px_#000000]"
                />
              </div>

              {formFeedback && (
                <div
                  className={`flex items-start gap-2.5 rounded border-2 border-black p-3 text-xs font-mono font-medium ${
                    formStatus === 'success' ? 'bg-[#d8ee57] text-black shadow-[3px_3px_0px_#000000]' : 'bg-[#ffc8c8] text-black shadow-[3px_3px_0px_#000000]'
                  }`}
                >
                  {formStatus === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{formFeedback}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-[10px] font-semibold text-black/75">
                  <Sparkles size={12} className="text-black" />
                  <span>Verified EmailJS Dispatch direct to Haris's Gmail</span>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="mac-button flex items-center justify-center gap-2 rounded border-2 border-black bg-black px-6 py-2.5 font-mono text-xs font-bold text-white hover:bg-[#222222] disabled:opacity-50 cursor-pointer shadow-[3px_3px_0px_#000000]"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Transmitting to Gmail...
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <Check size={14} /> Transmission Delivered!
                    </>
                  ) : (
                    <>
                      <Send size={14} /> DISPATCH MESSAGE (↵ Return)
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Vintage Macintosh Footer Status */}
            <div className="flex flex-wrap items-center justify-between border-t-2 border-black/20 pt-2.5 text-[10px] font-bold text-black/60">
              <span>Encoding: MacRoman / UTF-8</span>
              <span>Encryption: TLS 1.3 · Verified Service ID service_u830gki</span>
              <span>Host: MockOS 7.5 Parody (Totally Unaffiliated™)</span>
            </div>
          </div>
        </MacWindow>

        {/* =========================================================================
            WINDOW: Portfolio Snakes & Ladders Interactive Walkthrough Game
            ========================================================================= */}
        <MacWindow
          id="game"
          title="SnakeLadder.game — Portfolio Walkthrough Climb (v1.0)"
          isOpen={windows.game}
          onClose={() => closeWindow('game')}
          zIndex={zIndices.game}
          onFocus={() => bringToFront('game')}
          defaultPos={{ x: 140, y: 55 }}
          defaultSize={{ width: 840, height: 590 }}
        >
          <SnakeLadderGame
            onOpenCaseStudy={(key) => {
              openWindow('work');
              const found = caseStudies.find(
                (c) =>
                  c.id === key ||
                  c.name.toLowerCase().includes(key.toLowerCase()) ||
                  c.client.toLowerCase().includes(key.toLowerCase())
              );
              if (found) {
                setActiveCaseStudy(found);
              }
            }}
            onOpenBrief={() => openWindow('project-modal')}
          />
        </MacWindow>

        {/* =========================================================================
            WINDOW: Retro Anime Slam Dunk TV Player (10 Back-to-Back Streams)
            ========================================================================= */}
        <MacWindow
          id="anime"
          title="AnimeTV.app — Retro 90s Anime Broadcast (Slam Dunk, Vagabond, Ghost in the Shell, Speed Racer, Astro Boy)"
          isOpen={windows.anime}
          onClose={() => closeWindow('anime')}
          zIndex={zIndices.anime}
          onFocus={() => bringToFront('anime')}
          defaultPos={{ x: 160, y: 50 }}
          defaultSize={{ width: 860, height: 600 }}
        >
          <SlamDunkTvPlayer
            activeStreamIndex={activeAnimeStream}
            onStreamChange={(idx) => setActiveAnimeStream(idx)}
            onSyncWallpaper={(idx) => setActiveAnimeStream(idx)}
          />
        </MacWindow>

        {/* =========================================================================
            WINDOW: DeviceAI.agent (Real-Time Viewport Specialist & Layout Diagnostics)
            ========================================================================= */}
        <MacWindow
          id="deviceAI"
          title="DeviceAI.agent — HarisOS Neural Viewport Specialist"
          isOpen={windows.deviceAI}
          onClose={() => closeWindow('deviceAI')}
          zIndex={zIndices.deviceAI}
          onFocus={() => bringToFront('deviceAI')}
          defaultPos={{ x: 120, y: 45 }}
          defaultSize={{ width: 840, height: 600 }}
        >
          <DeviceAIAgent
            onAutoTune={() => {
              if (window.innerWidth < 768) {
                setLowLatency(true);
              }
              setCrtEnabled(true);
              retroAudio.click();
            }}
          />
        </MacWindow>

        {/* =========================================================================
            WINDOW: Studio Tape Deck · Kanye West 'Flashing Lights' (Master MP3)
            ========================================================================= */}
        <MacWindow
          id="music"
          title="Jukebox.app — Studio Master Tape Deck (Authentic MP3 Collection)"
          isOpen={windows.music}
          onClose={() => closeWindow('music')}
          zIndex={zIndices.music}
          onFocus={() => bringToFront('music')}
          defaultPos={{ x: 180, y: 50 }}
          defaultSize={{ width: 780, height: 570 }}
        >
          <ChiptunePlayer />
        </MacWindow>

        {/* =========================================================================
            WINDOW 6: Trash (Easter Egg)
            ========================================================================= */}
        <MacWindow
          id="trash"
          title="Trash — 3 discarded drafts"
          isOpen={windows.trash}
          onClose={() => closeWindow('trash')}
          zIndex={zIndices.trash}
          onFocus={() => bringToFront('trash')}
          defaultPos={{ x: 200, y: 150 }}
          defaultSize={{ width: 480, height: 320 }}
        >
          <div className="space-y-4">
            <div className="border-b border-black/20 pb-2">
              <h3 className="font-mono text-sm font-bold">Trash Directory (System Waste)</h3>
              <p className="font-mono text-xs text-black/60">Items discarded during the creative design journey.</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 rounded border border-black/30 bg-white p-2">
                <Trash2 size={14} className="text-black/50" />
                <span>Over-complicated_3D_Hero_Concept_v3.fig</span>
              </div>
              <div className="flex items-center gap-2 rounded border border-black/30 bg-white p-2">
                <Trash2 size={14} className="text-black/50" />
                <span>Unusable_Cryptic_Interface_v1.proto</span>
              </div>
              <div className="flex items-center gap-2 rounded border border-black/30 bg-white p-2">
                <Trash2 size={14} className="text-black/50" />
                <span>Endless_Critique_Coffee_Cup_empty.png</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  retroAudio.click();
                  closeWindow('trash');
                }}
                className="mac-button rounded border border-black bg-white px-3 py-1 font-mono text-xs font-bold hover:bg-black hover:text-white cursor-pointer"
              >
                Empty Trash &amp; Close
              </button>
            </div>
          </div>
        </MacWindow>

        {/* Floating System Dock (AWGE / Macintosh Quick Switcher) - INSIDE CRT SCREEN */}
        <div
          className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 flex w-max max-w-[99vw] sm:max-w-[98vw] md:max-w-[96%] items-center gap-1 sm:gap-2 rounded-full border-2 border-black bg-white/95 px-2 sm:px-4 py-1 sm:py-1.5 shadow-[4px_4px_0px_#000000] backdrop-blur-md overflow-x-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overscroll-contain touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            type="button"
            onClick={() => openWindow('work')}
            title="Case Studies & Live Links"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.work ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">Cases</span>
            <span className="hidden sm:inline">Case_Studies</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('experience')}
            title="Experience Log"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.experience ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">Exp</span>
            <span className="hidden sm:inline">02_Exp</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('skills')}
            title="Toolkit & Skills"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.skills ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">Skills</span>
            <span className="hidden sm:inline">03_Skills</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('about')}
            title="About Haris"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.about ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">About</span>
            <span className="hidden sm:inline">04_About</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('contact')}
            title="Contact Desk"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.contact ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">Mail</span>
            <span className="hidden sm:inline">05_Contact</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('anime')}
            title="Slam Dunk & Retro Anime TV (10 Channels)"
            className={`mac-button flex items-center gap-1 rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.anime ? 'bg-black text-[#ff6b6b]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <Tv size={11} className={windows.anime ? 'text-[#ff6b6b]' : ''} />
            <span className="sm:hidden">TV</span>
            <span className="hidden sm:inline">📺 AnimeTV</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('project-modal')}
            title="Discuss Project"
            className="mac-button flex items-center gap-1 rounded-sm bg-[#d8ee57] border border-black px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold text-black hover:bg-black hover:text-[#d8ee57] cursor-pointer shrink-0 transition-colors"
          >
            <Sparkles size={11} className="shrink-0" />
            <span>Brief</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('game')}
            title="Snakes & Ladders: Portfolio Walkthrough Game"
            className={`mac-button rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.game ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">Game</span>
            <span className="hidden sm:inline">🎲 Game</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('deviceAI')}
            title="DeviceAI Viewport Specialist"
            className={`mac-button flex items-center gap-1 rounded-sm px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.deviceAI ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <Cpu size={11} className={windows.deviceAI ? 'text-[#d8ee57] animate-pulse' : ''} />
            <span className="sm:hidden">AI</span>
            <span className="hidden sm:inline">🤖 AI Agent</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('music')}
            title="Studio Master Tape Deck · Authentic MP3 Collection"
            className={`mac-button flex items-center gap-1 sm:gap-1.5 rounded-sm px-2 sm:px-3.5 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              flashingLightsPlaying
                ? 'bg-[#d8ee57] text-black shadow-[2px_2px_0px_#000]'
                : windows.music
                ? 'bg-black text-[#d8ee57]'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <Music size={11} className={flashingLightsPlaying ? 'animate-bounce text-black' : ''} />
            <span className="sm:hidden">{flashingLightsPlaying ? '♫ MP3 ON' : '♫ MP3'}</span>
            <span className="hidden sm:inline whitespace-nowrap">{flashingLightsPlaying ? `♫ ${currentSongTitle}: ON` : '♫ Studio MP3s'}</span>
          </button>
        </div>
      </main>
    </div>
    </MacintoshBezelFrame>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;