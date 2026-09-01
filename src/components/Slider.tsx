import { useCallback, useEffect, useRef, useState } from "react";
import { formatCamera, type Photo } from "../data/photos";
import HandFrame from "./HandFrame";

interface SliderProps {
  photos: Photo[];
  onOpen: (photo: Photo) => void;
}

export default function Slider({ photos, onOpen }: SliderProps) {
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const timer = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(timer);
  }, [paused, count, go]);

  return (
    <section
      className="slider"
      aria-label="Selected photographs"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="slider__heading">
        <span>01 — Selected frames</span>
        <span>{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
      </div>
      <div
        className="slider__stage"
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
        <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((photo, i) => (
            <div className="slider__slide" key={photo.id} aria-hidden={i !== index}>
              <button
                type="button"
                className="slider__frame"
                onClick={() => onOpen(photo)}
                aria-label="Open image larger"
                tabIndex={i === index ? 0 : -1}
              >
                <img src={photo.thumb} alt={photo.title} loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                <HandFrame variant={i % 3} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="slider__arrow slider__arrow--prev" onClick={() => go(-1)} aria-label="Previous photograph">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="slider__arrow slider__arrow--next" onClick={() => go(1)} aria-label="Next photograph">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="slider__dots">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className={`slider__dot${i === index ? " slider__dot--active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Photograph ${i + 1} of ${count}`}
          />
        ))}
      </div>
      <div className="slider__caption" aria-live="polite">
        <div><strong>{photos[index].title}</strong><span>{photos[index].category}</span></div>
        <span>{formatCamera(photos[index].camera)}</span>
      </div>
    </section>
  );
}
