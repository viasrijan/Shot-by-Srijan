// Wobbly hand-drawn ratio-matched frames.
// Base artwork is drawn in a 100x100 box with loose cubic curves,
// corner overshoots and a second sketch pass. It is scaled uniformly
// into a viewBox that matches the container ratio, so the frame stays
// slightly larger than the image but never a different proportion.
import type { CSSProperties } from "react";

const FRAMES: string[][] = [
  [
    // Loose single loop with wobble + overshoot corners
    "M 4 6 C 28 2.5, 68 7.5, 96 4 C 99.5 30, 95.5 68, 98 94 C 70 97.5, 32 93.5, 5 96.5 C 1.5 70, 6 32, 4 6 Z",
    // Inner sketch pass, slightly offset and lighter
    "M 8 11 C 32 8, 66 12.5, 91 9.5 C 93.5 32, 90 66, 92.5 89 C 68 91.5, 34 88, 10 90.5 C 7.5 66, 11 34, 8 11 Z",
  ],
  [
    // Shaky outer loop, heavier wobble on right edge
    "M 2.5 4.5 C 30 6.5, 62 2, 97.5 5.5 C 95 32, 100.5 62, 96.5 95 C 66 92.5, 34 97.5, 3.5 94 C 6 66, 0.5 34, 2.5 4.5 Z",
    // Corner ticks — hand-drawn overshoots
    "M -2.5 1.5 C 0 3.5, 3 5.5, 6.5 8.5",
    "M 102.5 1.5 C 100 3.5, 97.5 5.5, 93.5 8.5",
    "M 102.5 98.5 C 100 96.5, 97.5 94.5, 93.5 91.5",
    "M -2.5 98.5 C 0 96.5, 3 94.5, 6.5 91.5",
  ],
  [
    // Loose loop with a gap at top-right (pen lifted) + underline scribble
    "M 5 5.5 C 30 3, 60 7, 88 4.5",
    "M 92 4.5 C 96 30, 94 64, 96.5 93.5 C 68 96, 34 92.5, 4.5 95.5 C 2 68, 6.5 34, 5 5.5 Z",
    "M 10 91 C 34 89, 62 92.5, 90 90",
  ],
];

export type FrameRatio = "wide" | "standard" | "portrait" | "square";

const RATIO_BOX: Record<FrameRatio, { w: number; h: number }> = {
  wide: { w: 160, h: 90 },
  standard: { w: 150, h: 100 },
  portrait: { w: 70, h: 105 },
  square: { w: 100, h: 100 },
};

function ratioForOrientation(orientation?: string, fallback: FrameRatio = "standard"): FrameRatio {
  if (orientation === "portrait") return "portrait";
  return fallback;
}

const TONES = ["#f2c94c", "#8fa8ff", "#ff8fb0"];

export default function HandFrame({
  variant = 0,
  ratio,
  orientation,
  tone,
}: {
  variant?: number;
  ratio?: FrameRatio;
  orientation?: "landscape" | "portrait";
  tone?: number;
}) {
  const resolved: FrameRatio = ratio ?? ratioForOrientation(orientation, "standard");
  const box = RATIO_BOX[resolved];
  const sx = box.w / 100;
  const sy = box.h / 100;
  const paths = FRAMES[variant % FRAMES.length];

  return (
    <svg
      className={`hand-frame hand-frame--${resolved} hand-frame--v${variant % FRAMES.length}`}
      viewBox={`0 0 ${box.w} ${box.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={tone !== undefined ? ({ color: TONES[tone % TONES.length] } as CSSProperties) : undefined}
    >
      <g transform={`scale(${sx} ${sy})`}>
        {paths.map((d, n) => (
          <path key={d} d={d} pathLength={100} style={{ animationDelay: `${n * 220}ms` }} />
        ))}
      </g>
    </svg>
  );
}
