import Navbar from "@/components/Navbar";
// HeroV2 = scroll-shrink experience; revert by importing Hero instead.
import Hero from "@/components/HeroV2";
import MissionStatement from "@/components/MissionStatement";
import WhyUs from "@/components/WhyUs";
import Challenges from "@/components/Challenges";
import Approach from "@/components/Approach";
import IntelligenceLayer from "@/components/IntelligenceLayer";
import HowWeEnable from "@/components/HowWeEnable";
import Outcomes from "@/components/Outcomes";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionStatement />
        <WhyUs />
        <Challenges />
        <IntelligenceLayer />
        <Outcomes />
        <HowWeEnable />
        <Approach />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
