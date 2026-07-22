import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Sections land here one by one:
            Challenges → Approach → Intelligence Layer → How We Enable Value
            → Driving Outcomes → Advantages → Impact → KPIs → Footer */}
      </main>
    </>
  );
}
