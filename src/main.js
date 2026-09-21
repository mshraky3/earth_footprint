// The globe (three.js + map data, ~600KB) is loaded as its own chunk, so the
// accordion, form, nav and marquee work the moment the page arrives instead
// of waiting for the whole 3D bundle to download and parse.
const globeModule = import('./globe.js');

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const intro = $('#intro');
const introCoord = $('#introCoord');
const introPhase = $('#introPhase');
const nav = $('#nav');
const hero = $('#hero');
const canvas = $('#globe');

/* ── theme: light by day, dark by night, with a manual toggle ─── */
// The head script already set <html data-theme> before first paint; this
// keeps it in step with the clock and handles the toggle. A manual choice is
// honoured until the next 06:00 / 18:00 switch-over, then the clock resumes.

const THEME_KEY = 'ef-theme';
const DAY_START = 6;
const DAY_END = 18;
const root = document.documentElement;
const themeBtn = $('#themeToggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

const clockTheme = (d = new Date()) =>
  d.getHours() >= DAY_START && d.getHours() < DAY_END ? 'light' : 'dark';

function nextSwitch(d = new Date()) {
  const n = new Date(d);
  const h = d.getHours();
  if (h < DAY_START) n.setHours(DAY_START, 0, 0, 0);
  else if (h < DAY_END) n.setHours(DAY_END, 0, 0, 0);
  else {
    n.setDate(n.getDate() + 1);
    n.setHours(DAY_START, 0, 0, 0);
  }
  return n.getTime();
}

function storedTheme() {
  try {
    const o = JSON.parse(localStorage.getItem(THEME_KEY) || 'null');
    if (o && o.until > Date.now()) return o.theme;
  } catch {}
  return null;
}

function applyTheme(theme) {
  if (root.dataset.theme !== theme) root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeBtn.setAttribute('aria-label', dark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن');
  themeMeta?.setAttribute('content', dark ? '#071410' : '#f7f5ee');
  globe?.setTheme(theme);
}

themeBtn.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify({ theme, until: nextSwitch() }));
  } catch {}
  const swap = () => applyTheme(theme);
  // A short cross-fade where supported; an instant swap everywhere else.
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(swap);
  } else {
    swap();
  }
});

// Follow the clock while the page stays open (e.g. across sunset).
setInterval(() => applyTheme(storedTheme() || clockTheme()), 60_000);

/* ── the 3D sequence ──────────────────────────────────────────── */

// >1 plays the opening faster than its authored timeline (5.7s → ~4.2s to
// the hero copy), which was the "slow to start" complaint.
const PACE = 1.35;

// The intro plays once per visit; reloads and returns within the same
// session go straight to the settled hero. ?motion=full forces it again.
const INTRO_KEY = 'ef-intro-seen';
const forceIntro = new URLSearchParams(location.search).get('motion') === 'full';
let introSeen = false;
try {
  introSeen = sessionStorage.getItem(INTRO_KEY) === '1';
} catch {}

let live = false;
let globe = null;
let wantSkip = introSeen && !forceIntro;

function handoff() {
  if (live) return;
  live = true;
  document.body.classList.add('is-live');
  nav.classList.add('is-in');
  intro.classList.add('is-done');
  setTimeout(() => intro.remove(), 900);
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {}
}

function skipIntro() {
  wantSkip = true;
  globe?.skip();
  handoff();
}

globeModule
  .then(({ createGlobe }) => {
    globe = createGlobe(canvas, { onHandoff: handoff, pace: PACE, theme: root.dataset.theme });
    started = performance.now(); // telemetry tracks the globe's own clock
    if (wantSkip) globe.skip();
    onScroll();
  })
  // No WebGL / chunk failed: the page must still open.
  .catch(handoff);

if (wantSkip) handoff();

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
  [4.3, 'بريدة، القصيم — الفرع الرئيسي'],
];

let started = performance.now();
let telemetry;

function tickTelemetry() {
  if (!intro.isConnected) return;
  const t = (performance.now() - started) / 1000;
  const lock = Math.max(0, Math.min(1, (t - 2.2 / PACE) / (2.0 / PACE)));
  const jitter = (1 - lock) ** 2;

  const lat = TARGET.lat + (Math.random() - 0.5) * 90 * jitter;
  const lon = TARGET.lon + (Math.random() - 0.5) * 180 * jitter;
  introCoord.textContent = `${lat.toFixed(4)}° N   ${lon.toFixed(4)}° E`;

  let label = PHASES[0][1];
  for (const [at, text] of PHASES) if (t >= at / PACE) label = text;
  if (introPhase.textContent !== label) introPhase.textContent = label;

  telemetry = requestAnimationFrame(tickTelemetry);
}

if (!live) telemetry = requestAnimationFrame(tickTelemetry);

// Safety net: never leave the hero copy hidden if a frame is dropped.
setTimeout(handoff, 7000);

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
    globe?.setScrollFade(1 - p * 0.82);
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
  window.open(`https://wa.me/966533778433?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
});

applyTheme(storedTheme() || clockTheme());
