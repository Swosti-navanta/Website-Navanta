import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Challenges from "@/components/Challenges";
import Approach from "@/components/Approach";
import IntelligenceLayer from "@/components/IntelligenceLayer";
import HowWeEnable from "@/components/HowWeEnable";
import Outcomes from "@/components/Outcomes";
import Advantages from "@/components/Advantages";
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
        <Approach />
        <IntelligenceLayer />
        <HowWeEnable />
        <Outcomes />
        <Advantages />
        <Faq />
        <Impact />
      </main>
      <Footer />
    </>
  );
}
