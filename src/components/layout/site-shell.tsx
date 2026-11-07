import type { ReactNode } from "react";

import { Navigation } from "@/components/layout/navigation";
import { ScrollEffects } from "@/components/layout/scroll-effects";
import { PaintTrail } from "@/components/ui/paint-trail";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Navigation />
      {children}
      <ScrollEffects />
      <PaintTrail />
    </div>
  );
}
