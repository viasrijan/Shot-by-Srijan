import { useState } from "react";
import { photos, categories } from "../data/photos";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visible =
    filter === "all" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-paper-dim">
          the contact sheet
        </p>
        <h1 className="mt-3 font-display text-4xl font-light md:text-6xl">
          The <span className="italic text-safelight">Gallery</span>
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-dim">
          {photos.length} frames, straight from the roll. Click any image to
          view it large — arrow keys navigate, Esc closes.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap gap-2 border-y border-ink-line/60 py-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`border px-4 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
              filter === c
                ? "border-safelight bg-safelight text-ink"
                : "border-ink-line text-paper-dim hover:border-paper-dim hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((p) => {
          const realIndex = photos.indexOf(p);
          return (
            <button
              key={p.id}
              onClick={() => setLightboxIndex(realIndex)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden text-left"
            >
              <img
                src={p.thumb}
                alt={p.title}
                loading="lazy"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div>
                  <div className="font-display italic">{p.title}</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-paper-dim">
                    {p.category}
                  </div>
                </div>
                <span className="border border-paper/40 px-2 py-0.5 font-mono text-[9px] tracking-widest text-paper-dim">
                  {p.frame.replace("Frame ", "#")}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
