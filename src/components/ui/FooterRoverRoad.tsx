'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './FooterRoverRoad.module.css';

const ROAD_BASELINE = 32;
const ROAD_START = -90;
const ROAD_END_PADDING = 90;

/**
 * SUSPENSION BEHAVIOR PROFILE
 *
 * This is the tuning section for where and how the rover reacts to the road.
 * Each `crest` entry is tied to the matching bump in the SVG track. The path
 * progress is measured from the rendered path at runtime, so these reactions
 * stay locked to the actual bumps even when the footer changes width.
 *
 * Wheel contact is the fixed reference: tire bottoms stay on the road line.
 * `springScale` below 1 compresses the visible spring/shock; above 1 extends it
 * for rebound. `bodyLift` is in SVG units and `bodyPitch` is in degrees. A
 * negative lift raises the chassis away from the axle. The tuning deliberately
 * uses a playful, high-travel response while keeping each hit damped: impact,
 * rebound, then settle into the next bump instead of a continuous pogo motion.
 *
 * For a calmer ride, move springScale closer to 1, reduce bodyLift and
 * bodyPitch, and keep forearm values modest. Increase those values for a more
 * exaggerated comic bounce. Do not reorder rows: each row is one path keyframe.
 */
const SUSPENSION_BEHAVIOR = {
  travelRange: { gentleCompression: 0.82, currentPeakCompression: 0.72, currentPeakExtension: 1.25 },
  motionKeyframes: [
    // Entry / settle: neutral suspension, level chassis, relaxed arms.
    { phase: 'entry', roadProgress: 0, time: 0, roadOffset: 0, springScale: 1, bodyLift: 0, bodyPitch: 0, shoulder: -4, forearm: 2 },
    // Bump 1 at 12%: sharp but controlled impact; strongest compression.
    { phase: 'crest 1', roadProgress: 0.12, time: 0.14, roadOffset: 5, springScale: 0.72, bodyLift: -2.2, bodyPitch: -3.2, shoulder: -16, forearm: 21 },
    // Road dip 2 at 30%: shocks extend; chassis drops and arms counter-rotate.
    { phase: 'dip 2', roadProgress: 0.30, time: 0.36, roadOffset: -4, springScale: 1.25, bodyLift: 2.1, bodyPitch: 3.8, shoulder: 12, forearm: -18 },
    // Bump 3 at 48%: second compression, slightly less arm throw.
    { phase: 'crest 3', roadProgress: 0.48, time: 0.50, roadOffset: 6, springScale: 0.70, bodyLift: -2.5, bodyPitch: -4, shoulder: -15, forearm: 19 },
    // Road dip 4 at 66%: shocks extend with a slightly softer rebound.
    { phase: 'dip 4', roadProgress: 0.66, time: 0.72, roadOffset: -5, springScale: 1.24, bodyLift: 2.3, bodyPitch: 3.6, shoulder: 11, forearm: -17 },
    // Bump 5 at 84%: final compression, settling the chassis for exit.
    { phase: 'crest 5', roadProgress: 0.84, time: 0.86, roadOffset: 4, springScale: 0.76, bodyLift: -1.9, bodyPitch: -3, shoulder: -14, forearm: 18 },
    // Exit: damp back to neutral rather than snapping to the starting pose.
    { phase: 'exit settle', roadProgress: 1, time: 1, roadOffset: 0, springScale: 1, bodyLift: 0, bodyPitch: 0, shoulder: -4, forearm: 2 },
  ],
} as const;

const BUMP_POSITIONS = SUSPENSION_BEHAVIOR.motionKeyframes.slice(1, -1).map((frame) => frame.roadProgress);
const BUMP_HEIGHTS = SUSPENSION_BEHAVIOR.motionKeyframes.slice(1, -1).map((frame) => frame.roadOffset);
const MOTION_TIMES = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => frame.time);

// Raise the whole pace by 10% without flattening the segment-by-segment
// timing encoded in the road keyframes. Shorter duration = higher speed.
const ROVER_SPEED = {
  minimumSpeedIncrease: 1.1,
  previousDurationSeconds: 34.15,
  previousWheelDurationSeconds: 2.44,
};

const ROVER_BEHAVIOR = {
  duration: `${(ROVER_SPEED.previousDurationSeconds / ROVER_SPEED.minimumSpeedIncrease).toFixed(2)}s`,
  wheelDuration: `${(ROVER_SPEED.previousWheelDurationSeconds / ROVER_SPEED.minimumSpeedIncrease).toFixed(2)}s`,
  smokeDuration: '3.8s',
};

function buildRoadPath(width: number) {
  let path = `M ${ROAD_START} ${ROAD_BASELINE}`;
  const centers = BUMP_POSITIONS.map((position) => position * width);

  centers.forEach((center, index) => {
    const height = BUMP_HEIGHTS[index];
    path += ` H ${center - 28}`;
    path += ` C ${center - 14} ${ROAD_BASELINE}, ${center - 12} ${ROAD_BASELINE - height}, ${center} ${ROAD_BASELINE - height}`;
    path += ` C ${center + 12} ${ROAD_BASELINE - height}, ${center + 14} ${ROAD_BASELINE}, ${center + 28} ${ROAD_BASELINE}`;
  });

  path += ` H ${width + ROAD_END_PADDING}`;
  return { path, centers };
}

function getPathProgressAtX(path: SVGPathElement, totalLength: number, targetX: number) {
  let low = 0;
  let high = totalLength;

  // The road moves monotonically left-to-right. Binary search the rendered
  // path so arm jolts land on the exact same points as the wheel contact.
  for (let step = 0; step < 22; step += 1) {
    const middle = (low + high) / 2;
    if (path.getPointAtLength(middle).x < targetX) low = middle;
    else high = middle;
  }

  return ((low + high) / 2) / totalLength;
}

type SuspensionFrame = (typeof SUSPENSION_BEHAVIOR.motionKeyframes)[number];

function transformChassisPoint(x: number, y: number, frame: SuspensionFrame) {
  const radians = (frame.bodyPitch * Math.PI) / 180;
  const localX = x - 36;
  const localY = y - 24;

  return {
    x: 36 + localX * Math.cos(radians) - localY * Math.sin(radians),
    y: 24 + localX * Math.sin(radians) + localY * Math.cos(radians) + frame.bodyLift,
  };
}

function buildChassisMatrix(frame: SuspensionFrame) {
  const radians = (frame.bodyPitch * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const translateX = 36 - 36 * cos + 24 * sin;
  const translateY = 24 - 36 * sin - 24 * cos + frame.bodyLift;

  return [cos, sin, -sin, cos, translateX, translateY].map((value) => value.toFixed(5)).join(' ');
}

function buildCoilPath(frame: SuspensionFrame, mountX: number, wheelX: number) {
  const upper = transformChassisPoint(mountX, 26, frame);
  const lower = { x: wheelX, y: 35 };
  const turns = 7;
  const width = 1.9 * (1 + (1 - frame.springScale) * 0.25);
  const points = Array.from({ length: turns * 2 + 1 }, (_, index) => {
    const progress = index / (turns * 2);
    const offset = index === 0 || index === turns * 2 ? 0 : (index % 2 === 0 ? 1 : -1) * width;
    return {
      x: upper.x + (lower.x - upper.x) * progress + offset,
      y: upper.y + (lower.y - upper.y) * progress,
    };
  });

  return points.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
}

function buildDamperPath(frame: SuspensionFrame, mountX: number, wheelX: number) {
  const upper = transformChassisPoint(mountX, 26, frame);
  return `M${upper.x.toFixed(2)} ${upper.y.toFixed(2)} L${wheelX} 35`;
}

function buildControlArmPath(frame: SuspensionFrame, mountX: number, wheelX: number) {
  const chassisJoint = transformChassisPoint(mountX, 28, frame);
  return `M${wheelX} 34.4 L${chassisJoint.x.toFixed(2)} ${chassisJoint.y.toFixed(2)}`;
}

export default function FooterRoverRoad() {
  const laneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(1280);
  const [keyPoints, setKeyPoints] = useState('0;0.17;0.33;0.49;0.65;0.81;1');
  const road = useMemo(() => buildRoadPath(width), [width]);
  const keyTimes = MOTION_TIMES.join(';');

  useLayoutEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const updateWidth = () => setWidth(Math.max(320, Math.round(lane.clientWidth)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(lane);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const path = trackRef.current;
    if (!path) return;
    const totalLength = path.getTotalLength();
    if (!Number.isFinite(totalLength) || totalLength <= 0) return;

    const progress = road.centers.map((center) => getPathProgressAtX(path, totalLength, center));
    setKeyPoints([0, ...progress, 1].map((point) => point.toFixed(5)).join(';'));
  }, [road]);

  const shoulderAngles = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => frame.shoulder);
  const forearmAngles = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => frame.forearm);
  const leftArmAngles = shoulderAngles.map((angle) => `${angle} 23 17`).join(';');
  const rightArmAngles = shoulderAngles.map((angle) => `${-angle} 49 17`).join(';');
  const leftForearmAngles = forearmAngles.map((angle) => `${angle} 16 12`).join(';');
  const rightForearmAngles = forearmAngles.map((angle) => `${-angle} 56 12`).join(';');
  const chassisTransforms = SUSPENSION_BEHAVIOR.motionKeyframes.map(buildChassisMatrix).join(';');
  const leftCoilPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildCoilPath(frame, 25, 21));
  const rightCoilPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildCoilPath(frame, 47, 51));
  const leftDamperPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildDamperPath(frame, 25, 21));
  const rightDamperPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildDamperPath(frame, 47, 51));
  const leftControlArmPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildControlArmPath(frame, 25, 21));
  const rightControlArmPaths = SUSPENSION_BEHAVIOR.motionKeyframes.map((frame) => buildControlArmPath(frame, 47, 51));

  return (
    <div ref={laneRef} className={styles.lane} aria-hidden="true">
      <svg
        className={styles.scene}
        viewBox={`0 0 ${width} 64`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="footer-rover-road-gradient" x1="0" x2="1">
            <stop stopColor="#c6a779" stopOpacity=".12" />
            <stop offset=".5" stopColor="#d8c7a5" stopOpacity=".62" />
            <stop offset="1" stopColor="#c6a779" stopOpacity=".12" />
          </linearGradient>
          <radialGradient id="footer-rover-smoke-gradient">
            <stop stopColor="#d8d0c0" stopOpacity=".42" />
            <stop offset=".62" stopColor="#a9a398" stopOpacity=".2" />
            <stop offset="1" stopColor="#a9a398" stopOpacity="0" />
          </radialGradient>
          <filter id="footer-rover-smoke-blur" x="-95%" y="-110%" width="300%" height="320%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".14" numOctaves="3" seed="8" result="smoke-noise">
              <animate attributeName="baseFrequency" values=".12;.16;.12" dur={ROVER_BEHAVIOR.smokeDuration} repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="smoke-noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="soft-smoke" />
            <feGaussianBlur in="soft-smoke" stdDeviation=".72" />
          </filter>
        </defs>

        <path
          ref={trackRef}
          id="footer-rover-road-path"
          className={styles.track}
          d={road.path}
        />

        <g>
          <animateMotion
            dur={ROVER_BEHAVIOR.duration}
            repeatCount="indefinite"
            rotate="auto"
            calcMode="linear"
            keyPoints={keyPoints}
            keyTimes={keyTimes}
          >
            <mpath href="#footer-rover-road-path" />
          </animateMotion>

          <svg className={styles.rover} x="-56" y="-68" width="112" height="76" viewBox="0 0 72 46" fill="none">
            <g filter="url(#footer-rover-smoke-blur)">
              <ellipse cx="7" cy="23" rx="10" ry="6.2" fill="url(#footer-rover-smoke-gradient)" opacity=".66" />
              <ellipse cx="12" cy="21" rx="7.3" ry="5" fill="url(#footer-rover-smoke-gradient)" opacity=".58" />
              <path d="M17 24c.5-2.4-1.1-4.2-3.4-4.4-.2-3.1-3.9-4.5-6-2.1-3.4-1.1-6.3 1.8-5.1 4.8-2.2 2.5-.4 6.1 2.9 5.9 1.8 2.6 5.7 2 6.7-.8 2.7.3 4.4-1.2 4.9-3.4Z" fill="url(#footer-rover-smoke-gradient)" stroke="#d8d0c0" strokeOpacity=".2" strokeWidth=".55" />
              <path d="M12 18.8c-.4-2.5-3.5-3.4-5.1-1.5-2.5-.6-4.2 1.7-3.1 3.8-1.4 2.2.5 4.5 2.9 4.1 1.5 2 4.6 1.1 4.8-1.3 2-.9 2.2-3.8.5-5.1Z" fill="url(#footer-rover-smoke-gradient)" opacity=".72" />
              <path d="M7 17c1.2-2.7 4.2-3.4 6.1-1.9 2.8-.2 4.2 2.1 3.4 4.2m-12.2 6.6c1.8 1.8 4 2 5.6.8m-4.1-7.3c1.3-.8 2.6-.6 3.3.2" fill="none" stroke="#f0eadc" strokeOpacity=".23" strokeWidth=".65" strokeLinecap="round" />
              <path d="M16 19.8c-2.3-2.2-5-2.3-7-.8-1.3 1-1.8 2.1-1.6 3.5" stroke="#eee8da" strokeOpacity=".27" strokeWidth=".7" strokeLinecap="round" />
              <path d="M13.8 26.2c-2 1.8-4.2 2.1-6.1 1.1" stroke="#918b7e" strokeOpacity=".34" strokeWidth=".8" strokeLinecap="round" />
              <animate attributeName="opacity" values=".3;.78;.42;.68;.3" keyTimes="0;.22;.5;.76;1" dur={ROVER_BEHAVIOR.smokeDuration} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="translate" values="0 0;-4 -2;-11 -6;-17 -9;-11 -6;0 0" keyTimes="0;.16;.42;.68;.86;1" dur={ROVER_BEHAVIOR.smokeDuration} repeatCount="indefinite" />
            </g>

            {/* Suspension rods are morphed from the exact moving body mounts
                to fixed wheel hubs at every shared road keyframe. */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={leftControlArmPaths[0]} stroke="#49463f" strokeWidth="3.2">
                <animate attributeName="d" values={leftControlArmPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={rightControlArmPaths[0]} stroke="#49463f" strokeWidth="3.2">
                <animate attributeName="d" values={rightControlArmPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={leftDamperPaths[0]} stroke="#252622" strokeWidth="3.8">
                <animate attributeName="d" values={leftDamperPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={rightDamperPaths[0]} stroke="#252622" strokeWidth="3.8">
                <animate attributeName="d" values={rightDamperPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={leftDamperPaths[0]} stroke="#d3c6a9" strokeWidth="1.15">
                <animate attributeName="d" values={leftDamperPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={rightDamperPaths[0]} stroke="#d3c6a9" strokeWidth="1.15">
                <animate attributeName="d" values={rightDamperPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={leftCoilPaths[0]} stroke="#292820" strokeWidth="3.1">
                <animate attributeName="d" values={leftCoilPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={rightCoilPaths[0]} stroke="#292820" strokeWidth="3.1">
                <animate attributeName="d" values={rightCoilPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={leftCoilPaths[0]} stroke="#c6a779" strokeWidth="1.25">
                <animate attributeName="d" values={leftCoilPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <path d={rightCoilPaths[0]} stroke="#c6a779" strokeWidth="1.25">
                <animate attributeName="d" values={rightCoilPaths.join(';')} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </path>
              <circle cx="21" cy="35" r="2.2" fill="#c6a779" stroke="#e2d5b9" strokeWidth=".8" />
              <circle cx="51" cy="35" r="2.2" fill="#c6a779" stroke="#e2d5b9" strokeWidth=".8" />
            </g>

            <g>
              <circle cx="21" cy="35" r="6.1" fill="#111211" stroke="#d8d0c0" strokeWidth="1.35" />
              <circle cx="21" cy="35" r="2.4" fill="#c6a779" />
              <path d="M21 29.4v2.5m0 6.2v2.5m-5.6-5.6h2.5m6.2 0h2.5m-9.5-4 1.8 1.8m4.3 4.4 1.8 1.8m0-8-1.8 1.8m-4.3 4.4-1.8 1.8" stroke="#817a6e" strokeWidth=".8" />
              <animateTransform attributeName="transform" type="rotate" from="0 21 35" to="360 21 35" dur={ROVER_BEHAVIOR.wheelDuration} repeatCount="indefinite" />
            </g>
            <g>
              <circle cx="51" cy="35" r="6.1" fill="#111211" stroke="#d8d0c0" strokeWidth="1.35" />
              <circle cx="51" cy="35" r="2.4" fill="#c6a779" />
              <path d="M51 29.4v2.5m0 6.2v2.5m-5.6-5.6h2.5m6.2 0h2.5m-9.5-4 1.8 1.8m4.3 4.4 1.8 1.8m0-8-1.8 1.8m-4.3 4.4-1.8 1.8" stroke="#817a6e" strokeWidth=".8" />
              <animateTransform attributeName="transform" type="rotate" from="0 51 35" to="360 51 35" dur={ROVER_BEHAVIOR.wheelDuration} repeatCount="indefinite" />
            </g>

            {/* One chassis group owns the bump response; shoulders and wrists
                inherit the same lift and pitch before their individual joints react. */}
            <g>
            <path d="M23.5 25.5h3v1h-3zm22 0h3v1h-3z" fill="#d9c8a5" stroke="#514d45" strokeWidth=".6" />
            <circle cx="25" cy="26" r="1.5" fill="#171817" stroke="#e3d6bd" strokeWidth=".7" />
            <circle cx="47" cy="26" r="1.5" fill="#171817" stroke="#e3d6bd" strokeWidth=".7" />
            <path d="m19 18 5-7h22l7 8-3 9H23l-4-10Z" fill="#292824" stroke="#d4c7aa" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="m21.5 21.5 3.1-1.2h22.8l1.4 5.4H24.2z" fill="#3c3a34" stroke="#77705f" strokeWidth=".7" />
            <path d="M26 25.5h6m2 0h5m2 0h6" stroke="#bcaa83" strokeOpacity=".72" strokeWidth=".8" strokeLinecap="round" />
            <path d="M24.2 11.4 27 7.8h17.4l3.1 3.9M27 7.8V5.7h17.4v2.1" fill="#292824" stroke="#d4c7aa" strokeWidth=".9" strokeLinejoin="round" />
            <circle cx="24" cy="18" r=".85" fill="#ead9b7" />
            <circle cx="50" cy="18" r=".85" fill="#ead9b7" />
            <path d="m24 12 2 2m20-2-2 2m-18 8h-2m25 0h-2" stroke="#d6c5a5" strokeWidth=".7" strokeLinecap="round" />
            <path d="m26 13 5-4h13l4 4H26Z" fill="#b7a783" stroke="#e6dbc2" strokeWidth=".8" />
            <path d="M29 15h13v7H29z" fill="#181a1a" stroke="#857d6d" strokeWidth=".8" />
            <path d="M32 17h7v3h-7z" fill="#8e9a96" opacity=".72" />
            <circle cx="47.5" cy="18" r="1.4" fill="#d9c89f" />
            <path d="M25 24h23" stroke="#817a6e" strokeWidth=".7" />
            <path d="M34 9V5m0 0 3-2" stroke="#c6a779" strokeWidth=".8" strokeLinecap="round" />
            <circle cx="37.4" cy="2.8" r="1.1" fill="#c6a779" />

            <g>
              <path d="m23 17-7-5" stroke="#d8d0c0" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="16" cy="12" r="1.5" fill="#c6a779" stroke="#e0d6c1" strokeWidth=".6" />
              <g>
                <path d="m16 12-5 2-3-4" stroke="#d8d0c0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="14" r="1.2" fill="#c6a779" stroke="#e0d6c1" strokeWidth=".5" />
                <path d="m8 10-2-1m2 1 1-2" stroke="#d8d0c0" strokeWidth=".8" strokeLinecap="round" />
                <animateTransform attributeName="transform" type="rotate" values={leftForearmAngles} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </g>
              <animateTransform attributeName="transform" type="rotate" values={leftArmAngles} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
            </g>
            <g>
              <path d="m49 17 7-5" stroke="#d8d0c0" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="56" cy="12" r="1.5" fill="#c6a779" stroke="#e0d6c1" strokeWidth=".6" />
              <g>
                <path d="m56 12 5 2 3-4" stroke="#d8d0c0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="61" cy="14" r="1.2" fill="#c6a779" stroke="#e0d6c1" strokeWidth=".5" />
                <path d="m64 10 2-1m-2 1-1-2" stroke="#d8d0c0" strokeWidth=".8" strokeLinecap="round" />
                <animateTransform attributeName="transform" type="rotate" values={rightForearmAngles} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
              </g>
              <animateTransform attributeName="transform" type="rotate" values={rightArmAngles} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
            </g>
            <animateTransform attributeName="transform" type="matrix" values={chassisTransforms} keyTimes={keyTimes} dur={ROVER_BEHAVIOR.duration} repeatCount="indefinite" />
            </g>
          </svg>
        </g>
      </svg>
    </div>
  );
}
