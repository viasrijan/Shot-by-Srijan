import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../data/photos";
import { playShutter } from "./sfx";
import StringLights, { type LightMode } from "./StringLights";

interface FilmstripProps {
  photos: Photo[];
  onOpen: (photo: Photo) => void;
}

export default function Filmstrip({ photos, onOpen }: FilmstripProps) {
  const doubled = [...photos, ...photos];
  const played = useRef(false);

  // Synchronized Garland String Lights
  const [lightMode, setLightMode] = useState<LightMode>("twinkle");

  const toggleMode = useCallback(() => {
    setLightMode((curr) => {
      if (curr === "twinkle") return "chase";
      if (curr === "chase") return "glow";
      if (curr === "glow") return "off";
      return "twinkle";
    });
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
        {/* Fairy/Garland String Lights (Above Slider Images) */}
        <StringLights
          position="top"
          mode={lightMode}
          onToggleMode={toggleMode}
          showControl={true}
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

        {/* Fairy/Garland String Lights (Below Slider Images) */}
        <StringLights
          position="bottom"
          mode={lightMode}
        />
      </div>
    </section>
  );
}
