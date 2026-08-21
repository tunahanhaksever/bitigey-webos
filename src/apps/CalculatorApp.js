import { sound } from '../core/SoundEngine.js';

export const CalculatorApp = {
  id: 'calc',
  title: 'Hesap Makinesi',
  icon: '🧮',
  color: '#38bdf8',
  width: 320,
  height: 420,
  content: `
    <div class="calc-app">
      <div class="calc-display" id="calc-screen">0</div>
      <div class="calc-grid">
        <button class="calc-btn action" data-key="C">C</button>
        <button class="calc-btn action" data-key="DEL">⌫</button>
        <button class="calc-btn action" data-key="%">%</button>
        <button class="calc-btn op" data-key="/">÷</button>

        <button class="calc-btn" data-key="7">7</button>
        <button class="calc-btn" data-key="8">8</button>
        <button class="calc-btn" data-key="9">9</button>
        <button class="calc-btn op" data-key="*">×</button>

        <button class="calc-btn" data-key="4">4</button>
        <button class="calc-btn" data-key="5">5</button>
        <button class="calc-btn" data-key="6">6</button>
        <button class="calc-btn op" data-key="-">−</button>

        <button class="calc-btn" data-key="1">1</button>
        <button class="calc-btn" data-key="2">2</button>
        <button class="calc-btn" data-key="3">3</button>
        <button class="calc-btn op" data-key="+">+</button>

        <button class="calc-btn" data-key="0" style="grid-column: span 2;">0</button>
        <button class="calc-btn" data-key=".">.</button>
        <button class="calc-btn op" data-key="=">=</button>
      </div>
    </div>
  `,
  onInit: (container) => {
    const screen = container.querySelector('#calc-screen');
    let expr = '';

    container.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const key = btn.getAttribute('data-key');

        if (key === 'C') {
          expr = '';
          screen.textContent = '0';
        } else if (key === 'DEL') {
          expr = expr.slice(0, -1);
          screen.textContent = expr || '0';
        } else if (key === '=') {
          try {
            const res = new Function(`return (${expr})`)();
            screen.textContent = res;
            expr = String(res);
          } catch(e) {
            screen.textContent = 'Hata';
            expr = '';
          }
        } else {
          expr += key;
          screen.textContent = expr;
        }
      });
    });
  }
};
