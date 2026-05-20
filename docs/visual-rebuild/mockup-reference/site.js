// Lifeline Medical Centre — shared interactions

document.addEventListener('DOMContentLoaded', () => {
  // ============ HERO CAROUSEL ============
  const hero = document.querySelector('.hero');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hero-slide')];
    const dots = [...hero.querySelectorAll('.hero-dots button')];
    let idx = slides.findIndex(s => s.classList.contains('active'));
    if (idx < 0) idx = 0;
    let timer;
    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    const next = () => go(idx + 1);
    const prev = () => go(idx - 1);
    const start = () => { clearInterval(timer); timer = setInterval(next, 6000); };
    hero.querySelector('.hero-nav.next')?.addEventListener('click', () => { next(); start(); });
    hero.querySelector('.hero-nav.prev')?.addEventListener('click', () => { prev(); start(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); start(); }));
    start();
  }

  // ============ ACCORDIONS ============
  document.querySelectorAll('.accordion').forEach(acc => {
    const items = [...acc.querySelectorAll('.acc-item')];
    items.forEach(item => {
      const head = item.querySelector('.acc-head');
      head?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        if (acc.dataset.single !== 'false') {
          items.forEach(i => i.classList.remove('open'));
        }
        if (!isOpen) item.classList.add('open');
      });
    });
  });

  // ============ DOCTOR MODAL ============
  const modal = document.getElementById('doctor-modal');
  if (modal) {
    document.querySelectorAll('[data-doctor]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const data = trigger.dataset;
        modal.querySelector('.modal-info h2').textContent = data.doctor || '';
        modal.querySelector('.modal-info .role').textContent = data.role || '';
        modal.querySelector('.modal-photo').textContent = (data.doctor || 'Dr').split(' ').map(s => s[0]).slice(0, 2).join('');
        const bio = modal.querySelector('.modal-info .bio');
        if (bio && data.bio) bio.innerHTML = data.bio;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    modal.querySelector('.modal-close')?.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ============ BACK TO TOP ============
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============ FORM VALIDATION ============
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        const field = input.closest('.form-field');
        if (!field) return;
        const v = (input.value || '').trim();
        let ok = !!v;
        if (ok && input.type === 'email') {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }
        if (ok && input.dataset.minLength) {
          ok = v.length >= parseInt(input.dataset.minLength, 10);
        }
        field.classList.toggle('error', !ok);
        if (!ok) valid = false;
      });
      const successEl = form.querySelector('.form-success');
      if (valid) {
        successEl?.classList.add('visible');
        form.querySelectorAll('input, textarea, select').forEach(i => {
          if (i.type !== 'submit') i.value = '';
        });
        setTimeout(() => successEl?.classList.remove('visible'), 4500);
      } else {
        successEl?.classList.remove('visible');
      }
    });
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-field')?.classList.remove('error');
      });
    });
  });

  // ============ PAGE LOAD SPINNER (mock for in-page links) ============
  const spinner = document.getElementById('page-loader');
  if (spinner) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || a.target === '_blank') return;
      a.addEventListener('click', (e) => {
        // let browser navigate normally; show spinner overlay briefly
        spinner.classList.add('visible');
      });
    });
  }
});
