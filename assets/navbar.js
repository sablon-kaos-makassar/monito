/* =============================================
   Monito – Global Navbar
   Inject topbar, tab-nav, dan slide-menu
   ke semua halaman secara otomatis.
   ============================================= */

(function () {

  /* ── Konfigurasi Tab ── */
  const TABS = [
    { id: 'presensi',   emoji: '📅', label: 'Presensi',    file: 'index.html' },
    { id: 'penjahit',   emoji: '✂️', label: 'Penjahit',    file: 'penjahit.html' },
    { id: 'stok',       emoji: '📦', label: 'Stok Barang', file: 'stok.html' },
    { id: 'orderan',    emoji: '📋', label: 'Orderan',     file: 'orderan.html' },
    { id: 'produksi',   emoji: '🏭', label: 'Produksi',    file: 'produksi.html' },
    { id: 'keuangan',   emoji: '💰', label: 'Keuangan',    file: 'keuangan.html' },
    { id: 'alat-bahan', emoji: '🧰', label: 'Alat & Bahan',file: 'alat-bahan.html' },
  ];

  /* ── Detect halaman aktif dari URL ── */
  function getActiveId() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    const match = TABS.find(t => t.file === file);
    return match ? match.id : 'presensi';
  }

  /* ── Render HTML ── */
  function render() {
    const activeId = getActiveId();

    const tabButtons = TABS.map(t => `
      <button
        class="tab-btn${t.id === activeId ? ' active' : ''}"
        onclick="Monito.navigate('${t.file}')"
      >${t.emoji} ${t.label}</button>
    `).join('');

    const slideNavItems = TABS.map(t => `
      <a
        class="slide-nav-item${t.id === activeId ? ' active' : ''}"
        href="${t.file}"
      >
        <div class="slide-item-left">
          <span class="slide-item-emoji">${t.emoji}</span>
          <span class="slide-item-label">${t.label}</span>
        </div>
        <span class="slide-item-arrow">›</span>
      </a>
    `).join('');

    const html = `
      <div class="sticky-header" id="monito-sticky-header">
        <div class="topbar">
          <div class="brand">Monito<span>.</span></div>
          <button class="hamburger" onclick="Monito.openMenu()" aria-label="Buka menu">
            <svg viewBox="0 0 20 20">
              <line x1="2" y1="5" x2="18" y2="5"/>
              <line x1="2" y1="10" x2="18" y2="10"/>
              <line x1="2" y1="15" x2="18" y2="15"/>
            </svg>
          </button>
        </div>
        <div class="tab-nav">${tabButtons}</div>
      </div>

      <div class="menu-overlay" id="monito-menu-overlay" onclick="Monito.closeMenu()"></div>

      <div class="slide-menu" id="monito-slide-menu">
        <div class="slide-menu-header">
          <div>
            <div class="slide-brand">Monito<span>.</span></div>
            <div class="slide-sub">Sistem manajemen bisnis</div>
          </div>
          <button class="slide-close" onclick="Monito.closeMenu()" aria-label="Tutup menu">
            <svg viewBox="0 0 16 16">
              <line x1="2" y1="2" x2="14" y2="14"/>
              <line x1="14" y1="2" x2="2" y2="14"/>
            </svg>
          </button>
        </div>
        <div class="slide-menu-body">${slideNavItems}</div>
        <div class="slide-menu-footer">
          <div class="toggle-wrap">
            <div class="toggle-left">
              <span class="slide-item-emoji">🌙</span>
              <span class="toggle-label">Mode gelap</span>
            </div>
            <button class="toggle" id="monito-dark-toggle" onclick="Monito.toggleDark()" aria-label="Toggle mode gelap"></button>
          </div>
          <div class="slide-version">v1.0 · Monito App</div>
        </div>
      </div>
    `;

    // Inject ke body (prepend)
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.prepend(...wrapper.childNodes);

    // Sesuaikan padding-top body dengan tinggi sticky header
    fixHeaderOffset();
    window.addEventListener('resize', fixHeaderOffset);
  }

  function fixHeaderOffset() {
    const header = document.getElementById('monito-sticky-header');
    if (header) document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  /* ── Public API ── */
  window.Monito = {
    navigate(file) {
      window.location.href = file;
    },
    openMenu() {
      document.getElementById('monito-menu-overlay').classList.add('open');
      setTimeout(() => document.getElementById('monito-slide-menu').classList.add('open'), 10);
      document.body.style.overflow = 'hidden';
    },
    closeMenu() {
      document.getElementById('monito-slide-menu').classList.remove('open');
      document.getElementById('monito-menu-overlay').classList.remove('open');
      document.body.style.overflow = '';
    },
    toggleDark() {
      document.getElementById('monito-dark-toggle').classList.toggle('on');
    },
  };

  /* ── Init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
