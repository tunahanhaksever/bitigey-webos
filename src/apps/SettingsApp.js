import { sound } from '../core/SoundEngine.js';

export const SettingsApp = {
  id: 'settings',
  title: 'Sistem Tercihleri & Ayarlar',
  icon: '⚙️',
  color: '#94a3b8',
  width: 580,
  height: 440,
  content: `
    <div class="settings-app">
      <div style="font-size: 14px; font-weight: 700; color: #fff;">🖼️ Masaüstü Duvar Kağıtları</div>
      <div class="wallpaper-grid">
        <div class="wallpaper-card" data-wp="wallpaper-cyberpunk" style="background: radial-gradient(circle at 80% 20%, #ff007f, transparent 50%), linear-gradient(135deg, #090a16, #101226);">
          Cyberpunk Neon
        </div>
        <div class="wallpaper-card" data-wp="wallpaper-aurora" style="background: radial-gradient(circle at 50% 30%, #10b981, transparent 50%), linear-gradient(135deg, #040d1a, #081b2e);">
          Deep Space Aurora
        </div>
        <div class="wallpaper-card" data-wp="wallpaper-sunset" style="background: radial-gradient(circle at 50% 80%, #f43f5e, transparent 50%), linear-gradient(135deg, #1c0a2a, #2b0d38);">
          Synthwave Sunset
        </div>
        <div class="wallpaper-card" data-wp="wallpaper-minimal" style="background: linear-gradient(135deg, #1e293b, #0f172a);">
          Dark Slate Minimal
        </div>
      </div>

      <div style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 10px;">💻 Sistem Bilgileri</div>
      <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-glass); border-radius: 8px; padding: 14px; font-size: 12px; line-height: 1.8;">
        <div><strong>İşletim Sistemi:</strong> Bitigey WebOS v2.5.0</div>
        <div><strong>Geliştirici:</strong> Tunahan Haksever (Bitigey.com)</div>
        <div><strong>Çekirdek (Kernel):</strong> WebAssembly + ESNext Window Engine</div>
        <div><strong>Lisans:</strong> MIT Açık Kaynak Lisansı</div>
      </div>
    </div>
  `,
  onInit: (container) => {
    const cards = container.querySelectorAll('.wallpaper-card');
    const desktop = document.getElementById('desktop');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        sound.playClick();
        const wp = card.getAttribute('data-wp');
        ['wallpaper-cyberpunk', 'wallpaper-aurora', 'wallpaper-sunset', 'wallpaper-minimal'].forEach(w => desktop.classList.remove(w));
        desktop.classList.add(wp);
      });
    });
  }
};
