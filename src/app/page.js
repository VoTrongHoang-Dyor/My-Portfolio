import SplineBackground from '@/components/background/SplineBackground';
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

export default function Home() {
  return (
    <>
      {/* Fixed full-page 3D scene behind everything */}
      <SplineBackground />

      {/* Content sits above the 3D background */}
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Timeline />
        <Skills />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
