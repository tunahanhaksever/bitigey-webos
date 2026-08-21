import { events } from './events.js';
import { sound } from './SoundEngine.js';

class WindowManager {
  constructor() {
    this.windows = new Map(); // appId -> { el, config, isMinimized, isMaximized, prevBounds }
    this.activeAppId = null;
    this.highestZIndex = 100;
    this.layerEl = null;
  }

  init(layerEl) {
    this.layerEl = layerEl;
  }

  openWindow(appConfig) {
    const { id, title, icon, width = 640, height = 440, content = '', onInit } = appConfig;

    sound.playWindowOpen();

    // If already exists
    if (this.windows.has(id)) {
      const win = this.windows.get(id);
      if (win.isMinimized) {
        this.restoreWindow(id);
      }
      this.bringToFront(id);
      return;
    }

    // Calculate initial center pos with offset
    const count = this.windows.size;
    const left = Math.max(40, (window.innerWidth - width) / 2 + (count % 5) * 24);
    const top = Math.max(50, (window.innerHeight - height) / 2 + (count % 5) * 20 - 30);

    const winEl = document.createElement('div');
    winEl.className = 'os-window active';
    winEl.id = `win-${id}`;
    winEl.style.width = `${width}px`;
    winEl.style.height = `${height}px`;
    winEl.style.left = `${left}px`;
    winEl.style.top = `${top}px`;
    winEl.style.zIndex = ++this.highestZIndex;

    winEl.innerHTML = `
      <div class="window-titlebar">
        <div class="window-traffic-lights">
          <button class="traffic-btn btn-close" title="Kapat"></button>
          <button class="traffic-btn btn-min" title="Simge Durumuna Küçült"></button>
          <button class="traffic-btn btn-max" title="Büyüt / Küçült"></button>
        </div>
        <div class="window-title-text">
          <span>${icon || '💻'}</span>
          <span>${title}</span>
        </div>
        <div class="window-controls-right"></div>
      </div>
      <div class="window-body" id="body-${id}">
        ${typeof content === 'string' ? content : ''}
      </div>

      <!-- Resizers -->
      <div class="resize-handle n"></div>
      <div class="resize-handle s"></div>
      <div class="resize-handle w"></div>
      <div class="resize-handle e"></div>
      <div class="resize-handle nw"></div>
      <div class="resize-handle ne"></div>
      <div class="resize-handle sw"></div>
      <div class="resize-handle se"></div>
    `;

    if (typeof content !== 'string' && content instanceof HTMLElement) {
      winEl.querySelector(`#body-${id}`).appendChild(content);
    }

    this.layerEl.appendChild(winEl);

    const winData = {
      id,
      el: winEl,
      config: appConfig,
      isMinimized: false,
      isMaximized: false,
      prevBounds: { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }
    };

    this.windows.set(id, winData);
    this.activeAppId = id;

    // Attach Interactivity
    this.setupDragging(winData);
    this.setupResizing(winData);
    this.setupButtons(winData);

    winEl.addEventListener('mousedown', () => this.bringToFront(id));

    if (onInit) {
      onInit(winEl.querySelector(`#body-${id}`), winData);
    }

    events.emit('app:opened', id);
    events.emit('app:focused', appConfig);
  }

  bringToFront(id) {
    const win = this.windows.get(id);
    if (!win) return;

    this.windows.forEach(w => w.el.classList.remove('active'));
    win.el.classList.add('active');
    win.el.style.zIndex = ++this.highestZIndex;
    this.activeAppId = id;

    events.emit('app:focused', win.config);
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;
    sound.playClick();
    win.isMinimized = true;
    win.el.classList.add('minimized');
    events.emit('app:minimized', id);
  }

  restoreWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;
    sound.playClick();
    win.isMinimized = false;
    win.el.classList.remove('minimized');
    this.bringToFront(id);
    events.emit('app:restored', id);
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;
    sound.playClick();

    if (win.isMaximized) {
      win.isMaximized = false;
      win.el.classList.remove('maximized');
      win.el.style.left = win.prevBounds.left;
      win.el.style.top = win.prevBounds.top;
      win.el.style.width = win.prevBounds.width;
      win.el.style.height = win.prevBounds.height;
    } else {
      win.prevBounds = {
        left: win.el.style.left,
        top: win.el.style.top,
        width: win.el.style.width,
        height: win.el.style.height
      };
      win.isMaximized = true;
      win.el.classList.add('maximized');
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;
    sound.playClick();

    if (win.config.onClose) {
      win.config.onClose();
    }

    win.el.remove();
    this.windows.delete(id);
    events.emit('app:closed', id);
  }

  setupDragging(win) {
    const titlebar = win.el.querySelector('.window-titlebar');
    let isDragging = false;
    let startX, startY, initLeft, initTop;

    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.traffic-btn')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initLeft = win.el.offsetLeft;
      initTop = win.el.offsetTop;

      const onMouseMove = (moveEv) => {
        if (!isDragging) return;
        if (win.isMaximized) {
          this.toggleMaximize(win.id);
        }
        const dx = moveEv.clientX - startX;
        const dy = moveEv.clientY - startY;

        let newLeft = initLeft + dx;
        let newTop = Math.max(32, initTop + dy); // Don't go above topbar

        win.el.style.left = `${newLeft}px`;
        win.el.style.top = `${newTop}px`;
      };

      const onMouseUp = () => {
        isDragging = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  setupResizing(win) {
    const handles = win.el.querySelectorAll('.resize-handle');

    handles.forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        const dir = Array.from(handle.classList).find(c => ['n','s','w','e','nw','ne','sw','se'].includes(c));
        if (!dir) return;

        let startX = e.clientX;
        let startY = e.clientY;
        let startW = win.el.offsetWidth;
        let startH = win.el.offsetHeight;
        let startL = win.el.offsetLeft;
        let startT = win.el.offsetTop;

        const onMouseMove = (me) => {
          let dx = me.clientX - startX;
          let dy = me.clientY - startY;

          if (dir.includes('e')) win.el.style.width = `${Math.max(300, startW + dx)}px`;
          if (dir.includes('s')) win.el.style.height = `${Math.max(200, startH + dy)}px`;
          if (dir.includes('w')) {
            const newW = Math.max(300, startW - dx);
            win.el.style.width = `${newW}px`;
            win.el.style.left = `${startL + (startW - newW)}px`;
          }
          if (dir.includes('n')) {
            const newH = Math.max(200, startH - dy);
            win.el.style.height = `${newH}px`;
            win.el.style.top = `${startT + (startH - newH)}px`;
          }
        };

        const onMouseUp = () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });
    });
  }

  setupButtons(win) {
    win.el.querySelector('.btn-close').addEventListener('click', () => this.closeWindow(win.id));
    win.el.querySelector('.btn-min').addEventListener('click', () => this.minimizeWindow(win.id));
    win.el.querySelector('.btn-max').addEventListener('click', () => this.toggleMaximize(win.id));
  }
}

export const wm = new WindowManager();
