import { retroAudio } from '../components/retro-os';

type SecurityListener = (message: string) => void;
const securityListeners: Set<SecurityListener> = new Set();

export function subscribeSecurityAlert(fn: SecurityListener): () => void {
  securityListeners.add(fn);
  return () => securityListeners.delete(fn);
}

export function triggerSecurityAlert(message: string) {
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
 * HarisOS DeviceAI Security Sentinel
 * Protects portfolio data, intellectual property, and layout metrics against browser inspection,
 * right-click DOM inspection, DevTools keyboard shortcuts, and console scraping.
 */
export function initAntiInspectProtection() {
  if (typeof window === 'undefined') return () => {};

  // 1. Disable Right-Click Context Menu (Inspect / Inspect Element)
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerSecurityAlert('🔒 [DeviceAI Guard] Right-click inspect disabled. DOM and data protected.');
    return;
  };

  // 2. Block DevTools Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S)
  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    const shift = e.shiftKey;
    const key = e.key.toLowerCase();

    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Guard] Developer Tools (F12) blocked. Inspection disabled.');
      return;
    }

    // Ctrl+Shift+I or Cmd+Option+I (Inspect)
    if (cmdOrCtrl && shift && (key === 'i' || key === 'c' || key === 'j')) {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Guard] DevTools shortcut blocked. Inspection disabled.');
      return;
    }

    // Ctrl+U (View Page Source)
    if (cmdOrCtrl && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Guard] View Source blocked. Source code protected.');
      return;
    }

    // Ctrl+S (Save Page)
    if (cmdOrCtrl && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      triggerSecurityAlert('🔒 [DeviceAI Guard] Page cloning blocked. Asset extraction disabled.');
      return;
    }
  };

  // 3. Console Protection & Warning Banner
  const protectConsole = () => {
    try {
      const bannerHeader = 'color: #d8ee57; background: #000000; font-family: monospace; font-size: 13px; font-weight: 900; padding: 6px 12px; border: 2px solid #d8ee57;';
      const bannerBody = 'color: #ffffff; background: #111111; font-family: monospace; font-size: 11px; padding: 6px 12px;';
      
      console.log(
        '%c🔒 HARISOS DEVICEAI SENTINEL ACTIVE%c\nDOM inspection, telemetry scraping, and reverse-engineering are disabled.\nHaris Kumaar Portfolio System 7.5 (All Rights Reserved)',
        bannerHeader,
        bannerBody
      );

      // In production builds, mask verbose logs to prevent data leakage
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        const noop = () => {};
        console.debug = noop;
        console.dir = noop;
        console.table = noop;
      }
    } catch {}
  };

  // 4. DevTools Open Detection (Aperture Threshold Monitor)
  let devToolsOpen = false;
  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        triggerSecurityAlert('🛡️ [DeviceAI Guard] DevTools aperture sensed. Protective data mask armed.');
      }
    } else {
      devToolsOpen = false;
    }
  };

  window.addEventListener('contextmenu', handleContextMenu, { capture: true });
  window.addEventListener('keydown', handleKeyDown, { capture: true });
  window.addEventListener('resize', checkDevTools);

  protectConsole();
  const devToolsInterval = setInterval(checkDevTools, 2500);

  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
    window.removeEventListener('resize', checkDevTools);
    clearInterval(devToolsInterval);
  };
}
