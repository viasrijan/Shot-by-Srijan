import { useMemo, type CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";

const KEEP = ["dsc00098-2", "dsc00648", "dsc00681-4", "dsc00988", "dsc01073", "dsc01204-1", "dsc01429-2", "dsc02400", "dsc02987", "dsc03153"];
const CAPTIONS = ["quiet eyes", "after the rain", "passing through", "a room remembers", "last light", "three colours", "soft focus", "somewhere warm", "still moving", "small wonder"];
const FRAMES = ["#d9a441", "#8aa386", "#c9704f", "#7a92b4"];
const POSITIONS = ["1 / 7", "8 / 12", "2 / 6", "7 / 13", "1 / 8", "9 / 13", "3 / 8", "8 / 12", "1 / 6", "6 / 13"];
const TILTS = [-1.6, 1.3, 2, -1.1, .8, -2.2, -1.2, 1.7, 1.1, -1.5];

function Print({ photo, index, hero = false }: { photo: Photo; index: number; hero?: boolean }) {
  const framed = hero || index % 3 !== 1;
  return <figure className={`pin ${hero ? "pin--hero" : ""} ${framed ? "pin--framed" : "pin--bare"}`} style={{ "--frame": FRAMES[index % FRAMES.length], "--tilt": `${TILTS[index % TILTS.length]}deg`, "--float-delay": `${index * -1.4}s` } as CSSProperties}>
    <div className="pin__mat" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <img src={hero ? photo.src : photo.thumb} alt={hero ? "A cat portrait by Srijan" : CAPTIONS[index]} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : undefined} />
      {framed && <HandFrame variant={index % 3} />}
    </div>
    <figcaption className="pin__caption">{CAPTIONS[index]}</figcaption>
  </figure>;
}

export default function Home() {
  const set = useMemo(() => KEEP.map((id) => photos.find((p) => p.id === id)).filter(Boolean) as Photo[], []);
  const hero = set[0];
  const gallery = set.slice(1);
  return <div className="page">
    <section className="hero">
      <div className="hero__orbs" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero__stage">
        <div className="hero__print"><Print photo={hero} index={0} hero /></div>
        <h1 className="hero__sig"><span>Shot by Srijan</span></h1>
        <p className="hero__note">moments, noticed</p>
      </div>
      <div className="scroll-cue" aria-hidden="true">scroll slowly</div>
    </section>
    <section className="roll" aria-label="Film strip"><div className="roll__track">{[...gallery, ...gallery].map((photo, i) => <div className={`roll__cell ${photo.orientation === "portrait" ? "roll__cell--tall" : ""}`} style={{ "--roll-tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties} key={`${photo.id}-${i}`}><img src={photo.thumb} alt="" loading="lazy" /></div>)}</div></section>
    <section className="board" aria-label="Selected photographs">{gallery.map((photo, i) => <div className="board__slot" style={{ gridColumn: POSITIONS[i], "--tilt": `${TILTS[i + 1]}deg`, "--float-delay": `${-(i + 1) * 1.2}s` } as CSSProperties} key={photo.id}><Print photo={photo} index={i + 1} /></div>)}</section>
  </div>;
}
