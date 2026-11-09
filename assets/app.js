// ===== CONFIGURACIÓN: rellena estos datos cuando estén listos =====
const CONFIG = {
  email: 'contacto@vorenexlabs.me',  // correo real (crear el buzón antes de publicar)
  whatsapp: '',       // número en formato internacional sin "+" ni espacios, p. ej. '573001234567'. Vacío = botón oculto
  bookingUrl: '',     // enlace de reserva (Calendly, Cal.com, Google Calendar). Vacío = botón oculto
  formEndpoint: '',   // endpoint de Formspree u otro servicio. Vacío = abre el correo (mailto)
};
// ==================================================================

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Cabecera y menú móvil
const header = $('[data-header]');
const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });
const nav = $('[data-nav]'), toggle = $('[data-nav-toggle]');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
$$('a', nav || document.createElement('div')).forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }));

// Animaciones de entrada (si falla JS, el contenido sigue visible)
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: .1 });
  $$('.reveal').forEach(el => io.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('is-visible')); }

// Contacto configurable
const waText = encodeURIComponent('Hola, me gustaría pedir el diagnóstico gratuito.');
if (CONFIG.whatsapp) $$('[data-whatsapp]').forEach(a => { a.href = `https://wa.me/${CONFIG.whatsapp}?text=${waText}`; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; });
if (CONFIG.bookingUrl) $$('[data-booking]').forEach(a => { a.href = CONFIG.bookingUrl; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; });
$$('[data-email]').forEach(el => { el.textContent = CONFIG.email; });

// Formulario
const form = $('[data-contact-form]'), fb = $('[data-form-feedback]');
form?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('_gotcha')) return; // anti-spam
  if (CONFIG.formEndpoint) {
    fb.textContent = 'Enviando…';
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.reset(); fb.textContent = '¡Gracias! Te responderemos en un día laborable.';
    } catch { fb.textContent = `No se pudo enviar. Escríbenos a ${CONFIG.email}.`; }
    return;
  }
  const subject = encodeURIComponent(`Diagnóstico gratuito — ${data.get('empresa')}`);
  const body = encodeURIComponent(['nombre', 'empresa', 'email', 'telefono', 'sector', 'web'].map(k => `${k[0].toUpperCase() + k.slice(1)}: ${data.get(k) || '-'}`).join('\n') + `\n\n${data.get('mensaje')}`);
  fb.textContent = 'Abriendo tu aplicación de correo…';
  window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
});

const y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();
