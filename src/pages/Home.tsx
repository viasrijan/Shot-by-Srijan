import { useState } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Slider from "../components/Slider";

const featured = [0, 1, 4, 7, 9, 12].map((i) => photos[i]);
const bands = [
  { id: "a", bg: photos[2], items: [photos[2], photos[3], photos[5], photos[6]] },
  { id: "b", bg: photos[11], items: [photos[8], photos[10], photos[11]] },
  { id: "c", bg: photos[14], items: [photos[13], photos[14], photos[15]] },
];

function Shot({ photo, variant, onOpen }: { photo: Photo; variant: number; onOpen: () => void }) {
  return (
    <figure className={`shot${photo.orientation === "portrait" ? " shot--portrait" : ""}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label="Open image larger">
        <img src={photo.thumb} alt="" loading="lazy" />
        <HandFrame variant={variant} />
      </button>
    </figure>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const open = (photo: Photo) => setViewerIndex(photos.indexOf(photo));

  return (
    <div className="archive">
      <section className="hero">
        <Reveal>
          <h1>Shot by Srijan</h1>
          <svg className="hero__underline" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
            <path d="M1 5.6 C 22 3.4, 48 3.1, 99 4.8" />
          </svg>
        </Reveal>
      </section>

      <Slider photos={featured} onOpen={open} />

      {bands.map((band) => (
        <section key={band.id} className={`band band--${band.id}`}>
          <div className="band__bg" aria-hidden="true">
            <img src={band.bg.thumb} alt="" loading="lazy" />
            <div className="band__scrim" />
          </div>
          <div className="band__inner">
            {band.items.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 90} className={`band-slot band-slot--${i}`}>
                <Shot photo={photo} variant={i} onOpen={() => open(photo)} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {viewerIndex !== null && (
        <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />
      )}
    </div>
  );
}
