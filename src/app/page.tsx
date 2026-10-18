import { SiteShell } from "@/components/layout/site-shell";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <section aria-label="Experience" className="section-placeholder" id="experience" />
        <section aria-label="Contact" className="section-placeholder" id="contact" />
      </main>
    </SiteShell>
  );
}
