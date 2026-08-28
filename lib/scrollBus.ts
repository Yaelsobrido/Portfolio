export interface ScrollState {
  /** Current window.scrollY. */
  y: number;
  /** Pixels per frame, signed, smoothed and decaying toward 0. */
  velocity: number;
}

type Listener = (state: ScrollState) => void;

const listeners = new Set<Listener>();
const state: ScrollState = { y: 0, velocity: 0 };
let lastY = 0;
let rafId: number | null = null;
let idleFrames = 0;

/**
 * One scroll listener and one rAF loop for the whole page, instead of a
 * listener per animated element. The loop keeps running for a short tail
 * after scrolling stops so velocity-driven transforms can settle, then
 * parks itself until the next scroll.
 */
function tick() {
  const y = window.scrollY;
  const raw = y - lastY;
  lastY = y;

  state.y = y;
  state.velocity += (raw - state.velocity) * 0.25;
  if (Math.abs(state.velocity) < 0.05) state.velocity = 0;

  for (const fn of listeners) fn(state);

  // Park the loop once things are still, so an idle page costs nothing.
  idleFrames = raw === 0 && state.velocity === 0 ? idleFrames + 1 : 0;
  if (idleFrames > 20 || listeners.size === 0) {
    rafId = null;
    return;
  }
  rafId = requestAnimationFrame(tick);
}

function wake() {
  idleFrames = 0;
  if (rafId === null) rafId = requestAnimationFrame(tick);
}

export function subscribeScroll(fn: Listener): () => void {
  const first = listeners.size === 0;
  listeners.add(fn);

  if (first) {
    lastY = window.scrollY;
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    // A tab that loads in the background never runs rAF, so nothing has
    // positioned itself yet — catch up the moment it is shown.
    document.addEventListener("visibilitychange", wake);
  }
  wake(); // run once so the element positions itself immediately

  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      document.removeEventListener("visibilitychange", wake);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
}
