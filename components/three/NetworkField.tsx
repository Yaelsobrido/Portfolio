"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MADAGASCAR_OUTLINE } from "@/data/madagascar";

export type NetworkPalette = {
  node: string;
  hub: string;
  edge: string;
  packet: string;
};

// `edge` is the idle link colour and stays deliberately dim: edges are lerped
// toward `packet` as traffic passes over them, so the contrast between the two
// is what makes the flow readable.
export const NETWORK_PALETTES: Record<"dark" | "light", NetworkPalette> = {
  dark: { node: "#4ff0e3", hub: "#e0409f", edge: "#2f818c", packet: "#eafffd" },
  light: { node: "#0f8fa0", hub: "#bf3f92", edge: "#8ab8c1", packet: "#04525e" },
};

export interface NetworkConfig {
  nodeCount: number;
  /** How many nearest neighbours each node links to. */
  neighbors: number;
  packetCount: number;
  radius: number;
  nodeSize: number;
  edgeOpacity: number;
  /** Amplitude of the slow left-right drift, in radians-ish. */
  drift: number;
  /** Whether scroll pushes/expands the graph. */
  scrollReactive: boolean;
  /** Whether the pointer tilts the graph. */
  pointerReactive: boolean;
}

/** Deterministic PRNG so the graph is stable across re-mounts (theme swap). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard ray-casting point-in-polygon test against the island outline. */
function insideIsland(x: number, y: number) {
  const ring = MADAGASCAR_OUTLINE;
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      hit = !hit;
    }
  }
  return hit;
}

function buildGraph(nodeCount: number, neighbors: number, packetCount: number) {
  const rand = mulberry32(0x5eed);

  const base = new Float32Array(nodeCount * 3);
  const phase = new Float32Array(nodeCount);

  // A little under half the nodes trace the coastline, so the silhouette is
  // legible; the rest fill the interior so it still reads as a mesh rather
  // than a map outline.
  const coastCount = Math.max(3, Math.round(nodeCount * 0.45));
  const innerCount = nodeCount - coastCount;
  const ring = MADAGASCAR_OUTLINE;

  // Walk the perimeter at even arc-length intervals.
  const seg: number[] = [];
  let perimeter = 0;
  for (let i = 0; i < ring.length; i++) {
    const [ax, ay] = ring[i];
    const [bx, by] = ring[(i + 1) % ring.length];
    perimeter += Math.hypot(bx - ax, by - ay);
    seg.push(perimeter);
  }

  let w = 0;
  for (let k = 0; k < coastCount; k++) {
    const target = (k / coastCount) * perimeter;
    while (w < seg.length - 1 && seg[w] < target) w++;
    const prev = w === 0 ? 0 : seg[w - 1];
    const [ax, ay] = ring[w];
    const [bx, by] = ring[(w + 1) % ring.length];
    const span = seg[w] - prev || 1;
    const u = (target - prev) / span;
    base[k * 3] = ax + (bx - ax) * u;
    base[k * 3 + 1] = ay + (by - ay) * u;
    base[k * 3 + 2] = (rand() - 0.5) * 0.16;
    phase[k] = rand() * Math.PI * 2;
  }

  // Interior points, chosen best-of-N so they spread out instead of clumping.
  const placed: Array<[number, number]> = [];
  for (let k = 0; k < innerCount; k++) {
    let best: [number, number] = [0, 0];
    let bestDist = -1;
    for (let attempt = 0; attempt < 12; attempt++) {
      let x = 0;
      let y = 0;
      let ok = false;
      for (let tries = 0; tries < 60 && !ok; tries++) {
        x = (rand() - 0.5) * 1.3;
        y = (rand() - 0.5) * 2.05;
        ok = insideIsland(x, y);
      }
      if (!ok) continue;
      let nearest = Infinity;
      for (const [px, py] of placed) {
        const d = (px - x) ** 2 + (py - y) ** 2;
        if (d < nearest) nearest = d;
      }
      if (nearest > bestDist) {
        bestDist = nearest;
        best = [x, y];
      }
    }
    placed.push(best);
    const i = coastCount + k;
    base[i * 3] = best[0];
    base[i * 3 + 1] = best[1];
    base[i * 3 + 2] = (rand() - 0.5) * 0.3;
    phase[i] = rand() * Math.PI * 2;
  }

  const edges: number[] = [];
  const degree = new Uint16Array(nodeCount);
  const seen = new Set<number>();
  const link = (i: number, j: number) => {
    const key = i < j ? i * nodeCount + j : j * nodeCount + i;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push(i, j);
    degree[i]++;
    degree[j]++;
  };

  // The coastline first, and explicitly: nearest-neighbour linking alone
  // would connect coastal nodes inward to the mesh and never draw the
  // outline, so the island would not be recognisable. Coastal nodes are
  // stored in perimeter order, so chaining them closes the shape.
  for (let k = 0; k < coastCount; k++) link(k, (k + 1) % coastCount);

  // Then link every node to its k nearest neighbours, for the inner mesh.
  const scratch: Array<{ d: number; j: number }> = [];
  for (let i = 0; i < nodeCount; i++) {
    scratch.length = 0;
    for (let j = 0; j < nodeCount; j++) {
      if (j === i) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      scratch.push({ d: dx * dx + dy * dy + dz * dz, j });
    }
    scratch.sort((a, b) => a.d - b.d);
    for (let k = 0; k < neighbors && k < scratch.length; k++) {
      link(i, scratch[k].j);
    }
  }
  const edgeCount = edges.length / 2;
  const edgeIdx = new Uint16Array(edges);

  // The best-connected fifth of the graph becomes visually distinct "hubs".
  const byDegree = Array.from({ length: nodeCount }, (_, i) => i).sort(
    (a, b) => degree[b] - degree[a]
  );
  const hubCount = Math.max(1, Math.round(nodeCount * 0.18));
  const isHub = new Uint8Array(nodeCount);
  for (let k = 0; k < hubCount; k++) isHub[byDegree[k]] = 1;
  const hubIdx: number[] = [];
  const plainIdx: number[] = [];
  for (let i = 0; i < nodeCount; i++) (isHub[i] ? hubIdx : plainIdx).push(i);

  // Packets ride a random edge, respawn on a new one when they arrive.
  const packetEdge = new Uint16Array(packetCount);
  const packetT = new Float32Array(packetCount);
  const packetSpeed = new Float32Array(packetCount);
  for (let p = 0; p < packetCount; p++) {
    packetEdge[p] = Math.floor(rand() * edgeCount);
    packetT[p] = rand();
    packetSpeed[p] = 0.18 + rand() * 0.42;
  }

  return {
    base,
    phase,
    edgeIdx,
    edgeCount,
    hubIdx,
    plainIdx,
    packetEdge,
    packetT,
    packetSpeed,
    rand,
  };
}

/**
 * A living distributed-system graph: nodes linked to their nearest
 * neighbours, with light packets travelling the edges. The whole cluster
 * breathes, eases toward the pointer, and expands as the page scrolls.
 */
export default function NetworkField({
  palette,
  config,
}: {
  palette: NetworkPalette;
  config: NetworkConfig;
}) {
  const {
    nodeCount,
    neighbors,
    packetCount,
    radius,
    nodeSize,
    edgeOpacity,
    drift,
    scrollReactive,
    pointerReactive,
  } = config;

  const g = useMemo(
    () => buildGraph(nodeCount, neighbors, packetCount),
    [nodeCount, neighbors, packetCount]
  );

  // Per-frame scratch buffers, allocated once.
  const cur = useMemo(() => new Float32Array(nodeCount * 3), [nodeCount]);
  const edgePos = useMemo(
    () => new Float32Array(g.edgeCount * 6),
    [g.edgeCount]
  );
  const edgeCol = useMemo(
    () => new Float32Array(g.edgeCount * 6),
    [g.edgeCount]
  );
  const packetPos = useMemo(
    () => new Float32Array(packetCount * 3),
    [packetCount]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  /** How lit each node is right now; spikes to 1 when a packet lands on it. */
  const excite = useMemo(() => new Float32Array(nodeCount), [nodeCount]);
  /** Per-frame glow at each end of every edge, driven by packet position. */
  const heat = useMemo(
    () => ({
      a: new Float32Array(g.edgeCount),
      b: new Float32Array(g.edgeCount),
    }),
    [g.edgeCount]
  );

  const col = useMemo(
    () => ({
      node: new THREE.Color(palette.node),
      hub: new THREE.Color(palette.hub),
      hot: new THREE.Color(palette.packet),
      edge: new THREE.Color(palette.edge),
      scratch: new THREE.Color(),
    }),
    [palette]
  );

  const group = useRef<THREE.Group>(null);
  const plainMesh = useRef<THREE.InstancedMesh>(null);
  const hubMesh = useRef<THREE.InstancedMesh>(null);
  const edgeGeo = useRef<THREE.BufferGeometry>(null);
  const packetGeo = useRef<THREE.BufferGeometry>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05); // clamp after tab-switch stalls
    const t = state.clock.elapsedTime;

    if (scrollReactive) {
      const max = window.innerHeight || 1;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / max));
    }
    const s = scroll.current;

    // 1. Node positions. The island is scaled uniformly so the coastline
    //    keeps its shape — only depth breathes, which gives life without
    //    making the silhouette wobble.
    const shell = radius * (1 + s * 0.22);
    for (let i = 0; i < nodeCount; i++) {
      cur[i * 3] = g.base[i * 3] * shell;
      cur[i * 3 + 1] = g.base[i * 3 + 1] * shell;
      cur[i * 3 + 2] =
        g.base[i * 3 + 2] * shell +
        Math.sin(t * 0.9 + g.phase[i]) * 0.06 * radius;
    }

    // 2. Packets travel their edge, then land: the arrival lights up the
    //    destination node and the trailing half of the edge behind them.
    heat.a.fill(0);
    heat.b.fill(0);
    for (let i = 0; i < nodeCount; i++) {
      excite[i] = Math.max(0, excite[i] - delta * 2.1);
    }

    const rush = 1 + s * 1.6;
    for (let p = 0; p < packetCount; p++) {
      g.packetT[p] += delta * g.packetSpeed[p] * rush;
      const e0 = g.packetEdge[p];
      if (g.packetT[p] >= 1) {
        excite[g.edgeIdx[e0 * 2 + 1]] = 1; // the node that received it
        g.packetT[p] = 0;
        g.packetEdge[p] = Math.floor(g.rand() * g.edgeCount);
        g.packetSpeed[p] = 0.18 + g.rand() * 0.42;
      }
      const e = g.packetEdge[p];
      const a = g.edgeIdx[e * 2] * 3;
      const b = g.edgeIdx[e * 2 + 1] * 3;
      const u = g.packetT[p];
      packetPos[p * 3] = cur[a] + (cur[b] - cur[a]) * u;
      packetPos[p * 3 + 1] = cur[a + 1] + (cur[b + 1] - cur[a + 1]) * u;
      packetPos[p * 3 + 2] = cur[a + 2] + (cur[b + 2] - cur[a + 2]) * u;
      // Brighter toward the end the packet is nearest, so the glow travels.
      if (1 - u > heat.a[e]) heat.a[e] = 1 - u;
      if (u > heat.b[e]) heat.b[e] = u;
    }
    const packetAttr = packetGeo.current?.attributes.position;
    if (packetAttr) packetAttr.needsUpdate = true;

    // 3. Node instances — position, spin, and a pulse of size + colour.
    const writeNodes = (
      mesh: THREE.InstancedMesh | null,
      list: number[],
      scale: number,
      baseColor: THREE.Color
    ) => {
      if (!mesh) return;
      for (let k = 0; k < list.length; k++) {
        const i = list[k];
        const pulse = excite[i];
        dummy.position.set(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2]);
        dummy.rotation.set(t * 0.4 + g.phase[i], t * 0.3, 0);
        dummy.scale.setScalar(scale * (1 + pulse * 1.15));
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
        col.scratch.copy(baseColor).lerp(col.hot, pulse * 0.85);
        mesh.setColorAt(k, col.scratch);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    writeNodes(plainMesh.current, g.plainIdx, 1, col.node);
    writeNodes(hubMesh.current, g.hubIdx, 1.6, col.hub);

    // 4. Edges — geometry plus the per-vertex traffic glow.
    for (let e = 0; e < g.edgeCount; e++) {
      const a = g.edgeIdx[e * 2] * 3;
      const b = g.edgeIdx[e * 2 + 1] * 3;
      const o = e * 6;
      edgePos[o] = cur[a];
      edgePos[o + 1] = cur[a + 1];
      edgePos[o + 2] = cur[a + 2];
      edgePos[o + 3] = cur[b];
      edgePos[o + 4] = cur[b + 1];
      edgePos[o + 5] = cur[b + 2];

      col.scratch.copy(col.edge).lerp(col.hot, heat.a[e] * 0.9);
      edgeCol[o] = col.scratch.r;
      edgeCol[o + 1] = col.scratch.g;
      edgeCol[o + 2] = col.scratch.b;
      col.scratch.copy(col.edge).lerp(col.hot, heat.b[e] * 0.9);
      edgeCol[o + 3] = col.scratch.r;
      edgeCol[o + 4] = col.scratch.g;
      edgeCol[o + 5] = col.scratch.b;
    }
    const edgeAttrs = edgeGeo.current?.attributes;
    if (edgeAttrs) {
      edgeAttrs.position.needsUpdate = true;
      edgeAttrs.color.needsUpdate = true;
    }

    // 5. Whole-cluster motion.
    const grp = group.current;
    if (!grp) return;
    if (pointerReactive) {
      pointer.current.x += (state.pointer.x - pointer.current.x) * 0.045;
      pointer.current.y += (state.pointer.y - pointer.current.y) * 0.045;
    }
    // A flat shape cannot spin like a ball — edge-on it would vanish. It
    // drifts within a shallow arc instead, and leans toward the pointer.
    grp.rotation.y =
      Math.sin(t * 0.22) * drift * 2.2 + pointer.current.x * 0.45 + s * 0.25;
    grp.rotation.x = pointer.current.y * 0.28 + s * 0.3;
    grp.rotation.z = Math.sin(t * 0.17) * 0.045;
    grp.position.z = -s * 2;
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={plainMesh}
        args={[undefined, undefined, g.plainIdx.length]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[nodeSize, 0]} />
        <meshBasicMaterial color={palette.node} transparent opacity={0.95} />
      </instancedMesh>

      <instancedMesh
        ref={hubMesh}
        args={[undefined, undefined, g.hubIdx.length]}
        frustumCulled={false}
      >
        <octahedronGeometry args={[nodeSize, 0]} />
        <meshBasicMaterial color={palette.hub} transparent opacity={0.95} />
      </instancedMesh>

      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={edgeGeo}>
          <bufferAttribute attach="attributes-position" args={[edgePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[edgeCol, 3]} />
        </bufferGeometry>
        {/* White base so the per-vertex colours come through unmodulated. */}
        <lineBasicMaterial vertexColors transparent opacity={edgeOpacity} />
      </lineSegments>

      <points frustumCulled={false}>
        <bufferGeometry ref={packetGeo}>
          <bufferAttribute attach="attributes-position" args={[packetPos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.packet}
          size={nodeSize * 2.3}
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
