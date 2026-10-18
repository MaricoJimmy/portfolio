import type { ReactNode } from "react";

import { Navigation } from "@/components/layout/navigation";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Navigation />
      {children}
    </div>
  );
}
