import { sound } from '../core/SoundEngine.js';
import { events } from '../core/events.js';

export const FinderApp = {
  id: 'finder',
  title: 'Bitigey Finder — Dosyalar',
  icon: '📁',
  color: '#38bdf8',
  width: 600,
  height: 400,
  content: `
    <div class="app-container" style="display: flex; flex-direction: row; background: #0c1020;">
      <!-- Sidebar -->
      <div style="width: 160px; background: rgba(255,255,255,0.03); border-right: 1px solid var(--border-glass); padding: 12px 8px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #94a3b8;">
        <div style="font-size: 10px; font-weight: 700; color: #64748b; padding: 4px 8px;">FAVORİLER</div>
        <div class="finder-nav-item active" style="padding: 6px 8px; border-radius: 6px; background: rgba(0,240,255,0.15); color: #00f0ff; cursor: pointer;">📂 Belgelerim</div>
        <div class="finder-nav-item" style="padding: 6px 8px; border-radius: 6px; cursor: pointer;">📜 Şiirler & Eserler</div>
        <div class="finder-nav-item" style="padding: 6px 8px; border-radius: 6px; cursor: pointer;">💻 Projeler</div>
        <div class="finder-nav-item" style="padding: 6px 8px; border-radius: 6px; cursor: pointer;">🖼️ Resimler</div>
      </div>

      <!-- File Grid -->
      <div style="flex: 1; padding: 16px; display: grid; grid-template-columns: repeat(auto-fill, 90px); gap: 12px; align-content: flex-start;" id="finder-file-grid">
        <!-- Rendered by JS -->
      </div>
    </div>
  `,
  onInit: (container) => {
    const grid = container.querySelector('#finder-file-grid');

    const files = [
      { name: 'Masiva_Yolculugu.txt', icon: '📖', type: 'book' },
      { name: 'Ekinoksu_Beklemek.pdf', icon: '🌙', type: 'book' },
      { name: 'Kog_Dergisi_Sayi1.pdf', icon: '🗞️', type: 'doc' },
      { name: 'Bitigey_WebOS_Source', icon: '💻', type: 'code' },
      { name: 'Bitigey_IDE_Cloud', icon: '⚡', type: 'code' },
      { name: 'Neon_Wallpaper.png', icon: '🖼️', type: 'img' }
    ];

    files.forEach(f => {
      const el = document.createElement('div');
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.alignItems = 'center';
      el.style.gap = '6px';
      el.style.padding = '8px';
      el.style.borderRadius = '8px';
      el.style.cursor = 'pointer';
      el.style.textAlign = 'center';
      el.innerHTML = `
        <span style="font-size: 32px;">${f.icon}</span>
        <span style="font-size: 10.5px; color: #f1f5f9; word-break: break-all;">${f.name}</span>
      `;

      el.addEventListener('click', () => {
        sound.playClick();
        if (f.name.includes('Masiva') || f.name.includes('Ekinoks')) {
          events.emit('app:launch', 'about');
        } else if (f.name.includes('IDE')) {
          events.emit('app:launch', 'browser');
        } else {
          events.emit('app:launch', 'notes');
        }
      });

      grid.appendChild(el);
    });
  }
};
