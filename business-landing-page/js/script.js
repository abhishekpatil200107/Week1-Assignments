(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  // Contact form: front-end demo. Connect Formspree or Netlify Forms to deliver requests.
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Please check the highlighted fields and try again.';
      return;
    }
    status.textContent = 'Thank you. We will call you within one working day.';
    form.reset();
  });
})();
