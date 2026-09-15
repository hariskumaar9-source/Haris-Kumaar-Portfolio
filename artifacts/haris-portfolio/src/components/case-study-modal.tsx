import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  X,
  Sparkles,
  CheckCircle2,
  Award,
  Calendar,
  Layers,
  Quote,
  ArrowUpRight,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { retroAudio } from './retro-os';

export type CaseStudyPerk = {
  era: string;
  badge: string;
  title: string;
  perk: string;
  details: string[];
};

export type CaseStudy = {
  id: string;
  index: string;
  name: string;
  client: string;
  category: string;
  projectType: string;
  status: string;
  headline: string;
  description: string;
  achieved: string;
  metric?: string;
  role: string[];
  skills: string[];
  eightBitImage: string;
  liveUrl: string;
  testimonial?: {
    author: string;
    quote: string;
  };
  userResearch?: {
    participants: string;
    methodology: string;
    keyFindings: string[];
    outcome: string;
  };
  perksTimeline?: CaseStudyPerk[];
  isFeatured: boolean;
  date: string;
};

export function CaseStudyModal({
  caseStudy,
  onClose,
  onOpenProjectBrief,
}: {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenProjectBrief: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && caseStudy) {
        retroAudio.windowClose();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center pt-10 sm:pt-12 pb-4 sm:pb-6 px-2 sm:px-6 bg-black/65 backdrop-blur-xs select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            retroAudio.windowClose();
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 450, damping: 26 }}
          className="relative flex flex-col w-full max-w-3xl max-h-[calc(100dvh-56px)] sm:max-h-[calc(100dvh-64px)] rounded-md border-3 border-black bg-[#f2f2f2] shadow-[8px_8px_0px_#000000] overflow-hidden my-auto"
        >
          {/* Retro Macintosh Window Titlebar */}
          <div className="flex h-9 items-center justify-between border-b-2 border-black bg-[#e0e0e0] px-2 sm:px-3 font-mono text-xs font-bold text-black select-none shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  retroAudio.windowClose();
                  onClose();
                }}
                className="flex h-6 w-6 sm:h-5 sm:w-5 items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white cursor-pointer shadow-[1px_1px_0px_#000] shrink-0"
                title="Close Window"
              >
                <X size={12} strokeWidth={3} />
              </button>
              <div className="flex items-center gap-1.5 pl-0.5 sm:pl-1 overflow-hidden">
                <span className="bg-black text-[#d8ee57] px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded-xs font-bold shrink-0">
                  8-BIT
                </span>
                <span className="truncate max-w-[130px] sm:max-w-[400px]">
                  {caseStudy.name}.app — {caseStudy.projectType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => retroAudio.click()}
                className="flex items-center gap-1 border border-black bg-[#d8ee57] hover:bg-black hover:text-[#d8ee57] text-black px-2 py-0.5 text-[10px] font-bold rounded-xs cursor-pointer shadow-[1px_1px_0px_#000]"
              >
                <span>OPEN LIVE</span>
                <ExternalLink size={10} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 font-mono text-black overscroll-contain">
            {/* Top 8-Bit Pixel Image Showcase with CRT scanline effect */}
            <div className="relative rounded border-2 border-black bg-[#0d0d14] overflow-hidden shadow-[4px_4px_0px_#000]">
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
                <span className="rounded border border-black bg-black px-2 py-0.5 text-[10px] font-bold text-[#d8ee57]">
                  {caseStudy.status}
                </span>
                <span className="rounded border border-black bg-white/90 px-2 py-0.5 text-[10px] font-bold text-black">
                  {caseStudy.date}
                </span>
              </div>

              {/* 8-Bit SVG Artwork */}
              <div className="w-full h-40 sm:h-72 flex items-center justify-center p-2 bg-[#12121c]">
                <img
                  src={caseStudy.eightBitImage}
                  alt={`${caseStudy.name} 8-Bit Artwork`}
                  className="w-full h-full object-contain filter contrast-105"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              {/* Live Overlay Banner */}
              <div className="border-t-2 border-black bg-[#fafafa] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Deployment
                  </span>
                  <span className="text-black/40">|</span>
                  <span className="text-black/80 font-bold">Client: {caseStudy.client}</span>
                </div>

                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => retroAudio.click()}
                  className="flex items-center gap-1.5 font-bold text-black hover:underline cursor-pointer bg-[#ffd166] px-2.5 py-1 rounded border border-black shadow-[2px_2px_0px_#000]"
                >
                  <span>Launch Live Project</span>
                  <ArrowUpRight size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Headline & Key Metric Banner */}
            <div className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black/15 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-black/60 tracking-wider">
                    {caseStudy.category} · {caseStudy.projectType}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-black mt-0.5">
                    {caseStudy.headline}
                  </h2>
                </div>
                {caseStudy.metric && (
                  <div className="shrink-0 rounded border-2 border-black bg-[#d8ee57] px-3 py-1.5 text-center shadow-[2px_2px_0px_#000]">
                    <span className="text-[9px] font-bold text-black uppercase block">Key Metric</span>
                    <span className="text-sm sm:text-base font-bold text-black">{caseStudy.metric}</span>
                  </div>
                )}
              </div>

              {/* About & Achieved Sections */}
              <div className="mt-4 space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#1a1a1a]">
                <div>
                  <h3 className="font-bold text-black text-xs uppercase tracking-wider text-black/70 mb-1 flex items-center gap-1.5">
                    <Layers size={13} /> About the Project
                  </h3>
                  <p className="text-black/90 font-medium">{caseStudy.description}</p>
                </div>

                <div className="rounded bg-[#f8f9fa] border border-black/20 p-3">
                  <h3 className="font-bold text-black text-xs uppercase tracking-wider text-black/70 mb-1 flex items-center gap-1.5 text-emerald-800">
                    <TrendingUp size={13} /> Achieved Impact
                  </h3>
                  <p className="text-black/90 font-medium">{caseStudy.achieved}</p>
                </div>
              </div>
            </div>

            {/* Dedicated User Research & Field Insights */}
            {caseStudy.userResearch && (
              <div className="rounded border-2 border-black bg-[#eef7f2] p-4 shadow-[4px_4px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between border-b-2 border-black/20 pb-2 mb-3 gap-2">
                  <h3 className="font-bold text-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-950">
                    <TrendingUp size={14} className="text-emerald-700" />
                    <span>User Research &amp; Field Methodology</span>
                  </h3>
                  <span className="rounded bg-emerald-200 border border-black px-2 py-0.5 text-[10px] font-bold text-emerald-950">
                    {caseStudy.userResearch.participants}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-black/80">Methodology: </span>
                    <span className="text-black/90 font-medium">{caseStudy.userResearch.methodology}</span>
                  </div>

                  <div className="pt-0.5">
                    <span className="font-bold text-black/80 block mb-1">Key Research Findings &amp; User Insights:</span>
                    <ul className="space-y-1 pl-1">
                      {caseStudy.userResearch.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={12} className="shrink-0 text-emerald-700 mt-0.5" />
                          <span className="text-black/90 font-medium">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded border border-emerald-700/40 bg-white p-2.5 text-emerald-950 font-semibold mt-2 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                    <span className="text-emerald-800 font-bold">Research Impact &amp; Outcome: </span>
                    {caseStudy.userResearch.outcome}
                  </div>
                </div>
              </div>
            )}

            {/* Evolutionary Perks Timeline (From the Beginning Until Now) */}
            {caseStudy.perksTimeline && caseStudy.perksTimeline.length > 0 && (
              <div className="rounded border-2 border-black bg-[#fbf9f1] p-3.5 sm:p-4 shadow-[4px_4px_0px_#000]">
                <div className="flex flex-wrap items-center justify-between border-b-2 border-black/20 pb-2 mb-3 gap-2">
                  <h3 className="font-bold text-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-black">
                    <Sparkles size={14} className="text-amber-600 shrink-0" />
                    <span>Evolutionary Perks &amp; System Milestones (Beginning Until Now)</span>
                  </h3>
                  <span className="rounded bg-black text-[#d8ee57] border border-black px-2 py-0.5 text-[9.5px] font-bold">
                    {caseStudy.perksTimeline.length} PHASES OF INNOVATION
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {caseStudy.perksTimeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded border-2 border-black bg-white p-3 shadow-[2px_2px_0px_#000] relative"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-black/15 pb-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-black text-[#d8ee57] px-1.5 py-0.2 text-[9px] font-bold rounded-xs">
                            {item.era}
                          </span>
                          <h4 className="font-bold text-black text-xs sm:text-sm">{item.title}</h4>
                        </div>
                        <span className="bg-[#ffd166] text-black border border-black px-1.5 py-0.2 text-[8.5px] font-bold rounded-xs uppercase">
                          {item.badge}
                        </span>
                      </div>

                      <p className="font-bold text-black/90 mb-1.5 text-xs text-[#1a1a1a]">
                        ★ Key Perk: <span className="font-semibold text-emerald-800">{item.perk}</span>
                      </p>

                      <ul className="space-y-1 pl-1 text-[11px] text-black/80">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold mt-0.5">✔</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Haris's Role & Contributions */}
            <div className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000]">
              <h3 className="font-bold text-black text-xs uppercase tracking-wider text-black/70 mb-2.5 flex items-center gap-1.5">
                <Cpu size={13} /> My Role &amp; Execution
              </h3>
              <ul className="space-y-2 text-xs sm:text-[13px]">
                {caseStudy.role.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-black font-bold mt-0.5">▪</span>
                    <span className="text-black/90 font-medium leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills in Use */}
            <div className="rounded border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000]">
              <h3 className="font-bold text-black text-xs uppercase tracking-wider text-black/70 mb-2">
                Skills &amp; Methodologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {caseStudy.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-black bg-[#f0f0f0] px-2.5 py-1 text-[11px] font-bold text-black shadow-[1px_1px_0px_#000]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Testimonial (if available) */}
            {caseStudy.testimonial && (
              <div className="rounded border-2 border-black bg-[#fffae5] p-4 shadow-[4px_4px_0px_#000]">
                <div className="flex items-start gap-2.5">
                  <Quote size={20} className="shrink-0 text-amber-700 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold italic text-black/90 leading-relaxed">
                      "{caseStudy.testimonial.quote}"
                    </p>
                    <p className="mt-2 text-xs font-bold text-black">
                      — {caseStudy.testimonial.author}
                      <span className="text-black/60 font-medium ml-1">· Client Review</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-black/20">
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => retroAudio.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border-2 border-black bg-[#d8ee57] hover:bg-[#c6db49] text-black px-5 py-2 text-xs font-bold cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <span>Visit Live Project ({caseStudy.name})</span>
                <ExternalLink size={13} strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={() => {
                  retroAudio.click();
                  onClose();
                  onOpenProjectBrief();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border-2 border-black bg-white hover:bg-black hover:text-white text-black px-5 py-2 text-xs font-bold cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                <Sparkles size={13} />
                <span>Discuss Similar Project</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
