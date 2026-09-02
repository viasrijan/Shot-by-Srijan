import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";

interface RevealProps { children: ReactNode; className?: string; delay?: number; style?: CSSProperties; }

export default function Reveal({ children, className = "", delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.visible = "true"; observer.unobserve(element); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ ...style, "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
