import { useCallback, useEffect } from "react";
import { Photo, formatCamera } from "../data/photos";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];
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
    <div className="lb-in fixed inset-0 z-[70] flex flex-col bg-black" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 md:px-8">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{photo.frame} / {String(photos.length).padStart(2, "0")}</span>
        <button onClick={onClose} className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent">Close ×</button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center p-5 md:p-12">
        <button onClick={prev} className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center border border-line font-serif text-2xl text-muted transition-colors hover:border-white hover:text-white md:left-8" aria-label="Previous photo">←</button>
        <img key={photo.src} src={photo.src} alt={photo.title} className="lb-in max-h-full max-w-full object-contain" />
        <button onClick={next} className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center border border-line font-serif text-2xl text-muted transition-colors hover:border-white hover:text-white md:right-8" aria-label="Next photo">→</button>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-line px-5 py-4 md:flex-row md:items-center md:px-8">
        <h3 className="font-serif text-xl italic">{photo.title}</h3>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">{photo.category} · {formatCamera(photo.camera)} · {photo.date}</p>
      </div>
    </div>
  );
}
