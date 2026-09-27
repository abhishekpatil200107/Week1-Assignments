(() => {
  const root = document.documentElement;
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } }
  };

  // Dark / light theme: saved choice, else system preference
  root.dataset.theme = store.get('theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.getElementById('theme').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
  });

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Project filtering (projects page only)
  const filters = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.project');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', b === btn));
    cards.forEach(card => {
      card.hidden = btn.dataset.filter !== 'all' && card.dataset.cat !== btn.dataset.filter;
    });
  }));

  // Reveal sections as they scroll into view
  root.classList.add('js');
  const sections = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    sections.forEach(s => { s.classList.add('reveal'); io.observe(s); });
  }

  // Contact form (contact page only). Front-end demo: connect a service such as Formspree to deliver messages.
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const status = document.getElementById('form-status');
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in your name, a valid email and a message.';
        return;
      }
      status.textContent = 'Thanks! Your message was received.';
      form.reset();
    });
  }
})();
