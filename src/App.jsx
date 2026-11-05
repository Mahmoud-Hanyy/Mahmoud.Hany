import Navbar from "./components/Layout/Navbar";
import Hero from "./components/Hero/Hero";
import DiverDescent from "./components/Hero/DiverDescent";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import DepthGauge from "./components/DepthGauge/DepthGauge";
import CursorRipples from "./components/Effects/CursorRipples";
import useScrollDepth from "./hooks/useScrollDepth";
import { getDepthZone } from "./data/depthZones";

export default function App() {
  const { progress, meters } = useScrollDepth(4000);
  const depthZone = getDepthZone(meters).label;

  return (
    <>
      <CursorRipples />
      <Navbar />
      <DepthGauge progress={progress} meters={meters} />
      <main>
        <Hero meters={meters} depthZone={depthZone} />
        <DiverDescent meters={meters} />
        <About depthLabel={`${meters}m — ${depthZone}`} />
        <Skills depthLabel={`${meters}m — ${depthZone}`} />
        <Experience depthLabel={`${meters}m — ${depthZone}`} />
        <Projects depthLabel={`${meters}m — ${depthZone}`} />
        <Contact depthLabel={`${meters}m — ${depthZone}`} />
      </main>
    </>
  );
}
