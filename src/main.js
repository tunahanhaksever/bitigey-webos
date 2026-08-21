import { events } from './core/events.js';
import { wm } from './core/WindowManager.js';
import { allApps, getAppById } from './apps/index.js';
import { initTopBar } from './components/TopBar.js';
import { initControlCenter } from './components/ControlCenter.js';
import { initDock } from './components/Dock.js';
import { initDesktop } from './components/Desktop.js';

function renderLucideIcons() {
  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  } catch (e) {
    console.warn('Lucide icons warning:', e);
  }
}

function bootstrapWebOS() {
  console.log('🚀 Bitigey WebOS başlatılıyor...');

  // Initialize Window Layer
  const windowsLayer = document.getElementById('windows-layer');
  wm.init(windowsLayer);

  // Initialize Desktop, TopBar, Dock & Control Center
  initTopBar();
  initControlCenter();
  initDock(allApps);
  initDesktop(allApps);

  // Render Icons
  renderLucideIcons();

  // App Launch Listener
  events.on('app:launch', (appId) => {
    const app = getAppById(appId);
    if (app) {
      wm.openWindow(app);
      renderLucideIcons();
    }
  });

  // Launch initial default windows (About Tunahan Haksever & Music Studio)
  setTimeout(() => {
    wm.openWindow(allApps[0]); // About Tunahan Haksever App
    renderLucideIcons();
  }, 300);

  // Keyboard Shortcuts (F1 => Terminal, Escape => Close Active Window)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F1') {
      e.preventDefault();
      events.emit('app:launch', 'terminal');
    }
  });

  console.log('✅ Bitigey WebOS hazır.');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootstrapWebOS);
} else {
  bootstrapWebOS();
}
