const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() {
  if (mobileMenu.open) mobileMenu.close();
  document.documentElement.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  if (mobileMenu.open) {
    closeMenu();
    return;
  }
  mobileMenu.showModal();
  document.documentElement.classList.add('menu-open');
  menuToggle.setAttribute('aria-expanded', 'true');
});
document.querySelector('#menu-close').addEventListener('click', closeMenu);
mobileMenu.addEventListener('close', closeMenu);
mobileMenu.addEventListener('cancel', event => {
  event.preventDefault();
  closeMenu();
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeMenu();
  const href = link.getAttribute('href');
  const target = href?.startsWith('#') && href.length > 1 ? document.getElementById(href.slice(1)) : null;
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}));
window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
  if (event.matches && mobileMenu.open) {
    closeMenu();
    document.querySelector('nav[aria-label="Main navigation"] a').focus();
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-category]').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    });
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
const contactEmail = document.querySelector('#contact-email')?.textContent.trim();
let copyStatusTimeout;
document.querySelector('#copy-email')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(contactEmail);
    status.textContent = 'Copied!';
  } catch {
    status.textContent = `Select and copy: ${contactEmail}`;
  }
  clearTimeout(copyStatusTimeout);
  copyStatusTimeout = setTimeout(() => { status.textContent = ''; }, 4000);
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const nameInput = document.querySelector('#contact-name');
const messageInput = document.querySelector('#contact-message');

function validateText(input, minimum, message) {
  input.setCustomValidity(input.value.trim().length < minimum ? message : '');
}

contactForm?.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  messageInput.setCustomValidity('');
  formStatus.textContent = '';
});

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  validateText(nameInput, 2, 'Please enter your name (at least 2 characters).');
  validateText(messageInput, 20, 'Please share at least 20 characters about your project.');
  if (!contactForm.reportValidity()) return;

  const values = new FormData(contactForm);
  const subject = `Project inquiry: ${values.get('service')}`;
  const body = [
    `Name: ${values.get('name').trim()}`,
    `Email: ${values.get('email').trim()}`,
    `Service: ${values.get('service')}`,
    '',
    values.get('message').trim()
  ].join('\r\n');

  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = `Your email draft is ready to open. If no email app appears, email ${contactEmail} directly. Your details are still here to copy.`;
});
