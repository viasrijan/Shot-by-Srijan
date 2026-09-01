import { useEffect, useState } from "react";
import { photos } from "../data/photos";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";

const hero = photos[0];
const featureOne = photos[1];
const featureTwo = photos[4];
const featureThree = photos[8];
const featureFour = photos[11];
const featureFive = photos[15];

type Photo = (typeof photos)[number];

function ImageCard({ photo, index, className = "", onOpen }: { photo: Photo; index: number; className?: string; onOpen: () => void }) {
  return <figure className={`image-card ${className}`}><button type="button" className="image-card__button" onClick={onOpen} aria-label="Open image fullscreen"><img src={photo.src} alt="" loading={index < 2 ? "eager" : "lazy"} /><span className="image-card__ring" aria-hidden="true">↗</span></button></figure>;
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => { const timeout = window.setTimeout(() => setIntroVisible(false), 1500); return () => window.clearTimeout(timeout); }, []);

  return <div className="archive">
    {introVisible && <div className="intro-curtain" aria-hidden="true"><span>Shot by Srijan</span></div>}

    <section className="hero-panel">
      <div className="hero-panel__title"><h1>Shot by Srijan</h1></div>
      <button type="button" className="hero-panel__image" onClick={() => setViewerIndex(0)} aria-label="Open image fullscreen"><img src={hero.src} alt="" /><span className="hero-panel__open">↗</span></button>
      <div className="hero-panel__field"><span className="hero-panel__orb" /><span className="hero-panel__orb hero-panel__orb--two" /></div>
    </section>

    <section className="visual-breath visual-breath--one"><Reveal><ImageCard photo={featureOne} index={1} onOpen={() => setViewerIndex(1)} /></Reveal></section>

    <section className="visual-grid"><Reveal className="visual-grid__wide"><ImageCard photo={featureTwo} index={4} onOpen={() => setViewerIndex(4)} /></Reveal><Reveal delay={100} className="visual-grid__narrow"><ImageCard photo={featureThree} index={8} onOpen={() => setViewerIndex(8)} /></Reveal><Reveal delay={200} className="visual-grid__tiny"><ImageCard photo={featureFour} index={11} onOpen={() => setViewerIndex(11)} /></Reveal></section>

    <section className="color-break"><div className="color-break__shape color-break__shape--one" /><div className="color-break__shape color-break__shape--two" /><div className="color-break__shape color-break__shape--three" /></section>

    <section className="visual-breath visual-breath--two"><Reveal><ImageCard photo={featureFive} index={15} onOpen={() => setViewerIndex(15)} /></Reveal></section>

    <section className="reel-space"><div className="reel-space__shape" /></section>

    <section className="ending-title"><h2>Shot by Srijan</h2></section>

    {viewerIndex !== null && <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />}
  </div>;
}
