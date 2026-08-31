import { photos, formatCamera } from "../data/photos";

const portrait = photos[0];
const chapters = [
  { year: "01", title: "Start with looking", text: "Before the camera, there is attention. I walk, wait and let the frame find me — usually somewhere between the obvious and the overlooked." },
  { year: "02", title: "Keep it close", text: "Most of these images were made close to home. Familiar streets, garden corners, a face that pauses for half a second. Distance is not required for wonder." },
  { year: "03", title: "Make room for chance", text: "The best frames are rarely the ones I planned. A blur, a glance, a patch of light — the small accidents are often the whole point." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20 lg:px-16">
      <header className="flex items-end justify-between border-b border-line pb-8"><div><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">03 / Notes from behind the camera</p><h1 className="mt-8 font-serif text-6xl font-light leading-[0.82] md:text-9xl">A little<br /><span className="italic text-accent">context.</span></h1></div><span className="hidden font-serif text-8xl font-light italic text-white/20 md:block">S</span></header>
      <section className="grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24"><div className="relative"><img src={portrait.src} alt="A frame by Srijan" className="aspect-[4/5] w-full object-cover grayscale-[15%]" /><span className="absolute -bottom-5 -right-2 font-serif text-7xl italic text-accent md:-right-8 md:text-9xl">01</span></div><div className="flex flex-col justify-between"><div><p className="max-w-2xl font-serif text-3xl font-light leading-tight md:text-5xl">I'm Srijan. I photograph the things that ask to be noticed twice.</p><p className="mt-8 max-w-lg text-sm leading-7 text-muted">Cats that hold a stare. Flowers at the end of the day. A passing train becoming a line of color. This is an open archive of those pauses — made with a Sony ZV-E10, a ZV-1 and a willingness to take the long way home.</p></div><div className="mt-14 border-t border-line pt-6"><p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Current tools</p><div className="mt-4 flex flex-wrap gap-3"><span className="border border-line px-3 py-2 text-[10px] font-semibold">Sony ZV-E10</span><span className="border border-line px-3 py-2 text-[10px] font-semibold">Sony ZV-1</span><span className="border border-line px-3 py-2 text-[10px] font-semibold">Lightroom</span></div><p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted">{formatCamera(portrait.camera)} · {portrait.date} · {photos.length} frames</p></div></div></section>
      <section className="border-t border-line py-14 md:py-20"><div className="mb-10 flex items-end justify-between"><h2 className="font-serif text-4xl font-light md:text-6xl">The <span className="italic text-accent">practice</span></h2><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">A short list</span></div><div className="divide-y divide-white/20">{chapters.map((chapter) => <article key={chapter.year} className="grid gap-4 py-8 md:grid-cols-[0.25fr_0.75fr_1fr]"><span className="font-serif text-3xl italic text-accent">{chapter.year}</span><h3 className="font-serif text-2xl font-light italic">{chapter.title}</h3><p className="max-w-md text-sm leading-7 text-muted">{chapter.text}</p></article>)}</div></section>
    </div>
  );
}
