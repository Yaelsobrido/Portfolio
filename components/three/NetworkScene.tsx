"use client";

import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import NetworkField, {
  NETWORK_PALETTES,
  type NetworkConfig,
} from "./NetworkField";

export type NetworkVariant =
  | "hero"
  | "heroCompact"
  | "ambient"
  | "ambientCompact";

/**
 * Two rules govern these numbers:
 *  - `nodeCount` must stay high enough for the coastline to read (~20 min).
 *  - `packetCount` must stay well under the edge count, otherwise most edges
 *    are lit at once and the graph turns into a grey scribble instead of
 *    showing discrete pulses of traffic.
 */
const VARIANTS: Record<
  NetworkVariant,
  { config: NetworkConfig; cameraZ: number; dpr: [number, number] }
> = {
  // Foreground scene on the About hero: dense, reactive, front and centre.
  hero: {
    config: {
      nodeCount: 40,
      neighbors: 3,
      packetCount: 12,
      radius: 1.35,
      nodeSize: 0.022,
      edgeOpacity: 0.8,
      drift: 0.12,
      scrollReactive: true,
      pointerReactive: true,
    },
    cameraZ: 4.4,
    dpr: [1, 1.75],
  },
  // Phone hero: the island is deliberately LARGER than on desktop so it
  // extends past the portrait on every side and the coastline stays
  // readable around the photo. No pointer tilt (there is no pointer).
  heroCompact: {
    config: {
      nodeCount: 30,
      neighbors: 3,
      packetCount: 9,
      radius: 2.45,
      nodeSize: 0.02,
      edgeOpacity: 0.65,
      drift: 0.1,
      scrollReactive: true,
      pointerReactive: false,
    },
    cameraZ: 4.4,
    dpr: [1, 1.5],
  },
  // Page-wide backdrop: sparse, slow, cheap — it should never pull focus.
  ambient: {
    config: {
      nodeCount: 28,
      neighbors: 3,
      packetCount: 6,
      radius: 1.75,
      nodeSize: 0.02,
      edgeOpacity: 0.55,
      drift: 0.05,
      scrollReactive: false,
      pointerReactive: false,
    },
    cameraZ: 5.6,
    dpr: [1, 1.25],
  },
  // Same backdrop on phones: fewer nodes and a lower pixel ratio, because a
  // permanently animating canvas is the expensive thing on a battery.
  ambientCompact: {
    config: {
      nodeCount: 22,
      neighbors: 3,
      packetCount: 4,
      radius: 1.6,
      nodeSize: 0.021,
      edgeOpacity: 0.5,
      drift: 0.04,
      scrollReactive: false,
      pointerReactive: false,
    },
    cameraZ: 5.6,
    dpr: [1, 1],
  },
};

/**
 * Pulls the camera back on portrait viewports. The `fov` is vertical, so on
 * a narrow screen the horizontal field shrinks and the island would be cut
 * off at the sides without this.
 */
function FitCamera({ base }: { base: number }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const pullback = aspect < 1 ? 1 + (1 - aspect) * 0.65 : 1;
    camera.position.z = base * pullback;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, base]);

  return null;
}

export default function NetworkScene({
  variant = "hero",
  theme = "dark",
}: {
  variant?: NetworkVariant;
  theme?: "dark" | "light";
}) {
  const { config, cameraZ, dpr } = VARIANTS[variant];

  return (
    <Canvas
      camera={{ position: [0, 0, cameraZ], fov: 50 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <FitCamera base={cameraZ} />
      <NetworkField palette={NETWORK_PALETTES[theme]} config={config} />
    </Canvas>
  );
}
