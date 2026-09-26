'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

export default function LoaderGradient() {
  return (
    <div className="loader-gradient" aria-hidden="true">
      <ShaderGradientCanvas
        className="loader-gradient-canvas"
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={45}
        lazyLoad={false}
        pointerEvents="none"
        powerPreference="low-power"
      >
        <ShaderGradient
          control="props"
          type="plane"
          shader="defaults"
          animate="on"
          uSpeed={0.16}
          uStrength={1.55}
          uDensity={1.15}
          uFrequency={1.6}
          uAmplitude={1.2}
          color1="#4a4944"
          color2="#806b49"
          color3="#11110f"
          brightness={0.82}
          grain="on"
          grainBlending={0.04}
          cDistance={3.8}
          cPolarAngle={90}
        />
      </ShaderGradientCanvas>
      <div className="loader-gradient-wash" />
      <div className="loader-gradient-grain" />
    </div>
  );
}
