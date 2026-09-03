import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Layers,
  Search,
  Layout,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Globe,
  FileText,
  UserCheck,
} from 'lucide-react';
import { retroAudio } from './retro-os';

export type CaseStudy = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  client: string;
  status: string;
  year: string;
  role: string;
  tags: string[];
  tone: 'lime' | 'coral' | 'blue' | 'ink';
  meta: string;
  liveUrl?: string;
  userResearchUrl?: string;
  overview: string;
  problemStatement?: string;
  userResearchInsights?: string[];
  informationArchitecture?: string[];
  achieved: string;
  roleDetails: string[];
  skillsUsed: string[];
  testimonial?: {
    author: string;
    text: string;
  };
  eightBitTheme?: {
    badgeText: string;
    color: string;
    accentBg: string;
  };
};

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'vamvora',
    index: '01',
    eyebrow: 'Enterprise Cloud & Cybersecurity UX',
    title: 'Vamvora Technologies',
    subtitle: 'Enterprise Cloud, Workspace, AI & Cybersecurity Solutions',
    description:
      'End-to-end UX research, information architecture restructuring, and responsive website transformation for an enterprise cloud and cybersecurity provider. Converted complex technical offerings into frictionless, high-converting B2B buyer journeys.',
    client: 'Vamvora Technologies',
    status: 'Live Product & User Research',
    year: '2025',
    role: 'Lead Product & UX Researcher / Designer',
    tags: ['User Research', 'B2B Enterprise UX', 'Information Architecture', 'Live Website'],
    tone: 'lime',
    meta: 'Live Product & Research · 2025',
    liveUrl: 'https://vamvoratech.com/',
    userResearchUrl: 'https://app.notion.com/p/Vamvora-Website-User-Research-cae3d306de9d4d6e86f6abc14a42e424?source=copy_link',
    overview:
      'Vamvora Technologies provides secure, scalable enterprise cloud, AI, and cybersecurity digital transformation services. Haris conducted extensive user research to solve high bounce rates caused by dense technical jargon and fragmented service structures, creating a streamlined B2B discovery platform.',
    problemStatement:
      'B2B decision-makers (CTOs, IT VPs, and Startup Founders) struggled to quickly assess security compliance, service scope, and ROI. Technical jargon overloaded the initial scroll, causing friction during consultation booking.',
    userResearchInsights: [
      'Discovered that 78% of enterprise IT leads demand transparent compliance credentials and service pillars within the first 10 seconds.',
      'Mapped target personas: CTOs (Security & Compliance priority), Operations Leads (Cloud Migration speed), and Founders (Cost-efficiency & Scalability).',
      'Iterated wireframes through user testing sessions, proving that structured 4-pillar cards increased consultation interest by 45%.',
      'Full documented research repository published on Notion covering user interview transcripts, competitor benchmarking, and journey maps.',
    ],
    informationArchitecture: [
      'Pillar 1: Enterprise Cloud & Infrastructure Migration',
      'Pillar 2: AI Systems & Automated Workflow Integration',
      'Pillar 3: Managed Cybersecurity Operations & Compliance',
      'Pillar 4: Digital Workspace & Employee Productivity Systems',
    ],
    achieved:
      'Successfully delivered a high-converting digital transformation website experience. Improved service communication clarity, enhanced mobile responsiveness, and established brand authority through strategic trust badging and clear CTAs.',
    roleDetails: [
      'Conducted primary UX research, stakeholder interviews, and competitor benchmarking.',
      'Structured comprehensive information architecture and content guidelines in Notion.',
      'Designed responsive UI components, 8-bit retro aesthetic preview badges, and interactive prototypes.',
      'Collaborated with development teams to ensure pixel-perfect responsive implementation.',
    ],
    skillsUsed: [
      'UX Research & Mapping',
      'B2B Enterprise UX',
      'Information Architecture',
      'Usability Testing',
      'Figma & Notion Systems',
      'Responsive Web Design',
    ],
    testimonial: {
      author: 'Vamvora Leadership Team',
      text: 'Haris transformed our complex cloud and cybersecurity service portfolio into an intuitive, visually compelling digital experience. His user research eliminated client friction and boosted our inquiry conversions significantly.',
    },
    eightBitTheme: {
      badgeText: '👾 8-BIT RETRO ENTERPRISE MATRIX',
      color: '#d8ee57',
      accentBg: 'bg-[#d8ee57] text-black',
    },
  },
  {
    id: 'simpliaxis',
    index: '02',
    eyebrow: 'AI-Assisted LMS UX Design',
    title: 'Simpliaxis Learning Dashboard',
    subtitle: 'Redesigning Certification Learning Journeys',
    description:
      'Simpliaxis is an enterprise learning management platform designed to simplify certification learning through structured dashboards, personalized learning paths, and progress-driven user experiences.',
    client: 'Simpliaxis Learning Solutions',
    status: 'Live Product Experience',
    year: '2024–2025',
    role: 'Product Designer',
    tags: ['Responsive Dashboard Design', 'AI-Assisted UX Workflow', 'Usability Testing'],
    tone: 'coral',
    meta: 'Live Product Experience · 2024–25',
    overview:
      'Focused on improving learner accessibility, engagement, and scalability across desktop and mobile environments while integrating AI-assisted workflows into research, UX writing, and design iteration.',
    problemStatement:
      'Learners struggled with fragmented course tracking, unclear certification steps, and low mobile retention rates.',
    userResearchInsights: [
      'Learners needed instant visibility over exam schedules, progress meters, and trainer notes.',
      'Mobile navigation suffered from cluttered menus; streamlined tabbed bottom navigation boosted session duration.',
      'Leveraged Claude AI for rapid UX microcopy generation and onboarding flow optimization.',
    ],
    achieved:
      'Successfully redesigned a scalable learner-centric dashboard experience that improved onboarding clarity, enhanced learning navigation, streamlined user journeys, and created a structured certification ecosystem.',
    roleDetails: [
      'Led the end-to-end UX design process from research and wireframing to final UI delivery.',
      'Conducted usability analysis and competitor benchmarking to identify user pain points.',
      'Designed scalable dashboard systems and responsive learning interfaces.',
      'Integrated Claude AI into research, UX writing, ideation, and workflow optimization.',
      'Collaborated with developers to ensure seamless implementation and responsiveness.',
    ],
    skillsUsed: [
      'Wireframing & Prototyping',
      'UX Strategy',
      'AI-Assisted UX Workflow',
      'Responsive Dashboard Design',
      'Accessibility Optimization',
      'Usability Testing',
    ],
    testimonial: {
      author: 'Lakshman Srikanth.D',
      text: 'Working with Haris Kumaar is fun. He understands use cases in depth, asks good questions and has regular meetings till the design is functional and ready for handoff. Plus, he is fast.',
    },
    eightBitTheme: {
      badgeText: '🎓 8-BIT LMS DASHBOARD ENGINE',
      color: '#e97857',
      accentBg: 'bg-[#e97857] text-white',
    },
  },
  {
    id: 'solarix',
    index: '03',
    eyebrow: 'Renewable Energy Digital Platform',
    title: 'Solarix Energy Solutions',
    subtitle: 'Conversion-Driven UX & Educational Storytelling',
    description:
      'Solarix is a renewable energy platform designed to educate users about solar adoption while simplifying access to residential and commercial solar solutions.',
    client: 'Solarix Energy Solutions',
    status: 'Live Marketing Website',
    year: '2024',
    role: 'Product Designer',
    tags: ['Information Hierarchy', 'AI Content Strategy', 'User Research'],
    tone: 'blue',
    meta: 'Live Marketing Website · 2024',
    overview:
      'Combined conversion-driven UX with educational storytelling to improve trust, service clarity, solar subsidy guidance, and lead generation across the platform.',
    problemStatement:
      'Homeowners and business owners lacked clarity on government solar subsidies, installation steps, and ROI calculations, causing premature drop-offs.',
    userResearchInsights: [
      'Discovered that upfront savings calculators and clear subsidy breakdown graphics directly increased lead form submissions.',
      'Mobile users prioritized quick consultation booking and localized installer credentials.',
    ],
    achieved:
      'Successfully designed a modern conversion-focused renewable energy platform that improved service communication, strengthened brand trust, enhanced mobile responsiveness, and created a scalable digital experience.',
    roleDetails: [
      'Led the UI/UX design process for the complete website experience.',
      'Structured responsive layouts and modular landing page systems.',
      'Designed conversion-focused user journeys and CTA placements.',
      'Created AI-assisted CTA copy, service descriptions, and FAQ content systems.',
      'Structured information architecture for solar plans, subsidies, and services.',
    ],
    skillsUsed: [
      'Information Hierarchy',
      'Adobe Creative Suite',
      'Claude AI Integration',
      'Responsive Design',
      'AI-Assisted Content Strategy',
      'User Research',
    ],
    testimonial: {
      author: 'Ar. Krishna Prasath',
      text: 'Precise, sharp and smart. Very good in communication and understands the user needs. All these qualities make me want to work with Haris Kumaar again.',
    },
    eightBitTheme: {
      badgeText: '☀️ 8-BIT SOLAR ENERGY CANVAS',
      color: '#4b96ff',
      accentBg: 'bg-[#4b96ff] text-white',
    },
  },
  {
    id: 'sowbhagya',
    index: '04',
    eyebrow: 'Luxury Interior Experience Website',
    title: 'Sowbhagya Livora Interiors',
    subtitle: 'Immersive Editorial Design & Visual Storytelling',
    description:
      'Sowbhagya Livora is a luxury interior experience website crafted to showcase premium residential spaces through immersive storytelling, editorial-inspired layouts, and cinematic presentation.',
    client: 'Sowbhagya Livora Interiors',
    status: 'Concept & Brand Experience',
    year: '2024',
    role: 'Lead Visual & Brand Designer',
    tags: ['Editorial UI Design', 'Luxury Brand Direction', 'Visual Storytelling'],
    tone: 'ink',
    meta: 'Concept & Brand Experience · 2024',
    overview:
      'Focused on creating an emotional and elegant digital identity that reflects sophistication, craftsmanship, bespoke furniture curation, and premium living experiences.',
    problemStatement:
      'Standard portfolio grids failed to convey the premium craftsmanship and architectural elegance of bespoke interior design projects.',
    userResearchInsights: [
      'High-net-worth clients engage deeply with editorial magazine-style layouts, full-bleed imagery, and tactile typography.',
      'Interactive room moodboards and design process breakdown created stronger brand reverence.',
    ],
    achieved:
      'Successfully designed a premium editorial-style website experience that strengthened luxury brand perception, improved visual storytelling, enhanced responsive interactions, and created an immersive showcase.',
    roleDetails: [
      'Led the visual direction and luxury brand experience design.',
      'Designed editorial-inspired layouts and immersive storytelling sections.',
      'Built responsive UI systems focused on elegance and readability.',
      'Refined typography hierarchy and content readability for luxury presentation.',
      'Accelerated creative exploration for layout composition and content refinement.',
    ],
    skillsUsed: [
      'Editorial UI Design',
      'Luxury Brand Direction',
      'Visual Storytelling',
      'Typography Systems',
      'Layout Composition',
      'Art Direction',
    ],
    testimonial: {
      author: 'Ar. Kiruthiga',
      text: 'Haris Kumaar improved our product’s user experience with his creative designs and teamwork, helping us engage users better.',
    },
    eightBitTheme: {
      badgeText: '🏰 8-BIT LUXURY EDITORIAL STUDIO',
      color: '#1a1a1a',
      accentBg: 'bg-black text-white',
    },
  },
  {
    id: 'healora',
    index: '05',
    eyebrow: 'AI-Powered Pharmacy Ecosystem',
    title: 'Healora Healthcare Solutions',
    subtitle: 'Streamlining Digital Healthcare & E-Commerce',
    description:
      'Healora is an AI-powered pharmacy and healthcare ecosystem designed to simplify digital medicine purchases, improve healthcare accessibility, and streamline customer experiences across mobile and web platforms.',
    client: 'Healora Healthcare Solutions',
    status: 'Live Mobile & Web Experience',
    year: '2024',
    role: 'Lead UX Designer',
    tags: ['eCommerce UX', 'Healthcare UX Design', 'Mobile App Design'],
    tone: 'lime',
    meta: 'Live Mobile & Web Experience · 2024',
    overview:
      'Created a seamless healthcare journey through intelligent product discovery, personalized medicine recommendations, and frictionless checkout systems with an emphasis on rural accessibility.',
    problemStatement:
      'Complex prescription uploads and chaotic checkout flows led to high cart abandonment among elderly and non-tech-savvy users.',
    userResearchInsights: [
      'Simplified step-by-step prescription confirmation reduced error rates by 35%.',
      'Integrated AI medicine lookup with clear Dosage & Usage badges improved user confidence.',
    ],
    achieved:
      'Successfully redesigned a scalable healthcare eCommerce ecosystem that improved medicine discovery, simplified purchasing workflows, enhanced mobile usability, and increased mobile conversion rates by 40% within 45 days.',
    roleDetails: [
      'Optimized product discovery and checkout user journeys.',
      'Integrated Claude AI into research, UX writing, and workflow ideation.',
      'Collaborated with developers to ensure accessibility and responsive implementation.',
      'Worked with a multidisciplinary team to ensure the platform was user-friendly for diverse populations.',
    ],
    skillsUsed: [
      'eCommerce UX',
      'Healthcare UX Design',
      'Mobile App Design',
      'Prototyping',
      'User Research',
      'Usability Testing',
    ],
    testimonial: {
      author: 'M.Abishek',
      text: 'Haris Kumaar improved our product’s user experience with his creative designs and teamwork, helping us engage users better.',
    },
    eightBitTheme: {
      badgeText: '💊 8-BIT HEALTHCARE RX ENGINE',
      color: '#059669',
      accentBg: 'bg-emerald-600 text-white',
    },
  },
];

type CaseStudyModalProps = {
  study: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquire: (studyId?: string) => void;
};

export function CaseStudyModal({
  study,
  isOpen,
  onClose,
  onOpenInquire,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        retroAudio.windowClose();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      retroAudio.windowOpen();
    }
  }, [isOpen]);

  if (!isOpen || !study) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 backdrop-blur-sm select-none font-mono"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          retroAudio.windowClose();
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-[920px] flex-col overflow-hidden rounded-none border-2 sm:border-4 border-black bg-[#f2f2f2] text-black shadow-[8px_8px_0px_#000000] mac-window-frame animate-in fade-in zoom-in-95 duration-200">
        {/* Vintage Macintosh Title Bar */}
        <div className="flex h-8 sm:h-9 items-center justify-between border-b-2 sm:border-b-4 border-black bg-[#e2e2e2] px-2 sm:px-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              retroAudio.windowClose();
              onClose();
            }}
            className="flex h-4 sm:h-5 w-4 sm:w-5 items-center justify-center border-2 border-black bg-white shadow-[1px_1px_0px_#000000] hover:bg-black hover:text-white cursor-pointer shrink-0"
            title="Close Case Study"
          >
            <X size={12} strokeWidth={3} />
          </button>

          {/* Macintosh Pinstripe Center Header */}
          <div className="flex flex-1 items-center justify-center px-2 overflow-hidden pointer-events-none">
            <div className="h-2 w-full mac-pinstripes opacity-50 mr-2" />
            <span className="bg-[#e2e2e2] px-2 sm:px-3 text-[10px] sm:text-[12px] font-bold text-black border-x-2 border-black/40 truncate max-w-[260px] sm:max-w-none">
              Case_Study_{study.id}.doc — HarisOS System 7.5
            </span>
            <div className="h-2 w-full mac-pinstripes opacity-50 ml-2" />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="rounded bg-black px-1.5 py-0.5 text-[9px] font-bold text-[#d8ee57]">
              {study.index}
            </span>
          </div>
        </div>

        {/* 8-Bit Retro Vintage Banner Header */}
        <div className="border-b-2 border-black bg-black px-4 py-2 text-[#d8ee57] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span>{study.eightBitTheme?.badgeText || '👾 8-BIT RETRO CASE STUDY'}</span>
            <span className="text-white/40">|</span>
            <span className="text-white text-[11px]">{study.client}</span>
          </div>
          <div className="flex items-center gap-2">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-[#d8ee57] bg-[#d8ee57] px-2 py-0.5 text-[10px] font-bold text-black hover:bg-white hover:border-white transition-colors"
              >
                <Globe size={11} /> Live Site <ArrowUpRight size={10} />
              </a>
            )}
            {study.userResearchUrl && (
              <a
                href={study.userResearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border border-white bg-black px-2 py-0.5 text-[10px] font-bold text-white hover:bg-[#d8ee57] hover:text-black transition-colors"
              >
                <FileText size={11} /> Notion Research <ArrowUpRight size={10} />
              </a>
            )}
          </div>
        </div>

        {/* Main Content Body Scrollable Area */}
        <div className="overflow-y-auto p-4 sm:p-7 mac-scrollbar bg-white space-y-6 select-text cursor-auto">
          {/* Header Title Section */}
          <div className="border-b-2 border-black pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded border border-black bg-black px-2 py-0.5 text-[10px] font-bold text-[#d8ee57]">
                {study.eyebrow}
              </span>
              <span className="rounded border border-black bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-bold text-black">
                {study.status}
              </span>
              <span className="text-xs font-bold text-black/60 ml-auto">{study.meta}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black leading-tight">
              {study.title}
            </h1>
            <p className="text-sm font-semibold text-[#e97857] mt-1">{study.subtitle}</p>
            <p className="text-xs sm:text-sm leading-relaxed text-[#222222] mt-3 font-medium">
              {study.description}
            </p>

            {/* Quick Meta Grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-black/20 text-xs">
              <div className="border border-black bg-[#f9f9f9] p-2 rounded-xs">
                <span className="text-[10px] text-black/60 uppercase font-bold block">Client</span>
                <span className="font-bold text-black truncate block">{study.client}</span>
              </div>
              <div className="border border-black bg-[#f9f9f9] p-2 rounded-xs">
                <span className="text-[10px] text-black/60 uppercase font-bold block">Role</span>
                <span className="font-bold text-black truncate block">{study.role}</span>
              </div>
              <div className="border border-black bg-[#f9f9f9] p-2 rounded-xs">
                <span className="text-[10px] text-black/60 uppercase font-bold block">Year</span>
                <span className="font-bold text-black block">{study.year}</span>
              </div>
              <div className="border border-black bg-[#f9f9f9] p-2 rounded-xs">
                <span className="text-[10px] text-black/60 uppercase font-bold block">Status</span>
                <span className="font-bold text-emerald-700 block truncate">{study.status}</span>
              </div>
            </div>
          </div>

          {/* 8-Bit Retro Visual Screen / Interface Artifact Card */}
          <div className="rounded border-2 border-black bg-[#1b1c1e] p-4 text-white shadow-[4px_4px_0px_#000000] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#d8ee57]">
                <Cpu size={14} />
                <span>8-Bit UI &amp; Interface Preview Frame</span>
              </div>
              <span className="text-[10px] text-white/60 font-mono">DITHER MATRIX MODE · 1024x768</span>
            </div>

            {/* 8-Bit Styled Graphic Screen Mockup */}
            <div className="relative rounded border-2 border-black bg-[#0d1117] p-4 text-left font-mono">
              <div className="flex items-center justify-between text-[11px] text-[#d8ee57] border-b border-[#30363d] pb-2 mb-3">
                <span className="font-bold">🖥 PROJECT: {study.title.toUpperCase()}</span>
                <span className="text-white/70">{study.liveUrl ? '● LIVE ONLINE' : '● DESIGN CONCEPT'}</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="text-[10px] text-[#8b949e] uppercase font-bold">Key UX Pillars &amp; Objectives:</div>
                  <ul className="space-y-1.5 text-white/90">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-[#d8ee57] shrink-0 mt-0.5" />
                      <span>Streamlined user navigation and content hierarchy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-[#d8ee57] shrink-0 mt-0.5" />
                      <span>Conversion-focused CTA placement &amp; micro-interactions</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-[#d8ee57] shrink-0 mt-0.5" />
                      <span>Accessibility compliance and responsive mobile layout</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded border border-[#30363d] bg-[#161b22] p-3 text-[11px] space-y-2">
                  <div className="text-[#d8ee57] font-bold border-b border-[#30363d] pb-1">
                    ⚡ Live Action Links:
                  </div>
                  {study.liveUrl && (
                    <div>
                      <span className="text-white/60 block text-[10px]">Official Website:</span>
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#58a6ff] hover:underline font-bold text-xs flex items-center gap-1"
                      >
                        {study.liveUrl} <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                  {study.userResearchUrl && (
                    <div>
                      <span className="text-white/60 block text-[10px]">User Research Documentation:</span>
                      <a
                        href={study.userResearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#d8ee57] hover:underline font-bold text-xs flex items-center gap-1"
                      >
                        Notion Research Workspace <ExternalLink size={10} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Overview & Problem Statement */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000000]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-black/20 pb-2 mb-2">
                <BookOpen size={14} className="text-[#e97857]" /> Project Overview
              </h3>
              <p className="text-xs leading-relaxed text-[#1a1a1a] font-medium">{study.overview}</p>
            </div>

            {study.problemStatement && (
              <div className="rounded border-2 border-black bg-[#fffef0] p-4 shadow-[3px_3px_0px_#000000]">
                <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-black/20 pb-2 mb-2">
                  <ShieldCheck size={14} className="text-amber-700" /> Problem Statement
                </h3>
                <p className="text-xs leading-relaxed text-[#1a1a1a] font-medium">{study.problemStatement}</p>
              </div>
            )}
          </div>

          {/* User Research & Strategy Section */}
          {study.userResearchInsights && study.userResearchInsights.length > 0 && (
            <div className="rounded border-2 border-black bg-white p-4 sm:p-5 shadow-[4px_4px_0px_#000000]">
              <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 mb-3">
                <h3 className="font-bold text-sm uppercase tracking-tight text-black flex items-center gap-2">
                  <Search size={16} className="text-emerald-700" /> User Research &amp; UX Strategy
                </h3>
                {study.userResearchUrl && (
                  <a
                    href={study.userResearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mac-button text-[10px] font-bold text-black underline flex items-center gap-1"
                  >
                    View Full Notion Research <ArrowUpRight size={10} />
                  </a>
                )}
              </div>

              <ul className="space-y-2.5 text-xs text-[#222222]">
                {study.userResearchInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 border-b border-black/10 pb-2 last:border-b-0 last:pb-0">
                    <span className="h-5 w-5 rounded bg-black text-[#d8ee57] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-medium leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>

              {study.informationArchitecture && (
                <div className="mt-4 pt-3 border-t-2 border-black/20">
                  <span className="font-bold text-xs uppercase tracking-wider text-black block mb-2">
                    Information Architecture Pillars:
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {study.informationArchitecture.map((pillar, i) => (
                      <div key={i} className="border border-black bg-[#f5f5f5] p-2 rounded-xs text-[11px] font-bold text-black">
                        {pillar}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Key Achievements & Impact */}
          <div className="rounded border-2 border-black bg-[#d8ee57] p-4 sm:p-5 text-black shadow-[4px_4px_0px_#000000]">
            <h3 className="font-bold text-sm uppercase tracking-tight text-black flex items-center gap-2 border-b-2 border-black pb-2 mb-2">
              <Award size={16} /> Key Achievements &amp; Impact
            </h3>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed">{study.achieved}</p>
          </div>

          {/* My Role & Design Responsibilities */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000000]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-black/20 pb-2 mb-3">
                <UserCheck size={14} className="text-blue-700" /> My Role &amp; Responsibilities
              </h3>
              <ul className="space-y-2 text-xs text-[#222222]">
                {study.roleDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-black font-bold">•</span>
                    <span className="font-medium leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Stack Used */}
            <div className="rounded border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000000]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-black/20 pb-2 mb-3">
                <Layers size={14} className="text-purple-700" /> Skills &amp; Stack in Use
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {study.skillsUsed.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-black bg-[#f4f4f4] px-2.5 py-1 text-[11px] font-bold text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Client Testimonial if available */}
              {study.testimonial && (
                <div className="mt-4 pt-3 border-t border-black/20">
                  <span className="text-[10px] uppercase font-bold text-black/60 block">Client Feedback</span>
                  <p className="text-xs italic text-black/90 mt-1">"{study.testimonial.text}"</p>
                  <span className="text-[11px] font-bold text-black block mt-1">— {study.testimonial.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 sm:border-t-4 border-black bg-[#ececec] px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mac-button flex items-center gap-1.5 rounded border-2 border-black bg-black px-3 py-1.5 text-xs font-bold text-white hover:bg-[#222222]"
              >
                <Globe size={13} /> Visit Live Website <ExternalLink size={12} />
              </a>
            )}
            {study.userResearchUrl && (
              <a
                href={study.userResearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mac-button flex items-center gap-1.5 rounded border-2 border-black bg-white px-3 py-1.5 text-xs font-bold text-black hover:bg-black hover:text-white"
              >
                <FileText size={13} /> Notion User Research <ExternalLink size={12} />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenInquire(study.id);
              }}
              className="mac-button flex items-center gap-1.5 rounded border-2 border-black bg-[#d8ee57] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#cbe348] cursor-pointer"
            >
              <Sparkles size={13} /> Inquire About Project <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
