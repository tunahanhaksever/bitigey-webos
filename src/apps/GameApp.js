import { sound } from '../core/SoundEngine.js';

export const GameApp = {
  id: 'game',
  title: 'Bitigey Cyber Arcade — Neon Shooter',
  icon: '🎮',
  color: '#ff007f',
  width: 540,
  height: 480,
  content: `
    <div class="game-app">
      <div class="game-hud">
        <div>SKOR: <span id="cyber-score">0</span></div>
        <div>CAN: <span id="cyber-lives">❤️❤️❤️</span></div>
      </div>
      <div class="game-canvas-box">
        <canvas id="cyber-game-canvas" width="480" height="340"></canvas>
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-top: 8px;">
        ◀ ▶ / A-D ile hareket et • [BOŞLUK] ile ateş et
      </div>
    </div>
  `,
  onInit: (container) => {
    const canvas = container.querySelector('#cyber-game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = container.querySelector('#cyber-score');
    const livesEl = container.querySelector('#cyber-lives');

    let score = 0;
    let lives = 3;
    let gameOver = false;

    const player = { x: canvas.width / 2 - 15, y: canvas.height - 35, w: 30, h: 20, speed: 6, dx: 0 };
    const bullets = [];
    const enemies = [];
    const particles = [];

    function shoot() {
      if (gameOver) return;
      bullets.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 10, speed: 8 });
      sound.playClick();
    }

    function spawnEnemy() {
      if (gameOver) return;
      enemies.push({
        x: Math.random() * (canvas.width - 25),
        y: -20,
        w: 22,
        h: 18,
        speed: Math.random() * 2 + 1.2,
        color: Math.random() > 0.5 ? '#ff007f' : '#00f0ff'
      });
    }
    const spawnTimer = setInterval(spawnEnemy, 900);

    const onKeyDown = (e) => {
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) player.dx = -player.speed;
      if (['ArrowRight', 'd', 'D'].includes(e.key)) player.dx = player.speed;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        shoot();
      }
    };

    const onKeyUp = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) player.dx = 0;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('click', shoot);

    let loopId = null;

    function update() {
      if (gameOver) return;

      player.x += player.dx;
      if (player.x < 0) player.x = 0;
      if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;

      // Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) bullets.splice(i, 1);
      }

      // Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.speed;

        if (e.y > canvas.height) {
          enemies.splice(i, 1);
          lives--;
          livesEl.textContent = '❤️'.repeat(Math.max(0, lives));
          if (lives <= 0) gameOver = true;
          continue;
        }

        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            score += 100;
            scoreEl.textContent = score;
            break;
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Player
      ctx.fillStyle = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(player.x + player.w / 2, player.y);
      ctx.lineTo(player.x + player.w, player.y + player.h);
      ctx.lineTo(player.x, player.y + player.h);
      ctx.closePath();
      ctx.fill();

      // Bullets
      ctx.fillStyle = '#10b981';
      bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

      // Enemies
      enemies.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.w, e.h);
      });

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff007f';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OYUN BİTTİ', canvas.width / 2, canvas.height / 2);
      }
    }

    function gameLoop() {
      update();
      draw();
      loopId = requestAnimationFrame(gameLoop);
    }
    gameLoop();

    return () => {
      clearInterval(spawnTimer);
      cancelAnimationFrame(loopId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }
};
