'use client';
import { useEffect, useRef } from 'react';

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 1;
    let rows = 1;
    const maxDistance = 130;
    const maxDistanceSquared = maxDistance * maxDistance;
    const particleCount = window.innerWidth < 768 ? 60 : 120;
    const mouse = { x: -9999, y: -9999 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let inView = false;
    let grid: number[][] = [];

    interface Particle { x: number; y: number; vx: number; vy: number; r: number }
    const particles: Particle[] = [];

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width;
      canvas!.height = height;
      columns = Math.max(1, Math.ceil(width / maxDistance));
      rows = Math.max(1, Math.ceil(height / maxDistance));
      grid = Array.from({ length: columns * rows }, () => []);
    }

    function initParticles() {
      particles.push(...Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      })));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const cell of grid) cell.length = 0;
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        const cellX = Math.max(0, Math.min(columns - 1, Math.floor(particle.x / maxDistance)));
        const cellY = Math.max(0, Math.min(rows - 1, Math.floor(particle.y / maxDistance)));
        grid[cellY * columns + cellX]?.push(index);

        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(225,218,204,0.68)';
        ctx!.fill();
      });

      particles.forEach((particle, index) => {
        const cellX = Math.max(0, Math.min(columns - 1, Math.floor(particle.x / maxDistance)));
        const cellY = Math.max(0, Math.min(rows - 1, Math.floor(particle.y / maxDistance)));
        for (let y = Math.max(0, cellY - 1); y <= Math.min(rows - 1, cellY + 1); y++) {
          for (let x = Math.max(0, cellX - 1); x <= Math.min(columns - 1, cellX + 1); x++) {
            const nearby = grid[y * columns + x];
            if (!nearby) continue;
            for (const otherIndex of nearby) {
              if (otherIndex <= index) continue;
              const other = particles[otherIndex];
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distanceSquared = dx * dx + dy * dy;
              if (distanceSquared >= maxDistanceSquared) continue;

              const distance = Math.sqrt(distanceSquared);
              ctx!.beginPath();
              ctx!.moveTo(particle.x, particle.y);
              ctx!.lineTo(other.x, other.y);
              ctx!.strokeStyle = `rgba(198,167,121,${(1 - distance / maxDistance) * 0.22})`;
              ctx!.lineWidth = 0.7;
              ctx!.stroke();
            }
          }
        }

        const mouseDx = particle.x - mouse.x;
        const mouseDy = particle.y - mouse.y;
        const mouseDistanceSquared = mouseDx * mouseDx + mouseDy * mouseDy;
        if (mouseDistanceSquared < 160 * 160) {
          const mouseDistance = Math.sqrt(mouseDistanceSquared);
          ctx!.beginPath();
          ctx!.moveTo(particle.x, particle.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.strokeStyle = `rgba(216,209,195,${(1 - mouseDistance / 160) * 0.3})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
      });
    }

    function schedule() {
      if (animationFrame || !inView || document.visibilityState !== 'visible' || reducedMotion.matches) return;
      animationFrame = window.requestAnimationFrame(tick);
    }
    function tick() {
      animationFrame = 0;
      if (!inView || document.visibilityState !== 'visible' || reducedMotion.matches) return;
      draw();
      schedule();
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else schedule();
    };
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else schedule();
    };

    resize();
    initParticles();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) schedule();
      else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });
    visibilityObserver.observe(canvas);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-canvas absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
