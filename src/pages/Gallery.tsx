import { useState } from "react";
import { photos, categories } from "../data/photos";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visible = filter === "all" ? photos : photos.filter((photo) => photo.category === filter);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20 lg:px-16">
      <header className="grid gap-10 border-b border-line pb-12 md:grid-cols-[1fr_2fr] md:items-end">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">02 / The archive</p><p className="mt-8 font-serif text-8xl font-light leading-none text-accent md:text-[12rem]">{String(photos.length).padStart(2, "0")}</p></div>
        <div><h1 className="font-serif text-6xl font-light leading-[0.85] md:text-9xl">The<br /><span className="italic">works.</span></h1><p className="mt-8 max-w-md text-sm leading-7 text-muted">A contact sheet of passing glances, small creatures and the light that makes a moment stay.</p></div>
      </header>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-line py-5"><span className="mr-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-muted">Filter</span>{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${filter === category ? "text-accent underline decoration-accent underline-offset-8" : "text-muted hover:text-white"}`}>{category}</button>)}<span className="ml-auto hidden text-[9px] uppercase tracking-[0.2em] text-muted md:block">Click to enlarge · ← →</span></div>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-16 lg:grid-cols-4">
        {visible.map((photo, index) => { const realIndex = photos.indexOf(photo); return <button key={photo.id} onClick={() => setLightboxIndex(realIndex)} className={`group text-left ${index % 5 === 0 ? "md:col-span-2" : ""}`}><div className="relative overflow-hidden bg-white/5"><img src={photo.thumb} alt={photo.title} loading="lazy" className={`w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0 ${index % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`} /><span className="absolute right-3 top-3 border border-white/60 bg-black/40 px-2 py-1 text-[9px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">↗</span></div><div className="mt-3 flex items-start justify-between gap-3"><div><h2 className="font-serif text-lg italic md:text-xl">{photo.title}</h2><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-muted">{photo.category}</p></div><span className="text-[9px] font-semibold text-muted">{photo.frame.replace("Frame ", "#")}</span></div></button>; })}
      </div>
      {lightboxIndex !== null && <Lightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />}
    </div>
  );
}
