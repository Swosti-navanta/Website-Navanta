import Navbar from "@/components/Navbar";
// HeroV2 = scroll-shrink experience; revert by importing Hero instead.
import Hero from "@/components/HeroV2";
import MissionStatement from "@/components/MissionStatement";
import Challenges from "@/components/Challenges";
// LensIntro = toggle scatter/flow concept; old agent-demo lives in Lens.tsx (revert by swapping back).
import Lens from "@/components/LensIntro";
import Approach from "@/components/Approach";
import IntelligenceLayer from "@/components/IntelligenceLayer";
import HowWeEnable from "@/components/HowWeEnable";
import Outcomes from "@/components/Outcomes";
import Faq from "@/components/Faq";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionStatement />
        <Challenges />
        <Lens />
        <IntelligenceLayer />
        <HowWeEnable />
        <Outcomes />
        <Approach />
        <Faq />
        <Impact />
      </main>
      <Footer />
    </>
  );
}
