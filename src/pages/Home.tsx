import { useState, type CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";
import { Arrow, Camera, Loop, Squiggle, Star, Tape } from "../components/Doodles";

const hero = photos[0];
const roll = photos.slice(1);

type Slot = {
  photo: Photo;
  col: string;
  tilt: number;
  lift?: string;
  tape: "top" | "corner" | "sides";
  doodle?: "star" | "arrow" | "loop" | "camera";
  doodleAt?: CSSProperties;
};

/* A loose pinboard: 12-column grid, each print nudged, tilted, and taped by hand. */
const board: Slot[] = [
  { photo: photos[1], col: "1 / 7", tilt: -2.4, tape: "top", doodle: "star", doodleAt: { right: "-6%", top: "-8%" } },
  { photo: photos[4], col: "8 / 13", tilt: 1.8, lift: "18%", tape: "corner" },
  { photo: photos[7], col: "2 / 6", tilt: 2.6, lift: "-6%", tape: "sides", doodle: "arrow", doodleAt: { right: "-38%", bottom: "-12%" } },
  { photo: photos[9], col: "7 / 13", tilt: -1.4, lift: "4%", tape: "top" },
  { photo: photos[12], col: "1 / 8", tilt: 1.2, tape: "corner", doodle: "loop", doodleAt: { left: "-8%", bottom: "-16%" } },
  { photo: photos[3], col: "9 / 13", tilt: -3, lift: "22%", tape: "top", doodle: "star", doodleAt: { left: "-18%", top: "40%" } },
  { photo: photos[6], col: "3 / 8", tilt: -1.8, lift: "-2%", tape: "sides" },
  { photo: photos[10], col: "8 / 12", tilt: 2.2, lift: "12%", tape: "corner", doodle: "camera", doodleAt: { right: "-34%", bottom: "-8%" } },
  { photo: photos[14], col: "1 / 6", tilt: 1.6, tape: "top" },
  { photo: photos[15], col: "6 / 13", tilt: -2, lift: "8%", tape: "sides", doodle: "star", doodleAt: { right: "-4%", bottom: "-8%" } },
];

function Doodle({ kind, style }: { kind: NonNullable<Slot["doodle"]>; style?: CSSProperties }) {
  const cls = `pin__doodle pin__doodle--${kind}`;
  if (kind === "star") return <Star className={cls} style={style} accent />;
  if (kind === "arrow") return <Arrow className={cls} style={style} />;
  if (kind === "loop") return <Loop className={cls} style={style} />;
  return <Camera className={cls} style={style} />;
}

function Print({ photo, n, tape, onOpen }: { photo: Photo; n: number; tape: Slot["tape"]; onOpen: () => void }) {
  return (
    <figure className={`pin${photo.orientation === "portrait" ? " pin--portrait" : ""}`}>
      <Tape variant={tape} />
      <button type="button" className="pin__button" onClick={onOpen} aria-label={`Open photograph ${n}`}>
        <img src={photo.thumb} alt="" loading="lazy" />
        <HandFrame variant={n % 3} />
      </button>
      <figcaption className="pin__caption">{String(n).padStart(2, "0")}</figcaption>
    </figure>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const open = (photo: Photo) => setViewerIndex(photos.indexOf(photo));

  return (
    <div className="page">
      {/* Hero: one print, one signature, one arrow. */}
      <section className="hero">
        <Reveal className="hero__stage">
          <figure className="hero__print">
            <Tape variant="corner" />
            <button type="button" className="hero__button" onClick={() => open(hero)} aria-label="Open photograph">
              <img src={hero.src} alt="" fetchPriority="high" />
              <HandFrame variant={1} />
            </button>
          </figure>
          <h1 className="hero__sig">Shot by Srijan</h1>
          <Arrow className="hero__arrow" />
          <Star className="hero__star hero__star--a" accent />
          <Star className="hero__star hero__star--b" />
        </Reveal>
        <a href="#roll" className="scroll-cue" aria-label="Scroll to gallery">
          <Squiggle />
        </a>
      </section>

      {/* Film roll: an endless strip of contact prints. */}
      <section id="roll" className="roll" aria-label="Film roll">
        <div className="roll__track">
          {[...roll, ...roll].map((photo, i) => (
            <button
              key={`${photo.id}-${i}`}
              type="button"
              className="roll__cell"
              onClick={() => open(photo)}
              aria-label="Open photograph"
              tabIndex={i < roll.length ? 0 : -1}
            >
              <img src={photo.thumb} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Pinboard. */}
      <section className="board" aria-label="Photographs">
        {board.map((slot, i) => (
          <Reveal
            key={slot.photo.id}
            delay={(i % 2) * 120}
            className="board__slot"
            style={{ gridColumn: slot.col, marginTop: slot.lift, "--tilt": `${slot.tilt}deg` } as CSSProperties}
          >
            <Print photo={slot.photo} n={i + 1} tape={slot.tape} onOpen={() => open(slot.photo)} />
            {slot.doodle && <Doodle kind={slot.doodle} style={slot.doodleAt} />}
          </Reveal>
        ))}
      </section>

      {viewerIndex !== null && (
        <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />
      )}
    </div>
  );
}
