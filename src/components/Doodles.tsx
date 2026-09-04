import type { CSSProperties } from "react";

export type DoodleProps = { className?: string; style?: CSSProperties };

export function Tape({ className = "", rotate = "-6deg", style }: DoodleProps & { rotate?: string }) {
  return (
    <svg
      className={`doodle doodle--tape ${className}`}
      style={{ ...style, ["--doodle-rotate" as string]: rotate } as CSSProperties}
      viewBox="0 0 120 32"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="116" height="24" className="doodle__draw" />
      <line x1="14" y1="4" x2="8" y2="28" className="doodle__draw doodle__draw--soft" />
      <line x1="30" y1="4" x2="24" y2="28" className="doodle__draw doodle__draw--soft" />
    </svg>
  );
}

export function Star({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--star ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path className="doodle__draw" d="M20 3 L23.5 15 L36 15 L26 22.5 L29.5 35 L20 27.5 L10.5 35 L14 22.5 L4 15 L16.5 15 Z" />
    </svg>
  );
}

export function Diamond({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--diamond ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path className="doodle__draw" d="M20 4 L34 16 L20 36 L6 16 Z M6 16 L34 16 M20 4 L14 16 L20 36 M20 4 L26 16 L20 36" />
    </svg>
  );
}

export function Camera({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--camera ${className}`} style={style} viewBox="0 0 48 36" aria-hidden="true">
      <rect x="3" y="9" width="42" height="24" rx="3" className="doodle__draw" />
      <path className="doodle__draw" d="M16 9 L19 3 L29 3 L32 9" />
      <circle cx="24" cy="21" r="7" className="doodle__draw" />
      <circle cx="37" cy="14" r="1.6" className="doodle__dot" />
    </svg>
  );
}

export function Sparkle({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--sparkle ${className}`} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path className="doodle__draw" d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
    </svg>
  );
}

export function Flower({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--flower ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          className="doodle__draw"
          style={{ animationDelay: `${120 + a * 2}ms` }}
          d="M20 16.6 C16.8 13.4, 16.8 8.4, 20 5.2 C23.2 8.4, 23.2 13.4, 20 16.6 Z"
          transform={`rotate(${a} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="3" className="doodle__draw" style={{ animationDelay: "260ms" }} />
    </svg>
  );
}
