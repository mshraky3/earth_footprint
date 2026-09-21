import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LAND_DOTS, SAUDI_RINGS, NEIGHBOUR_RINGS, QASSIM, SAUDI_BOUNDS } from './geo-data.js';
import { buildFingerprint } from './print.js';

const DEG = Math.PI / 180;
const TAU = Math.PI * 2;
const R = 1;

const COL = {
  leaf: new THREE.Color('#52AC81'),
  moss: new THREE.Color('#2D5442'),
  sand: new THREE.Color('#C8A464'),
  bone: new THREE.Color('#EAF0E2'),
  core: new THREE.Color('#061711'),
};

// Per-theme colours. Dark is the original night-side planet; light turns it
// into a pale sage globe with dark land dots, so it still reads on off-white.
const PALETTE = {
  dark: {
    core: '#061711', rim: '#2D5442', dot: '#52AC81', dotHi: '#EAF0E2',
    outline: '#EAF0E2', glow: '#52AC81', ridge: '#C8A464', line: '#2D5442', halo: 0.85,
  },
  light: {
    core: '#E3EADF', rim: '#A9C4B2', dot: '#2F7A56', dotHi: '#16241C',
    outline: '#16241C', glow: '#52AC81', ridge: '#8A6A2E', line: '#8FA894', halo: 0.45,
  },
};

/* ── timeline (seconds) ───────────────────────────────────────── */
const T = {
  spinEnd: 3.2,       // globe decelerates onto the Kingdom
  dollyIn: [1.5, 4.0],
  outline: [3.05, 4.25],
  ridges: [3.8, 5.1],
  settle: [5.35, 6.95],
  handoff: 5.7,       // hero copy starts revealing
};
const TOTAL_TURNS = 2.6;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const span = (t, [a, b]) => clamp01((t - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Standard globe mapping: lon/lat → a point on the sphere. */
function llToVec3(lon, lat, r = R, out = new THREE.Vector3()) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  const s = Math.sin(phi);
  return out.set(-r * s * Math.cos(theta), r * Math.cos(phi), r * s * Math.sin(theta));
}

/** Rotation that brings a given lon/lat to face the camera dead-on. */
function facingRotation(lon, lat) {
  return { x: lat * DEG, y: Math.PI / 2 - (lon + 180) * DEG };
}

export function createGlobe(canvas, { onHandoff, pace = 1, theme = 'dark' } = {}) {
  // The opening sequence is the whole point of the page, so it always plays
  // on load — it used to auto-skip when the OS reported prefers-reduced-motion,
  // but on this client's own machine that setting is just "Show animations"
  // turned off in Windows, not a deliberate accessibility choice, and it was
  // silently eating the intro for a lot of ordinary visitors too. The skip
  // button and scroll/keydown skip-triggers below remain, so anyone who
  // wants out still has an immediate way.
  const reduced = false;

  // Capped at 1.5: the canvas covers the whole hero, and on 2x/3x screens the
  // extra fill-rate was a large share of the scroll jank for no visible gain.
  const DPR = Math.min(window.devicePixelRatio, 1.5);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(DPR);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
  camera.position.set(0, 0, 6.0);

  const globe = new THREE.Group();
  scene.add(globe);

  const target = facingRotation(QASSIM[0], QASSIM[1]);

  /* ── core body ─────────────────────────────────────────────── */
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(R * 0.988, 64, 48),
    new THREE.ShaderMaterial({
      uniforms: { uCore: { value: COL.core.clone() }, uRim: { value: COL.moss.clone() } },
      vertexShader: `
        varying vec3 vN;
        void main(){
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform vec3 uCore; uniform vec3 uRim; varying vec3 vN;
        void main(){
          float f = 1.0 - clamp(dot(vN, vec3(0.0,0.0,1.0)), 0.0, 1.0);
          vec3 c = mix(uCore, uRim, pow(f, 2.6) * 0.85);
          gl_FragColor = vec4(c, 1.0);
        }`,
    })
  );
  globe.add(core);

  /* ── land dots ─────────────────────────────────────────────── */
  const count = LAND_DOTS.length / 2;
  const pos = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  const near = new Float32Array(count); // proximity to the Kingdom, for the highlight
  const v = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    const lon = LAND_DOTS[i * 2];
    const lat = LAND_DOTS[i * 2 + 1];
    llToVec3(lon, lat, R, v);
    pos[i * 3] = v.x;
    pos[i * 3 + 1] = v.y;
    pos[i * 3 + 2] = v.z;
    rnd[i] = Math.random();
    const d = Math.hypot((lon - QASSIM[0]) * 0.9, lat - QASSIM[1]);
    near[i] = clamp01(1 - d / 16);
  }

  const dotGeo = new THREE.BufferGeometry();
  dotGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dotGeo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
  dotGeo.setAttribute('aNear', new THREE.BufferAttribute(near, 1));

  const dotMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uSize: { value: 165 },
      uMax: { value: 9.0 },
      uDpr: { value: DPR },
      uReveal: { value: 0 },
      uFocus: { value: 0 },
      uLeaf: { value: COL.leaf.clone() },
      uBone: { value: COL.bone.clone() },
    },
    vertexShader: `
      attribute float aRand; attribute float aNear;
      uniform float uSize, uMax, uDpr, uReveal, uFocus;
      varying float vFade; varying float vNear;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * position);
        float facing = clamp(dot(n, vec3(0.0,0.0,1.0)), 0.0, 1.0);
        float appear = smoothstep(aRand * 0.5, aRand * 0.5 + 0.5, uReveal);
        vNear = aNear;
        vFade = pow(facing, 0.85) * appear * (0.55 + 0.45 * aRand);
        vFade *= mix(1.0, 0.35 + 0.65 * aNear, uFocus);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = min(uSize * uDpr * (0.62 + 0.5 * aRand) / max(-mv.z, 0.05), uMax * uDpr);
      }`,
    fragmentShader: `
      uniform vec3 uLeaf; uniform vec3 uBone; uniform float uFocus;
      varying float vFade; varying float vNear;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.12, d) * vFade;
        vec3 c = mix(uLeaf, uBone, vNear * uFocus * 0.5);
        gl_FragColor = vec4(c, a);
      }`,
  });
  globe.add(new THREE.Points(dotGeo, dotMat));

  /* ── graticule: sells the spin before the dots resolve ──────── */
  const gratPts = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += 4) {
      gratPts.push(llToVec3(lon, lat, R * 1.001).toArray(), llToVec3(lon + 4, lat, R * 1.001).toArray());
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -86; lat < 86; lat += 4) {
      gratPts.push(llToVec3(lon, lat, R * 1.001).toArray(), llToVec3(lon, lat + 4, R * 1.001).toArray());
    }
  }
  const gratGeo = new THREE.BufferGeometry().setAttribute(
    'position',
    new THREE.Float32BufferAttribute(gratPts.flat(), 3)
  );
  const gratMat = new THREE.LineBasicMaterial({ color: COL.moss, transparent: true, opacity: 0 });
  globe.add(new THREE.LineSegments(gratGeo, gratMat));

  /* ── country outlines ──────────────────────────────────────── */
  const res = new THREE.Vector2(1, 1);

  function ringToLine(ring, radius, material) {
    const flat = [];
    for (const [lon, lat] of ring) {
      llToVec3(lon, lat, radius, v);
      flat.push(v.x, v.y, v.z);
    }
    const g = new LineGeometry();
    g.setPositions(flat);
    const line = new Line2(g, material);
    line.computeLineDistances();
    return { line, segments: ring.length - 1 };
  }

  const neighbourMat = new LineMaterial({
    color: COL.moss.getHex(),
    linewidth: 1.0,
    transparent: true,
    opacity: 0,
    resolution: res,
    depthWrite: false,
  });
  for (const ring of NEIGHBOUR_RINGS) globe.add(ringToLine(ring, R * 1.004, neighbourMat).line);

  const saudiMat = new LineMaterial({
    color: COL.bone.getHex(),
    linewidth: 2.4,
    transparent: true,
    opacity: 0,
    resolution: res,
    depthWrite: false,
  });
  const saudiGlowMat = new LineMaterial({
    color: COL.leaf.getHex(),
    linewidth: 7.0,
    transparent: true,
    opacity: 0,
    resolution: res,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const saudiLines = [];
  for (const ring of SAUDI_RINGS) {
    const a = ringToLine(ring, R * 1.006, saudiMat);
    const b = ringToLine(ring, R * 1.005, saudiGlowMat);
    globe.add(a.line, b.line);
    saudiLines.push(a, b);
  }

  /* ── the fingerprint over the Kingdom ──────────────────────── */
  // Concentric ridges opening at the base, echoing the mark in the logo.
  // The core sits on Al-Qassim, where the office actually is.
  const ridgeMat = new LineMaterial({
    color: COL.sand.getHex(),
    linewidth: 1.4, // thinner ridges leave visible gaps at globe scale
    transparent: true,
    opacity: 0,
    resolution: res,
    depthWrite: false,
  });
  const ridgeGlowMat = new LineMaterial({
    color: COL.sand.getHex(),
    linewidth: 5.0,
    transparent: true,
    opacity: 0,
    resolution: res,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  // A loop-pattern print: a nearly closed core, ridges opening progressively
  // wider toward the base — the dome the logo draws — with ridge endings so
  // the field reads as skin rather than as concentric rings.
  const ridges = [];

  function emit(pts, delay) {
    if (pts.length < 3) return;
    const flat = [];
    for (const [lon, lat] of pts) {
      llToVec3(lon, lat, R * 1.009, v);
      flat.push(v.x, v.y, v.z);
    }
    for (const mat of [ridgeGlowMat, ridgeMat]) {
      const g = new LineGeometry();
      g.setPositions(flat);
      const line = new Line2(g, mat);
      line.computeLineDistances();
      line.geometry.instanceCount = 0;
      globe.add(line);
      ridges.push({ line, segments: pts.length - 1, delay });
    }
  }

  {
    const lines = buildFingerprint({
      center: QASSIM,
      bounds: SAUDI_BOUNDS,
      rings: SAUDI_RINGS,
      count: 26, // fewer levels = wider gaps between ridges (was 40)
    });
    // Draw from the core outward: order by distance of the ridge from Qassim.
    const withDist = lines.map((pts) => {
      let best = Infinity;
      for (const [lon, lat] of pts) {
        const d = Math.hypot((lon - QASSIM[0]) * 0.9, lat - QASSIM[1]);
        if (d < best) best = d;
      }
      return { pts, d: best };
    });
    const far = Math.max(...withDist.map((x) => x.d)) || 1;
    for (const { pts, d } of withDist) emit(pts, Math.min(0.62, (d / far) * 0.62));
  }

  // Core marker on the office coordinates.
  const markerGeo = new THREE.BufferGeometry().setAttribute(
    'position',
    new THREE.Float32BufferAttribute(llToVec3(QASSIM[0], QASSIM[1], R * 1.012).toArray(), 3)
  );
  const markerMat = new THREE.PointsMaterial({
    color: COL.sand,
    size: 7,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  globe.add(new THREE.Points(markerGeo, markerMat));

  /* ── atmosphere ────────────────────────────────────────────── */
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.22, 48, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: COL.leaf.clone() }, uStrength: { value: 0.0 } },
      vertexShader: `
        varying vec3 vN;
        void main(){
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform vec3 uColor; uniform float uStrength; varying vec3 vN;
        void main(){
          float i = pow(0.68 - dot(vN, vec3(0.0,0.0,1.0)), 3.0);
          gl_FragColor = vec4(uColor, 1.0) * i * uStrength;
        }`,
    })
  );
  scene.add(halo);

  /* ── motes: depth without a generic starfield ──────────────── */
  const moteCount = 200;
  const motePos = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    const r = 3.2 + Math.random() * 6;
    const th = Math.random() * TAU;
    const ph = Math.acos(2 * Math.random() - 1);
    motePos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    motePos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    motePos[i * 3 + 2] = r * Math.cos(ph) - 2;
  }
  const motes = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(motePos, 3)),
    new THREE.PointsMaterial({
      color: COL.moss,
      size: 1.6,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    })
  );
  scene.add(motes);

  /* ── theme ───────────────────────────────────────────────── */
  let haloK = 0.85;
  function setTheme(name) {
    const c = PALETTE[name] || PALETTE.dark;
    core.material.uniforms.uCore.value.set(c.core);
    core.material.uniforms.uRim.value.set(c.rim);
    dotMat.uniforms.uLeaf.value.set(c.dot);
    dotMat.uniforms.uBone.value.set(c.dotHi);
    saudiMat.color.set(c.outline);
    saudiGlowMat.color.set(c.glow);
    ridgeMat.color.set(c.ridge);
    ridgeGlowMat.color.set(c.ridge);
    markerMat.color.set(c.ridge);
    neighbourMat.color.set(c.line);
    gratMat.color.set(c.line);
    motes.material.color.set(c.line);
    haloK = c.halo;
  }
  setTheme(theme);

  /* ── layout ────────────────────────────────────────────────── */
  let restX = -0.62;
  let restY = 0;
  let restZ = 2.95;

  const host = canvas.closest('.hero') || window;

  function resize() {
    const w = host === window ? window.innerWidth : host.clientWidth;
    const h = host === window ? window.innerHeight : host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    res.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    for (const m of [neighbourMat, saudiMat, saudiGlowMat, ridgeMat, ridgeGlowMat]) {
      m.resolution.copy(res);
    }

    // RTL: the copy sits right, so the planet rests left and clear of it.
    // The Kingdom sits on the sphere's near face, which perspective throws
    // further from centre than the silhouette — so the offset is solved for
    // that point, not for the globe's middle.
    const portrait = w / h < 0.85;
    const narrow = w < 1024;
    // Portrait phones need the globe pulled back or it fills the frame, and
    // dropped below the copy so the print stays visible instead of hiding
    // behind the headline.
    restZ = narrow ? (portrait ? 4.1 : 3.9) : 3.5;
    const halfW = (restZ - 1) * Math.tan((42 / 2) * DEG) * (w / h);
    const halfH = (restZ - 1) * Math.tan((42 / 2) * DEG);
    restX = narrow ? 0 : -0.3 * 2 * halfW;
    restY = portrait ? -0.34 * 2 * halfH : 0;
  }
  resize();
  window.addEventListener('resize', resize);
  if (host !== window && 'ResizeObserver' in window) {
    new ResizeObserver(resize).observe(host);
  }

  /* ── state ─────────────────────────────────────────────────── */
  // Dev affordance: ?t=3.9 freezes the sequence at that second so a single
  // phase can be inspected. No effect without the param.
  const freezeAt = Number(new URLSearchParams(location.search).get('t'));
  const frozen = Number.isFinite(freezeAt) && freezeAt > 0;

  let t = frozen ? freezeAt : 0;
  let handed = false;
  let scrollFade = 1;
  let pointer = { x: 0, y: 0 };
  let skipped = false;
  let onScreen = true;
  let rafId = 0;
  let lastOpacity = '';

  // The timeline runs on wall clock, not accumulated frame deltas. A tab that
  // loads in the background has its rAF throttled to ~1fps, and summing clamped
  // deltas there would crawl the whole sequence to a standstill.
  let startedAt = performance.now();
  let prevNow = startedAt;
  let offset = 0; // seconds skipped forward

  document.addEventListener('visibilitychange', () => {
    // Restart rather than resume: a viewer arriving from a background tab
    // should see the opening, not its aftermath.
    if (!document.hidden && !frozen && !skipped && t < T.settle[1]) {
      startedAt = performance.now();
      offset = 0;
    }
  });

  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function setScrollFade(v) {
    scrollFade = v;
  }

  function skip() {
    if (skipped) return;
    skipped = true;
    offset = Math.max(0, T.settle[1] - ((performance.now() - startedAt) / 1000) * pace);
    t = Math.max(t, T.settle[1]);
  }

  if (reduced && !frozen) skip();

  /* ── frame ─────────────────────────────────────────────────── */
  let lastDraw = 0;

  function frame(now) {
    // Once settled, the only motion is a slow sway and pointer parallax:
    // ~30fps is indistinguishable there and halves the GPU work competing
    // with page scrolling.
    if (t > T.settle[1] && now - lastDraw < 30) {
      rafId = onScreen ? requestAnimationFrame(frame) : 0;
      return;
    }
    lastDraw = now;

    const dt = Math.min((now - prevNow) / 1000, 0.05);
    prevNow = now;
    if (!frozen) t = ((now - startedAt) / 1000) * pace + offset;

    const spin = clamp01(t / T.spinEnd);
    const settle = span(t, T.settle);

    // Rotation: fast at first, decelerating onto the exact Qassim facing.
    const travelled = TOTAL_TURNS * TAU * easeOutCubic(spin);
    // A slow sway rather than an accumulating spin: the Kingdom and the
    // fingerprint stay facing the viewer for as long as the hero is on screen.
    const drift = t > T.spinEnd ? 0.085 * Math.sin((t - T.spinEnd) * 0.09) : 0;
    globe.rotation.y = target.y - TOTAL_TURNS * TAU + travelled + drift;
    globe.rotation.x = lerp(-0.42, target.x, easeInOutCubic(spin));

    // Camera falls toward the Kingdom, then eases back for the hero.
    const inT = easeInOutCubic(span(t, T.dollyIn));
    const zoomZ = lerp(6.0, 1.44, inT);
    camera.position.z = lerp(zoomZ, restZ, easeOutQuint(settle));
    globe.position.x = lerp(0, restX, easeOutQuint(settle));
    globe.position.y = lerp(0, restY, easeOutQuint(settle));

    // Parallax, only once the sequence has handed off. The camera keeps
    // looking down the axis so the globe's own offset actually reads.
    const pk = 0.06 * settle;
    camera.position.x = lerp(camera.position.x, pointer.x * pk, 0.05);
    camera.position.y = lerp(camera.position.y, -pointer.y * pk, 0.05);
    camera.lookAt(0, 0, 0);

    halo.position.copy(globe.position);

    // Reveals.
    dotMat.uniforms.uReveal.value = clamp01(t / 1.15);
    dotMat.uniforms.uFocus.value = span(t, [2.9, 4.4]) * (1 - 0.55 * settle);
    halo.material.uniforms.uStrength.value = clamp01(t / 1.4) * (haloK - 0.25 * inT) * scrollFade;
    gratMat.opacity = clamp01(t / 0.9) * 0.28 * (1 - span(t, [2.4, 3.6])) * scrollFade;
    motes.material.opacity = 0.5 * clamp01(t / 1.5) * scrollFade;
    motes.rotation.y += dt * 0.01;

    const nb = span(t, [3.0, 4.4]);
    neighbourMat.opacity = nb * 0.5 * scrollFade;

    // Kingdom outline draws itself.
    const ol = span(t, T.outline);
    saudiMat.opacity = clamp01(ol * 3) * scrollFade;
    saudiGlowMat.opacity = clamp01(ol * 3) * 0.3 * scrollFade;
    for (const { line, segments } of saudiLines) {
      line.geometry.instanceCount = Math.ceil(segments * easeOutCubic(ol));
    }

    // Ridges bloom out of Al-Qassim.
    const rd = span(t, T.ridges);
    ridgeMat.opacity = clamp01(rd * 4) * scrollFade;
    // The glow only accompanies the drawing-in; the settled print is plain
    // ridges, which reads cleaner against the country.
    const glowOut = 1 - span(t, [T.ridges[1], T.settle[1]]);
    ridgeGlowMat.opacity = clamp01(rd * 4) * 0.22 * glowOut * scrollFade;
    ridgeGlowMat.visible = ridgeGlowMat.opacity > 0.001;
    markerMat.opacity = span(t, [3.7, 4.4]) * (0.55 + 0.45 * Math.sin(t * 3)) * scrollFade;
    for (const { line, segments, delay } of ridges) {
      const p = clamp01((rd - delay) / (1 - delay || 1));
      line.geometry.instanceCount = Math.ceil(segments * easeOutCubic(p));
    }

    dotMat.uniforms.uSize.value = 165 * (0.85 + 0.15 * scrollFade);
    const op = String(scrollFade);
    if (op !== lastOpacity) {
      lastOpacity = op;
      canvas.style.opacity = op;
    }

    if (!handed && t >= T.handoff) {
      handed = true;
      onHandoff?.();
    }

    renderer.render(scene, camera);
    rafId = onScreen ? requestAnimationFrame(frame) : 0;
  }

  rafId = requestAnimationFrame(frame);

  // Once the hero has scrolled out of view the canvas is clipped away, so
  // there is nothing to draw: stop the loop instead of burning the GPU under
  // the rest of the page. The timeline runs on wall clock, so resuming is
  // seamless.
  if ('IntersectionObserver' in window && host !== window) {
    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen && !rafId) rafId = requestAnimationFrame(frame);
    }).observe(host);
  }

  if (import.meta.env?.DEV) {
    window.__globe = {
      get t() { return t; },
      get frozen() { return frozen; },
      get camZ() { return camera.position.z; },
    };
  }

  return { skip, setScrollFade, setTheme, handoffAt: T.handoff, isReduced: reduced };
}
