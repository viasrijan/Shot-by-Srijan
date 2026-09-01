import { useEffect, useState } from "react";
import { photos } from "../data/photos";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";

const hero = photos[0];
const opener = photos[1];
const stillLife = photos[4];
const portrait = photos[8];
const closeUp = photos[11];
const finalFrame = photos[15];

type Photo = (typeof photos)[number];

function Frame({ photo, index, className = "", onOpen }: { photo: Photo; index: number; className?: string; onOpen: () => void }) {
  return (
    <figure className={`art-frame ${className}`}>
      <button type="button" className="art-frame__button" onClick={onOpen} aria-label={`Open ${photo.title} fullscreen`}>
        <img src={photo.src} alt={photo.title} loading={index < 3 ? "eager" : "lazy"} />
        <span className="art-frame__cursor" aria-hidden="true">↗</span>
      </button>
      <figcaption><span>{String(index + 1).padStart(2, "0")}</span><span>{photo.title}</span></figcaption>
    </figure>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIntroVisible(false), 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="archive">
      {introVisible && <div className="intro-curtain" aria-hidden="true"><span>Shot by Srijan</span><em>visual archive</em></div>}

      <section className="hero-panel">
        <div className="hero-panel__copy"><p className="eyebrow">A collection of still moments</p><h1>Shot<br /><i>by</i> <strong>Srijan</strong></h1><p className="hero-panel__sub">Look closer.</p></div>
        <button type="button" className="hero-panel__image" onClick={() => setViewerIndex(0)} aria-label="Open featured frame fullscreen"><img src={hero.src} alt={hero.title} /><span className="hero-panel__index">01 <i>/</i> 16</span><span className="hero-panel__open">View frame <b>↗</b></span></button>
        <div className="hero-panel__aside"><span className="vertical-copy">Made between 2022—23 · India</span><span className="hero-panel__scroll">Scroll to wander <b>↓</b></span></div>
      </section>

      <section className="statement-panel"><Reveal><span className="section-number">01</span></Reveal><Reveal delay={80}><p>Somewhere between<br /><i>the ordinary</i><br />and the unforgettable.</p></Reveal><Reveal delay={160}><span className="statement-panel__mark">✳</span></Reveal></section>

      <section className="diptych-panel"><Reveal className="diptych-panel__intro"><span className="eyebrow">The first roll</span><h2>Light<br /><i>finds</i><br />a way in.</h2><span className="small-note">02—03 / night studies</span></Reveal><Reveal delay={120} className="diptych-panel__large"><Frame photo={opener} index={1} onOpen={() => setViewerIndex(1)} /></Reveal><Reveal delay={220} className="diptych-panel__small"><Frame photo={stillLife} index={4} onOpen={() => setViewerIndex(4)} /></Reveal></section>

      <section className="interlude-panel"><Reveal><span className="interlude-panel__number">02</span></Reveal><Reveal delay={100}><p>Not a portfolio.<br /><i>A place to pause.</i></p></Reveal></section>

      <section className="portrait-panel"><Reveal className="portrait-panel__image"><Frame photo={portrait} index={8} onOpen={() => setViewerIndex(8)} /></Reveal><Reveal delay={140} className="portrait-panel__copy"><span className="eyebrow">A note on looking</span><h2>The things<br />that <i>stay.</i></h2><p>Faces in the leaves. A body at rest. The kind of quiet that only appears when nothing is being asked of it.</p><span className="portrait-panel__line" /></Reveal></section>

      <section className="contact-sheet-panel"><div className="contact-sheet-panel__heading"><Reveal><span className="eyebrow">The archive</span><h2>Sixteen<br /><i>ways</i> to see.</h2></Reveal><Reveal delay={120}><p>Keep moving slowly.<br />There is more below.</p></Reveal></div><div className="contact-sheet"><Reveal><Frame photo={photos[2]} index={2} onOpen={() => setViewerIndex(2)} /></Reveal><Reveal delay={60}><Frame photo={photos[3]} index={3} onOpen={() => setViewerIndex(3)} /></Reveal><Reveal delay={120}><Frame photo={photos[5]} index={5} onOpen={() => setViewerIndex(5)} /></Reveal><Reveal delay={180}><Frame photo={photos[6]} index={6} onOpen={() => setViewerIndex(6)} /></Reveal><Reveal delay={240}><Frame photo={photos[7]} index={7} onOpen={() => setViewerIndex(7)} /></Reveal><Reveal delay={300}><Frame photo={closeUp} index={11} onOpen={() => setViewerIndex(11)} /></Reveal></div></section>

      <section className="reel-panel"><div className="reel-panel__title"><span className="eyebrow">Moving image · coming soon</span><h2>There will be<br /><i>motion</i> here.</h2></div><div className="reel-panel__window"><div className="reel-panel__play">＋</div><span>01:16</span></div><p className="reel-panel__note">A space reserved for moving pictures, when they are ready.</p></section>

      <section className="outro-panel"><Reveal><span className="outro-panel__label">End of the roll</span></Reveal><Reveal delay={100}><Frame photo={finalFrame} index={15} className="outro-panel__image" onOpen={() => setViewerIndex(15)} /></Reveal><Reveal delay={180} className="outro-panel__copy"><p>Thanks<br /><i>for looking.</i></p><span>Shot by Srijan · 2023</span></Reveal></section>

      {viewerIndex !== null && <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />}
    </div>
  );
}
