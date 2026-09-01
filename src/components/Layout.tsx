import { ReactNode, useEffect, useState } from "react";
import ColorField from "./ColorField";

type Theme = "dark" | "light";

function Brand() {
  return <div className="brand" aria-label="Shot by Srijan"><span className="brand-mark">S</span><span className="brand-title">Shot by Srijan</span></div>;
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
      <ColorField />
      <header className="site-header"><Brand /></header>
      <button type="button" className="theme-float" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><span className={`theme-float__orb theme-float__orb--${theme}`} /></button>
      <main>{children}</main>
      <footer className="site-footer"><Brand /></footer>
    </div>
  );
}
