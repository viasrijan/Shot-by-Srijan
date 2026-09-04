import { useEffect, useRef } from "react";
import type { Photo } from "../data/photos";
import Orbs from "./Orbs";
import { Diamond, Sparkle, Star } from "./Doodles";
import { playShutter } from "./sfx";

interface FilmstripProps {
  photos: Photo[];
  onOpen: (photo: Photo) => void;
}

const CELL_DOODLES = [Star, Sparkle, Diamond];

export default function Filmstrip({ photos, onOpen }: FilmstripProps) {
  const doubled = [...photos, ...photos];
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    const t = window.setTimeout(() => playShutter(0.1), 600);
    return () => window.clearTimeout(t);
  }, []);

  const tilt = (i: number) => (i % 2 === 0 ? "-1.4deg" : "1.2deg");

  return (
    <section className="filmstrip filmstrip--marquee" aria-label="Full-width moving slideshow">
      <Orbs variant="reel" />
      <div className="filmstrip__heading">
        <span>01 — The reel</span>
        <span>Moving slider · hover to pause</span>
      </div>
      <div className="filmstrip__viewport filmstrip__viewport--marquee">
        <div className="filmstrip__marquee">
          {doubled.map((photo, i) => {
            const Doodle = CELL_DOODLES[i % CELL_DOODLES.length];
            return (
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
                <Doodle className="filmstrip__doodle" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
