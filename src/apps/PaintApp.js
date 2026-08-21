import { sound } from '../core/SoundEngine.js';

export const PaintApp = {
  id: 'paint',
  title: 'Bitigey Canvas Paint & Çizim',
  icon: '🎨',
  color: '#e879f9',
  width: 640,
  height: 480,
  content: `
    <div class="paint-app">
      <div class="paint-toolbar">
        <div style="display: flex; gap: 6px; align-items: center;">
          <div class="color-dot active" style="background: #000000;" data-color="#000000"></div>
          <div class="color-dot" style="background: #00f0ff;" data-color="#00f0ff"></div>
          <div class="color-dot" style="background: #ff007f;" data-color="#ff007f"></div>
          <div class="color-dot" style="background: #10b981;" data-color="#10b981"></div>
          <div class="color-dot" style="background: #fbbf24;" data-color="#fbbf24"></div>
          <div class="color-dot" style="background: #ffffff;" data-color="#ffffff"></div>
        </div>
        <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2);"></div>
        <label style="font-size: 11px; display: flex; align-items: center; gap: 4px;">
          Fırça: <input type="range" id="paint-size" min="2" max="30" value="4" style="width: 60px;">
        </label>
        <button id="btn-clear-canvas" style="padding: 3px 8px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 11px;">Temizle</button>
        <button id="btn-save-canvas" style="padding: 3px 8px; background: #e879f9; color: #000; font-weight: 600; border-radius: 4px; font-size: 11px;">PNG İndir</button>
      </div>
      <div class="paint-canvas-wrapper" id="paint-canvas-box">
        <canvas id="paint-canvas"></canvas>
      </div>
    </div>
  `,
  onInit: (container) => {
    const canvas = container.querySelector('#paint-canvas');
    const wrapper = container.querySelector('#paint-canvas-box');
    const ctx = canvas.getContext('2d');
    const sizeInput = container.querySelector('#paint-size');
    const clearBtn = container.querySelector('#btn-clear-canvas');
    const saveBtn = container.querySelector('#btn-save-canvas');

    function resizeCanvas() {
      canvas.width = wrapper.offsetWidth || 600;
      canvas.height = wrapper.offsetHeight || 400;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setTimeout(resizeCanvas, 100);

    let drawing = false;
    let currentColor = '#000000';

    container.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        container.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentColor = dot.getAttribute('data-color');
      });
    });

    canvas.addEventListener('mousedown', (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!drawing) return;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = parseInt(sizeInput.value, 10);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    });

    window.addEventListener('mouseup', () => {
      drawing = false;
    });

    clearBtn.addEventListener('click', () => {
      sound.playClick();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    saveBtn.addEventListener('click', () => {
      sound.playClick();
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'bitigey-cizim.png';
      a.click();
    });
  }
};
