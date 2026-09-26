import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
