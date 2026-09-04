import { useCallback, useEffect, useRef } from "react";
import { Photo } from "../data/photos";

interface LightboxProps { photos: Photo[]; index: number; onClose: () => void; onNavigate: (index: number) => void; }

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];
  const touchStart = useRef<number | null>(null);
  const prev = useCallback(() => onNavigate((index - 1 + photos.length) % photos.length), [index, photos.length, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowLeft") prev(); if (event.key === "ArrowRight") next(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, prev, next]);

  if (!photo) return null;

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label="Fullscreen image viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current; if (Math.abs(distance) > 50) (distance > 0 ? prev : next)(); touchStart.current = null; }}>
      <button type="button" className="viewer__close" onClick={onClose} aria-label="Close viewer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" onClick={prev} className="viewer__arrow viewer__arrow--prev" aria-label="Previous image">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5 L8 12 L15 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <img key={photo.src} src={photo.src} alt={photo.title} className="viewer__image" />
      <button type="button" onClick={next} className="viewer__arrow viewer__arrow--next" aria-label="Next image">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5 L16 12 L9 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
