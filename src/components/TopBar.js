import { events } from '../core/events.js';
import { sound } from '../core/SoundEngine.js';

export function initTopBar() {
  const clockEl = document.getElementById('top-clock-text');
  const dateEl = document.getElementById('top-date-text');
  const currentAppEl = document.getElementById('menu-current-app');
  const btnMusicPill = document.getElementById('btn-toggle-music-pill');
  const topMusicTitle = document.getElementById('top-music-title');
  const btnTheme = document.getElementById('btn-toggle-theme');
  const btnControlCenter = document.getElementById('btn-open-control-center');
  const controlCenterPanel = document.getElementById('control-center-panel');
  const btnCalendar = document.getElementById('btn-toggle-calendar');
  const calendarPopup = document.getElementById('calendar-popup');

  // Clock & Date Ticker
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;

    const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    if (dateEl) {
      dateEl.textContent = `${now.getDate()} ${months[now.getMonth()]} ${days[now.getDay()]}`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Active App Name in Menu
  events.on('app:focused', app => {
    if (currentAppEl) currentAppEl.textContent = app.title;
  });

  // Music Pill Toggle
  if (btnMusicPill) {
    btnMusicPill.addEventListener('click', () => {
      sound.toggleMusic((isPlaying, track) => {
        if (isPlaying && track) {
          topMusicTitle.textContent = track.title;
          btnMusicPill.classList.add('playing');
        } else {
          topMusicTitle.textContent = 'Duraklatıldı';
          btnMusicPill.classList.remove('playing');
        }
      });
    });
  }

  // Theme quick switch
  const themes = ['wallpaper-cyberpunk', 'wallpaper-aurora', 'wallpaper-sunset', 'wallpaper-minimal'];
  let currentThemeIdx = 0;
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      sound.playClick();
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const screen = document.getElementById('desktop');
      themes.forEach(t => screen.classList.remove(t));
      screen.classList.add(themes[currentThemeIdx]);
    });
  }

  // Control Center Toggle
  if (btnControlCenter) {
    btnControlCenter.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      const isVisible = controlCenterPanel.style.display === 'flex';
      controlCenterPanel.style.display = isVisible ? 'none' : 'flex';
      if (calendarPopup) calendarPopup.style.display = 'none';
    });
  }

  // Calendar Toggle
  if (btnCalendar) {
    btnCalendar.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      const isVisible = calendarPopup.style.display === 'block';
      calendarPopup.style.display = isVisible ? 'none' : 'block';
      if (controlCenterPanel) controlCenterPanel.style.display = 'none';
      renderCalendar();
    });
  }

  // Close modals on outside click
  window.addEventListener('click', (e) => {
    if (controlCenterPanel && !controlCenterPanel.contains(e.target) && e.target !== btnControlCenter) {
      controlCenterPanel.style.display = 'none';
    }
    if (calendarPopup && !calendarPopup.contains(e.target) && e.target !== btnCalendar) {
      calendarPopup.style.display = 'none';
    }
  });

  // System logo menu
  const btnSys = document.getElementById('btn-system-menu');
  if (btnSys) {
    btnSys.addEventListener('click', () => {
      events.emit('app:launch', 'about');
    });
  }
}

function renderCalendar() {
  const container = document.getElementById('cal-days-table');
  if (!container) return;
  container.innerHTML = '';

  const dayHeaders = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
  dayHeaders.forEach(d => {
    const el = document.createElement('div');
    el.style.fontWeight = '700';
    el.style.color = '#94a3b8';
    el.textContent = d;
    container.appendChild(el);
  });

  const now = new Date();
  const currentDay = now.getDate();

  for (let i = 1; i <= 31; i++) {
    const el = document.createElement('div');
    el.className = `cal-day ${i === currentDay ? 'today' : ''}`;
    el.textContent = i;
    container.appendChild(el);
  }
}
