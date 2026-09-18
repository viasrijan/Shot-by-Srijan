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

export function Arrow({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--arrow ${className}`} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path className="doodle__draw" d="M6 20 L34 20 M24 10 L34 20 L24 30" />
    </svg>
  );
}

export function Aperture({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--aperture ${className}`} style={style} viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="18" className="doodle__draw" />
      <line x1="22" y1="4" x2="34" y2="18" className="doodle__draw doodle__draw--soft" />
      <line x1="38" y1="14" x2="36" y2="30" className="doodle__draw doodle__draw--soft" />
      <line x1="40" y1="26" x2="26" y2="38" className="doodle__draw doodle__draw--soft" />
      <line x1="26" y1="40" x2="12" y2="34" className="doodle__draw doodle__draw--soft" />
      <line x1="6" y1="30" x2="8" y2="14" className="doodle__draw doodle__draw--soft" />
      <line x1="4" y1="18" x2="18" y2="6" className="doodle__draw doodle__draw--soft" />
    </svg>
  );
}

export function FilmRoll({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--filmroll ${className}`} style={style} viewBox="0 0 48 38" aria-hidden="true">
      <rect x="4" y="6" width="22" height="26" rx="2" className="doodle__draw" />
      <line x1="4" y1="10" x2="26" y2="10" className="doodle__draw doodle__draw--soft" />
      <line x1="4" y1="28" x2="26" y2="28" className="doodle__draw doodle__draw--soft" />
      <circle cx="15" cy="4" r="2.5" className="doodle__draw" />
      <circle cx="15" cy="34" r="2.5" className="doodle__draw" />
      <path d="M 26,14 Q 38,12 44,18 L 44,24 Q 38,20 26,22" className="doodle__draw" />
      <circle cx="34" cy="16" r="1" className="doodle__dot" />
      <circle cx="40" cy="18" r="1" className="doodle__dot" />
    </svg>
  );
}

export function Viewfinder({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--viewfinder ${className}`} style={style} viewBox="0 0 36 36" aria-hidden="true">
      <path d="M 4,12 L 4,4 L 12,4" className="doodle__draw" />
      <path d="M 24,4 L 32,4 L 32,12" className="doodle__draw" />
      <path d="M 32,24 L 32,32 L 24,32" className="doodle__draw" />
      <path d="M 12,32 L 4,32 L 4,24" className="doodle__draw" />
      <line x1="16" y1="18" x2="20" y2="18" className="doodle__draw doodle__draw--soft" />
      <line x1="18" y1="16" x2="18" y2="20" className="doodle__draw doodle__draw--soft" />
    </svg>
  );
}

export function BotanicalLeaf({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--botanical ${className}`} style={style} viewBox="0 0 40 44" aria-hidden="true">
      <path d="M 6,38 Q 18,24 28,6" className="doodle__draw" />
      <path d="M 14,30 Q 18,22 10,18 Q 18,24 14,30" className="doodle__draw doodle__draw--soft" />
      <path d="M 20,22 Q 28,18 26,10 Q 22,18 20,22" className="doodle__draw doodle__draw--soft" />
      <path d="M 24,14 Q 34,14 36,8 Q 28,10 24,14" className="doodle__draw doodle__draw--soft" />
    </svg>
  );
}

export function Shine({ className = "", style }: DoodleProps) {
  return (
    <svg className={`doodle doodle--shine ${className}`} style={style} viewBox="0 0 32 32" aria-hidden="true">
      <line x1="16" y1="2" x2="16" y2="30" className="doodle__draw" />
      <line x1="2" y1="16" x2="30" y2="16" className="doodle__draw" />
      <line x1="6" y1="6" x2="26" y2="26" className="doodle__draw doodle__draw--soft" />
      <line x1="26" y1="6" x2="6" y2="26" className="doodle__draw doodle__draw--soft" />
    </svg>
  );
}
