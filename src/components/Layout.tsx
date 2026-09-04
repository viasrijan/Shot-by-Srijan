import { ReactNode, useEffect } from "react";

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

export function MarkIcon() {
  return <Mark />;
}

function FloatingOrbs() {
  return (
    <div className="orbs-global" aria-hidden="true">
      <span className="orb-global orb-global--1" />
      <span className="orb-global orb-global--2" />
      <span className="orb-global orb-global--3" />
      <span className="orb-global orb-global--4" />
      <span className="orb-global orb-global--5" />
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    window.localStorage.removeItem("shot-by-srijan-theme");
  }, []);

  return (
    <div className="site-shell" id="top">
      <main>{children}</main>
      <footer className="site-footer">
        <Mark />
        <p>Shot by Srijan</p>
      </footer>
      <FloatingOrbs />
    </div>
  );
}
