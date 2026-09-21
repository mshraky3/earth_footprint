"""Line-art of the office logo (fingerprint dome over two leaves) for section backdrops.
Writes public/images/logo-print.svg. Geometry follows public/logo.webp (1100x1132),
scaled into a 1200x1000 box."""
import math, random
random.seed(7)
W, H = 1200, 1000
S = 0.86                       # logo px -> svg px
OX, OY = (W - 1100 * S) / 2, 20
P = lambda x, y: (OX + x * S, OY + y * S)

def fmt(pts):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)

# ── leaves: base, tip, and bulge on each side (logo coords) ──
def leaf(base, tip, bulge_a, bulge_b):
    (bx, by), (tx, ty) = P(*base), P(*tip)
    a, b = P(*bulge_a), P(*bulge_b)
    return f"M{bx:.1f} {by:.1f} Q{a[0]:.1f} {a[1]:.1f} {tx:.1f} {ty:.1f} Q{b[0]:.1f} {b[1]:.1f} {bx:.1f} {by:.1f}Z"

left_leaf = leaf((470, 1060), (40, 380), (-60, 820), (560, 560))
right_leaf = leaf((640, 1085), (1080, 555), (600, 700), (1060, 1000))
# the notch cut into each leaf, as in the mark
left_vein = f"M{fmt([P(425,1020), P(245,665), P(488,985)])}"
right_vein = f"M{fmt([P(640,1050), P(845,770), P(690,1040)])}"

# ── ridges: nested domes about the core, broken like a real print ──
cx, cy = 555, 700
ridges = []
for i in range(13):
    r = 38 + i * 36
    a0, a1 = math.radians(200 - i * 1.2), math.radians(-20 + i * 1.2)
    n = 60
    ang = [a0 + (a1 - a0) * k / n for k in range(n + 1)]
    pts = [P(cx + r * 1.04 * math.cos(a), cy - r * math.sin(a)) for a in ang]
    L = sum(math.dist(pts[k], pts[k + 1]) for k in range(n))
    # one or two breaks per ridge, never in the same place twice
    dashes = []
    left = L
    for _ in range(random.choice((1, 2))):
        seg = random.uniform(0.25, 0.55) * left
        gap = random.uniform(14, 30)
        dashes += [seg, gap]; left -= seg + gap
    dashes.append(max(left, 1))
    ridges.append(f'<polyline points="{fmt(pts)}" stroke-dasharray="{" ".join(f"{d:.0f}" for d in dashes)} 999"/>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="#c8a464" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
<defs><mask id="m"><rect width="{W}" height="{H}" fill="#fff"/><path d="{left_leaf}" fill="#000" stroke="#000" stroke-width="26"/><path d="{right_leaf}" fill="#000" stroke="#000" stroke-width="26"/></mask></defs>
<g mask="url(#m)">{"".join(ridges)}</g>
<path d="{left_leaf}"/><path d="{right_leaf}"/>
<path d="{left_vein}"/><path d="{right_vein}"/>
</svg>'''
open("public/images/logo-print.svg", "w").write(svg)
print(len(svg))
