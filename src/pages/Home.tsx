import { useMemo, type CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";
import Reveal from "../components/Reveal";
import { Arrow, Camera, Loop, Squiggle, Star, Tape } from "../components/Doodles";

/* Curated set: strongest compositions only, near-duplicates removed. */
const KEEP = ["dsc00098-2", "dsc00648", "dsc00681-4", "dsc00988", "dsc01073", "dsc01204-1", "dsc01429-2", "dsc02400", "dsc02987", "dsc03153", "dsc07039"];

/* Frame colours: bone, ochre, sage, clay, slate. */
const FRAMES = ["#efece4", "#d9a441", "#8aa386", "#c9704f", "#7a92b4"];

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Slot = { col: string; tilt: number; lift?: string; tape: "top" | "corner" | "sides"; doodle?: "star" | "arrow" | "loop" | "camera"; doodleAt?: CSSProperties };

/* Column recipes, alternating wide/narrow so rows stay balanced; portraits use the narrow slots. */
const LAYOUT: Slot[] = [
  { col: "1 / 7", tilt: -1.8, tape: "top", doodle: "star", doodleAt: { right: "-5%", top: "-9%" } },
  { col: "8 / 12", tilt: 1.6, lift: "16%", tape: "corner" },
  { col: "2 / 6", tilt: 2, lift: "-4%", tape: "sides", doodle: "arrow", doodleAt: { right: "-34%", bottom: "-10%" } },
  { col: "7 / 13", tilt: -1.2, lift: "6%", tape: "top" },
  { col: "1 / 8", tilt: 1, tape: "corner", doodle: "loop", doodleAt: { left: "-7%", bottom: "-14%" } },
  { col: "9 / 13", tilt: -2.4, lift: "20%", tape: "top", doodle: "star", doodleAt: { left: "-16%", top: "40%" } },
  { col: "3 / 8", tilt: -1.4, tape: "sides" },
  { col: "8 / 12", tilt: 1.8, lift: "10%", tape: "corner", doodle: "camera", doodleAt: { right: "-30%", bottom: "-6%" } },
  { col: "1 / 6", tilt: 1.4, tape: "top" },
  { col: "6 / 13", tilt: -1.6, lift: "8%", tape: "sides", doodle: "star", doodleAt: { right: "-4%", bottom: "-8%" } },
];

function Doodle({ kind, style }: { kind: NonNullable<Slot["doodle"]>; style?: CSSProperties }) {
  const cls = `pin__doodle pin__doodle--${kind}`;
  if (kind === "star") return <Star className={cls} style={style} accent />;
  if (kind === "arrow") return <Arrow className={cls} style={style} />;
  if (kind === "loop") return <Loop className={cls} style={style} />;
  return <Camera className={cls} style={style} />;
}

function Print({ photo, n, tape, frame, full }: { photo: Photo; n: number; tape: Slot["tape"]; frame: string; full?: boolean }) {
  return (
    <figure className="pin" style={{ "--frame": frame } as CSSProperties}>
      <Tape variant={tape} />
      <div className="pin__mat" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        <img src={full ? photo.src : photo.thumb} alt="" loading={full ? "eager" : "lazy"} fetchPriority={full ? "high" : undefined} />
        <HandFrame variant={n % 3} />
      </div>
      <figcaption className="pin__caption">{String(n).padStart(2, "0")}</figcaption>
    </figure>
  );
}

export default function Home() {
  const { hero, roll, board } = useMemo(() => {
    const set = shuffle(photos.filter((p) => KEEP.includes(p.id)));
    const heroIdx = set.findIndex((p) => p.orientation === "landscape");
    const hero = set.splice(heroIdx < 0 ? 0 : heroIdx, 1)[0];
    return { hero, roll: set, board: set.slice(0, LAYOUT.length) };
  }, []);

  return (
    <div className="page">
      {/* Hero: one centred print, signature underneath. */}
      <section className="hero">
        <Reveal className="hero__stage">
          <div className="hero__print">
            <Print photo={hero} n={1} tape="corner" frame={FRAMES[0]} full />
            <Arrow className="hero__arrow" />
            <Star className="hero__star hero__star--a" accent />
            <Star className="hero__star hero__star--b" />
          </div>
          <h1 className="hero__sig">Shot by Srijan</h1>
        </Reveal>
        <div className="scroll-cue" aria-hidden="true">
          <Squiggle />
        </div>
      </section>

      {/* Film roll: endless strip of contact prints. */}
      <section className="roll" aria-label="Film roll">
        <div className="roll__track">
          {[...roll, ...roll].map((photo, i) => (
            <div key={`${photo.id}-${i}`} className={`roll__cell${photo.orientation === "portrait" ? " roll__cell--tall" : ""}`}>
              <img src={photo.thumb} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Pinboard. */}
      <section className="board" aria-label="Photographs">
        {board.map((photo, i) => {
          const slot = LAYOUT[i];
          const col = photo.orientation === "portrait" ? slot.col.replace(/(\d+) \/ (\d+)/, (_, a, b) => `${a} / ${Math.min(+b, +a + 4)}`) : slot.col;
          return (
            <Reveal
              key={photo.id}
              delay={(i % 2) * 120}
              className="board__slot"
              style={{ gridColumn: col, marginTop: slot.lift, "--tilt": `${slot.tilt}deg`, "--float-dur": `${9 + (i % 4) * 1.7}s`, "--float-delay": `${-(i * 1.3)}s` } as CSSProperties}
            >
              <Print photo={photo} n={i + 2} tape={slot.tape} frame={FRAMES[(i + 1) % FRAMES.length]} />
              {slot.doodle && <Doodle kind={slot.doodle} style={slot.doodleAt} />}
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
