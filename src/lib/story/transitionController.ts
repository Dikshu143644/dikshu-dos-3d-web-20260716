export interface StorySegments {
  panelCount: number;
  /** Cumulative normalized boundaries (length 2*panelCount - 1): scrub0, trans0, scrub1, trans1, ... scrubN-1 = 1. */
  edges: number[];
}

/**
 * Builds the weighted scroll-progress timeline for N panels: N scrub segments
 * (each panel's own sequence playing) interleaved with N-1 transition
 * segments (the horizontal slide between adjacent panels).
 */
export function getStorySegments(
  panelCount: number,
  scrubWeight = 3,
  transitionWeight = 1
): StorySegments {
  const weights: number[] = [];
  for (let i = 0; i < panelCount; i += 1) {
    weights.push(scrubWeight);
    if (i < panelCount - 1) weights.push(transitionWeight);
  }
  const total = weights.reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const edges = weights.map((w) => {
    cumulative += w;
    return cumulative / total;
  });
  return { panelCount, edges };
}

/** Total weighted units (scrub + transition) for a given panel count — used to size the pinned section. */
export function getTotalWeight(panelCount: number, scrubWeight = 3, transitionWeight = 1): number {
  return panelCount * scrubWeight + (panelCount - 1) * transitionWeight;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Located {
  index: number;
  start: number;
  end: number;
  localT: number;
}

function locate(p: number, edges: number[]): Located {
  let start = 0;
  for (let i = 0; i < edges.length; i += 1) {
    const end = edges[i];
    if (p <= end || i === edges.length - 1) {
      const localT = end > start ? clamp01((p - start) / (end - start)) : 1;
      return { index: i, start, end, localT };
    }
    start = end;
  }
  return { index: edges.length - 1, start, end: 1, localT: 1 };
}

/** Frame index (0..frameCount-1) the given panel's sequence should show at overall progress p. */
export function computeFrame(
  panelIndex: number,
  p: number,
  frameCount: number,
  segments: StorySegments
): number {
  const last = frameCount - 1;
  const scrubEdgeIndex = panelIndex * 2;
  const start = scrubEdgeIndex === 0 ? 0 : segments.edges[scrubEdgeIndex - 1];
  const end = segments.edges[scrubEdgeIndex];
  if (p <= start) return 0;
  if (p >= end) return last;
  const t = (p - start) / (end - start);
  return Math.round(t * last);
}

/** How far the row has slid, in whole panels (0..panelCount-1). */
export function computeRowProgress(p: number, segments: StorySegments): number {
  const { index, localT } = locate(p, segments.edges);
  if (index % 2 === 0) return index / 2;
  const fromPanel = (index - 1) / 2;
  return fromPanel + localT;
}

export interface PanelPose {
  rotateY: number;
  scale: number;
  z: number;
}

const IDENTITY: PanelPose = { rotateY: 0, scale: 1, z: 0 };
const OFFSTAGE_LEFT: PanelPose = { rotateY: -5, scale: 0.96, z: -120 };
const OFFSTAGE_RIGHT: PanelPose = { rotateY: 5, scale: 0.96, z: -120 };

const lerpPose = (a: PanelPose, b: PanelPose, t: number): PanelPose => ({
  rotateY: lerp(a.rotateY, b.rotateY, t),
  scale: lerp(a.scale, b.scale, t),
  z: lerp(a.z, b.z, t),
});

/** The per-panel 3D pose (rotateY / scale / z) for overall progress p. */
export function computePanelPose(panelIndex: number, p: number, segments: StorySegments): PanelPose {
  const { panelCount, edges } = segments;
  const hasIncoming = panelIndex > 0;
  const hasOutgoing = panelIndex < panelCount - 1;

  if (hasIncoming) {
    const incomingIdx = panelIndex * 2 - 1;
    const incomingStart = incomingIdx === 0 ? 0 : edges[incomingIdx - 1];
    const incomingEnd = edges[incomingIdx];
    if (p < incomingStart) return OFFSTAGE_RIGHT;
    if (p <= incomingEnd) {
      const t = clamp01((p - incomingStart) / (incomingEnd - incomingStart));
      return lerpPose(OFFSTAGE_RIGHT, IDENTITY, t);
    }
  }

  if (!hasOutgoing) return IDENTITY;

  const outgoingIdx = panelIndex * 2 + 1;
  const outgoingStart = edges[outgoingIdx - 1];
  const outgoingEnd = edges[outgoingIdx];
  if (p < outgoingStart) return IDENTITY;
  if (p <= outgoingEnd) {
    const t = clamp01((p - outgoingStart) / (outgoingEnd - outgoingStart));
    return lerpPose(IDENTITY, OFFSTAGE_LEFT, t);
  }
  return OFFSTAGE_LEFT;
}

/** 0 outside any transition, ramps 0..1 across whichever transition is currently active. */
export function computeTransitionAmount(p: number, segments: StorySegments): number {
  const { index, localT } = locate(p, segments.edges);
  return index % 2 === 1 ? localT : 0;
}
