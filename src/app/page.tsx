import { SiteShell } from "@/components/layout/site-shell";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
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
        <Journey />
        <Contact />
      </main>
    </SiteShell>
  );
}
