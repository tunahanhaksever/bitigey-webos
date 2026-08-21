import { storage } from '../core/Storage.js';
import { sound } from '../core/SoundEngine.js';

export const NotesApp = {
  id: 'notes',
  title: 'Bitigey Edebi Not Defteri',
  icon: '📝',
  color: '#fbbf24',
  width: 580,
  height: 420,
  content: `
    <div class="notes-app">
      <div class="notes-toolbar">
        <div style="font-weight: 600; font-size: 12px; color: #fbbf24;">✍️ Şiir, Deneme & Düşünce Notları</div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-save-note" style="padding: 3px 10px; background: #fbbf24; color: #000; border-radius: 4px; font-weight: 600; font-size: 11px;">Kaydet</button>
          <button id="btn-download-note" style="padding: 3px 10px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 11px;">İndir (.md)</button>
        </div>
      </div>
      <textarea class="notes-editor" id="note-textarea" placeholder="Dizelerinizi, edebi denemelerinizi veya kod notlarınızı buraya yazın..."></textarea>
    </div>
  `,
  onInit: (container) => {
    const textarea = container.querySelector('#note-textarea');
    const saveBtn = container.querySelector('#btn-save-note');
    const downloadBtn = container.querySelector('#btn-download-note');

    const defaultContent = `# Mâsivâ Yolculuğu — Notlarım\n\n"Zamanın akışında bir dize, bazen binlerce satır kodun anlatamadığı derinliği taşır."\n\n— Tunahan Haksever (Bitigey.com)`;
    const saved = storage.get('user_note', defaultContent);
    textarea.value = saved;

    textarea.addEventListener('input', () => {
      storage.set('user_note', textarea.value);
    });

    saveBtn.addEventListener('click', () => {
      sound.playClick();
      storage.set('user_note', textarea.value);
      saveBtn.textContent = 'Kaydedildi! ✓';
      setTimeout(() => saveBtn.textContent = 'Kaydet', 1500);
    });

    downloadBtn.addEventListener('click', () => {
      sound.playClick();
      const blob = new Blob([textarea.value], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bitigey-notlar.md';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
};
