import { Link } from "react-router-dom";
import { photos } from "../data/photos";

const hero = photos.find((p) => p.id === "hero") ?? photos[0];
const featured = photos.filter((p) => p.featured).slice(0, 4);

function SprocketRow({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-4 justify-between overflow-hidden border-ink-line px-1 ${
        flip ? "border-t" : "border-b"
      }`}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} className="my-1 w-3 shrink-0 rounded-[2px] bg-paper/10" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-72px)] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero.src}
            alt={hero.title}
            className="kenburns h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
        </div>

        {/* viewfinder corners */}
        <div aria-hidden="true" className="absolute inset-6 hidden md:block">
          <span className="vf-corner left-0 top-0 border-l-2 border-t-2" />
          <span className="vf-corner right-0 top-0 border-r-2 border-t-2" />
          <span className="vf-corner bottom-0 left-0 border-b-2 border-l-2" />
          <span className="vf-corner bottom-0 right-0 border-b-2 border-r-2" />
        </div>

        <div className="relative z-10 px-5 pb-16 md:px-14 md:pb-20">
          <p className="rise mb-4 text-[11px] uppercase tracking-[0.4em] text-paper-dim" style={{ animationDelay: "0.1s" }}>
            f/2.8 · ISO 400 · the world, as I see it
          </p>
          <h1
            className="rise font-display text-5xl font-light leading-[1.05] md:text-8xl"
            style={{ animationDelay: "0.25s" }}
          >
            Shot by <span className="italic text-safelight">Srijan</span>
          </h1>
          <p
            className="rise mt-5 max-w-md text-sm leading-relaxed text-paper-dim md:text-base"
            style={{ animationDelay: "0.4s" }}
          >
            Chasing light, framing stories — a personal portfolio of street,
            travel and everyday moments, one frame at a time.
          </p>
          <div className="rise mt-8 flex gap-4" style={{ animationDelay: "0.55s" }}>
            <Link
              to="/gallery"
              className="border border-paper/70 px-7 py-3 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:border-safelight hover:bg-safelight hover:text-ink"
            >
              Enter the gallery
            </Link>
            <Link
              to="/about"
              className="px-2 py-3 text-[11px] uppercase tracking-[0.3em] text-paper-dim transition-colors hover:text-paper"
            >
              About me →
            </Link>
          </div>
        </div>

        <SprocketRow />
      </section>

      {/* Statement */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-3xl font-light italic md:text-4xl">
            "Photography is the pause button of life."
          </h2>
          <div>
            <p className="leading-relaxed text-paper-dim">
              Every frame here was caught between one moment and the next — on
              evening walks, early trains, and slow weekends. I shoot with a
              Sony ZV-E10 and a ZV-1, mostly natural light, always chasing the
              way it falls on ordinary things.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-line/60 pt-8 text-center md:text-left">
              <div>
                <div className="font-display text-4xl italic text-amber">{photos.length}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-paper-dim">frames</div>
              </div>
              <div>
                <div className="font-display text-4xl italic text-amber">2</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-paper-dim">cameras</div>
              </div>
              <div>
                <div className="font-display text-4xl italic text-amber">'22–'23</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-paper-dim">exposures</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-ink-line/60">
        <SprocketRow flip />
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl font-light md:text-5xl">
              Selected <span className="italic text-safelight">frames</span>
            </h2>
            <Link
              to="/gallery"
              className="text-[11px] uppercase tracking-[0.3em] text-paper-dim transition-colors hover:text-paper"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/gallery"
                className={`group relative overflow-hidden ${
                  i % 3 === 0 ? "sm:row-span-2" : ""
                }`}
              >
                <img
                  src={p.thumb}
                  alt={p.title}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                    i % 3 === 0 ? "aspect-[3/4] sm:h-full" : "aspect-[4/3]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-display italic">{p.title}</span>
                  <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-paper-dim">
                    {p.frame}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-ink-line/60 py-6">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center">
              {["street", "travel", "golden hour", "monsoon", "everyday light", "frames of home"].map(
                (word) => (
                  <span key={word + n} className="mx-6 flex items-center gap-6">
                    <span className="font-display text-2xl font-light italic text-paper-dim md:text-3xl">
                      {word}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-safelight" />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.4em] text-paper-dim">
          like what you see?
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block font-display text-4xl font-light italic transition-colors hover:text-safelight md:text-6xl"
        >
          Let's make something together →
        </Link>
      </section>
    </div>
  );
}
