import type { CSSProperties } from "react";

interface DoodleProps { className?: string; style?: CSSProperties; }

/* Every path carries pathLength="1" so a single CSS rule can "draw" any doodle. */
function Paths({ d, className = "", style, viewBox, accent = false }: DoodleProps & { d: string[]; viewBox: string; accent?: boolean }) {
  return (
    <svg className={`doodle ${accent ? "doodle--accent" : ""} ${className}`} style={style} viewBox={viewBox} aria-hidden="true">
      {d.map((path, i) => (
        <path key={i} d={path} pathLength={1} style={{ "--i": i } as CSSProperties} />
      ))}
    </svg>
  );
}

export const Arrow = (p: DoodleProps) => (
  <Paths {...p} viewBox="0 0 120 80" d={["M6 10 C 24 58, 62 74, 110 44", "M94 30 C 100 36, 106 40, 112 44 C 104 48, 98 54, 94 60"]} />
);

export const Star = (p: DoodleProps & { accent?: boolean }) => (
  <Paths {...p} viewBox="0 0 40 40" d={["M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z"]} />
);

export const Squiggle = (p: DoodleProps) => (
  <Paths {...p} viewBox="0 0 40 92" d={["M20 4 C 31 14, 9 24, 20 34 C 31 44, 9 54, 20 66", "M9 58 C 13 63, 17 68, 20 72 C 23 68, 27 62, 31 58"]} />
);

export const Loop = (p: DoodleProps) => (
  <Paths {...p} viewBox="0 0 140 70" d={["M70 10 C 28 6, 8 22, 10 36 C 12 54, 46 64, 76 62 C 108 60, 132 46, 128 30 C 124 12, 92 4, 62 8 C 34 12, 16 24, 18 40"]} />
);

export const Underline = (p: DoodleProps) => (
  <Paths {...p} viewBox="0 0 200 16" d={["M2 9 C 40 4, 100 3, 198 7", "M8 12 C 70 9, 130 8, 188 11"]} />
);

export const Camera = (p: DoodleProps) => (
  <Paths
    {...p}
    viewBox="0 0 120 96"
    d={[
      "M14 32 C 14 26, 18 24, 24 24 L 40 24 L 46 14 L 74 14 L 80 24 L 96 24 C 104 24, 108 28, 108 36 L 108 74 C 108 80, 104 84, 96 84 L 24 84 C 16 84, 12 80, 12 72 Z",
      "M60 54 m-17 0 a17 17 0 1 0 34 0 a17 17 0 1 0 -34 0",
      "M60 54 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0",
      "M88 36 L 97 36",
      "M24 12 C 30 11, 34 11, 38 12",
    ]}
  />
);

/* Bits of translucent tape holding a print to the board. */
export function Tape({ variant = "top" }: { variant?: "top" | "corner" | "sides" }) {
  return <span className={`tape tape--${variant}`} aria-hidden="true" />;
}
