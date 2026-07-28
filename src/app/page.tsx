import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { Solutions } from "@/components/Solutions";
import { Audience } from "@/components/Audience";
import { VideoSection } from "@/components/VideoSection";
import { MidCTA } from "@/components/MidCTA";
import { Ecosystem } from "@/components/Ecosystem";
import { ResearchTriangle } from "@/components/ResearchTriangle";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Problems />
        <Solutions />
        <Audience />
        <VideoSection />
        <MidCTA />
        <Ecosystem />
        <ResearchTriangle />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
