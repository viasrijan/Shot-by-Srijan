import { useEffect, useState } from "react";
import { photos } from "../data/photos";
import Lightbox from "../components/Lightbox";
import Reveal from "../components/Reveal";

const hero = photos[0];
type Photo = (typeof photos)[number];

function ImageCard({ photo, eager = false, onOpen }: { photo: Photo; eager?: boolean; onOpen: () => void }) {
  return (
    <figure className="image-card">
      <button type="button" className="image-card__button" onClick={onOpen} aria-label="Open image fullscreen">
        <img src={photo.src} alt="" loading={eager ? "eager" : "lazy"} />
        <span className="image-card__ring" aria-hidden="true">↗</span>
      </button>
    </figure>
  );
}

function ImageGroup({ group, onOpen }: { group: Photo[]; onOpen: (photo: Photo) => void }) {
  return (
    <section className="visual-grid">
      {group.map((photo) => (
        <Reveal key={photo.id}>
          <ImageCard photo={photo} onOpen={() => onOpen(photo)} />
        </Reveal>
      ))}
    </section>
  );
}

export default function Home() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIntroVisible(false), 1500);
    return () => window.clearTimeout(timeout);
  }, []);

  const openPhoto = (photo: Photo) => setViewerIndex(photos.indexOf(photo));

  return (
    <div className="archive">
      {introVisible && <div className="intro-curtain" aria-hidden="true"><span>Shot by Srijan</span></div>}

      <section className="hero-panel">
        <div className="hero-panel__title"><h1>Shot by Srijan</h1></div>
        <button type="button" className="hero-panel__image" onClick={() => setViewerIndex(0)} aria-label="Open image fullscreen">
          <img src={hero.src} alt="" />
          <span className="hero-panel__open" aria-hidden="true">↗</span>
        </button>
        <div className="hero-panel__field" aria-hidden="true"><span className="hero-panel__orb" /><span className="hero-panel__orb hero-panel__orb--two" /></div>
      </section>

      <section className="visual-breath visual-breath--one"><Reveal><ImageCard photo={photos[1]} eager onOpen={() => setViewerIndex(1)} /></Reveal></section>
      <ImageGroup group={photos.slice(2, 5)} onOpen={openPhoto} />
      <section className="color-break" aria-hidden="true"><div className="color-break__shape color-break__shape--one" /><div className="color-break__shape color-break__shape--two" /><div className="color-break__shape color-break__shape--three" /></section>
      <ImageGroup group={photos.slice(5, 8)} onOpen={openPhoto} />
      <section className="visual-breath visual-breath--two"><Reveal><ImageCard photo={photos[8]} onOpen={() => setViewerIndex(8)} /></Reveal></section>
      <ImageGroup group={photos.slice(9, 12)} onOpen={openPhoto} />
      <section className="reel-space" aria-label="Future video area"><div className="reel-space__shape" /><span className="reel-space__mark" aria-hidden="true">＋</span></section>
      <ImageGroup group={photos.slice(12, 15)} onOpen={openPhoto} />
      <section className="visual-breath visual-breath--two"><Reveal><ImageCard photo={photos[15]} onOpen={() => setViewerIndex(15)} /></Reveal></section>
      <section className="ending-title"><h2>Shot by Srijan</h2></section>

      {viewerIndex !== null && <Lightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNavigate={setViewerIndex} />}
    </div>
  );
}
