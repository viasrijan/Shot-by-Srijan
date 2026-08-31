import { useEffect, useCallback } from "react";
import { Photo, formatCamera } from "../data/photos";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
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
      className="lb-in fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-ink-line/60 px-5 py-3 md:px-8">
        <span className="font-display text-sm italic text-paper-dim">
          frame {photo.frame.replace("Frame ", "")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="text-[11px] uppercase tracking-[0.3em] text-paper-dim transition-colors hover:text-safelight"
          aria-label="Close"
        >
          close ✕
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 md:p-10">
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ink-line bg-ink/70 px-3 py-5 font-display text-xl italic text-paper-dim transition-colors hover:text-paper md:left-6"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.title}
          className="lb-in max-h-full max-w-full object-contain shadow-2xl"
        />
        <button
          onClick={next}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ink-line bg-ink/70 px-3 py-5 font-display text-xl italic text-paper-dim transition-colors hover:text-paper md:right-6"
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      <div className="border-t border-ink-line/60 px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className="font-display text-lg italic">{photo.title}</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">
            {photo.category} · {formatCamera(photo.camera)} · {photo.date}
          </p>
        </div>
      </div>
    </div>
  );
}
