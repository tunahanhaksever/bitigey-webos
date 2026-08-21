import { sound } from '../core/SoundEngine.js';

export const MusicApp = {
  id: 'music',
  title: 'Bitigey Synthwave & Lo-Fi Studio',
  icon: '🎵',
  color: '#ff007f',
  width: 520,
  height: 420,
  content: `
    <div class="music-app">
      <div class="cassette-visualizer">
        <canvas id="music-spectrum-canvas" width="340" height="120"></canvas>
      </div>

      <div class="music-meta">
        <div class="song-title" id="app-song-title">Neon Midnight Horizon</div>
        <div class="song-artist" id="app-song-artist">Tunahan Haksever • Bitigey Synthwave</div>
      </div>

      <div class="music-controls-row">
        <button class="music-btn" id="btn-music-prev" title="Önceki">⏮</button>
        <button class="music-btn play-btn" id="btn-music-play" title="Çal / Duraklat">▶</button>
        <button class="music-btn" id="btn-music-next" title="Sonraki">⏭</button>
      </div>

      <div style="font-size: 11px; color: #94a3b8; text-align: center;">
        🎹 Web Audio API Sentezleyici • Gerçek Zamanlı Frekans Görselleştirici
      </div>
    </div>
  `,
  onInit: (container) => {
    const playBtn = container.querySelector('#btn-music-play');
    const songTitle = container.querySelector('#app-song-title');
    const songArtist = container.querySelector('#app-song-artist');
    const canvas = container.querySelector('#music-spectrum-canvas');
    const ctx = canvas.getContext('2d');

    let animId = null;

    function renderSpectrum() {
      const data = sound.getFrequencyData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 32) * 1.5;
      let x = 10;

      for (let i = 0; i < 24; i++) {
        const val = data[i] || 0;
        const percent = val / 255;
        const barHeight = Math.max(4, percent * canvas.height * 0.85);

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#00f0ff');
        gradient.addColorStop(0.5, '#b967ff');
        gradient.addColorStop(1, '#ff007f');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 4, barHeight);

        x += barWidth;
      }

      animId = requestAnimationFrame(renderSpectrum);
    }
    renderSpectrum();

    function updatePlayButtonState() {
      playBtn.textContent = sound.isPlayingMusic ? '⏸' : '▶';
    }
    updatePlayButtonState();

    playBtn.addEventListener('click', () => {
      sound.toggleMusic((isPlaying, track) => {
        updatePlayButtonState();
        if (track) {
          songTitle.textContent = track.title;
          songArtist.textContent = track.artist;
        }
      });
    });

    container.querySelector('#btn-music-next').addEventListener('click', () => {
      sound.currentTrackIndex = (sound.currentTrackIndex + 1) % sound.tracks.length;
      const track = sound.tracks[sound.currentTrackIndex];
      songTitle.textContent = track.title;
      songArtist.textContent = track.artist;
      sound.playClick();
    });

    container.querySelector('#btn-music-prev').addEventListener('click', () => {
      sound.currentTrackIndex = (sound.currentTrackIndex - 1 + sound.tracks.length) % sound.tracks.length;
      const track = sound.tracks[sound.currentTrackIndex];
      songTitle.textContent = track.title;
      songArtist.textContent = track.artist;
      sound.playClick();
    });
  }
};
