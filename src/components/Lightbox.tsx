import { useCallback, useEffect, useRef } from "react";
import { Photo, formatCamera } from "../data/photos";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];
  const touchStart = useRef<number | null>(null);
  const prev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!photo) return null;

  return (
    <div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${photo.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(distance) > 50) (distance > 0 ? prev : next)();
        touchStart.current = null;
      }}
    >
      <div className="viewer__topline">
        <span>{photo.frame} <i>/</i> {String(photos.length).padStart(2, "0")}</span>
        <button type="button" onClick={onClose} className="viewer__close">Close <b>×</b></button>
      </div>

      <div className="viewer__stage">
        <button type="button" onClick={prev} className="viewer__arrow viewer__arrow--prev" aria-label="Previous frame">←</button>
        <img key={photo.src} src={photo.src} alt={photo.title} className="viewer__image" />
        <button type="button" onClick={next} className="viewer__arrow viewer__arrow--next" aria-label="Next frame">→</button>
      </div>

      <div className="viewer__bottomline">
        <div>
          <h2>{photo.title}</h2>
          <p>{formatCamera(photo.camera)} · {photo.date}</p>
        </div>
        <span className="viewer__hint">← → / swipe</span>
      </div>
    </div>
  );
}
