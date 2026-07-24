import Navbar from "@/components/Navbar";
// HeroV2 = scroll-shrink experience; revert by importing Hero instead.
import Hero from "@/components/HeroV2";
import Challenges from "@/components/Challenges";
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
        <Challenges />
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
