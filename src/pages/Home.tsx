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

// Reel order interleaves dark/bright tones so similar colours never sit together.
const REEL_ORDER = [1, 4, 9, 13, 3, 7, 14, 5, 11, 2, 8, 15, 6, 12, 10];
const reel = REEL_ORDER.map((i) => photos[i]);

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

const gallery = [photos[2], photos[3], photos[5], photos[6], photos[8], photos[10], photos[11], photos[13], photos[14]];

const BAND_DOODLES = [Star, Diamond, Sparkle, Camera];

// Rows of 3: frame the outer columns, leave the middle clean for rhythm.
function rowHasFrame(i: number): boolean {
  return i % 3 !== 1;
}

function DoodleTitle({ text }: { text: string }) {
  return (
    <h1 className="hero__title hero__title--doodle" aria-label={text}>
      <span aria-hidden="true">
        {text.split("").map((ch, i) => (
          <span key={i} className="doodle-letter" style={{ animationDelay: `${150 + i * 45}ms` }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </h1>
  );
}

function Shot({ photo, variant, framed, onOpen }: { photo: Photo; variant: number; framed: boolean; onOpen: () => void }) {
  const Doodle = BAND_DOODLES[variant % BAND_DOODLES.length];
  return (
    <figure className={`shot${photo.orientation === "portrait" ? " shot--portrait" : ""}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <span className="shot__imgwrap">
          <img src={photo.thumb} alt={photo.title} loading="lazy" />
          {framed && (
            <HandFrame
              variant={variant}
              orientation={photo.orientation}
              ratio={photo.orientation === "portrait" ? "portrait" : "standard"}
            />
          )}
        </span>
      </button>
      <Doodle className="shot__doodle shot__doodle--right" />
      <figcaption className="shot__caption">
        <span>{CAPTIONS[photo.id] ?? photo.category}</span>
      </figcaption>
    </figure>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
      <path d="M10.5 9.5 L15.5 12 L10.5 14.5 Z" fill="#ffffff" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#feda75" />
          <stop offset=".5" stopColor="#d62976" />
          <stop offset="1" stopColor="#962fbf" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="url(#ig-grad)" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="#d62976" />
    </svg>
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
        <Reveal delay={120} direction="up">
          <button type="button" className={`hero__media${flash ? " hero__media--flash" : ""}`} onClick={clickHero} aria-label={`Open ${heroPhoto.title} larger`}>
            <span className="tape-real tape-real--tl" aria-hidden="true" />
            <span className="hero__imgwrap hero__imgwrap--tilted">
              <img src={heroPhoto.thumb} alt={heroPhoto.title} loading="eager" draggable={false} />
              <HandFrame variant={0} orientation={heroPhoto.orientation} ratio="standard" />
            </span>
          </button>
        </Reveal>
        <Reveal direction="down">
          <div className="hero__split">
            <a
              className="hero__brand hero__brand--doodle"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Shot by Srijan — back to homepage"
            >
              <DoodleTitle text="Shot by Srijan" />
              <svg className="hero__doodle-underline" viewBox="0 0 300 20" aria-hidden="true">
                <path
                  className="doodle__draw doodle__draw--title"
                  pathLength={100}
                  d="M 6 12 C 60 5, 140 17, 210 10 C 240 7, 270 12, 294 8"
                />
                <path
                  className="doodle__draw doodle__draw--title doodle__draw--soft"
                  pathLength={100}
                  style={{ animationDelay: "900ms" }}
                  d="M 12 15.5 C 80 11, 170 18.5, 288 13.5"
                />
              </svg>
            </a>
            <div className="hero__bottom hero__bottom--center">
              <p>A journal of frames that I&apos;ve captured</p>
              <div className="hero__socials">
                <a href="https://youtube.com/@ShotbySrijan" target="_blank" rel="noopener noreferrer" aria-label="YouTube — Shot by Srijan">
                  <YoutubeIcon />
                </a>
                <a href="https://instagram.com/Srijan.cc" target="_blank" rel="noopener noreferrer" aria-label="Instagram — Srijan.cc">
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Filmstrip photos={reel} onOpen={open} />

      <section className="gallery" aria-label="Gallery">
        <Orbs variant="band" />
        <div className="gallery__grid">
          {gallery.map((photo, i) => (
            <Reveal key={photo.id} delay={(i % 3) * 90} direction="none" className={`gallery__slot gallery__slot--${i % 3}`}>
              <Shot photo={photo} variant={i} framed={rowHasFrame(i)} onOpen={() => open(photo)} />
            </Reveal>
          ))}
        </div>
      </section>

      {viewerIndex !== null && (
        <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />
      )}
    </div>
  );
}
