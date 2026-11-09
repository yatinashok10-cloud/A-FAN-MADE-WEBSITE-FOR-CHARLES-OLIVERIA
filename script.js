// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Contact form validation
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    let error = '';
    if (form.elements['_gotcha'].value) error = 'Could not send this message.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = 'Enter a valid email address, for example name@example.com.';
    else if (message.length < 10) error = 'Write at least 10 characters in your message.';
    else if (message.length > 1000) error = 'Shorten your message to 1000 characters or fewer.';
    if (error) {
      e.preventDefault();
      status.textContent = error;
    } else {
      status.textContent = '';
    }
  });
}

// Analytics consent (analytics load only after "Accept")
const KEY = 'analytics-consent';
const GC_URL = document.body.dataset.goatcounter || '';

function getChoice() {
  try { return localStorage.getItem(KEY); } catch (err) { return null; }
}
function setChoice(v) {
  try { localStorage.setItem(KEY, v); } catch (err) { /* storage blocked */ }
}
function clearChoice() {
  try { localStorage.removeItem(KEY); } catch (err) { /* storage blocked */ }
}
function loadAnalytics() {
  if (!GC_URL || GC_URL.includes('YOURCODE') || document.getElementById('gc-script')) return;
  const s = document.createElement('script');
  s.id = 'gc-script';
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = GC_URL;
  document.head.appendChild(s);
}
function showBanner() {
  if (document.getElementById('consent')) return;
  const box = document.createElement('div');
  box.className = 'consent';
  box.id = 'consent';
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', 'Analytics consent');

  const p = document.createElement('p');
  p.textContent = 'This site sets no cookies. With your permission it uses privacy-friendly analytics to count visits. ';
  const link = document.createElement('a');
  link.href = 'privacy.html';
  link.textContent = 'Read the privacy policy';
  p.appendChild(link);

  const accept = document.createElement('button');
  accept.type = 'button';
  accept.className = 'btn';
  accept.textContent = 'Accept analytics';
  accept.addEventListener('click', () => { setChoice('yes'); loadAnalytics(); box.remove(); });

  const decline = document.createElement('button');
  decline.type = 'button';
  decline.className = 'btn decline';
  decline.textContent = 'Decline';
  decline.addEventListener('click', () => { setChoice('no'); box.remove(); });

  box.append(p, accept, decline);
  document.body.appendChild(box);
}

const choice = getChoice();
if (choice === 'yes') loadAnalytics();
else if (choice !== 'no') showBanner();

const reset = document.getElementById('consent-reset');
if (reset) reset.addEventListener('click', () => { clearChoice(); showBanner(); });