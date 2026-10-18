import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { portfolioData } from "@/data/portfolio";

export default function HomePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <Hero />
        {portfolioData.navigation.slice(1).map((item) => (
          <section
            aria-label={item.label.en}
            className="section-placeholder"
            id={item.id}
            key={item.id}
          />
        ))}
      </main>
    </SiteShell>
  );
}
