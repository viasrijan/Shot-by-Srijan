import { ReactNode } from "react";

/* Mark: a hand-drawn lens ring with a single aperture stroke. */
function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M32 9.5 C45.2 8.8 55.3 18.6 54.8 32.2 C54.3 45.6 44.9 55.1 31.6 54.6 C18.7 54.1 9.3 44.6 9.7 31.7 C10.1 19 20 10.2 32 9.5 Z" />
        <path d="M32 23.2 C37.4 22.9 41.1 26.8 40.9 32.3 C40.7 37.6 36.9 41.1 31.7 40.9 C26.6 40.7 22.9 37 23.1 31.9 C23.3 26.9 27.1 23.4 32 23.2 Z" />
        <circle cx="45.5" cy="20" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <div className="sky" aria-hidden="true" />
      <header className="site-header">
        <span className="brand" aria-label="Shot by Srijan">
          <Mark />
        </span>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <Mark />
      </footer>
    </div>
  );
}
