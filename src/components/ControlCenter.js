import { sound } from '../core/SoundEngine.js';

export function initControlCenter() {
  const tiles = document.querySelectorAll('.cc-tile');
  const sliderBrightness = document.getElementById('slider-brightness');
  const sliderVolume = document.getElementById('slider-volume');

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      sound.playClick();
      tile.classList.toggle('active');
    });
  });

  if (sliderBrightness) {
    sliderBrightness.addEventListener('input', (e) => {
      const val = e.target.value;
      document.body.style.filter = `brightness(${val}%)`;
    });
  }

  if (sliderVolume) {
    sliderVolume.addEventListener('input', (e) => {
      // Volume tracking
    });
  }
}
