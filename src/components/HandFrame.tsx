// Straight-line ratio-matched frames.
// Base artwork is drawn in a 100x100 box with straight edges only
// (no bent curves). It is scaled uniformly into a viewBox that matches
// the container ratio, so the frame stays slightly larger than the
// image but never a different proportion.
const FRAMES: string[][] = [
  [
    "M 1 2 L 99 2 L 99 98 L 1 98 Z",
    "M 5 6 L 95 6 L 95 94 L 5 94 Z",
  ],
  [
    "M 1 2 L 99 2 L 99 98 L 1 98 Z",
    "M -2.5 1.5 L 5 7",
    "M 102.5 1.5 L 95 7",
    "M 102.5 98.5 L 95 93",
    "M -2.5 98.5 L 5 93",
  ],
  [
    "M 1 2 L 99 2 L 99 98 L 1 98 Z",
    "M 8 92 L 92 92",
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

export default function HandFrame({
  variant = 0,
  ratio,
  orientation,
}: {
  variant?: number;
  ratio?: FrameRatio;
  orientation?: "landscape" | "portrait";
}) {
  const resolved: FrameRatio = ratio ?? ratioForOrientation(orientation, "standard");
  const box = RATIO_BOX[resolved];
  const sx = box.w / 100;
  const sy = box.h / 100;
  const paths = FRAMES[variant % FRAMES.length];

  return (
    <svg
      className={`hand-frame hand-frame--${resolved}`}
      viewBox={`0 0 ${box.w} ${box.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g transform={`scale(${sx} ${sy})`}>
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
