'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import * as THREE from 'three';

type Star = { x: number; y: number; r: number; delay: number; duration: number };
type ShootingStar = { x: number; y: number; length: number; travelX: number; travelY: number; angle: number; delay: number; duration: number };

// Single source of truth for shooting-star paths. Each star gets its own
// randomized entry point and angle within this narrow, down-right direction.
const SHOOTING_STAR_PATH_RULES = {
  entriesPerSide: 3,
  angleMargin: 5,
  minAngle: 1,
  maxAngle: 89,
  offscreenPadding: 350,
  entryInset: 0.06,
  entrySpread: 0.88,
} as const;

let seed = 90417;
const random = () => {
  seed = (seed * 48271) % 2147483647;
  return seed / 2147483647;
};

const STARS: Star[] = Array.from({ length: 70 }, () => ({
  x: 2 + random() * 96,
  y: 3 + random() * 94,
  r: 0.55 + random() * 1.25,
  delay: -random() * 8,
  duration: 3.4 + random() * 5.2,
}));

// Each streak begins beyond the viewport and follows one measured straight path.
function createShootingStars(width: number, height: number): ShootingStar[] {
  // Vary individual paths while keeping them aimed down-right within five
  // degrees of the viewport diagonal.
  const diagonal = Math.atan2(height, width) * 180 / Math.PI;
  const entrySides = Array.from(
    { length: SHOOTING_STAR_PATH_RULES.entriesPerSide * 2 },
    (_, index) => index < SHOOTING_STAR_PATH_RULES.entriesPerSide,
  );
  // Shuffle a balanced pool so each screen gets the same number from the top
  // and the viewer's left, without assigning a fixed path to any star.
  for (let index = entrySides.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [entrySides[index], entrySides[swapIndex]] = [entrySides[swapIndex], entrySides[index]];
  }

  return entrySides.map((entersFromTop, index) => {
    // A triangular distribution makes near-diagonal paths more common while
    // still allowing the full +/- 5 degree range.
    const angleOffset = (random() + random() + random() - 1.5) * (SHOOTING_STAR_PATH_RULES.angleMargin / 1.5);
    const degrees = Math.max(
      SHOOTING_STAR_PATH_RULES.minAngle,
      Math.min(SHOOTING_STAR_PATH_RULES.maxAngle, diagonal + angleOffset),
    );
    const angle = degrees * Math.PI / 180;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const padding = SHOOTING_STAR_PATH_RULES.offscreenPadding;
    const startX = entersFromTop
      ? width * (SHOOTING_STAR_PATH_RULES.entryInset + random() * SHOOTING_STAR_PATH_RULES.entrySpread)
      : -padding;
    const startY = entersFromTop
      ? -padding
      : height * (SHOOTING_STAR_PATH_RULES.entryInset + random() * SHOOTING_STAR_PATH_RULES.entrySpread);
    const distanceToViewportExit = Math.min((width - startX) / dx, (height - startY) / dy);
    const distance = distanceToViewportExit + padding;
    const travelX = dx * distance;
    const travelY = dy * distance;

    return {
      x: startX,
      y: startY,
      length: (260 + (index % 4) * 42) * 0.94,
      travelX,
      travelY,
      // Derive trail alignment from the enforced travel vector itself.
      angle: Math.atan2(travelY, travelX) * 180 / Math.PI,
      delay: index * 5.5,
      duration: 17 + (index % 3) * 2,
    };
  });
}

export default function CelestialBackdrop() {
  const moonRef = useRef<HTMLDivElement>(null);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useLayoutEffect(() => {
    const updatePaths = () => setShootingStars(createShootingStars(window.innerWidth, window.innerHeight));
    updatePaths();
    window.addEventListener('resize', updatePaths, { passive: true });
    return () => window.removeEventListener('resize', updatePaths);
  }, []);

  useEffect(() => {
    const host = moonRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let previousScrollY = window.scrollY;
    let targetPitch = 0;
    let currentPitch = 0;
    let yaw = 0;
    let scrollBoost = 0;
    let previousFrameTime = 0;
    let lastDrawTime = 0;
    const idleRotationSpeed = 0.025;
    const minFrameInterval = window.matchMedia('(max-width: 700px)').matches ? 1000 / 30 : 1000 / 60;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.86;
    renderer.domElement.className = 'moon-disc';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 20);
    camera.position.z = 3.25;

    scene.add(new THREE.HemisphereLight(0xc7cbd0, 0x121312, 0.68));
    const sunlight = new THREE.DirectionalLight(0xf1eee7, 2.05);
    sunlight.position.set(-2.6, 1.5, 3.6);
    scene.add(sunlight);

    const geometry = new THREE.SphereGeometry(1, 128, 96);
    const material = new THREE.MeshStandardMaterial({
      color: 0xd0cec7,
      roughness: 1,
      metalness: 0,
    });
    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);

    const textureLoader = new THREE.TextureLoader();
    const colorMap = textureLoader.load('/textures/lroc_color_2k.jpg', (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      material.map = texture;
      material.needsUpdate = true;
      render();
    });
    const reliefMap = textureLoader.load('/textures/ldem_3_8bit.jpg', (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      material.displacementMap = texture;
      material.displacementScale = 0.022;
      material.displacementBias = -0.011;
      material.needsUpdate = true;
      render();
    });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const render = () => renderer.render(scene, camera);
    const animate = (time: number) => {
      frame = 0;
      const frameDelta = previousFrameTime ? Math.min((time - previousFrameTime) / 1000, 0.05) : 0;
      previousFrameTime = time;
      if (time - lastDrawTime >= minFrameInterval) {
        const drawDelta = lastDrawTime ? Math.min((time - lastDrawTime) / 1000, 0.1) : 0;
        yaw += (idleRotationSpeed + scrollBoost) * drawDelta;
        currentPitch += (targetPitch - currentPitch) * Math.min(1, drawDelta * 3.2);
        moon.rotation.set(currentPitch, yaw, currentPitch * -0.22);
        render();
        lastDrawTime = time;
      }
      scrollBoost *= Math.exp(-frameDelta * 2.3);
      if (scrollBoost < 0.008) scrollBoost = 0;
      if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate);
    };
    const queueMotionFrame = () => {
      if (!frame && !disposed && document.visibilityState === 'visible') {
        frame = window.requestAnimationFrame(animate);
      }
    };

    function onScroll() {
      const scrollY = window.scrollY;
      if (!reducedMotion.matches) {
        const delta = Math.max(-180, Math.min(180, scrollY - previousScrollY));
        scrollBoost = Math.min(0.82, scrollBoost + Math.abs(delta) * 0.0032);
        targetPitch += delta * 0.000075;
        queueMotionFrame();
      }
      previousScrollY = scrollY;
    }
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden' && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        previousFrameTime = 0;
        lastDrawTime = 0;
      } else {
        previousFrameTime = 0;
        lastDrawTime = 0;
        queueMotionFrame();
      }
    }
    function onMotionPreferenceChange() {
      if (reducedMotion.matches && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        currentPitch = targetPitch;
        moon.rotation.set(currentPitch, yaw, currentPitch * -0.22);
        render();
      } else {
        previousFrameTime = 0;
        lastDrawTime = 0;
        queueMotionFrame();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);
    queueMotionFrame();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
      resizeObserver.disconnect();
      colorMap.dispose();
      reliefMap.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="celestial-backdrop" aria-hidden="true">
      <div className="celestial-stars">
        {STARS.map((star, index) => (
          <i key={index} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.r * 2, height: star.r * 2, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }} />
        ))}
      </div>
      {shootingStars.map((star, index) => (
        <i
          key={index}
          className="celestial-shooting-star"
          style={{ left: star.x, top: star.y, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s`, '--shot-x': `${star.travelX}px`, '--shot-y': `${star.travelY}px`, '--trail-length': `${star.length}px`, '--shot-angle': `${star.angle}deg` } as CSSProperties}
        />
      ))}
      <div className="moon-corner">
        <div ref={moonRef} className="moon-scene" />
      </div>
    </div>
  );
}
