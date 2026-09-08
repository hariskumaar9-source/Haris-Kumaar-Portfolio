import React from 'react';

export type ToolItem = {
  name: string;
  category: 'ai' | 'design' | 'research';
  tagline: string;
  icon: (props: { className?: string; size?: number }) => React.JSX.Element;
  brandColor?: string;
};

// High-fidelity brand SVG icons
export function ClaudeIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 3.5L10.5 20.5M4 14.5L20 9.5M6 7.5L18 16.5M18 7.5L6 16.5" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="#D97706" />
    </svg>
  );
}

export function ChatGPTIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22.28 10.36a5.97 5.97 0 0 0-.5-4.42 6.04 6.04 0 0 0-4.9-3.14 6.08 6.08 0 0 0-4.32 1.1A5.98 5.98 0 0 0 4.19 5.3a6.04 6.04 0 0 0-.9 5.75 6 6 0 0 0 1.25 4.3 6.04 6.04 0 0 0 .5 4.41 6.05 6.05 0 0 0 4.9 3.15 6.1 6.1 0 0 0 4.32-1.1 5.98 5.98 0 0 0 8.37-1.4 6.04 6.04 0 0 0 .9-5.75 6 6 0 0 0-1.25-4.3zM12 14.7a2.7 2.7 0 1 1 2.7-2.7 2.7 2.7 0 0 1-2.7 2.7zm-6.73-1.63a4.52 4.52 0 0 1 .41-2.7 4.58 4.58 0 0 1 3.52-2.35v1.27a3.3 3.3 0 0 0-2.34 1.58 3.25 3.25 0 0 0-.29 1.94zm2.14 5.3a4.5 4.5 0 0 1-2.14-1.74 4.58 4.58 0 0 1-.29-4.23l1.1.63a3.32 3.32 0 0 0 .19 2.8 3.26 3.26 0 0 0 1.94 1.27zm6.73 1.63a4.52 4.52 0 0 1-3.52-1.74l1.1-.64a3.3 3.3 0 0 0 2.42 1.2 3.25 3.25 0 0 0 1.94-.65v1.27a4.6 4.6 0 0 1-1.94.56zm4.59-3.66a4.5 4.5 0 0 1-.41 2.7 4.58 4.58 0 0 1-3.52 2.35v-1.27a3.3 3.3 0 0 0 2.34-1.58 3.25 3.25 0 0 0 .29-1.94zm-2.14-5.3a4.5 4.5 0 0 1 2.14 1.74 4.58 4.58 0 0 1 .29 4.23l-1.1-.63a3.32 3.32 0 0 0-.19-2.8 3.26 3.26 0 0 0-1.94-1.27zm-2.85-4.24a4.52 4.52 0 0 1 3.52 1.74l-1.1.64a3.3 3.3 0 0 0-2.42-1.2 3.25 3.25 0 0 0-1.94.65V4.2a4.6 4.6 0 0 1 1.94-.56z" fill="#10A37F"/>
    </svg>
  );
}

export function GeminiIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#gemini-grad)" />
      <defs>
        <linearGradient id="gemini-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1BA1E3" />
          <stop offset="0.5" stopColor="#5B68E5" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StitchIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8C4 5.79 5.79 4 8 4H16C18.21 4 20 5.79 20 8V16C20 18.21 18.21 20 16 20H8C5.79 20 4 18.21 4 16V8Z" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M9 12L12 9L15 12L12 15L9 12Z" fill="#8B5CF6" />
      <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export function RelumeIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="#111827" stroke="#3B82F6" strokeWidth="2" />
      <path d="M8 8H13C14.66 8 16 9.34 16 11C16 12.66 14.66 14 13 14H8V8Z" fill="#3B82F6" />
      <path d="M12 14L16 18" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function FigmaIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 24C10.21 24 12 22.21 12 20V16H8C5.79 16 4 17.79 4 20C4 22.21 5.79 24 8 24Z" fill="#0ACF83"/>
      <path d="M4 12C4 9.79 5.79 8 8 8H12V16H8C5.79 16 4 14.21 4 12Z" fill="#A259FF"/>
      <path d="M4 4C4 1.79 5.79 0 8 0H12V8H8C5.79 8 4 6.21 4 4Z" fill="#F24E1E"/>
      <path d="M12 0H16C18.21 0 20 1.79 20 4C20 6.21 18.21 8 16 8H12V0Z" fill="#FF7262"/>
      <circle cx="16" cy="12" r="4" fill="#1ABCFE"/>
    </svg>
  );
}

export function FramerIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF"/>
    </svg>
  );
}

export function ProtoPieIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#FF4F00"/>
      <path d="M7 6H13.5C15.98 6 18 8.01 18 10.5C18 12.98 15.98 15 13.5 15H10.5V18.5H7V6Z" fill="white"/>
      <circle cx="13.5" cy="10.5" r="1.5" fill="#FF4F00"/>
    </svg>
  );
}

export function AdobeCreativeSuiteIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#FA0F00"/>
      <path d="M14.7 4.5H19.5V19.5H16.2L14.7 15.6H11.5L14.7 4.5ZM9.3 4.5H4.5V19.5H7.8L9.3 15.6H12.5L9.3 4.5ZM12 8.7L13.7 13.1H10.3L12 8.7Z" fill="white"/>
    </svg>
  );
}

export function SplineIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#141414"/>
      <path d="M6 16.5C6 14 8 12 11 12C14 12 16 10 16 7.5C16 5 14 3.5 11.5 3.5C9 3.5 7.5 5 7.5 7.5" stroke="#FF5C8D" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="16.5" r="2.5" fill="#00D2FF" />
    </svg>
  );
}

export function UnicornStudioIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1E1B4B" />
      <path d="M7 17L12 5L17 17L12 14L7 17Z" fill="url(#unicorn-grad)" stroke="#EC4899" strokeWidth="1" />
      <defs>
        <linearGradient id="unicorn-grad" x1="7" y1="5" x2="17" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" />
          <stop offset="0.5" stopColor="#818CF8" />
          <stop offset="1" stopColor="#6EE7B7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PenpotIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000"/>
      <path d="M6 6H12V12H6V6Z" fill="#88D837"/>
      <path d="M12 6H18V12H12V6Z" fill="#F8BE35"/>
      <path d="M6 12H12V18H6V12Z" fill="#E8505B"/>
      <path d="M12 12H18V18H12V12Z" fill="#439A86"/>
    </svg>
  );
}

export function MiroIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#FFD02F"/>
      <path d="M18.8 4.2H16.2L12.4 12.3L15.3 4.2H12.7L8.9 12.3L11.8 4.2H9.2L5.2 13.8V19.8H7.8L11.6 11.7L8.7 19.8H11.3L15.1 11.7L12.2 19.8H14.8L18.8 10.2V4.2Z" fill="#050038"/>
    </svg>
  );
}

export function NotionIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.455-.654c1.12-.093 1.213-.42 1.306-1.026.094-.607.094-.607-.653-.607L6.605 2.9c-.933 0-1.493.42-2.146 1.308zM4 6.727v13.626c0 .84.56 1.307 1.493 1.4.933.093 1.96-.093 2.706-.56l10.895-6.626c.746-.467 1.026-.84 1.026-1.587V3.554c0-.747-.373-.84-1.026-.747l-13.6 1.4c-.933.094-1.494.654-1.494 2.52zm12.32 1.773c.093.467 0 .934-.467 1.214l-4.76 4.387 4.76 2.707c.467.28.653.653.653 1.026 0 .467-.373.84-.933.84-.373 0-.653-.186-.933-.373l-4.573-2.707-2.333 2.147c-.28.28-.56.373-.84.373-.56 0-.933-.466-.933-1.026V9.153c0-.653.466-1.026 1.026-1.026.373 0 .653.187.933.467l2.893 2.613 2.893-2.613c.28-.28.56-.467.933-.467.56 0 .934.373.934.84z"/>
    </svg>
  );
}

export function UxpressiaIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path d="M6 8C6 12.42 9.58 16 14 16H18V13H14C11.24 13 9 10.76 9 8H6Z" fill="white" />
      <circle cx="16" cy="9" r="3" fill="#00E5FF" />
    </svg>
  );
}

export function BalsamiqIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#CC0000"/>
      <path d="M7 6H13C15.2 6 17 7.8 17 10C17 11.5 16.2 12.8 15 13.5C16.5 14.2 17.5 15.7 17.5 17.5C17.5 19.9 15.5 21.8 13 21.8H7V6Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
      <line x1="7" y1="13.5" x2="14" y2="13.5" stroke="white" strokeWidth="2.2"/>
    </svg>
  );
}

export function Frame0Icon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="#6366F1" strokeWidth="2.5" fill="none"/>
      <circle cx="12" cy="12" r="4" fill="#6366F1" />
    </svg>
  );
}

export function MazeIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#000000"/>
      <path d="M6 18V6L12 12L18 6V18" stroke="#00FF88" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DovetailIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#141E30" />
      <path d="M5 8C5 6.34 6.34 5 8 5H16C17.66 5 19 6.34 19 8V12L12 19L5 12V8Z" fill="#3B82F6" />
      <path d="M12 5V19" stroke="#93C5FD" strokeWidth="1.5" />
    </svg>
  );
}

export function OptimalWorkshopIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#0B4B5A" />
      <circle cx="12" cy="12" r="6" stroke="#22D3EE" strokeWidth="2.5" strokeDasharray="5 3" />
      <circle cx="12" cy="12" r="2.5" fill="#22D3EE" />
    </svg>
  );
}

export function EthnioIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#2E7D32" />
      <path d="M6 7H18M6 12H15M6 17H18" stroke="#A5D6A7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function LyssnaIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#4F46E5" />
      <path d="M7 9C7 7.5 9 6 12 6C15 6 17 7.5 17 9C17 11 15 12 13 13V15M13 18H13.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SurveyMonkeyIcon({ className = 'h-5 w-5', size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#00BF6F"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <circle cx="9.5" cy="11.5" r="1.5" fill="#054526"/>
      <circle cx="14.5" cy="11.5" r="1.5" fill="#054526"/>
      <path d="M10 14.5C10.6 15.4 11.3 15.7 12 15.7C12.7 15.7 13.4 15.4 14 14.5" stroke="#054526" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export const toolRegistry: ToolItem[] = [
  // AI & Intelligent Systems
  { name: 'Claude', category: 'ai', tagline: 'Anthropic AI reasoning & copy', icon: ClaudeIcon, brandColor: '#D97706' },
  { name: 'ChatGPT', category: 'ai', tagline: 'OpenAI generative assistant', icon: ChatGPTIcon, brandColor: '#10A37F' },
  { name: 'Gemini', category: 'ai', tagline: 'Google multimodal intelligence', icon: GeminiIcon, brandColor: '#5B68E5' },
  { name: 'Stitch AI', category: 'ai', tagline: 'AI design & layout system', icon: StitchIcon, brandColor: '#8B5CF6' },
  { name: 'Relume', category: 'ai', tagline: 'AI wireframing & IA generator', icon: RelumeIcon, brandColor: '#3B82F6' },

  // Design & Prototyping
  { name: 'Figma', category: 'design', tagline: 'Interface systems & variables', icon: FigmaIcon, brandColor: '#F24E1E' },
  { name: 'Framer', category: 'design', tagline: 'Interactive web production', icon: FramerIcon, brandColor: '#0055FF' },
  { name: 'ProtoPie', category: 'design', tagline: 'Advanced sensor prototyping', icon: ProtoPieIcon, brandColor: '#FF4F00' },
  { name: 'Adobe Creative Suite', category: 'design', tagline: 'Photoshop, Illustrator, XD, AE', icon: AdobeCreativeSuiteIcon, brandColor: '#FA0F00' },
  { name: 'Spline', category: 'design', tagline: '3D web scenes & physics', icon: SplineIcon, brandColor: '#FF5C8D' },
  { name: 'Unicorn Studio', category: 'design', tagline: 'WebGL visual effects & shaders', icon: UnicornStudioIcon, brandColor: '#EC4899' },
  { name: 'Penpot', category: 'design', tagline: 'Open source design & code align', icon: PenpotIcon, brandColor: '#88D837' },
  { name: 'Balsamiq', category: 'design', tagline: 'Rapid low-fi wireframing', icon: BalsamiqIcon, brandColor: '#CC0000' },
  { name: 'Frame0', category: 'design', tagline: 'Canvas prototyping & flow', icon: Frame0Icon, brandColor: '#6366F1' },

  // Research & Collaboration
  { name: 'Maze', category: 'research', tagline: 'Rapid user & usability testing', icon: MazeIcon, brandColor: '#00FF88' },
  { name: 'Dovetail', category: 'research', tagline: 'Qualitative analysis & repository', icon: DovetailIcon, brandColor: '#3B82F6' },
  { name: 'Optimal Workshop', category: 'research', tagline: 'Information architecture & tree testing', icon: OptimalWorkshopIcon, brandColor: '#22D3EE' },
  { name: 'Ethnio', category: 'research', tagline: 'Live intercept participant recruiting', icon: EthnioIcon, brandColor: '#2E7D32' },
  { name: 'Lyssna', category: 'research', tagline: 'Preference & 5-second usability testing', icon: LyssnaIcon, brandColor: '#4F46E5' },
  { name: 'SurveyMonkey', category: 'research', tagline: 'Quantitative survey studies', icon: SurveyMonkeyIcon, brandColor: '#00BF6F' },
  { name: 'Miro', category: 'research', tagline: 'Service blueprints & workshops', icon: MiroIcon, brandColor: '#FFD02F' },
  { name: 'Notion', category: 'research', tagline: 'UX documentation & specs', icon: NotionIcon, brandColor: '#000000' },
  { name: 'Uxpressia', category: 'research', tagline: 'Customer journey maps & personas', icon: UxpressiaIcon, brandColor: '#1877F2' },
];
