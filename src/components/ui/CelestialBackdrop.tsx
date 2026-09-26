'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import * as THREE from 'three';

type Star = { x: number; y: number; r: number; delay: number; duration: number };
type ShootingStar = { x: number; y: number; length: number; travelX: number; travelY: number; delay: number; duration: number };

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

// Ten stars is an 11% increase over the previous nine. Each one travels along
// one forward-only path and stays invisible for the rest of its cycle.
const SHOOTING_STARS: ShootingStar[] = Array.from({ length: 10 }, (_, index) => {
  const duration = 17 + random() * 12;
  return {
    x: index === 0 ? 66 : 8 + random() * 81,
    y: index === 0 ? 20 : 7 + random() * 82,
    length: 260 + random() * 180,
    travelX: 340 + random() * 210,
    travelY: 140 + random() * 120,
    delay: index === 0 ? -duration * 0.04 : -random() * duration,
    duration,
  };
});

export default function CelestialBackdrop() {
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = moonRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let previousScrollY = window.scrollY;
    let targetYaw = 0;
    let targetPitch = 0;
    let currentYaw = 0;
    let currentPitch = 0;
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
    const animate = () => {
      frame = 0;
      currentYaw += (targetYaw - currentYaw) * 0.085;
      currentPitch += (targetPitch - currentPitch) * 0.085;
      moon.rotation.set(currentPitch, currentYaw, currentPitch * -0.22);
      render();
      if (Math.abs(targetYaw - currentYaw) > 0.00015 || Math.abs(targetPitch - currentPitch) > 0.00015) {
        frame = window.requestAnimationFrame(animate);
      }
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
        targetYaw += delta * 0.00125;
        targetPitch += delta * 0.000075;
        queueMotionFrame();
      }
      previousScrollY = scrollY;
    }
    function onVisibilityChange() {
      if (document.visibilityState === 'hidden' && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        queueMotionFrame();
      }
    }
    function onMotionPreferenceChange() {
      if (reducedMotion.matches && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        currentYaw = targetYaw;
        currentPitch = targetPitch;
        moon.rotation.set(currentPitch, currentYaw, currentPitch * -0.22);
        render();
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

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
      {SHOOTING_STARS.map((star, index) => (
        <i
          key={index}
          className="celestial-shooting-star"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.length, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s`, '--shot-x': `${star.travelX}px`, '--shot-y': `${star.travelY}px` } as CSSProperties}
        />
      ))}
      <div className="moon-corner">
        <div ref={moonRef} className="moon-scene" />
      </div>
    </div>
  );
}
