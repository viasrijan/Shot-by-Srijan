import { ReactNode, useEffect, useState } from "react";

type Theme = "dark" | "light";

function Brand() {
  return (
    <div className="brand" aria-label="Shot by Srijan">
      <span className="brand-mark">S</span>
      <span className="brand-name">
        <small>Shot by</small>
        <strong>Srijan</strong>
      </span>
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button className="theme-toggle" onClick={onToggle} type="button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <span className={`theme-dot theme-dot--${theme}`} aria-hidden="true" />
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem("shot-by-srijan-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("shot-by-srijan-theme", theme);
  }, [theme]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Brand />
          <div className="header-meta">
            <span className="header-meta__count">16 frames · 01 reel</span>
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
          </div>
        </div>
      </header>

      <div className="scroll-meter" aria-hidden="true">
        <span className="scroll-meter__track" />
        <span className="scroll-meter__fill" style={{ height: `${progress}%` }} />
      </div>

      <main>{children}</main>

      <footer className="site-footer">
        <Brand />
        <span className="site-footer__note">A visual archive · India</span>
        <span className="site-footer__year">© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
