// Fingerprint generation.
//
// Real ridges are level sets of one smooth field, which is why they stay
// parallel and evenly spaced and never cross. Stacking hand-drawn arcs cannot
// reproduce that — it reads as scattered debris. So the print here is contoured
// out of a scalar field with marching squares.
//
// The field is Re(sqrt(z)) about the core: its level sets are confocal
// parabolas, which is exactly the nested loop of a real fingerprint core.

const DEG = Math.PI / 180;

/** Even-odd point-in-polygon over a set of rings, in lon/lat. */
function inRings(lon, lat, rings) {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
        inside = !inside;
      }
    }
  }
  return inside;
}

/** One marching-squares pass; returns loose segments for a single level. */
function marchLevel(level, NX, NY, x0, y0, dx, dy, F, ok) {
  const segs = [];
  for (let j = 0; j < NY - 1; j++) {
    for (let i = 0; i < NX - 1; i++) {
      const a = j * NX + i;
      const b = a + 1;
      const c = a + NX + 1;
      const d = a + NX;
      // Skip any cell touching the outside, so ridges stop at the border.
      if (!ok[a] || !ok[b] || !ok[c] || !ok[d]) continue;

      const f00 = F[a], f10 = F[b], f11 = F[c], f01 = F[d];
      let idx = 0;
      if (f00 > level) idx |= 1;
      if (f10 > level) idx |= 2;
      if (f11 > level) idx |= 4;
      if (f01 > level) idx |= 8;
      if (idx === 0 || idx === 15) continue;

      const X = x0 + i * dx;
      const Y = y0 + j * dy;
      const t = (p, q) => (level - p) / (q - p);
      const bottom = () => [X + dx * t(f00, f10), Y];
      const right = () => [X + dx, Y + dy * t(f10, f11)];
      const top = () => [X + dx * t(f01, f11), Y + dy];
      const left = () => [X, Y + dy * t(f00, f01)];

      const table = {
        1: [left, bottom], 2: [bottom, right], 3: [left, right],
        4: [right, top], 5: [left, top, bottom, right], 6: [bottom, top],
        7: [left, top], 8: [top, left], 9: [top, bottom],
        10: [bottom, left, top, right], 11: [top, right], 12: [right, left],
        13: [right, bottom], 14: [bottom, left],
      };
      const e = table[idx];
      for (let k = 0; k < e.length; k += 2) segs.push([e[k](), e[k + 1]()]);
    }
  }
  return segs;
}

/** Weld loose segments into continuous polylines so each ridge draws as one stroke. */
function chain(segs, tol) {
  const key = (p) => `${Math.round(p[0] / tol)},${Math.round(p[1] / tol)}`;
  const ends = new Map();
  for (const s of segs) {
    for (const k of [key(s[0]), key(s[1])]) {
      if (!ends.has(k)) ends.set(k, []);
      ends.get(k).push(s);
    }
  }

  const used = new Set();
  const lines = [];

  const walk = (seg, fromKey) => {
    const pts = [];
    let cur = seg;
    let k = fromKey;
    while (cur && !used.has(cur)) {
      used.add(cur);
      const a = key(cur[0]);
      const nextPt = a === k ? cur[1] : cur[0];
      pts.push(nextPt);
      k = key(nextPt);
      cur = (ends.get(k) || []).find((s) => !used.has(s));
    }
    return pts;
  };

  for (const s of segs) {
    if (used.has(s)) continue;
    const fwd = walk(s, key(s[0]));
    used.delete(s);
    used.add(s);
    const back = walk(s, key(s[1]));
    const pts = back.reverse().concat(fwd);
    if (pts.length > 4) lines.push(pts);
  }
  return lines;
}

/**
 * Build the print.
 * @returns {Array<Array<[number,number]>>} polylines in [lon, lat]
 */
export function buildFingerprint({ center, bounds, rings, count = 40, rotation = -0.35 }) {
  const latScale = 1 / Math.cos(center[1] * DEG);

  // Field in locally equal-ish degrees about the core.
  //
  // psi = |z| + B*Im(z). Its level sets are conics sharing a focus at the core:
  // at B < 1 they are nested ellipses, elongated away from the offset axis.
  // That is a loop core — closed ovals tight at the centre, opening as they go
  // out — and unlike a parabola field it fills the whole shape evenly.
  const B = 0.74;
  const psi = (lon, lat) => {
    const u = (lon - center[0]) / latScale;
    const v = lat - center[1];
    const ru = u * Math.cos(rotation) - v * Math.sin(rotation);
    const rv = u * Math.sin(rotation) + v * Math.cos(rotation);
    // Gentle warp: organic without breaking the ridges' parallelism.
    const wu = ru + 0.62 * Math.sin(rv * 0.36 + 0.7) + 0.22 * Math.sin(rv * 0.9);
    const wv = rv + 0.5 * Math.sin(ru * 0.3) + 0.18 * Math.sin(ru * 0.78 + 1.3);
    return Math.hypot(wu, wv * 0.94) + B * wv;
  };

  // Grid over the country, with a small margin.
  const m = 0.4;
  const x0 = bounds[0] - m, y0 = bounds[1] - m;
  const x1 = bounds[2] + m, y1 = bounds[3] + m;
  const NX = 420;
  const NY = Math.round((NX * (y1 - y0)) / (x1 - x0));
  const dx = (x1 - x0) / (NX - 1);
  const dy = (y1 - y0) / (NY - 1);

  const F = new Float32Array(NX * NY);
  const ok = new Uint8Array(NX * NY);
  let hi = -Infinity;
  let lo = Infinity;
  for (let j = 0; j < NY; j++) {
    for (let i = 0; i < NX; i++) {
      const lon = x0 + i * dx;
      const lat = y0 + j * dy;
      const p = psi(lon, lat);
      F[j * NX + i] = p;
      const inside = inRings(lon, lat, rings) ? 1 : 0;
      ok[j * NX + i] = inside;
      // Range is measured inside the border only, so the ridge count is
      // spent on the country rather than on sea the print never reaches.
      if (inside) {
        if (p > hi) hi = p;
        if (p < lo) lo = p;
      }
    }
  }

  // psi is near-linear in distance, so evenly spaced levels give evenly
  // spaced ridges — which is what a real print does.
  const out = [];
  const tol = Math.min(dx, dy) * 0.5;
  for (let n = 1; n <= count; n++) {
    const level = lo + ((hi - lo) * n) / (count + 1);
    const segs = marchLevel(level, NX, NY, x0, y0, dx, dy, F, ok);
    if (!segs.length) continue;
    for (const line of chain(segs, tol)) {
      // Ridge endings: a print is not a contour map, so a few strokes stop
      // short. Deterministic, so the print is the same on every load.
      const h = Math.abs(Math.sin(n * 78.233 + line.length * 12.9898) * 43758.5453) % 1;
      if (line.length > 40 && h > 0.62) {
        const c = Math.floor(line.length * (0.25 + 0.45 * ((h * 7) % 1)));
        const g = Math.max(4, Math.round(line.length * 0.06));
        out.push(line.slice(0, Math.max(4, c - g)));
        out.push(line.slice(Math.min(line.length - 4, c + g)));
      } else {
        out.push(line);
      }
    }
  }
  return out.filter((l) => l.length > 4);
}
