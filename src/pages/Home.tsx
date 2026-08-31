import { Link } from "react-router-dom";
import { photos } from "../data/photos";

const hero = photos[0];
const sideImage = photos[4];
const featureA = photos[1];
const featureB = photos[8];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <section className="grid min-h-[calc(100vh-0px)] grid-cols-1 border-b border-line lg:grid-cols-[1.07fr_0.93fr]">
        <div className="relative order-2 flex flex-col justify-between px-5 pb-12 pt-12 md:px-10 md:pb-14 md:pt-16 lg:order-1 lg:px-16 lg:pt-24">
          <div>
            <p className="rise text-[10px] font-semibold uppercase tracking-[0.32em] text-muted" style={{ animationDelay: "0.05s" }}>A visual archive · 01—16</p>
            <h1 className="rise mt-10 max-w-3xl font-serif text-[clamp(4.5rem,11vw,10.5rem)] font-light leading-[0.78] tracking-[-0.06em]" style={{ animationDelay: "0.18s" }}>
              Shot<br /><span className="ml-[15%] italic text-accent">by</span><br /><span className="ml-[30%]">Srijan</span>
            </h1>
            <p className="rise mt-14 max-w-xs border-l border-accent pl-4 text-sm leading-relaxed text-muted md:ml-[30%]" style={{ animationDelay: "0.3s" }}>
              A collection of small observations. Light, whiskers, passing windows — the things worth stopping for.
            </p>
          </div>
          <div className="mt-14 flex items-end justify-between gap-6 md:ml-[30%]">
            <Link to="/gallery" className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">↗</span>
              Explore the work
            </Link>
            <span className="text-right text-[9px] uppercase leading-relaxed tracking-[0.2em] text-muted">India<br />2022—2023</span>
          </div>
        </div>
        <div className="relative order-1 min-h-[58vh] overflow-hidden lg:order-2 lg:min-h-0">
          <img src={hero.src} alt={hero.title} className="kenburns absolute inset-0 h-full w-full object-cover grayscale-[15%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
          <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between text-[9px] font-semibold uppercase tracking-[0.22em] md:bottom-10 md:left-10 md:right-10">
            <span className="text-white">01 / 16</span><span className="text-white/60">A quiet stare</span>
          </div>
          <span className="absolute right-5 top-6 font-serif text-6xl font-light italic text-white/80 md:right-10 md:top-10 md:text-8xl">S</span>
        </div>
      </section>

      <section className="grid gap-12 border-b border-line px-5 py-20 md:grid-cols-[0.5fr_1fr_1.2fr] md:px-10 md:py-28 lg:px-16">
        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Selected<br />observations</div>
        <h2 className="font-serif text-4xl font-light leading-[0.95] md:text-6xl">The ordinary<br /><span className="italic text-accent">deserves</span><br />attention.</h2>
        <div className="flex flex-col justify-between gap-10 md:pt-2"><p className="max-w-sm text-sm leading-7 text-muted">Not every photograph needs a destination. Some just need a little patience — a cat looking back, a flower holding the last sun, a train becoming a blur.</p><Link to="/about" className="text-[10px] font-semibold uppercase tracking-[0.25em] underline decoration-accent underline-offset-8 transition-colors hover:text-accent">Read the notes →</Link></div>
      </section>

      <section className="grid border-b border-line md:grid-cols-2">
        <Link to="/gallery" className="group relative min-h-[520px] overflow-hidden border-b border-line md:border-b-0 md:border-r">
          <img src={sideImage.src} alt={sideImage.title} className="absolute inset-0 h-full w-full object-cover grayscale-[25%] transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
          <div className="absolute left-5 top-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] md:left-10 md:top-10"><span className="h-2 w-2 rounded-full bg-accent" />02 / botanicals</div>
          <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between md:bottom-10 md:left-10 md:right-10"><h3 className="font-serif text-4xl italic md:text-5xl">Last light</h3><span className="text-2xl transition-transform group-hover:translate-x-2">→</span></div>
        </Link>
        <div className="grid grid-rows-2">
          {[featureA, featureB].map((photo, index) => <Link to="/gallery" key={photo.id} className="group relative grid grid-cols-[1fr_1.1fr] overflow-hidden border-b border-line last:border-b-0"><div className="relative min-h-[250px] overflow-hidden"><img src={photo.src} alt={photo.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="flex flex-col justify-between p-5 md:p-8"><span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">0{index + 3} / {photo.category}</span><h3 className="font-serif text-2xl italic md:text-3xl">{photo.title}</h3><span className="text-[10px] uppercase tracking-[0.2em] text-muted">View frame ↗</span></div></Link>)}
        </div>
      </section>

      <section className="overflow-hidden border-b border-line py-8"><div className="marquee-track flex w-max whitespace-nowrap"><span className="mx-8 font-serif text-4xl font-light italic md:text-6xl">stay curious · look closer · keep walking · </span><span className="mx-8 font-serif text-4xl font-light italic md:text-6xl">stay curious · look closer · keep walking · </span></div></section>

      <section className="grid gap-8 px-5 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28 lg:px-16"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">Next frame</span><div><h2 className="max-w-3xl font-serif text-5xl font-light leading-[0.9] md:text-8xl">See the full<br /><span className="italic text-accent">contact sheet.</span></h2><Link to="/gallery" className="mt-10 inline-block border-b border-white pb-3 text-[10px] font-semibold uppercase tracking-[0.25em] transition-colors hover:border-accent hover:text-accent">Enter gallery →</Link></div></section>
    </div>
  );
}
