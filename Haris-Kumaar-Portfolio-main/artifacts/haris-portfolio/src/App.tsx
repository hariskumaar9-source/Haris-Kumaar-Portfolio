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
import {
  MacMenuBar,
  DesktopIcon,
  MacWindow,
  CrtOverlay,
  SlamDunkBackground,
  MacintoshBezelFrame,
  retroAudio,
} from '@/components/retro-os';
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
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Project = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  tone: 'lime' | 'coral' | 'blue' | 'ink';
  meta: string;
};

const projects: Project[] = [
  {
    id: 'forge',
    index: '01',
    eyebrow: 'IoT / industrial UX',
    title: 'Making the invisible legible.',
    description:
      'A calmer control layer for industrial teams monitoring complex machines, where every signal needs a reason to exist.',
    tags: ['Systems thinking', 'Interaction', 'Prototyping'],
    tone: 'lime',
    meta: 'Product design · 2024',
  },
  {
    id: 'learn',
    index: '02',
    eyebrow: 'EdTech / SaaS redesign',
    title: 'Less friction. More momentum.',
    description:
      'Reframing an EdTech platform around the small decisions that help learners keep going after the first session.',
    tags: ['Research', 'UX strategy', 'UI systems'],
    tone: 'coral',
    meta: 'Experience design · 2023',
  },
  {
    id: 'signal',
    index: '03',
    eyebrow: 'AI / motion systems',
    title: 'Interfaces with a point of view.',
    description:
      'An AI-assisted interface study built around readable states, expressive motion, and tools that make their intelligence visible.',
    tags: ['AI-assisted design', 'Motion', 'Figma'],
    tone: 'blue',
    meta: 'Independent study · 2024',
  },
  {
    id: 'fieldnotes',
    index: '04',
    eyebrow: 'Brand / digital study',
    title: 'A brand is a behaviour.',
    description:
      'Selected experiments in identity, type, and digital atmosphere — a place to test what the pixels are really saying.',
    tags: ['Art direction', 'Visual language', 'Framer'],
    tone: 'ink',
    meta: 'Ongoing practice · 2022—24',
  },
];

const capabilities = [
  { number: '01', title: 'Human-centred design', detail: 'A bias for the person using the thing, not the person presenting it.' },
  { number: '02', title: 'Research & sense-making', detail: 'Finding the useful signal in messy conversations, journeys, and data.' },
  { number: '03', title: 'Interaction & motion', detail: 'Making interfaces feel clear, responsive, and quietly alive.' },
];

const experience = [
  {
    period: 'July 2023 — Present',
    role: 'AI-Integrated UX Specialist',
    company: 'Freelance',
    place: 'Remote',
    detail: 'Designing websites, brand systems, and digital experiences for startups. Building UX flows, responsive interfaces, and prototypes with AI tools and Adobe Creative Suite.',
    mark: '01',
  },
  {
    period: 'December 2024 — June 2025',
    role: 'Product Designer',
    company: 'Simpliaxis Solutions Private Limited',
    place: 'Bengaluru, KA',
    detail: 'Reworked learning journeys through research, wireframes, and interactive Figma prototypes — improving platform engagement by 30%.',
    mark: '02',
  },
  {
    period: 'July 2023 — August 2024',
    role: 'Product Designer',
    company: 'Kanavulabs Private Limited',
    place: 'Erode, TN',
    detail: 'Made IoT and industrial product workflows more usable through systems thinking, Figma, and ProtoPie — reducing user errors by 25%.',
    mark: '03',
  },
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

  // Window State Management
  const [windows, setWindows] = useState({
    sysinfo: true,
    about: true,
    work: false,
    experience: false,
    skills: false,
    contact: false,
    trash: false,
  });

  const [topZ, setTopZ] = useState(12);
  const [zIndices, setZIndices] = useState<Record<string, number>>({
    sysinfo: 11,
    about: 12,
    work: 10,
    experience: 10,
    skills: 10,
    contact: 10,
    trash: 10,
  });

  const bringToFront = (id: string) => {
    setTopZ((prev) => {
      const next = prev + 1;
      setZIndices((z) => ({ ...z, [id]: next }));
      return next;
    });
  };

  const openWindow = (id: string) => {
    if (id === 'project-modal') {
      setIsModalOpen(true);
      return;
    }
    retroAudio.windowOpen();
    setWindows((prev) => ({ ...prev, [id]: true }));
    bringToFront(id);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({ ...prev, [id]: false }));
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
        />

        {/* CRT Scanline & Vignette Effect (AWGE Inspired) - INSIDE CRT SCREEN GLASS */}
        <CrtOverlay enabled={crtEnabled} />

        {/* Pop-up Conversation & Project Discussion Modal - INSIDE CRT SCREEN */}
        <ProjectDiscussionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Desktop Workspace Canvas - Fills 100% of CRT Screen Aperture Dynamically */}
        <div className="relative h-full w-full overflow-hidden">
          <main className="mac-desktop-bg relative h-full w-full overflow-hidden pt-8 sm:pt-9 pb-12 sm:pb-14 px-2 sm:px-4">
            {/* 80s Retro Anime (Slam Dunk) Looping Background with 8-Bit Pixelation & Macintosh Dotted Overlay - INSIDE CRT SCREEN */}
            <SlamDunkBackground enabled={animeEnabled} lowLatency={lowLatency} eightBit={eightBit} />

        {/* Desktop Icons Array (AWGE / Macintosh System 7.5 arrangement) */}
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-1 sm:w-28 sm:gap-4 select-none">
          <DesktopIcon
            id="work"
            title="01_Work.fldr"
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
          <DesktopIcon
            id="trash"
            title="Trash"
            icon="trash"
            onClick={() => openWindow('trash')}
            isSelected={windows.trash}
          />
        </div>

        {/* =========================================================================
            WINDOW: System Info Widget (Top Right)
            ========================================================================= */}
        <MacWindow
          id="sysinfo"
          title="YourOS 7.5.3 — Macintosh Environment"
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
                <h3 className="font-bold text-black text-sm uppercase">YourOS 7.5.3</h3>
                <p className="text-[10px] text-black/75 font-semibold">Macintosh System Software · 16MHz</p>
              </div>
            </div>

            <div className="rounded border-2 border-black bg-[#f4f4f4] p-2.5 text-[11px] leading-relaxed shadow-[2px_2px_0px_#000]">
              <p className="font-bold text-black">Welcome to Haris Kumaar's Studio.</p>
              <p className="mt-1 text-black/85 font-medium">
                AI-Integrated UX &amp; Product Designer based in Erode, TN, India.
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
            WINDOW 1: 01_Selected_Work.fldr
            ========================================================================= */}
        <MacWindow
          id="work"
          title="01_Selected_Work.fldr — 4 items"
          isOpen={windows.work}
          onClose={() => closeWindow('work')}
          zIndex={zIndices.work}
          onFocus={() => bringToFront('work')}
          defaultPos={{ x: 90, y: 50 }}
          defaultSize={{ width: 880, height: 600 }}
        >
          <div className="space-y-6 text-[#111111]">
            <div className="border-b-2 border-black pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-black">Selected Projects &amp; Studies</h2>
                  <p className="font-mono text-xs font-medium text-[#222222]">
                    Useful systems, beautifully considered. Double click or explore each artifact below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openWindow('project-modal')}
                  className="mac-button flex items-center gap-1.5 rounded border border-black bg-[#d8ee57] px-3 py-1.5 font-mono text-xs font-bold text-black hover:bg-[#cbe348] cursor-pointer"
                >
                  <Sparkles size={13} /> Discuss a Project
                </button>
              </div>
            </div>

            {/* Projects Grid with robust dimensions & spacious placement */}
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex flex-col justify-between rounded border-2 border-black bg-white p-4 sm:p-5 shadow-[4px_4px_0px_#000000]"
                >
                  <div>
                    {/* Impeccably aligned header preventing any isolated text wraps */}
                    <div className="border-b-2 border-black/20 pb-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-block rounded bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-[#d8ee57] shrink-0">
                            {project.index}
                          </span>
                          <span className="inline-block rounded border border-black bg-[#f0f0f0] px-2 py-0.5 font-mono text-[10px] font-bold text-black">
                            {project.eyebrow}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-black/75 shrink-0 whitespace-nowrap">
                          {project.meta}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-3.5 font-mono text-base font-bold text-black leading-snug">{project.title}</h3>
                    <p className="mt-2 font-mono text-xs font-medium leading-relaxed text-[#222222]">{project.description}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-black/40 bg-[#f4f4f4] px-2 py-0.5 font-mono text-[10px] font-semibold text-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => openWindow('project-modal')}
                      className="mac-button self-start sm:self-auto inline-flex items-center gap-1 rounded border border-black bg-[#ececec] px-3 py-1 font-mono text-[10px] font-bold text-black hover:bg-black hover:text-white cursor-pointer shrink-0"
                    >
                      Inquire <ArrowUpRight size={12} />
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
          title="02_Experience.log — Terminal History"
          isOpen={windows.experience}
          onClose={() => closeWindow('experience')}
          zIndex={zIndices.experience}
          onFocus={() => bringToFront('experience')}
          defaultPos={{ x: 180, y: 90 }}
          defaultSize={{ width: 720, height: 500 }}
        >
          <div className="space-y-6 text-[#111111]">
            <div className="border-b-2 border-black pb-3">
              <span className="inline-block rounded border border-black bg-black px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#d8ee57]">
                LOG: SYSTEM_EXPERIENCE
              </span>
              <h2 className="mt-2 font-mono text-xl font-bold uppercase tracking-tight text-black">Different Rooms. Same Question.</h2>
              <p className="font-mono text-xs font-medium text-[#222222]">
                How do we make complex interfaces easier to understand, faster to navigate, and worth returning to?
              </p>
            </div>

            <div className="space-y-4">
              {experience.map((item) => (
                <motion.div
                  key={item.mark}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000000]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/25 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-black px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                        {item.mark}
                      </span>
                      <h3 className="font-mono text-sm font-bold text-black">{item.role}</h3>
                      <span className="font-mono text-xs font-bold text-black/75">/ {item.company}</span>
                    </div>
                    <div className="text-right">
                      <span className="rounded border border-black bg-[#f4f4f4] px-2.5 py-0.5 font-mono text-[10px] font-bold text-black">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 font-mono text-xs font-medium leading-relaxed text-[#1a1a1a]">{item.detail}</p>

                  <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-black/80">
                    <MapPin size={12} />
                    <span>{item.place}</span>
                  </div>
                </motion.div>
              ))}
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
          defaultPos={{ x: 230, y: 120 }}
          defaultSize={{ width: 750, height: 530 }}
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
                      className={`mac-button rounded border-2 border-black px-2.5 py-1 font-mono text-[10px] font-bold uppercase cursor-pointer ${
                        selectedCategory === cat ? 'bg-black text-white' : 'bg-[#f0f0f0] text-black hover:bg-black/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 rounded border-2 border-black bg-white p-2.5 text-xs shadow-[2px_2px_0px_#000000]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#d8ee57] border border-black" />
                    <span className="font-mono font-bold text-black truncate">{tool.name}</span>
                  </div>
                ))}
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
          defaultSize={{ width: 680, height: 530 }}
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
              <span>Host: HarisOS System 7.5</span>
            </div>
          </div>
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
        <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-40 flex max-w-[96%] items-center gap-1 sm:gap-2 rounded-full border-2 border-black bg-white/95 px-2 sm:px-3.5 py-1 sm:py-1.5 shadow-[4px_4px_0px_#000000] backdrop-blur-md overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => openWindow('work')}
            title="Selected Work"
            className={`mac-button rounded-sm px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.work ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">01 Work</span>
            <span className="hidden sm:inline">01_Work</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('experience')}
            title="Experience Log"
            className={`mac-button rounded-sm px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.experience ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">02 Exp</span>
            <span className="hidden sm:inline">02_Exp</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('skills')}
            title="Toolkit & Skills"
            className={`mac-button rounded-sm px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.skills ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">03 Skills</span>
            <span className="hidden sm:inline">03_Skills</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('about')}
            title="About Haris"
            className={`mac-button rounded-sm px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.about ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">04 About</span>
            <span className="hidden sm:inline">04_About</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('contact')}
            title="Contact Desk"
            className={`mac-button rounded-sm px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold border border-black cursor-pointer shrink-0 transition-colors ${
              windows.contact ? 'bg-black text-[#d8ee57]' : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            <span className="sm:hidden">05 Mail</span>
            <span className="hidden sm:inline">05_Contact</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('project-modal')}
            title="Discuss Project"
            className="mac-button flex items-center gap-1 rounded-sm bg-[#d8ee57] border border-black px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold text-black hover:bg-black hover:text-[#d8ee57] cursor-pointer shrink-0 transition-colors"
          >
            <Sparkles size={11} className="shrink-0" />
            <span>Brief</span>
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