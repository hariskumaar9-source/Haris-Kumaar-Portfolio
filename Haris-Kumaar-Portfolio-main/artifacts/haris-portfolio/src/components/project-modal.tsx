import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Layers,
  Loader2,
  Mail,
  Send,
  Sparkles,
  X,
  FileText,
  Terminal,
} from 'lucide-react';
import { retroAudio } from './retro-os';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PROJECT_TYPES = [
  'Product & UX Design',
  'AI-Assisted Workflow',
  'Web & SaaS Redesign',
  'Design Systems & Motion',
  'Brand & Visual Identity',
  'Other / Consultation',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 1 month)',
  '1 — 3 months',
  'Long term / Flexible',
];

export function ProjectDiscussionModal({ isOpen, onClose }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  // Close on Escape key
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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      retroAudio.windowOpen();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setFeedback('Please provide your name, email address, and a brief project overview.');
      retroAudio.error();
      return;
    }

    setStatus('sending');
    setFeedback('');
    retroAudio.click();

    try {
      const templateParams = {
        name,
        from_name: name,
        user_name: name,
        email,
        from_email: email,
        reply_to: email,
        user_email: email,
        project_type: projectType,
        timeline,
        subject: `Project Inquiry: [${projectType}] from ${name}`,
        message: `Project Type: ${projectType}\nTimeline: ${timeline}\n\nClient Message:\n${message}`,
        content: `Project Type: ${projectType}\nTimeline: ${timeline}\n\nClient Message:\n${message}`,
      };

      await emailjs.send(
        'service_u830gki',
        'template_mc4invn',
        templateParams,
        {
          publicKey: 'YL2lgxieH9RZa6qay',
        }
      );

      setStatus('success');
      setFeedback('Your project inquiry has been delivered directly to Haris Kumaar’s Gmail inbox. You will receive a response shortly.');
      retroAudio.windowOpen();
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      const errMsg = err && typeof err === 'object' && 'text' in err ? String((err as { text: string }).text) : '';
      setStatus('error');
      setFeedback(errMsg || 'Failed to dispatch email. Please write directly to hariskum_ar@zohomail.in.');
      retroAudio.error();
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 p-2 backdrop-blur-sm transition-opacity duration-200 sm:p-4 select-none font-mono"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          retroAudio.windowClose();
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[95%] w-full max-w-[680px] flex-col overflow-hidden rounded-sm border-2 border-black bg-[#f0f0f0] text-black shadow-[6px_6px_0px_#000000] mac-window-frame animate-in fade-in zoom-in-95 duration-200">
        {/* Vintage Macintosh Titlebar with Pinstripes */}
        <div className="flex h-8 items-center justify-between border-b-2 border-black bg-[#e5e5e5] px-2 sm:px-2.5">
          <button
            type="button"
            onClick={() => {
              retroAudio.windowClose();
              onClose();
            }}
            className="flex h-4 w-4 items-center justify-center border-2 border-black bg-white shadow-[1px_1px_0px_#000000] hover:bg-black hover:text-white cursor-pointer shrink-0"
            aria-label="Close dialog"
            title="Close"
          >
            <X size={10} strokeWidth={3} />
          </button>

          {/* Title with Pinstripes on Left & Right */}
          <div className="flex flex-1 items-center justify-center px-1 sm:px-3 overflow-hidden">
            <div className="h-2 w-full mac-pinstripes opacity-40 mr-1 sm:mr-2" />
            <div className="flex items-center gap-1.5 whitespace-nowrap px-1 sm:px-2 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-black truncate max-w-[210px] sm:max-w-none">
              <Sparkles size={11} className="shrink-0" />
              <span className="truncate">Brief.app — Project Scope</span>
            </div>
            <div className="h-2 w-full mac-pinstripes opacity-40 ml-1 sm:ml-2" />
          </div>

          <div className="h-4 w-4 shrink-0" />
        </div>

        {/* Vintage Dialog Sub-Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-black bg-[#f8f8f8] px-3 sm:px-4 py-1.5 sm:py-2 text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="rounded bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-[#d8ee57]">
              SYSTEM DIALOG 7.5
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black truncate max-w-[190px] sm:max-w-none">
              Target: hariskumaar.9@gmail.com
            </span>
          </div>
          <span className="font-mono text-[10px] text-black/60 hidden sm:inline">256-Bit SSL · Verified EmailJS Gateway</span>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-7 mac-scrollbar bg-white">
          <div className="mb-5 border-b-2 border-black/20 pb-3">
            <h3 id="modal-title" className="font-mono text-xl font-bold uppercase tracking-tight text-black sm:text-2xl">
              Let's Discuss Your <span className="underline decoration-[#e97857] decoration-2">Next Vision.</span>
            </h3>
            <p className="mt-1.5 font-mono text-xs font-medium text-[#222222]">
              Fill out this project brief. Your brief lands directly in Haris Kumaar's Gmail inbox with full project parameters.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-project-modal">
            {/* Contact details */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="modal-name" className="mb-1 block font-mono text-[11px] font-bold uppercase text-black">
                  Your Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Founder / Lead / Director"
                  className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                  data-testid="input-modal-name"
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="mb-1 block font-mono text-[11px] font-bold uppercase text-black">
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                  data-testid="input-modal-email"
                />
              </div>
            </div>

            {/* Project Scope Selection */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-black">
                <Layers size={13} /> Project Scope / Focus Area
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      retroAudio.click();
                      setProjectType(type);
                    }}
                    className={`mac-button rounded border-2 border-black px-2.5 py-2 text-left font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      projectType === type
                        ? 'bg-black text-[#d8ee57] shadow-[2px_2px_0px_#000000]'
                        : 'bg-[#f4f4f4] text-black hover:bg-black/10'
                    }`}
                    data-testid={`modal-pill-type-${type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <span className="mr-1.5">{projectType === type ? '◉' : '○'}</span>
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Selection */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-black">
                <Clock size={13} /> Target Timeline
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TIMELINE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      retroAudio.click();
                      setTimeline(opt);
                    }}
                    className={`mac-button rounded border-2 border-black px-2.5 py-1.5 text-center font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      timeline === opt
                        ? 'bg-[#e97857] text-white shadow-[2px_2px_0px_#000000]'
                        : 'bg-[#f4f4f4] text-black hover:bg-black/10'
                    }`}
                    data-testid={`modal-pill-timeline-${opt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label htmlFor="modal-message" className="mb-1 block font-mono text-[11px] font-bold uppercase text-black">
                Project Overview &amp; Goals *
              </label>
              <textarea
                id="modal-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What challenges are you aiming to solve? Share links, concepts, or timeline expectations..."
                className="w-full rounded border-2 border-black bg-white px-3 py-2 font-mono text-xs text-black font-medium placeholder:text-neutral-500 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
                data-testid="textarea-modal-message"
              />
            </div>

            {/* Status Feedback */}
            {feedback && (
              <div
                className={`flex items-start gap-2.5 rounded border-2 border-black p-3 text-xs font-mono font-medium ${
                  status === 'success'
                    ? 'bg-[#d8ee57] text-black'
                    : 'bg-[#ffc8c8] text-black'
                }`}
                data-testid="modal-feedback"
              >
                {status === 'success' ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-black" />
                ) : (
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-700" />
                )}
                <span>{feedback}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-3 border-t-2 border-black/20 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-black/75">
                <Sparkles size={13} className="text-black" />
                <span>Verified EmailJS Dispatch to Gmail</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    retroAudio.click();
                    onClose();
                  }}
                  className="mac-button rounded border-2 border-black bg-white px-4 py-2 font-mono text-xs font-bold text-black hover:bg-black hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mac-button inline-flex items-center justify-center gap-1.5 rounded border-2 border-black bg-[#d8ee57] px-5 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-[#cbe348] disabled:opacity-60 cursor-pointer shadow-[2px_2px_0px_#000000]"
                  data-testid="button-modal-submit"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Dispatching...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 size={14} /> Sent to Gmail!
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Dispatch Project Brief
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
