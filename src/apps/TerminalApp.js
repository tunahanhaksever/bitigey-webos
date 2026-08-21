import { sound } from '../core/SoundEngine.js';

export const TerminalApp = {
  id: 'terminal',
  title: 'Bitigey Terminal — Shell v2.5',
  icon: '📟',
  color: '#00f0ff',
  width: 620,
  height: 400,
  content: `
    <div class="terminal-app" id="term-app-box">
      <canvas class="terminal-canvas-matrix" id="term-matrix-canvas"></canvas>
      <div class="terminal-log" id="term-log-area">
        <div style="color: #00f0ff; font-weight: 700;">🚀 Bitigey WebOS Terminal [Sürüm 2.5.0-Release]</div>
        <div style="color: #94a3b8; font-size: 11px;">Kullanılabilir komutlar için 'help' yazın. 'matrix' yazarak dijital yağmuru başlatabilirsiniz.</div>
        <br>
      </div>
      <div class="terminal-row-input">
        <span class="term-prompt">tunahan@bitigey-os:~$</span>
        <input type="text" class="term-input" id="term-cli-in" autofocus autocomplete="off" spellcheck="false">
      </div>
    </div>
  `,
  onInit: (container) => {
    const logArea = container.querySelector('#term-log-area');
    const input = container.querySelector('#term-cli-in');
    const canvas = container.querySelector('#term-matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Matrix Rain Effect on Canvas
    let matrixInterval = null;
    function initMatrixRain() {
      canvas.width = container.offsetWidth || 500;
      canvas.height = container.offsetHeight || 300;
      const letters = '01TUNAHANHAKSEVERBITIGEY0123456789ABCDEF';
      const fontSize = 12;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(1);

      function drawMatrix() {
        ctx.fillStyle = 'rgba(6, 8, 20, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00f0ff';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      if (matrixInterval) clearInterval(matrixInterval);
      matrixInterval = setInterval(drawMatrix, 50);
    }
    setTimeout(initMatrixRain, 200);

    function print(text, color = '#00f0ff') {
      const line = document.createElement('div');
      line.style.color = color;
      line.style.whiteSpace = 'pre-wrap';
      line.textContent = text;
      logArea.appendChild(line);
      container.scrollTop = container.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = input.value.trim();
        input.value = '';
        if (!cmd) return;

        print(`tunahan@bitigey-os:~$ ${cmd}`, '#ff007f');
        sound.playClick();

        const [main, ...args] = cmd.split(' ');

        switch (main.toLowerCase()) {
          case 'help':
            print(
`📖 Kullanılabilir Komutlar:
  whoami       : Tunahan Haksever detaylı geliştirici ve şair profili
  books        : Tunahan Haksever'in yayınlanmış eserleri
  poetry       : Rastgele bir şiir dizesi gösterir
  neofetch     : Sistem ve donanım bilgilerini grafiksel gösterir
  matrix       : Matrix dijital yağmur efektini yeniler/hızlandırır
  cowsay <yazı>: ASCII ineği konuşturur
  calc <işlem> : Matematiksel hesaplama yapar (örn: calc 12*45)
  date         : Sistem tarih ve saatini gösterir
  clear        : Ekranı temizler
`, '#38bdf8');
            break;

          case 'whoami':
            print(
`👤 TUNAHAN HAKSEVER
   • Şair, Yazar, Editör & Yazılım Geliştirici
   • Bitigey.com & Kög Dergisi Kurucusu
   • Karadeniz Teknik Üniversitesi (Türk Dili ve Edebiyatı)
   • Eserler: Mâsivâ Yolculuğu, Ekinoksu Beklemek
   • GitHub: github.com/tunahanhaksever | Web: bitigey.com
`, '#fbbf24');
            break;

          case 'books':
            print(
`📚 YAYINLANMIŞ ESERLER & DERGİLER:
  1. Mâsivâ Yolculuğu (Şiir Kitabı - Tunahan Haksever)
  2. Ekinoksu Beklemek (Şiir Kitabı - Tunahan Haksever)
  3. Kög Dergisi (Kurucu & Genel Yayın Yönetmeni)
  4. Odak Noktası Dergisi (Kurucu Editör)
`, '#10b981');
            break;

          case 'poetry':
            const poems = [
              `"Kelimelerin gölgesinde hakikati arayan bir yolcu,\nMâsivâdan sıyrılıp kendi ekinoksuna varır."\n— Tunahan Haksever`,
              `"Gecenin içinde bir şafak ararken,\nZamanın unuttuğu dizelere sığındım."\n— Tunahan Haksever`,
              `"Edebiyat, hızla tüketilen çağda insan ruhunun son sığınağıdır."\n— Tunahan Haksever`
            ];
            print(poems[Math.floor(Math.random() * poems.length)], '#e879f9');
            break;

          case 'neofetch':
            print(
`
       /\\         tunahan@bitigey-os
      /  \\        ------------------
     / /\\ \\       OS: Bitigey WebOS v2.5.0
    / /  \\ \\      Kernel: JavaScript ESNext + WebGPU
   / /_/\\_\\ \\     Author: Tunahan Haksever (bitigey.com)
  /_/      \\_\\    Shell: Bitigey Zsh
                  Theme: Cyberpunk Glassmorphism
                  Uptime: 100% (Sonsuz Canlı Oturum)
`, '#00f0ff');
            break;

          case 'cowsay':
            const msg = args.join(' ') || 'Bitigey WebOS cok guzel!';
            print(
`  < ${msg} >
   \\   ^__^
    \\  (oo)\\_______
       (__)\\       )\\/\\
           ||----w |
           ||     ||
`, '#fbbf24');
            break;

          case 'calc':
            try {
              const res = new Function(`return (${args.join(' ')})`)();
              print(`Sonuç: ${res}`, '#10b981');
            } catch(e) {
              print('Geçersiz matematik ifadesi.', '#ff007f');
            }
            break;

          case 'matrix':
            initMatrixRain();
            print('⚡ Matrix dijital yağmur akışı güncellendi.', '#10b981');
            break;

          case 'date':
            print(new Date().toLocaleString('tr-TR'), '#38bdf8');
            break;

          case 'clear':
            logArea.innerHTML = '';
            break;

          default:
            print(`Komut bulunamadı: '${main}'. Yardım için 'help' yazın.`, '#ff007f');
            break;
        }
      }
    });

    container.addEventListener('click', () => input.focus());
  }
};
