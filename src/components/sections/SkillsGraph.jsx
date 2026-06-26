'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { skillCategories } from '@/data/content';
import styles from './SkillsGraph.module.css';

/* ── Layout (SVG viewBox units; the SVG scales to its container) ─────────── */
const VW = 1000;
const VH = 660;
const CX = VW / 2;
const CY = VH / 2;
const R_CAT_X = 290; // wide elliptical ring → fills horizontal space
const R_CAT_Y = 160;
const R_SKILL = 110;
const CENTER_ACCENT = '#7c83ff';

// Collision radii per node type — nodes are kept this far apart (+ PAD).
const RADIUS = { center: 76, category: 24, skill: 18 };
const PAD = 15;

/* Deterministic RNG so initial positions match between SSR and client. */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Centre "Skills" node: rounded-square size (also drives its collision radius)
const CENTER_SIZE = 104;
const CENTER_RADIUS_CORNER = 26;

/** Build the node + link graph from the skill categories. */
function buildGraph() {
  const nodes = [{ id: 'skills', label: 'Skills', type: 'center', accent: CENTER_ACCENT }];
  const links = [];
  const rand = mulberry32(20260626);

  skillCategories.forEach((cat, ci) => {
    const angle = -Math.PI / 2 + (ci / skillCategories.length) * Math.PI * 2;
    const catIndex = nodes.length;
    const cx = CX + Math.cos(angle) * R_CAT_X + (rand() - 0.5) * 24;
    const cy = CY + Math.sin(angle) * R_CAT_Y + (rand() - 0.5) * 24;
    nodes.push({ id: cat.label, label: cat.label, type: 'category', accent: cat.accent, x: cx, y: cy });
    links.push({ s: 0, t: catIndex, accent: cat.accent, len: Math.hypot(R_CAT_X, R_CAT_Y) * 0.6, k: 0.03 });

    const m = cat.skills.length;
    cat.skills.forEach((s, si) => {
      const sa = angle + (si - (m - 1) / 2) * 0.5;
      nodes.push({
        id: `${cat.label}/${s.name}`,
        label: s.name,
        type: 'skill',
        accent: cat.accent,
        icon: s.icon,
        x: cx + Math.cos(sa) * R_SKILL + (rand() - 0.5) * 20,
        y: cy + Math.sin(sa) * R_SKILL + (rand() - 0.5) * 20,
      });
      links.push({ s: catIndex, t: nodes.length - 1, accent: cat.accent, len: R_SKILL, k: 0.045 });
    });
  });

  return { nodes, links };
}

/** One force-directed step + hard collision resolution, mutating P in place. */
function step(P, nodes, links, radii, alpha, fixed) {
  const n = nodes.length;
  const fx = new Float64Array(n);
  const fy = new Float64Array(n);

  // Repulsion between every pair
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const dx = P.x[i] - P.x[j];
      const dy = P.y[i] - P.y[j];
      const d2 = dx * dx + dy * dy || 0.01;
      const d = Math.sqrt(d2);
      const rep = 1800 / d2;
      const ux = dx / d;
      const uy = dy / d;
      fx[i] += ux * rep;
      fy[i] += uy * rep;
      fx[j] -= ux * rep;
      fy[j] -= uy * rep;
    }
  }

  // Spring along links
  for (const l of links) {
    const dx = P.x[l.t] - P.x[l.s];
    const dy = P.y[l.t] - P.y[l.s];
    const d = Math.hypot(dx, dy) || 0.01;
    const force = (d - l.len) * l.k;
    const ux = dx / d;
    const uy = dy / d;
    fx[l.s] += ux * force;
    fy[l.s] += uy * force;
    fx[l.t] -= ux * force;
    fy[l.t] -= uy * force;
  }

  // Gentle gravity toward centre keeps the cluster framed
  for (let i = 0; i < n; i += 1) {
    fx[i] += (CX - P.x[i]) * 0.004;
    fy[i] += (CY - P.y[i]) * 0.004;
  }

  // Integrate (centre node + dragged node are pinned)
  for (let i = 0; i < n; i += 1) {
    if (i === 0 || i === fixed) continue;
    P.vx[i] = (P.vx[i] + fx[i] * alpha) * 0.82;
    P.vy[i] = (P.vy[i] + fy[i] * alpha) * 0.82;
    P.vx[i] = Math.max(-40, Math.min(40, P.vx[i]));
    P.vy[i] = Math.max(-40, Math.min(40, P.vy[i]));
    P.x[i] += P.vx[i];
    P.y[i] += P.vy[i];
  }

  // Hard collision resolution — guarantees nodes never touch
  for (let pass = 0; pass < 3; pass += 1) {
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const dx = P.x[j] - P.x[i];
        const dy = P.y[j] - P.y[i];
        const d = Math.hypot(dx, dy) || 0.01;
        const min = radii[i] + radii[j] + PAD;
        if (d >= min) continue;
        const overlap = min - d;
        const nx = dx / d;
        const ny = dy / d;
        const iPin = i === 0 || i === fixed;
        const jPin = j === 0 || j === fixed;
        if (iPin && jPin) continue;
        if (iPin) {
          P.x[j] += nx * overlap;
          P.y[j] += ny * overlap;
        } else if (jPin) {
          P.x[i] -= nx * overlap;
          P.y[i] -= ny * overlap;
        } else {
          P.x[i] -= (nx * overlap) / 2;
          P.y[i] -= (ny * overlap) / 2;
          P.x[j] += (nx * overlap) / 2;
          P.y[j] += (ny * overlap) / 2;
        }
      }
    }
  }

  // Keep everything inside the viewBox
  for (let i = 1; i < n; i += 1) {
    P.x[i] = Math.max(radii[i] + 6, Math.min(VW - radii[i] - 6, P.x[i]));
    P.y[i] = Math.max(radii[i] + 6, Math.min(VH - radii[i] - 6, P.y[i]));
  }
}

export default function SkillsGraph() {
  const { nodes, links } = useMemo(buildGraph, []);
  const radii = useMemo(
    () => Float64Array.from(nodes, (nd) => RADIUS[nd.type]),
    [nodes],
  );
  const svgRef = useRef(null);
  const posRef = useRef(null);
  const rafRef = useRef(0);
  const alphaRef = useRef(0);
  const dragRef = useRef(-1);
  const [, setVersion] = useState(0);
  const [hover, setHover] = useState(null);

  // Initialise positions + relax once (deterministic, SSR-safe seed)
  if (posRef.current === null) {
    const n = nodes.length;
    const P = {
      x: new Float64Array(n),
      y: new Float64Array(n),
      vx: new Float64Array(n),
      vy: new Float64Array(n),
    };
    nodes.forEach((nd, i) => {
      P.x[i] = nd.x ?? CX;
      P.y[i] = nd.y ?? CY;
    });
    P.x[0] = CX;
    P.y[0] = CY;
    for (let it = 0; it < 320; it += 1) step(P, nodes, links, radii, 1, -1);
    posRef.current = P;
  }

  // Neighbour map for hover highlighting
  const neighbours = useMemo(() => {
    const map = nodes.map(() => new Set());
    links.forEach((l) => {
      map[l.s].add(l.t);
      map[l.t].add(l.s);
    });
    return map;
  }, [nodes, links]);

  const runLoop = () => {
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      step(posRef.current, nodes, links, radii, alphaRef.current, dragRef.current);
      alphaRef.current *= 0.94;
      setVersion((v) => v + 1);
      if (alphaRef.current > 0.01 || dragRef.current >= 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const reheat = (a = 0.5) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVersion((v) => v + 1);
      return;
    }
    alphaRef.current = Math.max(alphaRef.current, a);
    runLoop();
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ── Drag handling (pointer → SVG coords via the screen CTM) ──────────────
  const toSvg = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    return p;
  };

  const onNodeDown = (i) => (e) => {
    if (i === 0) return; // centre stays put
    e.preventDefault();
    dragRef.current = i;
    setVersion((v) => v + 1);
  };

  useEffect(() => {
    const move = (e) => {
      if (dragRef.current < 0) return;
      const p = toSvg(e);
      const P = posRef.current;
      const i = dragRef.current;
      P.x[i] = Math.max(40, Math.min(VW - 40, p.x));
      P.y[i] = Math.max(40, Math.min(VH - 40, p.y));
      P.vx[i] = 0;
      P.vy[i] = 0;
      reheat(0.3);
    };
    const up = () => {
      if (dragRef.current < 0) return;
      dragRef.current = -1;
      reheat(0.2);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const P = posRef.current;
  const active = hover != null;
  const isLit = (i) => !active || i === hover || neighbours[hover].has(i);

  return (
    <div className={styles.wrap}>
      <svg
        ref={svgRef}
        className={styles.svg}
        viewBox={`0 0 ${VW} ${VH}`}
        role="img"
        aria-label="Skills knowledge graph with Skills at the centre"
      >
        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#7c83ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4a3fd6" stopOpacity="0.12" />
          </radialGradient>
          <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c2c5ff" />
            <stop offset="100%" stopColor="#6a6fe6" />
          </linearGradient>
          <filter id="bubbleGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#7c83ff" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Links */}
        <g>
          {links.map((l, idx) => {
            const lit = !active || l.s === hover || l.t === hover;
            return (
              <line
                key={idx}
                x1={P.x[l.s]}
                y1={P.y[l.s]}
                x2={P.x[l.t]}
                y2={P.y[l.t]}
                stroke={lit ? l.accent : 'rgba(255,255,255,0.10)'}
                strokeWidth={lit && active ? 1.6 : 1}
                strokeOpacity={lit ? (active ? 0.9 : 0.3) : 0.06}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((nd, i) => {
            const lit = isLit(i);
            const x = P.x[i];
            const y = P.y[i];

            if (nd.type === 'center') {
              return (
                <g key={nd.id} opacity={lit ? 1 : 0.3}>
                  <rect
                    x={x - CENTER_SIZE / 2}
                    y={y - CENTER_SIZE / 2}
                    width={CENTER_SIZE}
                    height={CENTER_SIZE}
                    rx={CENTER_RADIUS_CORNER}
                    ry={CENTER_RADIUS_CORNER}
                    fill="url(#centerGrad)"
                    stroke="url(#frameGrad)"
                    strokeWidth="2.5"
                    filter="url(#bubbleGlow)"
                  />
                  <text x={x} y={y} className={styles.centerLabel} textAnchor="middle" dy="0.35em">
                    Skills
                  </text>
                </g>
              );
            }

            if (nd.type === 'category') {
              return (
                <g
                  key={nd.id}
                  className={styles.node}
                  opacity={lit ? 1 : 0.28}
                  onPointerDown={onNodeDown(i)}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                >
                  <circle cx={x} cy={y} r={22} fill={`${nd.accent}33`} stroke={nd.accent} strokeWidth="1.6" />
                  <circle cx={x} cy={y} r={6} fill={nd.accent} />
                  <text x={x} y={y + 38} className={styles.catLabel} textAnchor="middle">
                    {nd.label}
                  </text>
                </g>
              );
            }

            // skill
            const showLabel = active && lit;
            return (
              <g
                key={nd.id}
                className={styles.node}
                opacity={lit ? 1 : 0.2}
                onPointerDown={onNodeDown(i)}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
              >
                <circle cx={x} cy={y} r={17} fill="rgba(255,255,255,0.06)" stroke={nd.accent} strokeWidth="1.2" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <image href={nd.icon} x={x - 10} y={y - 10} width={20} height={20} preserveAspectRatio="xMidYMid meet" />
                {showLabel && (
                  <text x={x} y={y + 30} className={styles.skillLabel} textAnchor="middle">
                    {nd.label}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
      <p className={styles.hint}>Hover a node to trace its branch · drag to rearrange</p>
    </div>
  );
}
