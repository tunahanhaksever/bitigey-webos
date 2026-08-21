import { sound } from '../core/SoundEngine.js';

export const BrowserApp = {
  id: 'browser',
  title: 'Bitigey Web Tarayıcı',
  icon: '🌐',
  color: '#38bdf8',
  width: 720,
  height: 480,
  content: `
    <div class="app-container" style="background: #111422;">
      <div style="height: 42px; background: rgba(255,255,255,0.06); border-bottom: 1px solid var(--border-glass); display: flex; align-items: center; gap: 8px; padding: 0 12px;">
        <button id="btn-browser-back" style="font-size: 14px; color: #94a3b8;">◀</button>
        <button id="btn-browser-fwd" style="font-size: 14px; color: #94a3b8;">▶</button>
        <button id="btn-browser-reload" style="font-size: 14px; color: #94a3b8;">🔄</button>
        <input type="text" id="browser-url-input" value="https://bitigey.com" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 20px; padding: 4px 14px; font-size: 12px; color: #fff;">
        <button id="btn-browser-go" style="padding: 4px 12px; background: var(--accent-cyan); color: #000; font-weight: 600; border-radius: 12px; font-size: 11px;">Git</button>
      </div>
      <div style="height: 30px; background: rgba(0,0,0,0.2); display: flex; align-items: center; gap: 12px; padding: 0 14px; font-size: 11px; color: #94a3b8; border-bottom: 1px solid var(--border-glass);">
        <span class="browser-bookmark" data-url="https://bitigey.com" style="cursor: pointer; color: #00f0ff;">⭐ Bitigey.com</span>
        <span class="browser-bookmark" data-url="https://tunahanhaksever.github.io/bitigey-ide/" style="cursor: pointer; color: #ff007f;">⭐ Bitigey IDE</span>
        <span class="browser-bookmark" data-url="https://github.com/tunahanhaksever" style="cursor: pointer; color: #fbbf24;">⭐ GitHub: @tunahanhaksever</span>
      </div>
      <div style="flex: 1; position: relative;">
        <iframe id="browser-iframe" src="https://bitigey.com" style="width: 100%; height: 100%; border: none; background: #fff;" sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
      </div>
    </div>
  `,
  onInit: (container) => {
    const iframe = container.querySelector('#browser-iframe');
    const input = container.querySelector('#browser-url-input');
    const btnGo = container.querySelector('#btn-browser-go');
    const btnReload = container.querySelector('#btn-browser-reload');

    function navigate(url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      input.value = url;
      iframe.src = url;
    }

    btnGo.addEventListener('click', () => {
      sound.playClick();
      navigate(input.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sound.playClick();
        navigate(input.value);
      }
    });

    btnReload.addEventListener('click', () => {
      sound.playClick();
      iframe.src = iframe.src;
    });

    container.querySelectorAll('.browser-bookmark').forEach(bm => {
      bm.addEventListener('click', () => {
        sound.playClick();
        navigate(bm.getAttribute('data-url'));
      });
    });
  }
};
