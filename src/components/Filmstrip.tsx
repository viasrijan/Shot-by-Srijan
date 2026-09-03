import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../data/photos";
import HandFrame from "./HandFrame";

interface FilmstripProps {
  photos: Photo[];
  captions: Record<string, string>;
  onOpen: (photo: Photo) => void;
}

export default function Filmstrip({ photos, captions, onOpen }: FilmstripProps) {
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = window.setInterval(() => go(1), 4800);
    return () => window.clearInterval(timer);
  }, [paused, count, go]);

  const tilt = (i: number) => (i % 2 === 0 ? "-1.4deg" : "1.2deg");

  return (
    <section
      className="filmstrip"
      aria-label="Full-width slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="filmstrip__heading">
        <span>01 — The reel</span>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>
      <div
        className="filmstrip__viewport"
        onTouchStart={(event) => {
          touchX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const start = touchX.current;
          touchX.current = null;
          if (start === null) return;
          const dx = (event.changedTouches[0]?.clientX ?? 0) - start;
          if (Math.abs(dx) > 44) go(dx > 0 ? -1 : 1);
        }}
      >
        <div className="filmstrip__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((photo, i) => (
            <div className="filmstrip__slide" key={photo.id} aria-hidden={i !== index}>
              <button
                type="button"
                className="filmstrip__frame"
                style={{ ["--tilt" as string]: tilt(i) }}
                onClick={() => onOpen(photo)}
                aria-label={`Open ${photo.title} larger`}
                tabIndex={i === index ? 0 : -1}
              >
                <span className="filmstrip__imgwrap">
                  <img src={photo.thumb} alt={photo.title} loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                  <HandFrame variant={i % 3} ratio="wide" />
                </span>
                <span className="filmstrip__caption">
                  <strong>{photo.title}</strong>
                  <em>{captions[photo.id] ?? photo.category}</em>
                </span>
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="filmstrip__arrow filmstrip__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Previous photograph"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 5 L8 12 L15 19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="filmstrip__arrow filmstrip__arrow--next"
          onClick={() => go(1)}
          aria-label="Next photograph"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M9 5 L16 12 L9 19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="filmstrip__dots">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className={`filmstrip__dot${i === index ? " filmstrip__dot--active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Photograph ${i + 1} of ${count}`}
          />
        ))}
      </div>
    </section>
  );
}
