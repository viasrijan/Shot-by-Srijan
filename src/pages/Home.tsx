import { useState } from "react";
import type { CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Filmstrip from "../components/Filmstrip";
import Orbs from "../components/Orbs";
import { Camera, Flower, Sparkle, Star } from "../components/Doodles";
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
  "dsc01368": "a quiet place to lay down",
  "dsc01370": "peeking through the green",
  "dsc01429-2": "main-character energy",
  "dsc02400": "sunday best",
  "dsc02987": "morning patrol",
  "dsc03153": "tiny supervisor on duty",
  "dsc06985": "first steps, big world",
  "dsc07030": "lost in the leaves",
  "dsc07039": "look up more often",
};

// Magazine spreads — two stacked horizontal frames beside one tall vertical.
const editorial: Photo[] = [photos[2], photos[3], photos[10]];
const mirrored: Photo[] = [photos[13], photos[14], photos[11]];
const squares: Photo[] = [photos[4], photos[5], photos[6], photos[8]];
const portrait = photos[12];
const triptych: Photo[] = [photos[7], photos[9], photos[15]];

const BAND_DOODLES = [Star, Flower, Sparkle, Camera];

// Playful doodle tilts — every shot leans its own way.
const DOODLE_TILTS = ["-14deg", "10deg", "-6deg", "16deg", "-18deg", "8deg", "-10deg", "14deg", "-4deg", "12deg"];

function doodleTilt(i: number): CSSProperties {
  return { ["--doodle-tilt" as string]: DOODLE_TILTS[i % DOODLE_TILTS.length] };
}

function captionFor(photo: Photo): string {
  return CAPTIONS[photo.id] ?? photo.category;
}

function BrushTitle({ text }: { text: string }) {
  return (
    <h1 className="hero__title" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="brush-letter"
          style={{ animationDelay: `${200 + i * 55}ms` }}
          aria-hidden="true"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}

function Shot({
  photo,
  index,
  ratio,
  onOpen,
  className = "",
}: {
  photo: Photo;
  index: number;
  ratio: "standard" | "portrait" | "square";
  onOpen: () => void;
  className?: string;
}) {
  const Doodle = BAND_DOODLES[index % BAND_DOODLES.length];
  return (
    <figure className={`shot ${photo.orientation === "portrait" ? "shot--portrait" : ""} ${className}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <span className={`shot__imgwrap shot__imgwrap--${ratio}`}>
          <img src={photo.thumb} alt={photo.title} loading="lazy" />
          <HandFrame variant={index % 3} orientation={photo.orientation} ratio={ratio} />
        </span>
      </button>
      <Doodle className="shot__doodle shot__doodle--right" style={doodleTilt(index)} />
      <figcaption className="shot__caption">
        <span>{captionFor(photo)}</span>
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
          <button
            type="button"
            className={`hero__media${flash ? " hero__media--flash" : ""}`}
            onClick={clickHero}
            aria-label={`Open ${heroPhoto.title} larger`}
          >
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
              className="hero__brand"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Shot by Srijan — back to homepage"
            >
              <BrushTitle text="Shot by Srijan" />
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

      <section className="editorial" aria-label="Selected frames">
        <Orbs variant="band" />
        <div className="editorial__inner">
          <div className="editorial__spread">
            <div className="editorial__col">
              <Reveal direction="none">
                <Shot photo={editorial[0]} index={0} ratio="standard" onOpen={() => open(editorial[0])} />
              </Reveal>
              <Reveal delay={110} direction="none">
                <Shot photo={editorial[1]} index={1} ratio="standard" onOpen={() => open(editorial[1])} />
              </Reveal>
            </div>
            <Reveal delay={150} direction="up" className="editorial__tall">
              <Shot photo={editorial[2]} index={2} ratio="portrait" onOpen={() => open(editorial[2])} />
            </Reveal>
          </div>

          <Reveal direction="none" className="dossier">
            <p className="dossier__eyebrow">The contact sheet</p>
            <div className="dossier__grid">
              {squares.map((photo, i) => (
                <Shot key={photo.id} photo={photo} index={3 + i} ratio="square" onOpen={() => open(photo)} />
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" className="editorial__feature">
            <Shot photo={portrait} index={5} ratio="portrait" onOpen={() => open(portrait)} />
          </Reveal>

          <div className="editorial__spread editorial__spread--mirror">
            <div className="editorial__col">
              <Reveal direction="none">
                <Shot photo={mirrored[0]} index={6} ratio="standard" onOpen={() => open(mirrored[0])} />
              </Reveal>
              <Reveal delay={110} direction="none">
                <Shot photo={mirrored[1]} index={7} ratio="standard" onOpen={() => open(mirrored[1])} />
              </Reveal>
            </div>
            <Reveal delay={150} direction="up" className="editorial__tall">
              <Shot photo={mirrored[2]} index={8} ratio="portrait" onOpen={() => open(mirrored[2])} />
            </Reveal>
          </div>

          <div className="editorial__triptych">
            {triptych.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 110} direction="none">
                <Shot photo={photo} index={9 + i} ratio="standard" onOpen={() => open(photo)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {viewerIndex !== null && (
        <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />
      )}
    </div>
  );
}
