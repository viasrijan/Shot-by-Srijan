import { ReactNode, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Monogram() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Shot by Srijan — home">
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0">
        <rect width="64" height="64" rx="14" className="fill-ink-soft" />
        <path
          d="M20 14 H14 V20 M44 14 H50 V20 M20 50 H14 V44 M44 50 H50 V44"
          className="stroke-safelight"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="32"
          y="42"
          fontFamily="Fraunces, Georgia, serif"
          fontStyle="italic"
          fontSize="27"
          className="fill-paper"
          textAnchor="middle"
        >
          S
        </text>
      </svg>
      <span className="leading-none">
        <span className="block text-[10px] uppercase tracking-[0.35em] text-paper-dim">
          Shot by
        </span>
        <span className="block font-display text-xl italic">Srijan</span>
      </span>
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="grain" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-line/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
          <Monogram />
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                    isActive ? "text-safelight" : "text-paper-dim hover:text-paper"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-px w-6 bg-paper transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-paper transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-ink-line/60 px-5 pb-6 pt-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-display text-2xl italic ${
                      isActive ? "text-safelight" : "text-paper"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="pt-[72px]">{children}</main>

      <footer className="border-t border-ink-line/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-[11px] uppercase tracking-[0.3em] text-paper-dim md:flex-row md:px-8">
          <span>© {new Date().getFullYear()} Shot by Srijan</span>
          <span className="font-display normal-case italic tracking-normal text-paper-dim/70">
            exposed, developed, delivered
          </span>
          <div className="flex gap-6">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
