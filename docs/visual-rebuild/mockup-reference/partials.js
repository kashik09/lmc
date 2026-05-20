// Shared header, footer, modal partials — injected into each page

(function () {
  const ICONS = {
    cross: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 4v16M4 12h16"/></svg>`,
    chev: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 5 19 12 13 19"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.34 1.79.61 2.65a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.43-1.43a2 2 0 0 1 2.11-.45c.86.27 1.75.48 2.65.61A2 2 0 0 1 22 16.92z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="1"/><polyline points="3 7 12 13 21 7"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    ambulance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="14" height="10"/><polyline points="15 9 19 9 23 13 23 16 15 16"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 9v4M6 11h4"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>`,
    chevLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    chevUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  };
  window.LMC_ICONS = ICONS;

  // 8x8 checkered cross logo
  const logoSvg = `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="checker" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#0E8A6D"/>
          <rect width="2" height="2" fill="#fff"/>
          <rect x="2" y="2" width="2" height="2" fill="#fff"/>
        </pattern>
      </defs>
      <path d="M12 4h8v8h8v8h-8v8h-8v-8H4v-8h8z" fill="url(#checker)" stroke="#0E8A6D" stroke-width="0.5"/>
    </svg>
  `;

  const navItems = (active) => [
    { label: 'Home', href: 'index.html', key: 'home' },
    { label: 'Our Services', href: 'services.html', key: 'services', dropdown: [
        { label: 'All Services', href: 'services.html' },
        { label: 'X-Ray Imaging', href: 'service-detail.html?s=xray' },
        { label: 'Dental Care', href: 'service-detail.html?s=dental' },
        { label: 'Laboratory', href: 'service-detail.html?s=lab' },
        { label: 'Cardiology', href: 'service-detail.html?s=cardio' },
    ]},
    { label: 'Patients', href: '#', key: 'patients', dropdown: [
        { label: 'Patient Guide', href: '#' },
        { label: 'Insurance', href: '#' },
        { label: 'Visitor Info', href: '#' },
    ]},
    { label: 'News', href: 'news.html', key: 'news' },
    { label: 'Contacts', href: 'contacts.html', key: 'contacts' },
    { label: 'About Us', href: '#', key: 'about', dropdown: [
        { label: 'Our Story', href: '#' },
        { label: 'Leadership', href: '#' },
        { label: 'Careers', href: '#' },
    ]},
  ].map(i => ({ ...i, active: i.key === active }));

  const renderHeader = (active) => {
    const nav = navItems(active).map(item => {
      const caret = item.dropdown ? `<span class="caret"></span>` : '';
      const dd = item.dropdown ? `
        <ul class="dropdown">
          ${item.dropdown.map(d => `<li><a href="${d.href}">${d.label}</a></li>`).join('')}
        </ul>` : '';
      return `
        <li>
          <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.label}${caret}</a>
          ${dd}
        </li>
      `;
    }).join('');

    return `
      <div class="topbar">
        <div class="container">
          <a href="contacts.html">REQUEST AN APPOINTMENT</a>
          <div class="emergency">${ICONS.ambulance.replace('<svg', '<svg width="18" height="18" style="vertical-align:-4px;margin-right:6px;color:#0E8A6D"')} Emergency Line <strong>(+256) 774-202-747</strong></div>
        </div>
      </div>
      <header class="site-header">
        <div class="container">
          <a class="logo" href="index.html" aria-label="Lifeline Medical Centre — Gayaza">
            <div class="logo-mark">${logoSvg}</div>
            <div class="logo-text">
              Lifeline Medical<br>
              Centre · <span class="gayaza">Gayaza</span>
            </div>
          </a>
          <ul class="nav">${nav}</ul>
        </div>
      </header>
    `;
  };

  const renderFooter = () => `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <a class="logo" href="index.html" style="margin-bottom:18px">
              <div class="logo-mark" style="border-color:#fff">${logoSvg}</div>
              <div class="logo-text" style="color:#fff">Lifeline Medical<br>Centre · <span style="color:#0E8A6D">Gayaza</span></div>
            </a>
            <p style="margin-top:18px">A trusted community medical centre providing 24-hour primary care, diagnostics, and specialist services to Gayaza and the surrounding region.</p>
            <div class="footer-contact">
              <div class="row">
                <div class="icon">${ICONS.phone.replace('<svg', '<svg width="14" height="14"')}</div>
                <div>
                  <div style="opacity:.6;font-size:11px;letter-spacing:.18em;text-transform:uppercase">Emergency Line</div>
                  <strong style="color:#fff">(+256) 774-202-747</strong>
                </div>
              </div>
              <div class="row">
                <div class="icon">${ICONS.mail.replace('<svg', '<svg width="14" height="14"')}</div>
                <div>
                  <div style="opacity:.6;font-size:11px;letter-spacing:.18em;text-transform:uppercase">Email Us</div>
                  <a href="mailto:info@lmc.co.ug" style="color:#fff">info@lmc.co.ug</a>
                </div>
              </div>
              <div class="row">
                <div class="icon">${ICONS.pin.replace('<svg', '<svg width="14" height="14"')}</div>
                <div>
                  <div style="opacity:.6;font-size:11px;letter-spacing:.18em;text-transform:uppercase">Location</div>
                  <span>Gayaza-Zirobwe Road,<br>Gayaza, Uganda</span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Our Services</a></li>
              <li><a href="news.html">News & Articles</a></li>
              <li><a href="contacts.html">Contact Us</a></li>
              <li><a href="#">Patient Guide</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div class="footer-col footer-news">
            <h4>Latest News</h4>
            <a href="news.html" class="item">
              <div class="thumb">N1</div>
              <div>
                <div class="date">May 12, 2026</div>
                <h5>New paediatric ward opens with expanded capacity</h5>
              </div>
            </a>
            <a href="news.html" class="item">
              <div class="thumb">N2</div>
              <div>
                <div class="date">April 28, 2026</div>
                <h5>Free community health screening this Saturday</h5>
              </div>
            </a>
            <a href="news.html" class="item">
              <div class="thumb">N3</div>
              <div>
                <div class="date">April 14, 2026</div>
                <h5>Three new specialists join our cardiology team</h5>
              </div>
            </a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Lifeline Medical Centre — Gayaza. All rights reserved.</span>
          <span class="designed">Designed by <strong>Level 0</strong></span>
        </div>
      </div>
    </footer>
    <button class="back-to-top" aria-label="Back to top">${ICONS.chevUp.replace('<svg', '<svg width="20" height="20"')}</button>
    <div id="page-loader" class="page-loader" aria-hidden="true">
      <div class="spinner"></div>
    </div>
  `;

  const renderDoctorModal = () => `
    <div class="modal-overlay" id="doctor-modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="Close">${ICONS.close.replace('<svg', '<svg width="18" height="18"')}</button>
      <div class="modal-body">
        <div class="modal-photo">JA</div>
        <div class="modal-info">
          <div class="role">Department · Title</div>
          <h2>Doctor Name</h2>
          <div class="rule"></div>
          <div class="bio">
            <p>Full biography appears here.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  window.LMC_PARTIALS = {
    header: renderHeader,
    footer: renderFooter,
    doctorModal: renderDoctorModal,
    logo: logoSvg,
    icons: ICONS,
  };

  // Auto-inject
  document.addEventListener('DOMContentLoaded', () => {
    const headerHost = document.querySelector('[data-partial="header"]');
    if (headerHost) headerHost.outerHTML = renderHeader(headerHost.dataset.active || '');
    const footerHost = document.querySelector('[data-partial="footer"]');
    if (footerHost) footerHost.outerHTML = renderFooter();
    const modalHost = document.querySelector('[data-partial="doctor-modal"]');
    if (modalHost) modalHost.outerHTML = renderDoctorModal();
  });
})();
