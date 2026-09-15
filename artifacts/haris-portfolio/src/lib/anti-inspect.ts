import { retroAudio } from '../components/retro-os';

type SecurityListener = (message: string) => void;
type TelemetryListener = (telemetry: SecurityTelemetry) => void;

export interface SecurityTelemetry {
  securityLevel: 'ULTRA_AWAKENED';
  aiProcurementShield: '100%_LOCKED';
  automatedScrapersBlocked: number;
  inspectAttemptsBlocked: number;
  lastIncident: string | null;
  statusText: string;
}

const securityListeners: Set<SecurityListener> = new Set();
const telemetryListeners: Set<TelemetryListener> = new Set();

let blockedInspectCount = 0;
let blockedScraperCount = 0;
let lastIncidentText: string | null = null;

function emitTelemetry() {
  const data: SecurityTelemetry = {
    securityLevel: 'ULTRA_AWAKENED',
    aiProcurementShield: '100%_LOCKED',
    automatedScrapersBlocked: blockedScraperCount,
    inspectAttemptsBlocked: blockedInspectCount,
    lastIncident: lastIncidentText,
    statusText: `Security Level: Awakened & Tightened · ${blockedInspectCount + blockedScraperCount} Attacks Defended`,
  };
  telemetryListeners.forEach((fn) => {
    try {
      fn(data);
    } catch {}
  });
}

export function subscribeSecurityAlert(fn: SecurityListener): () => void {
  securityListeners.add(fn);
  return () => securityListeners.delete(fn);
}

export function subscribeSecurityTelemetry(fn: TelemetryListener): () => void {
  telemetryListeners.add(fn);
  emitTelemetry();
  return () => telemetryListeners.delete(fn);
}

export function getSecurityTelemetry(): SecurityTelemetry {
  return {
    securityLevel: 'ULTRA_AWAKENED',
    aiProcurementShield: '100%_LOCKED',
    automatedScrapersBlocked: blockedScraperCount,
    inspectAttemptsBlocked: blockedInspectCount,
    lastIncident: lastIncidentText,
    statusText: `Security Level: Awakened & Tightened · ${blockedInspectCount + blockedScraperCount} Attacks Defended`,
  };
}

export function triggerSecurityAlert(message: string, isScraper = false) {
  if (isScraper) {
    blockedScraperCount++;
  } else {
    blockedInspectCount++;
  }
  lastIncidentText = message;
  emitTelemetry();

  try {
    retroAudio.error();
  } catch {}

  securityListeners.forEach((fn) => {
    try {
      fn(message);
    } catch {}
  });
}

/**
 * Manual security tighten / re-arm trigger for user UI
 */
export function tightenSecurityShields(): { success: boolean; message: string } {
  try {
    retroAudio.windowOpen();
  } catch {}
  triggerSecurityAlert('🛡️ [DeviceAI Sentinel] Security shields re-armed: Ultra-tight AI procurement lock engaged.');
  return {
    success: true,
    message: 'Security Sentinel Armed: 100% Protection Level Active',
  };
}

/**
 * HarisOS DeviceAI Awakened Security Sentinel
 * Comprehensive defense against:
 * - AI scrapers and automated procurement agents (Puppeteer, Playwright, Selenium, GPTBot)
 * - Browser DevTools, right-click DOM inspection, and source code harvesting
 * - UI design cloning, asset dragging, and selection harvesting
 */
export function initAntiInspectProtection() {
  if (typeof window === 'undefined') return () => {};

  // 1. Check for Automated AI / Headless Scraper Environments
  const detectAiScraper = () => {
    try {
      const win = window as any;
      const nav = navigator as any;

      const isWebdriver = Boolean(nav.webdriver);
      const isPhantom = Boolean(win.callPhantom || win._phantom || win.__nightmare);
      const isSelenium = Boolean(win.__selenium_unwrapped || win.__webdriver_evaluate || win.__webdriver_script_fn);
      const isHeadlessUserAgent = /HeadlessChrome|Puppeteer|Playwright|Scrapy|Python|curl|Wget/i.test(nav.userAgent);

      if (isWebdriver || isPhantom || isSelenium || isHeadlessUserAgent) {
        triggerSecurityAlert('🚨 [DeviceAI Sentinel] Automated AI procurement / crawler bot detected and neutralized.', true);
        // Inject anti-procurement watermark overlay
        const blockBanner = document.createElement('div');
        blockBanner.id = 'deviceai-sentinel-quarantine';
        blockBanner.setAttribute(
          'style',
          'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000000;color:#d8ee57;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;padding:24px;text-align:center;box-sizing:border-box;'
        );
        blockBanner.innerHTML = `
          <div style="border:3px solid #ff4d6d;padding:20px;max-width:520px;background:#111111;box-shadow:6px 6px 0px #ff4d6d;">
            <h1 style="color:#ff4d6d;font-size:16px;margin:0 0 10px 0;letter-spacing:1px;">🔒 [DEVICEAI ULTRA DEFENSE: AWAKENED]</h1>
            <p style="font-size:12px;line-height:1.5;color:#ffffff;margin:0 0 12px 0;">Automated AI scraping, UI procurement, and code reverse-engineering are strictly prohibited.</p>
            <p style="font-size:10px;color:#d8ee57;margin:0;">All intellectual property, bespoke retro design, and systems &copy; Haris Kumaar. (W3C TDM Reserved · No AI Training)</p>
          </div>
        `;
        if (!document.getElementById('deviceai-sentinel-quarantine')) {
          document.body.appendChild(blockBanner);
        }
      }
    } catch {}
  };

  // 2. Disable Right-Click Context Menu (Inspect / Copy)
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerSecurityAlert('🔒 [DeviceAI Sentinel] Right-click inspect blocked. UI design & code protected.');
    return false;
  };

  // 3. Block DevTools Shortcuts & Source Harvesting
  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = /MAC/i.test(navigator.platform);
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    const shift = e.shiftKey;
    const key = e.key.toLowerCase();

    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] F12 Developer Tools blocked. Inspection disabled.');
      return;
    }

    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K (DevTools)
    if (cmdOrCtrl && shift && (key === 'i' || key === 'c' || key === 'j' || key === 'k')) {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] DevTools shortcut blocked. Code inspection disabled.');
      return;
    }

    // Ctrl+U (View Source)
    if (cmdOrCtrl && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] View Page Source blocked. Source code protected.');
      return;
    }

    // Ctrl+S (Save Page / harvest offline assets)
    if (cmdOrCtrl && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] Page save & asset cloning blocked.');
      return;
    }

    // Ctrl+P (Print to PDF / layout dump)
    if (cmdOrCtrl && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] UI design extraction / print blocked.');
      return;
    }

    // PrintScreen
    if (e.key === 'PrintScreen') {
      triggerSecurityAlert('🛡️ [DeviceAI Sentinel] Screen capture attempt logged.');
    }
  };

  // 4. Block UI asset drag-and-drop extraction
  const handleDragStart = (e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'IMG' || target.tagName === 'SVG' || target.closest('svg') || target.classList.contains('desktop-icon-item'))) {
      e.preventDefault();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] UI asset dragging and extraction disabled.');
    }
  };

  // 5. Block text selection / copy on the main UI
  const handleCopy = (e: ClipboardEvent) => {
    const active = document.activeElement;
    // Allow copy in legitimate input fields / contact form
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      return;
    }
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 50) {
      e.preventDefault();
      triggerSecurityAlert('🔒 [DeviceAI Sentinel] Code & portfolio text copy blocked.');
    }
  };

  // 6. Console Protection & Warning Banner
  const protectConsole = () => {
    try {
      const bannerHeader = 'color: #d8ee57; background: #000000; font-family: monospace; font-size: 13px; font-weight: 900; padding: 8px 14px; border: 2px solid #d8ee57;';
      const bannerBody = 'color: #ffffff; background: #111111; font-family: monospace; font-size: 11px; padding: 6px 12px;';

      console.log(
        '%c🔒 HARISOS DEVICEAI SENTINEL: ULTRA AWAKENED%c\n' +
        'AI Procurement Shield: 100% Armed · All Rights Reserved (Haris Kumaar)\n' +
        'Automated scraping, UI reproduction, and reverse engineering are strictly prohibited.',
        bannerHeader,
        bannerBody
      );

      // In production, silence inspection utilities
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        const noop = () => {};
        console.debug = noop;
        console.dir = noop;
        console.table = noop;
      }
    } catch {}
  };

  // 7. DevTools Aperture & Timing Monitor
  let devToolsOpen = false;
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        triggerSecurityAlert('🛡️ [DeviceAI Sentinel] DevTools aperture detected. Anti-tamper data shields armed.');
      }
    } else {
      devToolsOpen = false;
    }
  };

  detectAiScraper();
  protectConsole();

  window.addEventListener('contextmenu', handleContextMenu, { capture: true });
  window.addEventListener('keydown', handleKeyDown, { capture: true });
  window.addEventListener('dragstart', handleDragStart, { capture: true });
  window.addEventListener('copy', handleCopy, { capture: true });
  window.addEventListener('resize', checkDevTools);

  const devToolsInterval = setInterval(checkDevTools, 2000);
  const scraperInterval = setInterval(detectAiScraper, 8000);

  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
    window.removeEventListener('dragstart', handleDragStart, { capture: true });
    window.removeEventListener('copy', handleCopy, { capture: true });
    window.removeEventListener('resize', checkDevTools);
    clearInterval(devToolsInterval);
    clearInterval(scraperInterval);
  };
}
