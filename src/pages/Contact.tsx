import { FormEvent, useState } from "react";

const EMAIL = "hello@shotbysrijan.com";
const INSTAGRAM = "@shotbysrijan";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Hello from ${data.get("name")} — portfolio enquiry`
    );
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("from")})`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputClass =
    "w-full border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-paper-dim/50 outline-none transition-colors focus:border-safelight";

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-paper-dim">
        say hello
      </p>
      <h1 className="mt-3 font-display text-4xl font-light md:text-6xl">
        Get in <span className="italic text-safelight">touch</span>
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-dim">
        Portraits, collaborations, or just talking cameras and light — the
        inbox is always open. (Contact details below are placeholders; swap in
        your own.)
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-paper-dim">
              your name
            </label>
            <input id="name" name="name" required className={inputClass} placeholder="Jane Doe" />
          </div>
          <div>
            <label htmlFor="from" className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-paper-dim">
              your email
            </label>
            <input id="from" name="from" type="email" required className={inputClass} placeholder="jane@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-paper-dim">
              message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className={inputClass}
              placeholder="Hi Srijan, I saw your portfolio and…"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-paper/70 py-3.5 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:border-safelight hover:bg-safelight hover:text-ink"
          >
            {sent ? "opening your mail app…" : "send message"}
          </button>
          <p className="text-[10px] text-paper-dim/60">
            This opens your mail app with the message pre-filled — no data is
            stored anywhere.
          </p>
        </form>

        <div className="space-y-8 md:border-l md:border-ink-line/60 md:pl-12">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">email</h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-2 inline-block font-display text-2xl font-light italic transition-colors hover:text-safelight"
            >
              {EMAIL}
            </a>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">instagram</h2>
            <span className="mt-2 inline-block font-display text-2xl font-light italic text-paper-dim">
              {INSTAGRAM}
            </span>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-paper-dim">based in</h2>
            <p className="mt-2 font-display text-2xl font-light italic">India</p>
          </div>
          <div className="border-t border-ink-line/60 pt-8 text-xs leading-relaxed text-paper-dim">
            Usually replies within a day or two — sooner if the light is bad
            outside.
          </div>
        </div>
      </div>
    </div>
  );
}
