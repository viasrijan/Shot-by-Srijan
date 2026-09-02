import { ReactNode, useEffect, useState } from "react";

type Theme = "dark" | "light";

function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M32 11.8 C43.6 11.1 52.7 19.6 52.4 31.6 C52.1 43.7 43.4 52.5 31.7 52.2 C20.2 51.9 11.5 43.2 11.9 31.8 C12.3 20.4 20.9 12.5 32 11.8 Z" />
        <path d="M52 32 L27.4 42" />
        <path d="M42 49.3 L21 33" />
        <path d="M22 49.3 L25.7 23" />
        <path d="M12 32 L36.7 22" />
        <path d="M22 14.7 L43 31" />
        <path d="M42 14.7 L38.3 41" />
      </g>
    </svg>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("shot-by-srijan-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("shot-by-srijan-theme", theme);
  }, [theme]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          type="button"
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Shot by Srijan"
        >
          <Mark />
        </button>
      </header>
      <button
        type="button"
        className="theme-float"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <svg className="bulb" viewBox="0 0 24 24" aria-hidden="true">
          <path
            className="bulb__glass"
            d="M12 3.4 C8.6 3.4 5.9 6.1 5.9 9.4 C5.9 11.6 7 13.2 8.2 14.5 C9 15.4 9.5 16.1 9.7 17.1 C9.8 17.7 10.3 18.1 10.9 18.1 L13.1 18.1 C13.7 18.1 14.2 17.7 14.3 17.1 C14.5 16.1 15 15.4 15.8 14.5 C17 13.2 18.1 11.6 18.1 9.4 C18.1 6.1 15.4 3.4 12 3.4 Z"
          />
          <path className="bulb__filament" d="M10.3 11.6 L12 9.8 L13.7 11.6" />
          <path className="bulb__base" d="M9.9 20.2 L14.1 20.2 M10.7 22.2 L13.3 22.2" />
        </svg>
      </button>
      <main>{children}</main>
      <footer className="site-footer">
        <svg className="site-footer__sig" viewBox="0 0 200 16" aria-hidden="true">
          <path d="M2 9 C 40 4, 100 3, 198 7" pathLength={1} />
        </svg>
        <Mark />
        <p>Shot by Srijan</p>
      </footer>
    </div>
  );
}
