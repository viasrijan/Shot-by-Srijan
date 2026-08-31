import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Index", number: "01" },
  { to: "/gallery", label: "Works", number: "02" },
  { to: "/about", label: "Notes", number: "03" },
  { to: "/contact", label: "Write", number: "04" },
];

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Shot by Srijan — home">
      <span className="flex h-10 w-10 items-center justify-center border border-white font-serif text-xl italic text-white transition-colors group-hover:border-accent group-hover:text-accent">
        S
      </span>
      <span className="hidden leading-none sm:block">
        <span className="block text-[9px] font-semibold uppercase tracking-[0.3em] text-muted">Shot by</span>
        <span className="mt-1 block font-serif text-lg italic">Srijan</span>
      </span>
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[88px] flex-col items-center justify-between border-r border-line bg-black py-7 lg:flex">
        <Wordmark />
        <nav className="flex flex-col items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="group flex flex-col items-center gap-2" aria-label={item.label}>
              {({ isActive }) => (
                <>
                  <span className={`text-[9px] font-semibold tracking-[0.16em] transition-colors ${isActive ? "text-accent" : "text-muted group-hover:text-white"}`}>
                    {item.number}
                  </span>
                  <span className={`vertical-label text-[9px] uppercase tracking-[0.22em] transition-colors ${isActive ? "text-accent" : "text-muted group-hover:text-white"}`}>
                    {item.label}
                  </span>
                  <span className={`h-1 w-1 rounded-full transition-colors ${isActive ? "bg-accent" : "bg-transparent group-hover:bg-white"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <span className="vertical-label text-[8px] uppercase tracking-[0.3em] text-muted">India · 2023</span>
      </aside>

      <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-line bg-black px-5 lg:hidden">
        <Wordmark />
        <button onClick={() => setMenuOpen((value) => !value)} className="flex h-10 w-10 flex-col items-end justify-center gap-2" aria-label="Toggle menu">
          <span className={`h-px bg-white transition-all ${menuOpen ? "w-6 -translate-y-[-5px] -rotate-45" : "w-6"}`} />
          <span className={`h-px bg-white transition-all ${menuOpen ? "w-6 translate-y-[-5px] rotate-45" : "w-4"}`} />
        </button>
        {menuOpen && (
          <nav className="absolute inset-x-0 top-[76px] border-b border-line bg-black px-5 py-7">
            <div className="grid grid-cols-2 gap-5">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className="flex items-baseline gap-3 font-serif text-2xl italic">
                  <span className="font-sans text-[10px] not-italic text-accent">{item.number}</span>{item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="lg:ml-[88px]">{children}</main>

      <footer className="border-t border-line lg:ml-[88px]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 md:grid-cols-3 md:px-10">
          <div><Wordmark /></div>
          <p className="max-w-xs text-xs leading-relaxed text-muted">A growing archive of small observations, photographed by Srijan.</p>
          <div className="flex items-start justify-start gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted md:justify-end">
            <Link to="/gallery" className="transition-colors hover:text-white">Works</Link>
            <Link to="/contact" className="transition-colors hover:text-accent">Write</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
