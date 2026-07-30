import SplineBackground from '@/components/background/SplineBackground';
import StructuredData from '@/components/seo/StructuredData';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import Work from '@/components/sections/Work';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <>
      <StructuredData />

      {/* Fixed full-page 3D scene behind everything */}
      <SplineBackground />

      {/* Content sits above the 3D background */}
      <Nav />
      <main>
        <Hero />
        <ScrollReveal direction="left">
          <About />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <Education />
        </ScrollReveal>
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <Skills />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <Work />
        </ScrollReveal>
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
