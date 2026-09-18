import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Filmstrip from "../components/Filmstrip";
import {
  Camera,
  Flower,
  Sparkle,
  Star,
  Heart,
  Spiral,
  SunBurst,
  Paw,
  Arrow,
  Aperture,
  FilmRoll,
  Viewfinder,
  BotanicalLeaf,
  Shine,
  type DoodleProps,
} from "../components/Doodles";
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
  "dsc01204-1": "primary colours,\naccidental art",
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

// Balanced editorial spreads — every image is part of a multi-frame grouping (no lone frames!)
const editorial: Photo[] = [photos[2], photos[3], photos[10]];
const cats: Photo[] = [photos[4], photos[5], photos[12], photos[6], photos[9]];
const duo: Photo[] = [photos[7], photos[8]];
const mirrored: Photo[] = [photos[13], photos[0], photos[11]];
const triptych: Photo[] = [photos[1], photos[14], photos[15]];

// Elegant scattered doodles with animated effects across the gallery
const SCATTERED: { C: ComponentType<DoodleProps>; left: string; top: string; size: number; tilt: string; animClass?: string }[] = [
  { C: Star, left: "2%", top: "1.5%", size: 44, tilt: "-12deg", animClass: "doodle--float" },
  { C: Aperture, left: "12%", top: "2.8%", size: 38, tilt: "0deg", animClass: "doodle--spin-slow" },
  { C: BotanicalLeaf, left: "26%", top: "1%", size: 40, tilt: "14deg", animClass: "doodle--sway" },
  { C: Sparkle, left: "42%", top: "2.5%", size: 22, tilt: "8deg", animClass: "doodle--pulse" },
  { C: FilmRoll, left: "62%", top: "1.8%", size: 42, tilt: "-10deg", animClass: "doodle--float-rev" },
  { C: Flower, left: "78%", top: "2%", size: 42, tilt: "16deg", animClass: "doodle--sway" },
  { C: Shine, left: "92%", top: "3%", size: 36, tilt: "12deg", animClass: "doodle--pulse" },
  { C: Paw, left: "3%", top: "16%", size: 34, tilt: "-6deg", animClass: "doodle--float" },
  { C: Camera, left: "8%", top: "26%", size: 54, tilt: "8deg", animClass: "doodle--float" },
  { C: Viewfinder, left: "28%", top: "22%", size: 36, tilt: "0deg", animClass: "doodle--pulse" },
  { C: Arrow, left: "46%", top: "21%", size: 38, tilt: "18deg", animClass: "doodle--sway" },
  { C: Heart, left: "68%", top: "23%", size: 32, tilt: "14deg", animClass: "doodle--pulse" },
  { C: BotanicalLeaf, left: "88%", top: "24%", size: 42, tilt: "-16deg", animClass: "doodle--sway" },
  { C: Paw, left: "93%", top: "31%", size: 36, tilt: "10deg", animClass: "doodle--float" },
  { C: Star, left: "2%", top: "41%", size: 40, tilt: "12deg", animClass: "doodle--pulse" },
  { C: FilmRoll, left: "18%", top: "45%", size: 40, tilt: "-8deg", animClass: "doodle--float-rev" },
  { C: SunBurst, left: "52%", top: "48%", size: 44, tilt: "-10deg", animClass: "doodle--spin-slow" },
  { C: Shine, left: "70%", top: "46%", size: 34, tilt: "0deg", animClass: "doodle--pulse" },
  { C: Flower, left: "90%", top: "47%", size: 46, tilt: "-6deg", animClass: "doodle--sway" },
  { C: Aperture, left: "6%", top: "60%", size: 40, tilt: "0deg", animClass: "doodle--spin-slow" },
  { C: Paw, left: "30%", top: "63%", size: 36, tilt: "12deg", animClass: "doodle--float" },
  { C: Sparkle, left: "56%", top: "61%", size: 24, tilt: "14deg", animClass: "doodle--pulse" },
  { C: BotanicalLeaf, left: "72%", top: "63%", size: 40, tilt: "16deg", animClass: "doodle--sway" },
  { C: Heart, left: "88%", top: "66%", size: 32, tilt: "-8deg", animClass: "doodle--pulse" },
  { C: Camera, left: "14%", top: "78%", size: 50, tilt: "-14deg", animClass: "doodle--float" },
  { C: Viewfinder, left: "38%", top: "80%", size: 34, tilt: "0deg", animClass: "doodle--pulse" },
  { C: Star, left: "58%", top: "82%", size: 38, tilt: "10deg", animClass: "doodle--pulse" },
  { C: Flower, left: "80%", top: "83%", size: 40, tilt: "6deg", animClass: "doodle--sway" },
  { C: Shine, left: "10%", top: "93%", size: 32, tilt: "8deg", animClass: "doodle--pulse" },
  { C: FilmRoll, left: "48%", top: "94%", size: 38, tilt: "12deg", animClass: "doodle--float-rev" },
  { C: Spiral, left: "91%", top: "92%", size: 36, tilt: "14deg", animClass: "doodle--sway" },
];

function ScatterDoodles() {
  return (
    <div className="scatter" aria-hidden="true">
      {SCATTERED.map(({ C, left, top, size, tilt, animClass = "" }, i) => (
        <C
          key={i}
          className={`scatter__doodle ${animClass}`}
          style={{
            left,
            top,
            width: size,
            height: C === Camera ? Math.round(size * 0.75) : size,
            animationDelay: `${400 + i * 140}ms`,
            ["--doodle-tilt" as string]: tilt,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// Polaroids lean every which way, like prints tossed on a desk.
const POLAROID_TILTS = ["-1.7deg", "1.3deg", "-0.9deg", "1.6deg", "-1.2deg", "0.8deg", "-1.5deg", "1.1deg", "-0.7deg", "1.4deg"];

function polaroidTilt(i: number): CSSProperties {
  return { ["--polaroid-tilt" as string]: POLAROID_TILTS[i % POLAROID_TILTS.length] };
}

// Nudge crops so the subject's whole face (nose included) stays in frame.
const CROP_FIX: Record<string, string> = {
  "dsc02987": "42% 32%",
};

function cropStyle(photo: Photo): CSSProperties | undefined {
  const position = CROP_FIX[photo.id];
  return position ? ({ objectPosition: position } as CSSProperties) : undefined;
}

// Captions read as sentences — first letter capitalized, and break lines after commas.
function capitalizeCaption(text: string): string {
  const formatted = text.replace(/,\s+/g, ",\n");
  return formatted.replace(/(^|\n)([a-z])/g, (_match, head: string, ch: string) => head + ch.toUpperCase());
}

function captionFor(photo: Photo): string {
  return capitalizeCaption(CAPTIONS[photo.id] ?? photo.category);
}

function renderCaption(text: string) {
  return text.split("\n").map((line, i, lines) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

// Modern, Elegant Sans-Serif Title without underline
function SansTitle({ prefix, main }: { prefix: string; main: string }) {
  return (
    <h1 className="hero__title hero__title--sans" aria-label={`${prefix} ${main}`}>
      <span className="hero__title-prefix">{prefix}</span>
      <span className="hero__title-main">{main}</span>
    </h1>
  );
}

function Shot({
  photo,
  index,
  ratio,
  onOpen,
  className = "",
  compact = false,
}: {
  photo: Photo;
  index: number;
  ratio: "standard" | "portrait" | "square";
  onOpen: () => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <figure className={`shot ${photo.orientation === "portrait" ? "shot--portrait" : ""} ${className}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <span className="polaroid" style={polaroidTilt(index)}>
          <span className={`polaroid__photo ${ratio !== "standard" ? `polaroid__photo--${ratio}` : ""}`}>
            <img src={photo.thumb} alt={photo.title} loading="lazy" style={cropStyle(photo)} />
          </span>
          <span className={`polaroid__caption${compact ? " polaroid__caption--compact" : ""}`}>
            {renderCaption(captionFor(photo))}
          </span>
        </span>
      </button>
    </figure>
  );
}

function YoutubeIcon() {
  return <img src="/icons/youtube.png" alt="" aria-hidden="true" draggable={false} />;
}

function InstagramIcon() {
  return <img src="/icons/instagram.png" alt="" aria-hidden="true" draggable={false} />;
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
        <Reveal delay={120} direction="up">
          <button
            type="button"
            className={`hero__media${flash ? " hero__media--flash" : ""}`}
            onClick={clickHero}
            aria-label={`Open ${heroPhoto.title} larger`}
          >
            {/* Viewfinder corner brackets framing hero shot */}
            <div className="hero__viewfinder" aria-hidden="true">
              <span className="hero__vf hero__vf--tl" />
              <span className="hero__vf hero__vf--tr" />
              <span className="hero__vf hero__vf--br" />
              <span className="hero__vf hero__vf--bl" />
            </div>

            <span className="polaroid polaroid--hero" style={{ ["--polaroid-tilt" as string]: "-2deg" } as CSSProperties}>
              <span className="tape-real tape-real--tr" aria-hidden="true" />
              <span className="tape-real tape-real--bl" aria-hidden="true" />
              <span className="polaroid__photo">
                <img src={heroPhoto.thumb} alt={heroPhoto.title} loading="eager" draggable={false} style={cropStyle(heroPhoto)} />
              </span>
              <span className="polaroid__caption">{renderCaption(captionFor(heroPhoto))}</span>
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
              <SansTitle prefix="Shot by" main="Srijan" />
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
        <ScatterDoodles />
        <div className="editorial__inner">
          {/* Spread 1: Editorial trio */}
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

          {/* Dossier: Meet these cats (smaller typography, tighter layout) */}
          <Reveal direction="none" className="dossier">
            <p className="dossier__eyebrow">Meet these cats</p>
            <div className="dossier__grid">
              {cats.map((photo, i) => (
                <Shot key={photo.id} photo={photo} index={3 + i} ratio="square" compact={true} onOpen={() => open(photo)} />
              ))}
            </div>
          </Reveal>

          {/* Feature Duo: Portrait paired with landscape (No lone frames!) */}
          <div className="editorial__duo">
            <Reveal direction="none">
              <Shot photo={duo[0]} index={5} ratio="portrait" onOpen={() => open(duo[0])} />
            </Reveal>
            <Reveal delay={120} direction="none">
              <Shot photo={duo[1]} index={6} ratio="standard" onOpen={() => open(duo[1])} />
            </Reveal>
          </div>

          {/* Spread 3: Mirrored trio */}
          <div className="editorial__spread editorial__spread--mirror">
            <div className="editorial__col">
              <Reveal direction="none">
                <Shot photo={mirrored[0]} index={7} ratio="standard" onOpen={() => open(mirrored[0])} />
              </Reveal>
              <Reveal delay={110} direction="none">
                <Shot photo={mirrored[1]} index={8} ratio="standard" onOpen={() => open(mirrored[1])} />
              </Reveal>
            </div>
            <Reveal delay={150} direction="up" className="editorial__tall">
              <Shot photo={mirrored[2]} index={9} ratio="portrait" onOpen={() => open(mirrored[2])} />
            </Reveal>
          </div>

          {/* Spread 4: Balanced Triptych */}
          <div className="editorial__triptych">
            {triptych.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 110} direction="none">
                <Shot photo={photo} index={10 + i} ratio="standard" onOpen={() => open(photo)} />
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
