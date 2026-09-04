import { useEffect, useRef } from "react";
import type { Photo } from "../data/photos";
import Orbs from "./Orbs";
import { playShutter } from "./sfx";

interface FilmstripProps {
  photos: Photo[];
  captions: Record<string, string>;
  onOpen: (photo: Photo) => void;
}

export default function Filmstrip({ photos, captions, onOpen }: FilmstripProps) {
  const doubled = [...photos, ...photos];
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;
    const t = window.setTimeout(() => playShutter(0.1), 600);
    return () => window.clearTimeout(t);
  }, []);

  const tilt = (i: number) => (i % 2 === 0 ? "-1.6deg" : "1.4deg");

  return (
    <section className="filmstrip filmstrip--marquee" aria-label="Full-width moving slideshow">
      <Orbs variant="reel" />
      <p className="filmstrip__kicker">Scroll slowly</p>
      <div className="filmstrip__viewport filmstrip__viewport--marquee">
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
      </div>
      <div className="filmstrip__pair">
        <button
          type="button"
          className="filmstrip__feature filmstrip__feature--plain"
          onClick={() => {
            playShutter(0.14);
            onOpen(photos[4]);
          }}
          aria-label={`Open ${photos[4].title} larger`}
        >
          <img src={photos[4].thumb} alt={photos[4].title} loading="lazy" draggable={false} />
        </button>
        <button
          type="button"
          className="filmstrip__feature filmstrip__feature--copper"
          onClick={() => {
            playShutter(0.14);
            onOpen(photos[2]);
          }}
          aria-label={`Open ${photos[2].title} larger`}
        >
          <img src={photos[2].thumb} alt={photos[2].title} loading="lazy" draggable={false} />
          <span className="filmstrip__feature-caption">{captions[photos[2].id] ?? photos[2].title}</span>
        </button>
      </div>
    </section>
  );
}
