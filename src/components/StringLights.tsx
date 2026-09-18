import React, { useMemo, useState } from "react";

export type LightColor = "red" | "green" | "amber" | "blue";
export type LightMode = "twinkle" | "chase" | "glow" | "off";

interface StringLightsProps {
  position: "top" | "bottom";
  mode?: LightMode;
  onToggleMode?: () => void;
  showControl?: boolean;
}

// Sequence matching the user's reference photo
const COLOR_SEQUENCE: LightColor[] = [
  "red",
  "green",
  "amber",
  "blue",
  "green",
  "amber",
  "red",
  "blue",
  "amber",
  "green",
  "red",
  "blue",
  "amber",
  "green",
  "blue",
  "red",
];

export default function StringLights({
  position,
  mode: propMode,
  onToggleMode,
  showControl = false,
}: StringLightsProps) {
  const [internalMode, setInternalMode] = useState<LightMode>("twinkle");
  const activeMode = propMode ?? internalMode;

  const cycleMode = () => {
    if (onToggleMode) {
      onToggleMode();
    } else {
      setInternalMode((curr) => {
        if (curr === "twinkle") return "chase";
        if (curr === "chase") return "glow";
        if (curr === "glow") return "off";
        return "twinkle";
      });
    }
  };

  const bulbs = useMemo(() => {
    return COLOR_SEQUENCE.map((color, idx) => ({
      id: idx,
      color,
      delay: (idx * 0.18).toFixed(2),
      twinkleDelay: ((idx * 0.37) % 2.1).toFixed(2),
      sagOffset: Math.sin((idx / (COLOR_SEQUENCE.length - 1)) * Math.PI * 4) * 4,
    }));
  }, []);

  return (
    <div
      className={`string-lights string-lights--${position} string-lights--mode-${activeMode}`}
      role="region"
      aria-label={`${position === "top" ? "Upper" : "Lower"} festive garland string lights`}
    >
      {/* SVG Twisted Drooping Wire Cable */}
      <svg
        className="string-lights__wire-svg"
        viewBox="0 0 1600 65"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wire-grad-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#101511" />
            <stop offset="25%" stopColor="#1a231c" />
            <stop offset="50%" stopColor="#121813" />
            <stop offset="75%" stopColor="#1b241d" />
            <stop offset="100%" stopColor="#0f1410" />
          </linearGradient>
          <filter id={`wire-shadow-${position}`} x="-5%" y="-20%" width="110%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Primary twisted strand */}
        <path
          d="M 0,22 Q 100,38 200,24 Q 300,40 400,23 Q 500,39 600,24 Q 700,41 800,23 Q 900,40 1000,24 Q 1100,39 1200,23 Q 1300,41 1400,24 Q 1500,38 1600,22"
          fill="none"
          stroke={`url(#wire-grad-${position})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          filter={`url(#wire-shadow-${position})`}
        />

        {/* Intertwined secondary copper/insulation twist */}
        <path
          d="M 0,21 Q 100,36 200,23 Q 300,38 400,22 Q 500,37 600,23 Q 700,39 800,22 Q 900,38 1000,23 Q 1100,37 1200,22 Q 1300,39 1400,23 Q 1500,36 1600,21"
          fill="none"
          stroke="#0b0e0c"
          strokeWidth="1.6"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* Bulbs & Sockets track */}
      <div className="string-lights__garland" aria-hidden="true">
        {bulbs.map((b) => (
          <div
            key={b.id}
            className={`garland-node garland-node--${b.color}`}
            style={{
              "--bulb-delay": `${b.delay}s`,
              "--twinkle-delay": `${b.twinkleDelay}s`,
              transform: `translateY(${b.sagOffset}px)`,
            } as React.CSSProperties}
          >
            {/* Ambient wall bloom (soft colorful halo on the wall like in the photo) */}
            <div className={`bulb-ambient bulb-ambient--${b.color}`} />

            {/* Dark molded socket collar */}
            <div className="socket-collar">
              <div className="socket-collar__clip" />
              <div className="socket-collar__body">
                <span className="socket-collar__ridge" />
                <span className="socket-collar__ridge" />
              </div>
            </div>

            {/* Translucent capsule bulb matching the reference image */}
            <div className={`capsule-bulb capsule-bulb--${b.color}`}>
              {/* Glossy specular reflection highlight */}
              <div className="capsule-bulb__highlight" />
              {/* White-hot diode filament emitter */}
              <div className="capsule-bulb__filament" />
              {/* Translucent colored outer casing */}
              <div className="capsule-bulb__glass" />
            </div>
          </div>
        ))}
      </div>

      {/* Discreet Mode Controller */}
      {showControl && (
        <button
          type="button"
          className="string-lights__ctrl"
          onClick={cycleMode}
          title={`String Lights: ${activeMode.toUpperCase()} (Click to change mode)`}
          aria-label={`Toggle fairy lights mode, currently ${activeMode}`}
        >
          <span className="string-lights__ctrl-dot" />
          <span className="string-lights__ctrl-label">{activeMode.toUpperCase()}</span>
        </button>
      )}
    </div>
  );
}
