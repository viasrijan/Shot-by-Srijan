import React, { useMemo } from "react";

export type LedMode = "flash" | "rainbow" | "pulse" | "warm" | "off";
export type LedSpeed = "chill" | "normal" | "fast";

interface LedStripProps {
  position: "top" | "bottom";
  mode: LedMode;
  speed: LedSpeed;
  showController?: boolean;
  onCycleMode?: () => void;
  onCycleSpeed?: () => void;
  onTogglePower?: () => void;
}

// 42 diodes across full-width ribbon (authentic 30 LEDs/meter density)
const TOTAL_LEDS = 42;

export default function LedStrip({
  position,
  mode,
  speed,
  showController = false,
  onCycleMode,
  onCycleSpeed,
  onTogglePower,
}: LedStripProps) {
  const diodes = useMemo(() => Array.from({ length: TOTAL_LEDS }, (_, i) => i), []);

  const speedClass = `led-strip--speed-${speed}`;
  const modeClass = `led-strip--mode-${mode}`;
  const positionClass = `led-strip--${position}`;

  return (
    <div
      className={`led-strip-container ${positionClass} ${modeClass} ${speedClass}`}
      role="region"
      aria-label={`${position === "top" ? "Upper" : "Lower"} LED Light Strip`}
    >
      {/* Diffuse Wall & Stage Glow Reflection */}
      <div
        className={`led-strip__ambient-wash ${modeClass} ${speedClass}`}
        aria-hidden="true"
      />

      {/* Main Flexible PCB Ribbon */}
      <div className={`led-strip ${modeClass} ${speedClass}`}>
        {/* Top copper bus trace */}
        <div className="led-strip__bus-rail led-strip__bus-rail--top" aria-hidden="true" />

        {/* Individual Diodes and Solder Segments */}
        <div className="led-strip__track" aria-hidden="true">
          {diodes.map((idx) => {
            const isCutPoint = idx % 3 === 2 && idx !== TOTAL_LEDS - 1;

            return (
              <React.Fragment key={idx}>
                {/* SMD 5050 LED Unit */}
                <div
                  className="led-strip__node"
                  style={{ "--diode-i": idx } as React.CSSProperties}
                >
                  <div className="led-smd-5050">
                    {/* Metal solder pins (3 on left, 3 on right) */}
                    <div className="led-smd-5050__pins led-smd-5050__pins--left">
                      <span /><span /><span />
                    </div>

                    {/* Plastic chip body with polarity notch */}
                    <div className="led-smd-5050__package">
                      <div className="led-smd-5050__notch" />
                      {/* Circular phosphor lens dome */}
                      <div className="led-smd-5050__lens">
                        {/* 3 micro dies (R, G, B) */}
                        <div className="led-smd-5050__die led-smd-5050__die--r" />
                        <div className="led-smd-5050__die led-smd-5050__die--g" />
                        <div className="led-smd-5050__die led-smd-5050__die--b" />
                        {/* Intense emitter core */}
                        <div className="led-smd-5050__core" />
                      </div>
                    </div>

                    <div className="led-smd-5050__pins led-smd-5050__pins--right">
                      <span /><span /><span />
                    </div>
                  </div>

                  {/* Surface micro-resistor between LEDs */}
                  {idx % 3 === 0 && (
                    <div className="led-strip__smd-resistor" title="151 SMD Resistor">
                      <span>151</span>
                    </div>
                  )}
                </div>

                {/* Solder joint & cut marks every 3 diodes */}
                {isCutPoint && (
                  <div className="led-strip__solder-pad" title="Cut line">
                    <div className="led-strip__pads">
                      <span title="+12V">+</span>
                      <span title="G">G</span>
                      <span title="R">R</span>
                      <span title="B">B</span>
                    </div>
                    <div className="led-strip__cut-line">
                      <svg viewBox="0 0 16 16" className="led-strip__scissor-icon">
                        <path
                          d="M3 3a1.5 1.5 0 1 1 2.12 2.12L7.5 7.5 5.12 9.88A1.5 1.5 0 1 1 3 11a1.5 1.5 0 0 1 2.12-2.12L7.5 6.5l2.38 2.38A1.5 1.5 0 1 1 12 11a1.5 1.5 0 0 1-2.12-2.12L7.5 6.5 9.88 4.12A1.5 1.5 0 1 1 12 3a1.5 1.5 0 0 1-2.12 2.12L7.5 7.5 5.12 5.12A1.5 1.5 0 0 1 3 3z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom copper bus trace */}
        <div className="led-strip__bus-rail led-strip__bus-rail--bottom" aria-hidden="true" />
      </div>

      {/* Realistic Amazon-style Inline 3-Button Controller (on upper strip) */}
      {showController && (
        <div className="led-controller" aria-label="LED Strip Controls">
          <div className="led-controller__cord led-controller__cord--in" />
          <div className="led-controller__body">
            <div className="led-controller__brand">RGB 5050</div>
            
            {/* Power Button */}
            <button
              type="button"
              className={`led-controller__btn ${mode !== "off" ? "led-controller__btn--on" : ""}`}
              onClick={onTogglePower}
              title={`Power (${mode === "off" ? "Turn On" : "Turn Off"})`}
              aria-label="Toggle LED strip power"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0" strokeLinecap="round" />
              </svg>
            </button>

            {/* Mode Button */}
            <button
              type="button"
              className="led-controller__btn"
              onClick={onCycleMode}
              title={`Mode: ${mode.toUpperCase()} (Click to switch)`}
              aria-label={`Change LED lighting mode, currently ${mode}`}
              disabled={mode === "off"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 4h16v16H4z M9 9h6v6H9z" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Speed Button */}
            <button
              type="button"
              className="led-controller__btn"
              onClick={onCycleSpeed}
              title={`Speed: ${speed.toUpperCase()} (Click to adjust)`}
              aria-label={`Change animation speed, currently ${speed}`}
              disabled={mode === "off"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>

            <div className="led-controller__indicator" style={{
              backgroundColor: mode === "off" ? "#333" : "var(--led-active-color, #00ffaa)",
              boxShadow: mode === "off" ? "none" : "0 0 6px var(--led-active-color, #00ffaa)"
            }} />
          </div>
          <div className="led-controller__cord led-controller__cord--out" />
          
          <div className="led-controller__badge">
            <span className="led-controller__mode-tag">
              {mode === "off" ? "OFF" : `${mode.toUpperCase()} • ${speed.toUpperCase()}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
