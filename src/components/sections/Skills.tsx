'use client';
import { useEffect, useMemo, useRef } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import { skills } from '@/lib/data';

const categories = ['Hardware & HDL', 'Programming', 'Tools & Platforms', 'Web & UI', 'Concepts'];
const colors = ['#e1b65f', '#72c7df', '#78c59a', '#e7ddc5', '#cc91ba'];
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

type Rotation = { x: number; y: number; z: number };
type DragState = { x: number; y: number; rotation: Rotation };

export default function Skills() {
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rotation = useRef<Rotation>({ x: -0.12, y: 0.2, z: 0 });
  const idleAxes = useRef<Rotation>({ ...rotation.current });
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef<DragState | null>(null);
  const dragTarget = useRef<Rotation>({ ...rotation.current });
  const stageSize = useRef(700);

  const items = useMemo(() => {
    const grouped = categories.flatMap((category, categoryIndex) =>
      (skills[category] ?? []).map(label => ({ label, category, color: colors[categoryIndex] }))
    );
    // Keep the even Fibonacci-sphere positions, but shuffle their assignment
    // deterministically so each category's color is spread across the globe.
    const positions = Array.from({ length: grouped.length }, (_, index) => index);
    let seed = 0x4d5a;
    for (let index = positions.length - 1; index > 0; index -= 1) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const swapIndex = seed % (index + 1);
      [positions[index], positions[swapIndex]] = [positions[swapIndex], positions[index]];
    }
    return grouped.map((item, index) => {
      const globeIndex = positions[index];
      const phi = Math.acos(1 - 2 * (globeIndex + 0.5) / grouped.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * globeIndex;
      return {
        ...item,
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
      };
    });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const layout = items.map((_, index) => {
      const node = labelRefs.current[index];
      return {
        x: 0, y: 0, depth: 0,
        width: node?.offsetWidth ?? 0,
        height: node?.offsetHeight ?? 0,
        shiftX: 0, shiftY: 0, targetX: 0, targetY: 0,
      };
    });

    const paintLabels = () => {
      const { x: rx, y: ry, z: rz } = rotation.current;
      const cy = Math.cos(ry), sy = Math.sin(ry);
      const cx = Math.cos(rx), sx = Math.sin(rx);
      const cz = Math.cos(rz), sz = Math.sin(rz);

      items.forEach((item, index) => {
        const point = layout[index];
        const yawX = item.x * cy - item.z * sy;
        const yawZ = item.x * sy + item.z * cy;
        const pitchY = item.y * cx - yawZ * sx;
        const pitchZ = item.y * sx + yawZ * cx;
        point.x = (yawX * cz - pitchY * sz) * stageSize.current * 0.4;
        point.y = (yawX * sz + pitchY * cz) * stageSize.current * 0.4;
        point.depth = (pitchZ + 1) / 2;
      });

      // Keep labels on the same visible hemisphere from colliding, while letting
      // the sphere itself stay a clean, continuous 3D motion.
      layout.forEach(point => { point.targetX = 0; point.targetY = 0; });
      for (let pass = 0; pass < 3; pass += 1) {
        for (let i = 0; i < layout.length; i += 1) {
          const a = layout[i];
          for (let j = i + 1; j < layout.length; j += 1) {
            const b = layout[j];
            if (Math.abs(a.depth - b.depth) > 0.52) continue;
            const dx = a.x + a.targetX - b.x - b.targetX;
            const dy = a.y + a.targetY - b.y - b.targetY;
            const overlapX = (a.width + b.width) / 2 + 10 - Math.abs(dx);
            const overlapY = (a.height + b.height) / 2 + 6 - Math.abs(dy);
            if (overlapX <= 0 || overlapY <= 0) continue;
            if (overlapX < overlapY) {
              const push = Math.min(overlapX * 0.45, 30) * (dx >= 0 ? 1 : -1);
              a.targetX += push;
              b.targetX -= push;
            } else {
              const push = Math.min(overlapY * 0.45, 24) * (dy >= 0 ? 1 : -1);
              a.targetY += push;
              b.targetY -= push;
            }
          }
        }
      }
      layout.forEach(point => {
        point.targetX = clamp(point.targetX, -48, 48);
        point.targetY = clamp(point.targetY, -36, 36);
      });

      items.forEach((item, index) => {
        const node = labelRefs.current[index];
        if (!node) return;
        const point = layout[index];
        const depth = point.depth;
        point.shiftX += (point.targetX - point.shiftX) * 0.12;
        point.shiftY += (point.targetY - point.shiftY) * 0.12;

        node.style.transform = `translate3d(${point.x + point.shiftX}px, ${point.y + point.shiftY}px, 0) translate(-50%, -50%) scale(${0.88 + depth * 0.14})`;
        node.style.opacity = `${0.54 + depth * 0.46}`;
        node.style.zIndex = `${Math.round(depth * 100)}`;
      });
    };

    const resize = () => {
      stageSize.current = stage.getBoundingClientRect().width;
      paintLabels();
    };

    paintLabels();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => resizeObserver.disconnect();
    }

    let visible = false;
    let frame = 0;
    let previous = 0;
    const animate = (time: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      const elapsed = previous ? Math.min(time - previous, 32) : 16;
      previous = time;

      if (!drag.current) {
        idleAxes.current.x += elapsed * 0.000008;
        idleAxes.current.y += elapsed * 0.000028;
        idleAxes.current.z += elapsed * 0.000005;
      } else {
        idleAxes.current = { ...dragTarget.current };
      }

      const target = drag.current
        ? dragTarget.current
        : {
            x: idleAxes.current.x - pointer.current.y * 0.28,
            y: idleAxes.current.y + pointer.current.x * 0.46,
            z: idleAxes.current.z + pointer.current.x * 0.025 - pointer.current.y * 0.018,
          };
      const ease = 1 - Math.exp(-elapsed * 0.0042);
      rotation.current = {
        x: rotation.current.x + (target.x - rotation.current.x) * ease,
        y: rotation.current.y + (target.y - rotation.current.y) * ease,
        z: rotation.current.z + (target.z - rotation.current.z) * ease,
      };
      paintLabels();
      frame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!frame && visible) {
        previous = 0;
        frame = window.requestAnimationFrame(animate);
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      }
    }, { threshold: 0.02 });

    const onPointerMove = (event: PointerEvent) => {
      if (drag.current || event.pointerType === 'touch') return;
      pointer.current = {
        x: clamp((event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2, -1, 1),
        y: clamp((event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2, -1, 1),
      };
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) pointer.current = { x: 0, y: 0 };
    };

    visibilityObserver.observe(stage);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerout', onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerout', onPointerLeave);
    };
  }, [items]);

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const current = { ...rotation.current };
    drag.current = { x: event.clientX, y: event.clientY, rotation: current };
    dragTarget.current = current;
    idleAxes.current = current;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    dragTarget.current = {
      x: clamp(drag.current.rotation.x + dy * 0.004, -1.15, 1.15),
      y: drag.current.rotation.y + dx * 0.004,
      z: drag.current.rotation.z + (dx - dy) * 0.001,
    };
  };

  const endDrag = () => {
    if (drag.current) idleAxes.current = { ...dragTarget.current };
    drag.current = null;
  };

  return (
    <section id="skills" className="relative circuit-bg" aria-label="Skills and technologies">
      <div className="section-wrapper relative">
        <SectionNumber number="02" />
        <div className="mb-12 relative z-10">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>What I Work With</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Skills &amp; Technologies</h2>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>Move anywhere on screen or drag the field to explore the engineering toolkit.</p>
        </div>

        <div
          ref={stageRef}
          className="skill-orbit-stage"
          data-scroll-reveal
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          role="group"
          aria-label="Draggable spherical map of skills"
        >
          <div className="skill-orbit-labels">
            {items.map((item, index) => (
              <span
                key={item.label}
                ref={node => { labelRefs.current[index] = node; }}
                className="skill-orbit-label"
        style={{ left: '50%', top: '50%', opacity: 0, color: item.color }}
              >
                {item.label}
              </span>
            ))}
          </div>
          <span className="skill-orbit-hint" aria-hidden="true">↔ DRAG / MOVE POINTER</span>
        </div>

        <div className="skill-key" aria-label="Skill categories">
          {categories.map((category, i) => <span key={category}><i style={{ background: colors[i] }} />{category}</span>)}
        </div>
      </div>
    </section>
  );
}
