import { ChatWidget } from "@/components/chat-widget";
import { Hero } from "@/components/hero";
import { About, Experience, Highlights, Projects } from "@/components/sections-main";
import { Education, Footer, Skills } from "@/components/sections-more";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Highlights />
        <Projects />
        <Experience />
        <Skills />
        <Education />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
