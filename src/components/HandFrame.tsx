// Sketchbook frames drawn with thin, straight pen lines.
// Base artwork lives in a 100x100 box and is scaled uniformly into a
// viewBox matching the container ratio, so every frame keeps the
// image's proportions. Lines run slightly past the corners like a
// quick hand-ruled sketch, with a lighter second pass on some variants.
import type { CSSProperties } from "react";

const FRAMES: string[][] = [
  [
    // Pen-ruled box — straight sides, corners overshooting
    "M -2.5 5.5 L 102.5 3.5",
    "M 97.5 -2 L 99.5 97",
    "M 3 98.5 L 103 96.5",
    "M 1.5 -2 L -0.5 99.5",
  ],
  [
    // Double-ruled top edge (quick overdraw) + straight box
    "M -2.5 4.5 L 102.5 5.5",
    "M 1.5 8.5 L 98.5 9.5",
    "M 98 -2 L 96.5 99.5",
    "M 2.5 101 L 0.5 3",
  ],
  [
    // Box with the pen lifting at the top-right + straight underline accent
    "M -2.5 5 L 82 4",
    "M 95 -2 L 98 98.5",
    "M 3 101 L 0.5 3",
    "M 8 95 L 92.5 96",
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
          <path key={d} d={d} pathLength={100} style={{ animationDelay: `${n * 140}ms` }} />
        ))}
      </g>
    </svg>
  );
}
