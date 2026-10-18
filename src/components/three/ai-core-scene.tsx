"use client";

import { Float, Icosahedron, Instances, Instance, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, MathUtils, Mesh } from "three";

type AiCoreSceneProps = {
  active: boolean;
  compact: boolean;
  reducedMotion: boolean;
};

export function AiCoreScene({ active, compact, reducedMotion }: AiCoreSceneProps) {
  const core = useRef<Group>(null);
  const rings = useRef<Array<Mesh | null>>([]);
  const particles = useMemo(
    () =>
      Array.from({ length: compact ? 14 : 30 }, (_, index) => {
        const angle = (index / (compact ? 14 : 30)) * Math.PI * 2;
        const radius = 2.1 + ((index * 17) % 10) / 12;
        return [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.7) * 1.2,
          Math.sin(angle) * radius,
        ] as const;
      }),
    [compact],
  );

  useFrame((state, delta) => {
    if (!core.current || !active || reducedMotion) return;

    const response = compact ? 0.08 : 0.16;
    const scrollShift = Math.min(window.scrollY / 1400, 0.35);
    core.current.rotation.y += delta * 0.12;
    core.current.rotation.x = MathUtils.lerp(
      core.current.rotation.x,
      state.pointer.y * response + scrollShift,
      0.035,
    );
    core.current.position.x = MathUtils.lerp(
      core.current.position.x,
      state.pointer.x * response,
      0.035,
    );
    for (let index = 0; index < rings.current.length; index += 1) {
      const ring = rings.current[index];
      if (!ring) continue;
      const separation = 1 + scrollShift * (index + 1) * 0.14;
      ring.scale.setScalar(MathUtils.lerp(ring.scale.x, separation, 0.04));
      ring.rotation.z += delta * (0.035 + index * 0.018);
    }
  });

  return (
    <group ref={core} rotation={[0.22, -0.4, 0.08]}>
      <ambientLight intensity={0.75} />
      <pointLight color="#9defff" intensity={compact ? 10 : 18} position={[3, 2, 3]} />
      {!compact && <pointLight color="#8b5cf6" intensity={14} position={[-3, -2, 1]} />}

      <Float floatIntensity={reducedMotion ? 0 : 0.35} rotationIntensity={reducedMotion ? 0 : 0.25}>
        <Icosahedron args={[1.15, 1]}>
          <meshStandardMaterial
            color="#111119"
            emissive="#5046c8"
            emissiveIntensity={0.8}
            metalness={0.88}
            roughness={0.2}
          />
        </Icosahedron>
        <Icosahedron args={[0.78, 2]}>
          <meshStandardMaterial
            color="#9defff"
            emissive="#6be7ff"
            emissiveIntensity={1.35}
            metalness={0.55}
            roughness={0.18}
            wireframe
          />
        </Icosahedron>
        {[1.75, 2.18, 2.62].map((radius, index) => (
          <mesh
            key={radius}
            ref={(node) => {
              rings.current[index] = node;
            }}
            rotation={[
              Math.PI / (2.4 + index * 0.35),
              index * 0.72,
              index * 0.43,
            ]}
          >
            <torusGeometry args={[radius, 0.025 + index * 0.008, 12, 96]} />
            <meshStandardMaterial
              color={index === 1 ? "#9defff" : "#f3efff"}
              emissive={index === 1 ? "#58dff8" : "#7264e8"}
              emissiveIntensity={1.1}
              metalness={0.72}
              roughness={0.25}
            />
          </mesh>
        ))}
      </Float>

      <Instances limit={particles.length}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#d8fbff" />
        {particles.map((position, index) => (
          <Instance key={index} position={position} />
        ))}
      </Instances>
      {!compact && <Sparkles color="#bcefff" count={24} scale={6} size={1.4} speed={0.15} />}
    </group>
  );
}
