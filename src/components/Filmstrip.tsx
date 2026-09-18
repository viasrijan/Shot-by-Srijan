import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../data/photos";
import { playShutter } from "./sfx";
import LedStrip, { type LedMode, type LedSpeed } from "./LedStrip";

interface FilmstripProps {
  photos: Photo[];
  onOpen: (photo: Photo) => void;
}

export default function Filmstrip({ photos, onOpen }: FilmstripProps) {
  const doubled = [...photos, ...photos];
  const played = useRef(false);

  // Synchronized LED strip settings (Amazon-style RGB strip controls)
  const [ledMode, setLedMode] = useState<LedMode>("flash");
  const [ledSpeed, setLedSpeed] = useState<LedSpeed>("normal");

  const cycleMode = useCallback(() => {
    const modes: LedMode[] = ["flash", "rainbow", "pulse", "warm"];
    setLedMode((curr) => {
      if (curr === "off") return "flash";
      const nextIdx = (modes.indexOf(curr) + 1) % modes.length;
      return modes[nextIdx];
    });
  }, []);

  const cycleSpeed = useCallback(() => {
    const speeds: LedSpeed[] = ["chill", "normal", "fast"];
    setLedSpeed((curr) => {
      const nextIdx = (speeds.indexOf(curr) + 1) % speeds.length;
      return speeds[nextIdx];
    });
  }, []);

  const togglePower = useCallback(() => {
    setLedMode((curr) => (curr === "off" ? "flash" : "off"));
  }, []);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    const t = window.setTimeout(() => playShutter(0.1), 600);
    return () => window.clearTimeout(t);
  }, []);

  const tilt = (i: number) => (i % 2 === 0 ? "1.6deg" : "-1.4deg");

  return (
    <section className="filmstrip filmstrip--marquee" aria-label="Full-width moving slideshow">
      <div className="filmstrip__viewport filmstrip__viewport--marquee">
        {/* Realistic Amazon-style Animated Flashing LED Strip (Above Slider Images) */}
        <LedStrip
          position="top"
          mode={ledMode}
          speed={ledSpeed}
          showController={true}
          onCycleMode={cycleMode}
          onCycleSpeed={cycleSpeed}
          onTogglePower={togglePower}
        />

        <div className="filmstrip__marquee">
          {doubled.map((photo, i) => (
            <button
              key={`${photo.id}-${i}`}
              type="button"
              className="filmstrip__cell"
              style={{ ["--tilt" as string]: tilt(i) }}
              onClick={() => {
                playShutter(0.14);
                onOpen(photo);
              }}
              aria-label={`Open ${photo.title} larger`}
            >
              <span className="filmstrip__imgwrap">
                <img src={photo.thumb} alt={photo.title} loading={i < 4 ? "eager" : "lazy"} draggable={false} />
              </span>
            </button>
          ))}
        </div>

        {/* Realistic Amazon-style Animated Flashing LED Strip (Below Slider Images) */}
        <LedStrip
          position="bottom"
          mode={ledMode}
          speed={ledSpeed}
        />
      </div>
    </section>
  );
}
