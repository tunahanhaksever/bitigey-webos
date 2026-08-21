export const AboutApp = {
  id: 'about',
  title: 'Tunahan Haksever — Biyografi & Portföy',
  icon: '👤',
  color: '#00f0ff',
  width: 680,
  height: 520,
  content: `
    <div class="about-app">
      <!-- Hero Section -->
      <div class="about-hero">
        <div class="about-avatar">✍️</div>
        <div class="about-names">
          <h2>Tunahan Haksever</h2>
          <div class="about-title-badge">Şair • Yazar • Editör • Yazılım Geliştirici</div>
          <div style="font-size: 11.5px; color: #94a3b8; margin-top: 4px;">
            🎂 7 Ağustos 2005, İstanbul | 🎓 Karadeniz Teknik Üniversitesi (Türk Dili ve Edebiyatı)
          </div>
        </div>
      </div>

      <!-- Bio / About -->
      <div class="about-section-box">
        <h3>📖 Tunahan Haksever Kimdir?</h3>
        <p>
          Tunahan Haksever, edebiyatın derinliğini modern çağın dijital dünyasıyla buluşturan Türk şair, yazar, editör ve yazılım geliştiricisidir. 
          Şubat 2026'da kurduğu <strong>Bitigey.com</strong> ile yüzeysel sosyal medya tüketimine karşı bağımsız bir dijital edebiyat hafızası inşa etmiştir.
        </p>
      </div>

      <!-- Published Books & Magazines -->
      <div class="about-section-box">
        <h3>📚 Edebi Eserleri & Yayıncılık</h3>
        <div class="books-grid">
          <div class="book-card">
            <div class="book-title">📖 Mâsivâ Yolculuğu</div>
            <div class="book-type">Şiir Kitabı • Tunahan Haksever</div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">İnsanın kendi iç dünyasına ve hakikate yaptığı edebi yolculuk.</p>
          </div>

          <div class="book-card">
            <div class="book-title">🌙 Ekinoksu Beklemek</div>
            <div class="book-type">Şiir Kitabı • Tunahan Haksever</div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Gece ile gündüzün, hüzün ile umudun dengesi üzerine kurulu dizeler.</p>
          </div>

          <div class="book-card">
            <div class="book-title">🗞️ Kög Dergisi</div>
            <div class="book-type">Kurucu & Genel Yayın Yönetmeni</div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Bağımsız edebiyat, düşünce ve sanat dergisi.</p>
          </div>

          <div class="book-card">
            <div class="book-title">🎯 Odak Noktası Dergisi</div>
            <div class="book-type">Kurucu Editör</div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Kültür, sanat ve edebiyat odaklı yayıncılık faaliyeti.</p>
          </div>
        </div>
      </div>

      <!-- Digital Platforms & Software -->
      <div class="about-section-box">
        <h3>🌐 Dijital Ekosistem & Yazılım Projeleri</h3>
        <ul style="padding-left: 18px; line-height: 1.8;">
          <li><strong>Bitigey.com:</strong> Bağımsız dijital edebiyat, e-dergi ve yayıncılık platformu.</li>
          <li><strong>Bitigey IDE:</strong> Tarayıcı tabanlı Monaco Editor & WebAssembly Python kodlama stüdyosu.</li>
          <li><strong>Bitigey WebOS:</strong> Web üzerinde çalışan siberpunk işletim sistemi ve pencere yöneticisi.</li>
        </ul>
      </div>

      <!-- Links & Contact -->
      <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 6px;">
        <a href="https://bitigey.com" target="_blank" style="padding: 6px 14px; background: rgba(0,240,255,0.15); border: 1px solid #00f0ff; color: #00f0ff; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600;">🌐 Bitigey.com</a>
        <a href="https://github.com/tunahanhaksever" target="_blank" style="padding: 6px 14px; background: rgba(255,0,127,0.15); border: 1px solid #ff007f; color: #ff007f; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: 600;">🐙 GitHub Profili</a>
      </div>
    </div>
  `
};
