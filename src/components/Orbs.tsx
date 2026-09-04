export default function Orbs({ variant = "hero" }: { variant?: "hero" | "reel" | "band" }) {
  return (
    <div className={`orbs orbs--${variant}`} aria-hidden="true">
      <span className="orb orb--a" />
      <span className="orb orb--b" />
      <span className="orb orb--c" />
    </div>
  );
}
