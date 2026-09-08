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

export function Heart({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--heart ${className}`} style={style} viewBox="0 0 36 36" aria-hidden="true">
      <path className="doodle__draw" d="M18 30 C18 30, 6 21, 6 12 C6 7.5, 9.5 4, 14 4 C16.5 4, 18 5.5, 18 5.5 C18 5.5, 19.5 4, 22 4 C26.5 4, 30 7.5, 30 12 C30 21, 18 30, 18 30 Z" />
    </svg>
  );
}

export function Spiral({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--spiral ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path className="doodle__draw" d="M20 20 m0 -12 a12 12 0 0 1 12 12 a8 8 0 0 1 -8 8 a4 4 0 0 1 -4 -4 a2 2 0 0 1 2 -2" />
    </svg>
  );
}

export function SunBurst({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--sunburst ${className}`} style={style} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="6" className="doodle__draw" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1="22" y1="6" x2="22" y2="10" className="doodle__draw" transform={`rotate(${a} 22 22)`} />
      ))}
    </svg>
  );
}

export function Paw({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--paw ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="24" r="7" className="doodle__draw" />
      <circle cx="13" cy="15" r="3" className="doodle__draw" />
      <circle cx="27" cy="15" r="3" className="doodle__draw" />
      <circle cx="17" cy="10" r="2.5" className="doodle__draw" />
      <circle cx="23" cy="10" r="2.5" className="doodle__draw" />
    </svg>
  );
}

export function Arrow({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--arrow ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path className="doodle__draw" d="M6 20 L34 20 M24 10 L34 20 L24 30" />
    </svg>
  );
}
