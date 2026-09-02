import { useMemo, type CSSProperties } from "react";
import { photos, type Photo } from "../data/photos";
import HandFrame from "../components/HandFrame";

const KEEP = ["dsc00098-2", "dsc00648", "dsc00681-4", "dsc00988", "dsc01073", "dsc01204-1", "dsc01429-2", "dsc02400", "dsc02987", "dsc03153"];
const CAPTIONS = ["quiet eyes", "after the rain", "passing through", "a room remembers", "last light", "three colours", "soft focus", "somewhere warm", "still moving", "small wonder"];
const FRAMES = ["#d9a441", "#8aa386", "#c9704f", "#7a92b4"];
const TILTS = [-1.6, 1.3, 2, -1.1, .8, -2.2, -1.2, 1.7, 1.1, -1.5];
const YouTubeIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" fill="currentColor"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;

function Print({ photo, index, hero = false }: { photo: Photo; index: number; hero?: boolean }) {
  const framed = !hero && index % 3 !== 1;
  return <figure className={`pin ${hero ? "pin--hero" : ""} ${framed ? "pin--framed" : "pin--bare"}`} style={{ "--frame": FRAMES[index % FRAMES.length], "--tilt": `${TILTS[index % TILTS.length]}deg`, "--float-delay": `${index * -1.4}s` } as CSSProperties}>
    <div className="pin__mat" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
      <img src={hero ? photo.src : photo.thumb} alt={hero ? "A cat portrait by Srijan" : CAPTIONS[index]} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : undefined} />
      {framed && <HandFrame variant={index % 3} />}
    </div>
    {!hero && <figcaption className="pin__caption">{CAPTIONS[index]}</figcaption>}
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
        <div className="links"><span>Links:</span><a href="https://www.youtube.com/@ShotbySrijan" aria-label="YouTube" target="_blank" rel="noreferrer"><YouTubeIcon /></a><a href="https://www.instagram.com/Srijan.cc" aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a></div>
      </div>
      <div className="doodle doodle--arrow" aria-hidden="true">↘</div><div className="doodle doodle--star" aria-hidden="true">✦</div>
    </section>
    <section className="roll" aria-label="Film strip"><div className="roll__track">{[...gallery, ...gallery].map((photo, i) => <div className={`roll__cell ${photo.orientation === "portrait" ? "roll__cell--tall" : ""}`} style={{ "--roll-tilt": `${TILTS[i % TILTS.length]}deg` } as CSSProperties} key={`${photo.id}-${i}`}><img src={photo.thumb} alt="" loading="lazy" /></div>)}</div></section>
    <section className="board" aria-label="Selected photographs">{gallery.map((photo, i) => <div className="board__slot" style={{ "--tilt": `${TILTS[i + 1]}deg`, "--float-delay": `${-(i + 1) * 1.2}s` } as CSSProperties} key={photo.id}><Print photo={photo} index={i + 1} /></div>)}</section>
  </div>;
}
