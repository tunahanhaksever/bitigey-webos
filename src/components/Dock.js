import { events } from '../core/events.js';
import { sound } from '../core/SoundEngine.js';

export function initDock(appsList) {
  const dockBar = document.getElementById('dock-bar');
  if (!dockBar) return;

  dockBar.innerHTML = '';

  appsList.forEach(app => {
    const item = document.createElement('div');
    item.className = 'dock-item';
    item.id = `dock-app-${app.id}`;
    item.title = app.title;

    item.innerHTML = `
      <div class="dock-tooltip">${app.title}</div>
      <div class="dock-icon-box" style="border-color: ${app.color || 'var(--border-glass)'};">
        <span style="font-size: 24px;">${app.icon}</span>
      </div>
      <span class="dock-dot"></span>
    `;

    item.addEventListener('click', () => {
      sound.playClick();
      item.classList.add('bouncing');
      setTimeout(() => item.classList.remove('bouncing'), 600);
      events.emit('app:launch', app.id);
    });

    dockBar.appendChild(item);
  });

  // Fisheye Magnification Effect
  dockBar.addEventListener('mousemove', (e) => {
    const items = dockBar.querySelectorAll('.dock-item');
    const mouseX = e.clientX;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemCenterX);

      if (dist < 120) {
        const scale = 1 + (1 - dist / 120) * 0.45; // Max scale 1.45x
        item.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 20}px)`;
      } else {
        item.style.transform = 'scale(1) translateY(0)';
      }
    });
  });

  dockBar.addEventListener('mouseleave', () => {
    dockBar.querySelectorAll('.dock-item').forEach(item => {
      item.style.transform = 'scale(1) translateY(0)';
    });
  });

  // Track running apps
  events.on('app:opened', id => {
    const dockItem = document.getElementById(`dock-app-${id}`);
    if (dockItem) dockItem.classList.add('running');
  });

  events.on('app:closed', id => {
    const dockItem = document.getElementById(`dock-app-${id}`);
    if (dockItem) dockItem.classList.remove('running');
  });
}
