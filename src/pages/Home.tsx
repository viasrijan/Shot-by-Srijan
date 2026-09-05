import { useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import Filmstrip from "../components/Filmstrip";
import { Camera, Flower, Sparkle, Star, type DoodleProps } from "../components/Doodles";
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

// Magazine spreads — two stacked horizontal frames beside one tall vertical.
const editorial: Photo[] = [photos[2], photos[3], photos[10]];
const mirrored: Photo[] = [photos[13], photos[0], photos[11]];
const squares: Photo[] = [photos[4], photos[5], photos[6], photos[9]];
const portrait = photos[12];
const triptych: Photo[] = [photos[7], photos[9], photos[15]];

// Bare prints — pins removed.

// Doodles drift only across the gallery section (the scatter layer lives
// inside .editorial now), floating slowly with a pen draw-in on each stroke.
const SCATTERED: { C: ComponentType<DoodleProps>; left: string; top: string; size: number; tilt: string }[] = [
  { C: Star, left: "4%", top: "3%", size: 48, tilt: "-14deg" },
  { C: Sparkle, left: "22%", top: "2%", size: 22, tilt: "10deg" },
  { C: Flower, left: "72%", top: "4%", size: 44, tilt: "16deg" },
  { C: Star, left: "90%", top: "13%", size: 36, tilt: "-8deg" },
  { C: Camera, left: "7%", top: "25%", size: 56, tilt: "8deg" },
  { C: Sparkle, left: "45%", top: "21%", size: 20, tilt: "-12deg" },
  { C: Flower, left: "90%", top: "33%", size: 48, tilt: "-6deg" },
  { C: Star, left: "5%", top: "45%", size: 42, tilt: "12deg" },
  { C: Sparkle, left: "55%", top: "52%", size: 24, tilt: "14deg" },
  { C: Camera, left: "24%", top: "63%", size: 52, tilt: "-16deg" },
  { C: Flower, left: "78%", top: "74%", size: 40, tilt: "6deg" },
  { C: Sparkle, left: "12%", top: "88%", size: 20, tilt: "-10deg" },
];

function ScatterDoodles() {
  return (
    <div className="scatter" aria-hidden="true">
      {SCATTERED.map(({ C, left, top, size, tilt }, i) => (
        <C
          key={i}
          className="scatter__doodle"
          style={{
            left,
            top,
            width: size,
            height: C === Camera ? Math.round(size * 0.75) : size,
            animationDelay: `${700 + i * 180}ms`,
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

// Captions read as sentences — the first letter of each line is capitalised.
function capitalizeCaption(text: string): string {
  return text.replace(/(^|\n)([a-z])/g, (_match, head: string, ch: string) => head + ch.toUpperCase());
}

function captionFor(photo: Photo): string {
  return capitalizeCaption(CAPTIONS[photo.id] ?? photo.category);
}

// Captions may carry a manual "\n" to break a line (e.g. after the comma).
function renderCaption(text: string) {
  return text.split("\n").map((line, i, lines) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

function BrushTitle({ prefix, main }: { prefix: string; main: string }) {
  let letterIndex = 0;
  const letters = (word: string, keyBase: string, small: boolean) => (
    <span key={keyBase} className={`brush-word${small ? " brush-word--small" : ""}`} aria-hidden="true">
      {word.split("").map((ch, i) => (
        <span key={`${keyBase}-${i}`} className="brush-letter" style={{ animationDelay: `${200 + letterIndex++ * 55}ms` }}>
          {ch}
        </span>
      ))}
    </span>
  );
  return (
    <h1 className="hero__title" aria-label={`${prefix} ${main}`}>
      {prefix.split(" ").map((word, i, words) => (
        <span key={`prefix-${i}`}>
          {letters(word, `prefix-${i}`, true)}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}{" "}
      {letters(main, "main", false)}
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
  return (
    <figure className={`shot ${photo.orientation === "portrait" ? "shot--portrait" : ""} ${className}`}>
      <button type="button" className="shot__button" onClick={onOpen} aria-label={`Open ${photo.title} larger`}>
        <span className="polaroid" style={polaroidTilt(index)}>
          <span className={`polaroid__photo ${ratio !== "standard" ? `polaroid__photo--${ratio}` : ""}`}>
            <img src={photo.thumb} alt={photo.title} loading="lazy" style={cropStyle(photo)} />
          </span>
          <span className="polaroid__caption">{renderCaption(captionFor(photo))}</span>
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
              <BrushTitle prefix="Shot by" main="Srijan" />
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
            <p className="dossier__eyebrow">Meet these cats</p>
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
