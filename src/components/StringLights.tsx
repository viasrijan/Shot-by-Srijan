import React, { useMemo, useState } from "react";

export type LightColor = "red" | "amber" | "green" | "blue" | "cyan";
export type LightMode = "twinkle" | "chase" | "glow" | "off";

interface StringLightsProps {
  position: "top" | "bottom";
  mode?: LightMode;
  onToggleMode?: () => void;
  showControl?: boolean;
}

// Sequence of vivid micro fairy jewel colors
const COLOR_SEQUENCE: LightColor[] = [
  "amber", "blue", "green", "red", "amber", "cyan", "green", "red",
  "blue", "amber", "green", "red", "cyan", "amber", "blue", "green",
  "red", "amber", "cyan", "green", "blue", "amber", "red", "green"
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

  // Randomized, crooked, tangled wire drops with long tails
  const bulbs = useMemo(() => {
    return COLOR_SEQUENCE.map((color, idx) => {
      // Varied long tail lengths (20px to 46px) and crooked tail tilts
      const tailLengths = [32, 44, 26, 40, 36, 48, 28, 42, 34, 46, 24, 38];
      const tailAngles = [-12, 14, -6, 18, -16, 8, -10, 16, -14, 10, -8, 12];
      const wireOffsets = [8, 16, 6, 20, 12, 22, 9, 18, 11, 24, 7, 19];

      const tailLen = tailLengths[idx % tailLengths.length];
      const tailRot = tailAngles[idx % tailAngles.length];
      const wireDrop = wireOffsets[idx % wireOffsets.length];

      return {
        id: idx,
        color,
        tailLen,
        tailRot,
        wireDrop,
        delay: ((idx * 0.16) % 1.8).toFixed(2),
        twinkleDelay: ((idx * 0.43) % 2.4).toFixed(2),
        speed: (1.4 + (idx % 4) * 0.35).toFixed(2),
      };
    });
  }, []);

  return (
    <div
      className={`string-lights string-lights--tangled string-lights--${position} string-lights--mode-${activeMode}`}
      role="region"
      aria-label={`${position === "top" ? "Upper" : "Lower"} micro tangled fairy string lights`}
    >
      {/* SVG Crooked, Kinked, Organic Tangled Cable */}
      <svg
        className="string-lights__tangled-wire-svg"
        viewBox="0 0 1600 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`tangled-wire-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a0d0b" />
            <stop offset="25%" stopColor="#171e18" />
            <stop offset="50%" stopColor="#0d110e" />
            <stop offset="75%" stopColor="#182019" />
            <stop offset="100%" stopColor="#0b0e0c" />
          </linearGradient>
        </defs>

        {/* Primary thin crooked wire with kinks and irregular dips */}
        <path
          d="M 0,14 Q 45,26 95,16 T 190,28 T 285,12 T 380,32 T 480,18 T 575,34 T 670,16 T 765,30 T 860,14 T 960,33 T 1055,17 T 1150,31 T 1245,15 T 1345,34 T 1440,16 T 1535,29 T 1600,15"
          fill="none"
          stroke={`url(#tangled-wire-${position})`}
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Secondary overlapping twisted wire strand with crossover loops */}
        <path
          d="M 0,16 Q 50,11 100,24 T 195,14 T 290,30 T 385,15 T 485,31 T 580,14 T 675,33 T 770,17 T 865,29 T 965,15 T 1060,32 T 1155,16 T 1250,30 T 1350,18 T 1445,32 T 1540,15 T 1600,22"
          fill="none"
          stroke="#070908"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>

      {/* Micro Bulbs with Long Slender Wire Tails */}
      <div className="string-lights__garland" aria-hidden="true">
        {bulbs.map((b) => (
          <div
            key={b.id}
            className={`micro-node micro-node--${b.color}`}
            style={{
              "--bulb-delay": `${b.delay}s`,
              "--twinkle-delay": `${b.twinkleDelay}s`,
              "--twinkle-dur": `${b.speed}s`,
              marginTop: `${b.wireDrop}px`,
            } as React.CSSProperties}
          >
            {/* Long Crooked Wire Tail dropping down from main cord */}
            <div
              className="micro-tail"
              style={{
                height: `${b.tailLen}px`,
                transform: `rotate(${b.tailRot}deg)`,
                transformOrigin: "top center",
              }}
            >
              {/* Slender crooked wire strand */}
              <div className="micro-tail__wire" />

              {/* Slim heat-shrink tube collar */}
              <div className="micro-stem">
                <div className="micro-stem__band" />
              </div>

              {/* Tiny Micro-Rice LED Bulb */}
              <div className={`micro-bulb micro-bulb--${b.color}`}>
                {/* Intense point filament */}
                <div className="micro-bulb__core" />
                {/* Translucent glass dome */}
                <div className="micro-bulb__glass" />
              </div>

              {/* Delicate colored surface glow pool */}
              <div className={`micro-glow micro-glow--${b.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Discreet Mode Switch Button */}
      {showControl && (
        <button
          type="button"
          className="string-lights__ctrl"
          onClick={cycleMode}
          title={`Fairy Lights: ${activeMode.toUpperCase()} (Click to toggle)`}
          aria-label={`Toggle fairy lights mode, currently ${activeMode}`}
        >
          <span className="string-lights__ctrl-dot" />
          <span className="string-lights__ctrl-label">{activeMode.toUpperCase()}</span>
        </button>
      )}
    </div>
  );
}
