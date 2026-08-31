import { FormEvent, useState } from "react";

const EMAIL = "hello@shotbysrijan.com";

export default function Contact() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Hello from ${data.get("name")} — portfolio enquiry`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("from")})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }
  const inputClass = "w-full border-b border-white/40 bg-transparent px-0 py-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-accent";
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20 lg:px-16">
      <header className="grid gap-8 border-b border-line pb-12 md:grid-cols-[1fr_1.5fr] md:items-end"><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">04 / Open line</p><h1 className="font-serif text-6xl font-light leading-[0.82] md:text-9xl">Let's<br /><span className="italic text-accent">talk.</span></h1></header>
      <section className="grid gap-14 py-16 md:grid-cols-[0.7fr_1.3fr] md:py-24"><div><p className="max-w-sm font-serif text-3xl font-light leading-tight md:text-4xl">Have a project, a question, or a good patch of light to share?</p><div className="mt-12 space-y-8"><div><p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Email</p><a href={`mailto:${EMAIL}`} className="mt-2 inline-block font-serif text-2xl italic transition-colors hover:text-accent">{EMAIL}</a></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Elsewhere</p><p className="mt-2 font-serif text-2xl italic text-muted">@shotbysrijan</p></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Based in</p><p className="mt-2 font-serif text-2xl italic">India</p></div></div></div><form onSubmit={handleSubmit} className="max-w-2xl"><div className="grid gap-8 md:grid-cols-2"><label className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Name<input id="name" name="name" required className={inputClass} placeholder="Your name" /></label><label className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Email<input id="from" name="from" type="email" required className={inputClass} placeholder="you@example.com" /></label></div><label className="mt-10 block text-[9px] font-semibold uppercase tracking-[0.25em] text-muted">Message<textarea id="message" name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="Tell me what you're thinking..." /></label><div className="mt-10 flex items-center justify-between gap-6"><button type="submit" className="group flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em]"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-white transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-black">↗</span>{sent ? "Opening mail app" : "Send message"}</button><span className="hidden text-[9px] uppercase tracking-[0.2em] text-muted sm:block">No forms stored · mailto</span></div></form></section>
      <section className="border-t border-line py-12"><p className="font-serif text-3xl font-light italic md:text-5xl">Good work starts with a conversation.</p></section>
    </div>
  );
}
