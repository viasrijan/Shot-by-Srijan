import { useState } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Filmstrip from "../components/Filmstrip";
import Orbs from "../components/Orbs";
import { Camera, Diamond, Sparkle, Star } from "../components/Doodles";
import { playShutter } from "../components/sfx";

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
  { id: "a", items: [photos[2], photos[3], photos[5], photos[6]] },
  { id: "b", items: [photos[8], photos[10], photos[11]] },
  { id: "c", items: [photos[13], photos[14], photos[15]] },
];

const BAND_DOODLES = [Star, Diamond, Sparkle, Camera];

function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="mark__svg">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M32 11.8 C43.6 11.1 52.7 19.6 52.4 31.6 C52.1 43.7 43.4 52.5 31.7 52.2 C20.2 51.9 11.5 43.2 11.9 31.8 C12.3 20.4 20.9 12.5 32 11.8 Z" />
        <path d="M52 32 L27.4 42" />
        <path d="M42 49.3 L21 33" />
        <path d="M22 49.3 L25.7 23" />
        <path d="M12 32 L36.7 22" />
        <path d="M22 14.7 L43 31" />
        <path d="M42 14.7 L38.3 41" />
      </g>
      <g className="mark__shutter" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M32 22 L32 28 M42 32 L36 32 M32 42 L32 36 M22 32 L28 32" />
      </g>
    </svg>
  );
}

function Shot({ photo, variant, onOpen }: { photo: Photo; variant: number; onOpen: () => void }) {
  const Doodle = BAND_DOODLES[variant % BAND_DOODLES.length];
  return (
    <figure className={`shot${photo.orientation === "portrait" ? " shot--portrait" : ""}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <img src={photo.thumb} alt={photo.title} loading="lazy" />
        <HandFrame variant={variant} orientation={photo.orientation} ratio={photo.orientation === "portrait" ? "portrait" : "standard"} />
      </button>
      <Doodle className="shot__doodle" />
      <figcaption className="shot__caption">
        <strong>{photo.title}</strong>
        <span>{CAPTIONS[photo.id] ?? photo.category}</span>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const open = (photo: Photo) => setViewerIndex(photos.indexOf(photo));

  const clickHero = () => {
    playShutter(0.18);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 280);
    open(heroPhoto);
  };

  return (
    <div className="archive">
      <section className="hero hero--split">
        <Orbs variant="hero" />
        <Reveal>
          <div className="hero__split">
            <div className="hero__brand">
              <span className="hero__mark hero__mark--shutter" aria-hidden="true">
                <Mark />
              </span>
              <h1 className="hero__title" aria-label="Shot by Srijan">
                <span>Shot by</span>
                <span>Srijan</span>
              </h1>
            </div>
            <div className="hero__bottom hero__bottom--center">
              <p>A journal of frames that I&apos;ve captured</p>
              <span>Scroll to explore</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <button type="button" className={`hero__media${flash ? " hero__media--flash" : ""}`} onClick={clickHero} aria-label={`Open ${heroPhoto.title} larger`}>
            <span className="tape-real tape-real--tl" aria-hidden="true" />
            <span className="tape-real tape-real--tr" aria-hidden="true" />
            <span className="hero__imgwrap hero__imgwrap--tilted">
              <img src={heroPhoto.thumb} alt={heroPhoto.title} loading="eager" draggable={false} />
              <HandFrame variant={0} orientation={heroPhoto.orientation} ratio="standard" />
            </span>
          </button>
        </Reveal>
      </section>

      <Filmstrip photos={reel} onOpen={open} />

      {bands.map((band) => (
        <section key={band.id} className={`band band--${band.id}`}>
          <Orbs variant="band" />
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
