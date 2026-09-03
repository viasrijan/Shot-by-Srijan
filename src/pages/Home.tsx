import { useState } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Filmstrip from "../components/Filmstrip";

const heroPhoto = photos[0];

const reel = photos;

const CAPTIONS: Record<string, string> = {
  "dsc00098-2": "held that stare a second too long",
  "dsc00648": "the moon doing overtime",
  "dsc00681-4": "blink and you'd miss it",
  "dsc00988": "walls keep good secrets",
  "dsc01073": "golden hour, no filter needed",
  "dsc01088": "small things, big mood",
  "dsc01204-1": "primary colours, accidental art",
  "dsc01368": "peeking through the green",
  "dsc01370": "a quiet place to land",
  "dsc01429-2": "main-character energy",
  "dsc02400": "sunday best",
  "dsc02987": "chasing window light",
  "dsc03153": "tiny supervisor on duty",
  "dsc06985": "first steps, big world",
  "dsc07030": "lost in the leaves",
  "dsc07039": "look up more often",
};

const bands = [
  { id: "a", bg: photos[2], items: [photos[2], photos[3], photos[5], photos[6]] },
  { id: "b", bg: photos[11], items: [photos[8], photos[10], photos[11]] },
  { id: "c", bg: photos[14], items: [photos[13], photos[14], photos[15]] },
];

function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M32 11.8 C43.6 11.1 52.7 19.6 52.4 31.6 C52.1 43.7 43.4 52.5 31.7 52.2 C20.2 51.9 11.5 43.2 11.9 31.8 C12.3 20.4 20.9 12.5 32 11.8 Z" />
        <path d="M52 32 L27.4 42" />
        <path d="M42 49.3 L21 33" />
        <path d="M22 49.3 L25.7 23" />
        <path d="M12 32 L36.7 22" />
        <path d="M22 14.7 L43 31" />
        <path d="M42 14.7 L38.3 41" />
      </g>
    </svg>
  );
}

function Shot({ photo, variant, onOpen }: { photo: Photo; variant: number; onOpen: () => void }) {
  return (
    <figure className={`shot${photo.orientation === "portrait" ? " shot--portrait" : ""}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <img src={photo.thumb} alt={photo.title} loading="lazy" />
        <HandFrame variant={variant} orientation={photo.orientation} ratio={photo.orientation === "portrait" ? "portrait" : "standard"} />
      </button>
      <figcaption className="shot__caption">
        <strong>{photo.title}</strong>
        <span>{CAPTIONS[photo.id] ?? photo.category}</span>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const open = (photo: Photo) => setViewerIndex(photos.indexOf(photo));

  return (
    <div className="archive">
      <section className="hero hero--split">
        <Reveal>
          <div className="hero__split">
            <div className="hero__brand">
              <span className="hero__mark" aria-hidden="true">
                <Mark />
              </span>
              <h1 className="hero__title">
                <span>Shot by</span>
                <span>Srijan</span>
              </h1>
            </div>
            <div className="hero__bottom">
              <p>A journal of frames that I&apos;ve captured</p>
              <span>Scroll to explore</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <button type="button" className="hero__media" onClick={() => open(heroPhoto)} aria-label={`Open ${heroPhoto.title} larger`}>
            <span className="hero__imgwrap">
              <img src={heroPhoto.thumb} alt={heroPhoto.title} loading="eager" draggable={false} />
              <HandFrame variant={0} orientation={heroPhoto.orientation} ratio="standard" />
            </span>
            <span className="hero__caption">
              <strong>{heroPhoto.title}</strong>
              <em>{CAPTIONS[heroPhoto.id]}</em>
            </span>
          </button>
        </Reveal>
      </section>

      <Filmstrip photos={reel} captions={CAPTIONS} onOpen={open} />

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
