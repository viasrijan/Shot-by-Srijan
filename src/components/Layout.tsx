import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="site-shell"><div className="sky" aria-hidden="true" /><main>{children}</main></div>;
}
