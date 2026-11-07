"use client";

import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  SRGBColorSpace,
} from "three";

type AiCoreSceneProps = {
  active: boolean;
  compact: boolean;
  reducedMotion: boolean;
};

const PLANET_RADIUS = 1.05;
const RING_INNER = 1.45;
const RING_OUTER = 2.15;
const MOON_ORBIT = 2.35;

// Gas-giant bands painted once into an equirectangular texture.
function createBandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, "#1b1446");
  base.addColorStop(0.5, "#3a2a9a");
  base.addColorStop(1, "#140f38");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const palette = ["#6b4fe0", "#2c2178", "#8b7bf0", "#4fb7d6", "#231a5e"];
  for (let y = 0; y < canvas.height; y += 1) {
    const band = Math.sin(y * 0.11) * 0.5 + Math.sin(y * 0.031 + 1.3) * 0.5;
    ctx.globalAlpha = 0.08 + Math.abs(band) * 0.22;
    ctx.fillStyle = palette[Math.floor(Math.abs(band * 7.3 + y * 0.013)) % palette.length];
    ctx.fillRect(0, y, canvas.width, 1);
  }
  // Longitudinal detail (storms + streaks) so the spin is actually visible.
  let seed = 7;
  const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 70; i += 1) {
    ctx.globalAlpha = 0.06 + random() * 0.12;
    ctx.fillStyle = random() > 0.5 ? "#b9a8ff" : "#4fb7d6";
    ctx.beginPath();
    ctx.ellipse(40 + random() * 432, 20 + random() * 216, 18 + random() * 60, 1.5 + random() * 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  const storms = [
    [150, 150, 34, 14, "#d9cfff"],
    [360, 92, 22, 9, "#8fe9ff"],
    [270, 190, 16, 7, "#c4b5ff"],
  ] as const;
  for (const [x, y, rx, ry, color] of storms) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, rx);
    glow.addColorStop(0, color);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Outer halo (back faces): fades to zero at the shell edge, peaks at the planet limb.
const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float d = -dot(vNormal, vView);
    gl_FragColor = vec4(uColor, smoothstep(0.0, 0.55, d) * 0.85);
  }
`;

// Rim light on the surface (front faces).
const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
    gl_FragColor = vec4(uColor, f * 0.9);
  }
`;

const ringVertex = /* glsl */ `
  varying float vRadius;
  void main() {
    vRadius = length(position.xy);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragment = /* glsl */ `
  uniform float uInner;
  uniform float uOuter;
  uniform vec3 uInnerColor;
  uniform vec3 uOuterColor;
  varying float vRadius;
  void main() {
    float t = (vRadius - uInner) / (uOuter - uInner);
    float bands = 0.55 + 0.45 * sin(t * 42.0) * sin(t * 13.0 + 1.0);
    float edges = smoothstep(0.0, 0.08, t) * smoothstep(1.0, 0.82, t);
    float gap = smoothstep(0.015, 0.04, abs(t - 0.62));
    gl_FragColor = vec4(mix(uInnerColor, uOuterColor, t), edges * gap * (0.25 + 0.45 * bands));
  }
`;

export function AiCoreScene({ active, compact, reducedMotion }: AiCoreSceneProps) {
  const system = useRef<Group>(null);
  const planet = useRef<Mesh>(null);
  const moon = useRef<Group>(null);
  const segments = compact ? 48 : 96;
  // The canvas mount is pointer-events: none, so R3F never sees the mouse; track it on window.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const bands = useMemo(() => createBandTexture(), []);
  useEffect(() => () => bands.dispose(), [bands]);

  const haloUniforms = useMemo(() => ({ uColor: { value: new Color("#8b5cf6") } }), []);
  const rimUniforms = useMemo(() => ({ uColor: { value: new Color("#9defff") } }), []);
  const ringUniforms = useMemo(
    () => ({
      uInner: { value: RING_INNER },
      uOuter: { value: RING_OUTER },
      uInnerColor: { value: new Color("#9defff") },
      uOuterColor: { value: new Color("#a970ff") },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!system.current || !active || reducedMotion) return;

    if (planet.current) planet.current.rotation.y += delta * 0.12;
    if (moon.current) moon.current.rotation.y += delta * 0.35;

    const response = compact ? 0.12 : 0.28;
    const scrollShift = Math.min(window.scrollY / 1400, 0.35);
    system.current.rotation.x = MathUtils.lerp(
      system.current.rotation.x,
      pointer.current.y * response + scrollShift,
      0.035,
    );
    system.current.rotation.y = MathUtils.lerp(
      system.current.rotation.y,
      pointer.current.x * response,
      0.035,
    );
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight color="#f1edff" intensity={2.4} position={[-4, 2.5, 3]} />
      <directionalLight color="#6be7ff" intensity={0.8} position={[3, -1, -4]} />

      <group ref={system}>
        {/* Axial tilt shared by planet, rings and moon so the system reads as one body. */}
        <group rotation={[0, 0, 0.42]}>
          <mesh ref={planet}>
            <sphereGeometry args={[PLANET_RADIUS, segments, segments / 2]} />
            <meshStandardMaterial map={bands} metalness={0.05} roughness={0.85} />
          </mesh>
          <mesh scale={1.004}>
            <sphereGeometry args={[PLANET_RADIUS, segments, segments / 2]} />
            <shaderMaterial
              blending={AdditiveBlending}
              depthWrite={false}
              fragmentShader={rimFragment}
              transparent
              uniforms={rimUniforms}
              vertexShader={fresnelVertex}
            />
          </mesh>
          <mesh scale={1.18}>
            <sphereGeometry args={[PLANET_RADIUS, segments, segments / 2]} />
            <shaderMaterial
              blending={AdditiveBlending}
              depthWrite={false}
              fragmentShader={haloFragment}
              side={BackSide}
              transparent
              uniforms={haloUniforms}
              vertexShader={fresnelVertex}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 2 + 0.28, 0, 0]}>
            <ringGeometry args={[RING_INNER, RING_OUTER, compact ? 96 : 192, 1]} />
            <shaderMaterial
              depthWrite={false}
              fragmentShader={ringFragment}
              side={DoubleSide}
              transparent
              uniforms={ringUniforms}
              vertexShader={ringVertex}
            />
          </mesh>

          {/* Moon on an orbit inclined to the ring plane. */}
          <group rotation={[0.5, 0, -0.2]}>
            <group ref={moon} rotation={[0, 1.1, 0]}>
              <mesh position={[MOON_ORBIT, 0, 0]}>
                <sphereGeometry args={[0.11, 32, 16]} />
                <meshStandardMaterial color="#f4f2ec" roughness={0.9} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {!compact && <Sparkles color="#bcefff" count={30} opacity={0.6} scale={6} size={1.2} speed={0.12} />}
    </>
  );
}
