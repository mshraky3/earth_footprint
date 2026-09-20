import { createGlobe } from './globe.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const intro = $('#intro');
const introCoord = $('#introCoord');
const introPhase = $('#introPhase');
const nav = $('#nav');
const hero = $('#hero');
const canvas = $('#globe');

/* ── the 3D sequence ──────────────────────────────────────────── */

let live = false;

function handoff() {
  if (live) return;
  live = true;
  document.body.classList.add('is-live');
  document.body.classList.remove('is-locked');
  nav.classList.add('is-in');
  intro.classList.add('is-done');
  setTimeout(() => intro.remove(), 900);
}

document.body.classList.add('is-locked');

const globe = createGlobe(canvas, { onHandoff: handoff });

function skipIntro() {
  globe.skip();
  handoff();
}

$('#skipIntro').addEventListener('click', skipIntro);

// A full reload is the reliable way to replay the sequence: the timeline
// only runs forward from module load, and ?motion=full overrides a system
// "reduce motion" setting that would otherwise skip it straight to the end.
$('#replayIntro').addEventListener('click', () => {
  const url = new URL(location.href);
  url.searchParams.set('motion', 'full');
  location.href = url.toString();
});

// Trying to scroll during the intro means "get on with it".
for (const evt of ['wheel', 'touchmove', 'keydown']) {
  window.addEventListener(evt, (e) => {
    if (live) return;
    if (evt === 'keydown' && !['ArrowDown', 'PageDown', 'End', ' '].includes(e.key)) return;
    skipIntro();
  }, { passive: true });
}

/* ── intro telemetry: scrambles, then locks onto the office ───── */

const TARGET = { lat: 26.3442, lon: 43.9738 };
const PHASES = [
  [0.0, 'تحديد الموقع'],
  [1.6, 'تثبيت المدار'],
  [3.1, 'المملكة العربية السعودية'],
  [4.3, 'القصيم — مقر بصمة الأرض'],
];

const started = performance.now();
let telemetry;

function tickTelemetry() {
  if (!intro.isConnected) return;
  const t = (performance.now() - started) / 1000;
  const lock = Math.max(0, Math.min(1, (t - 2.2) / 2.0));
  const jitter = (1 - lock) ** 2;

  const lat = TARGET.lat + (Math.random() - 0.5) * 90 * jitter;
  const lon = TARGET.lon + (Math.random() - 0.5) * 180 * jitter;
  introCoord.textContent = `${lat.toFixed(4)}° N   ${lon.toFixed(4)}° E`;

  let label = PHASES[0][1];
  for (const [at, text] of PHASES) if (t >= at) label = text;
  if (introPhase.textContent !== label) introPhase.textContent = label;

  telemetry = requestAnimationFrame(tickTelemetry);
}

if (globe.isReduced) {
  handoff();
} else {
  telemetry = requestAnimationFrame(tickTelemetry);
}

// Safety net: never leave the page locked if a frame is dropped.
setTimeout(handoff, 9000);

/* ── scroll: the planet recedes behind the content ────────────── */

let ticking = false;
let heroH = hero.offsetHeight || window.innerHeight;
let stuck = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const p = Math.max(0, Math.min(1, y / (heroH * 0.85)));
    globe.setScrollFade(1 - p * 0.82);
    const s = y > 40;
    if (s !== stuck) {
      stuck = s;
      nav.classList.toggle('is-stuck', s);
    }
    ticking = false;
  });
}

// Cached so the scroll frame never has to force a layout to read it.
new ResizeObserver(() => {
  heroH = hero.offsetHeight || window.innerHeight;
}).observe(hero);

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── services accordion ───────────────────────────────────────── */

for (const item of $$('[data-svc]')) {
  const head = item.querySelector('.svc__head');
  head.addEventListener('click', () => {
    const open = item.classList.contains('is-open');
    for (const other of $$('[data-svc]')) {
      other.classList.remove('is-open');
      other.querySelector('.svc__head').setAttribute('aria-expanded', 'false');
    }
    if (!open) {
      item.classList.add('is-open');
      head.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ── sector tiles tilt toward the pointer ─────────────────────── */

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (const tile of $$('.sectors__list li')) {
    tile.addEventListener('pointermove', (e) => {
      const r = tile.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tile.style.setProperty('--tilt-y', `${px * 7}deg`);
      tile.style.setProperty('--tilt-x', `${-py * 7}deg`);
    });
    tile.addEventListener('pointerleave', () => {
      tile.style.setProperty('--tilt-y', '0deg');
      tile.style.setProperty('--tilt-x', '0deg');
    });
  }
}

/* ── figures count up once, when they arrive ──────────────────── */

const counters = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      counters.unobserve(entry.target);
      const el = entry.target;
      const to = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      // The real figure is already in the markup, so a viewer who jumps
      // straight past this section still sees the number, not a zero.
      const dur = 1300;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  },
  { threshold: 0.6 }
);

for (const el of $$('.figures__n')) counters.observe(el);

/* ── reveal sections on scroll ────────────────────────────────── */

const sections = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-seen');
      sections.unobserve(entry.target);
    }
  },
  { threshold: 0.12 }
);

const revealTargets = $$('.rv');

for (const el of revealTargets) sections.observe(el);

// Failsafe: anything still hidden after load gets shown regardless, so a
// missed observer can never leave a section invisible.
window.addEventListener('load', () => {
  setTimeout(() => {
    for (const el of revealTargets) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-seen');
    }
  }, 400);
});

/* ── review track arrows ──────────────────────────────────────── */

const revTrack = $('#revTrack');

function scrollReviews(step) {
  // One card at a time. In RTL the track scrolls into negative scrollLeft,
  // so "next" is toward the physical left.
  const card = revTrack.querySelector('.rev__card');
  const gap = parseFloat(getComputedStyle(revTrack).columnGap) || 16;
  const rtl = getComputedStyle(revTrack).direction === 'rtl';
  const dx = (card.getBoundingClientRect().width + gap) * step * (rtl ? -1 : 1);
  revTrack.scrollBy({ left: dx, behavior: 'smooth' });
}

$('#revPrev').addEventListener('click', () => scrollReviews(-1));
$('#revNext').addEventListener('click', () => scrollReviews(1));

/* ── mobile nav ───────────────────────────────────────────────── */

const burger = $('#burger');
const mobileNav = $('#mobileNav');

function setNav(open) {
  burger.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle('is-navopen', open);
}

burger.addEventListener('click', () => {
  setNav(burger.getAttribute('aria-expanded') !== 'true');
});

for (const a of $$('.mnav a')) a.addEventListener('click', () => setNav(false));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setNav(false);
});

const navQuery = window.matchMedia('(min-width: 1024px)');
navQuery.addEventListener('change', (e) => {
  if (e.matches) setNav(false);
});

/* ── contact form ─────────────────────────────────────────────── */

const cform = $('#cform');
const cnote = $('#cformNote');

cform.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(cform);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();

  if (!name || !phone) {
    cnote.dataset.state = 'err';
    cnote.textContent = 'الرجاء إدخال الاسم ورقم الهاتف.';
    (name ? cform.phone : cform.name).focus();
    return;
  }

  // Prototype: no backend wired yet, so hand the enquiry to WhatsApp.
  const lines = [
    `الاسم: ${name}`,
    data.get('company') && `المنشأة: ${data.get('company')}`,
    `الهاتف: ${phone}`,
    data.get('email') && `البريد: ${data.get('email')}`,
    data.get('service') && `الخدمة: ${data.get('service')}`,
    data.get('message') && `الرسالة: ${data.get('message')}`,
  ].filter(Boolean);

  cnote.dataset.state = 'ok';
  cnote.textContent = 'جارٍ فتح واتساب لإرسال طلبك...';
  window.open(`https://wa.me/966597007805?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
});
