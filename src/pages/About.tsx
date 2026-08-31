import { photos, formatCamera } from "../data/photos";

const portrait = photos[0];

const gear = [
  { name: "Sony ZV-E10", note: "the everyday companion — mostly the 16-50mm kit" },
  { name: "Sony ZV-1", note: "pocket-sized, always with me" },
  { name: "Adobe Lightroom", note: "where every frame finds its final look" },
];

const chapters = [
  {
    year: "2022",
    text: "Picked up the ZV-1 and started shooting seriously — early mornings, empty streets, first attempts at golden hour.",
  },
  {
    year: "2023",
    text: "Added the ZV-E10. Learned to wait for light instead of chasing it, and to come home with fewer, better frames.",
  },
  {
    year: "Now",
    text: "Still learning. Still walking. This portfolio is the contact sheet so far.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-paper-dim">
        behind the lens
      </p>
      <h1 className="mt-3 font-display text-4xl font-light md:text-6xl">
        About <span className="italic text-safelight">Srijan</span>
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-[2fr_3fr]">
        <figure className="group relative overflow-hidden">
          <img
            src={portrait.thumb}
            alt="A frame by Srijan"
            className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-4 text-[10px] uppercase tracking-[0.3em] text-paper-dim">
            {formatCamera(portrait.camera)} · {portrait.date}
          </figcaption>
        </figure>

        <div>
          <p className="text-lg leading-relaxed text-paper">
            I'm Srijan — a photographer who fell for the way light lands on
            ordinary things. I photograph streets, travels, and the quiet
            moments in between, mostly on weekend walks and early-morning
            detours.
          </p>
          <p className="mt-5 leading-relaxed text-paper-dim">
            This site is my open contact sheet: {photos.length} frames I keep
            coming back to. No grand themes — just curiosity, patience, and a
            fondness for golden hour. (Swap this paragraph for your own story —
            it's a placeholder.)
          </p>

          <div className="mt-10 space-y-6 border-t border-ink-line/60 pt-8">
            {chapters.map((c) => (
              <div key={c.year} className="flex gap-6">
                <span className="w-14 shrink-0 font-display text-xl italic text-amber">
                  {c.year}
                </span>
                <p className="text-sm leading-relaxed text-paper-dim">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-light italic md:text-3xl">
          The kit
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {gear.map((g) => (
            <div
              key={g.name}
              className="border border-ink-line/60 p-6 transition-colors duration-300 hover:border-safelight/60"
            >
              <div className="font-display text-xl italic">{g.name}</div>
              <p className="mt-2 text-xs leading-relaxed text-paper-dim">{g.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
