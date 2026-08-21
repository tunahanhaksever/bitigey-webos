import { events } from '../core/events.js';
import { sound } from '../core/SoundEngine.js';

export function initDesktop(appsList) {
  const container = document.getElementById('desktop-icons-container');
  if (!container) return;

  container.innerHTML = '';

  appsList.forEach(app => {
    const iconEl = document.createElement('div');
    iconEl.className = 'desktop-icon';
    iconEl.id = `d-icon-${app.id}`;

    iconEl.innerHTML = `
      <div class="icon-img-box" style="border-color: ${app.color || 'var(--border-glass)'};">
        <span style="font-size: 22px;">${app.icon}</span>
      </div>
      <span class="icon-label">${app.title}</span>
    `;

    // Single click select, double click open
    iconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      iconEl.classList.add('selected');
    });

    iconEl.addEventListener('dblclick', () => {
      sound.playClick();
      events.emit('app:launch', app.id);
    });

    container.appendChild(iconEl);
  });

  // Deselect on desktop click
  document.getElementById('desktop-workspace')?.addEventListener('click', () => {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  });

  // System Stats Simulation
  initSystemMonitorWidget();

  // Quotes Rotation
  initQuotesWidget();
}

function initSystemMonitorWidget() {
  const cpuBar = document.getElementById('sys-cpu-bar');
  const cpuVal = document.getElementById('sys-cpu-val');
  const ramBar = document.getElementById('sys-ram-bar');
  const ramVal = document.getElementById('sys-ram-val');

  setInterval(() => {
    const cpu = Math.floor(18 + Math.random() * 22);
    const ram = (3.8 + Math.random() * 0.8).toFixed(1);

    if (cpuBar) cpuBar.style.width = `${cpu}%`;
    if (cpuVal) cpuVal.textContent = `${cpu}%`;
    if (ramBar) ramBar.style.width = `${(ram / 8) * 100}%`;
    if (ramVal) ramVal.textContent = `${ram} GB`;
  }, 2500);
}

function initQuotesWidget() {
  const quoteText = document.getElementById('quote-text-content');
  const quotes = [
    `"Kelimelerin gölgesinde hakikati arayan bir yolcu, mâsivâdan sıyrılıp kendi ekinoksuna varır."`,
    `"Edebiyat, hızla tüketilen çağda insan ruhunun son sığınağı ve dijital hafızasıdır."`,
    `"Zamanın akışında bir dize, bazen binlerce satır kodun anlatamadığı derinliği taşır."`,
    `"Yazmak, varoluşun sessiz çığlığını sonsuzluğa nakşetmektir."`
  ];

  let qIdx = 0;
  setInterval(() => {
    qIdx = (qIdx + 1) % quotes.length;
    if (quoteText) {
      quoteText.style.opacity = 0;
      setTimeout(() => {
        quoteText.textContent = quotes[qIdx];
        quoteText.style.opacity = 1;
      }, 300);
    }
  }, 10000);
}
