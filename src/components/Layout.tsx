import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell">
    <div className="sky" aria-hidden="true" />
    <header className="site-header"><img className="brand" src="/camera-monogram.png" alt="Shot by Srijan" /></header>
    <main>{children}</main>
    <footer className="site-footer"><a href="https://www.youtube.com/@ShotbySrijan" aria-label="YouTube" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" fill="currentColor"/></svg></a><a href="https://www.instagram.com/Srijan.cc" aria-label="Instagram" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a></footer>
  </div>;
}
