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
import { JsonLd } from "@/components/JsonLd";
import { videoSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
});

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
      <JsonLd
        data={videoSchema({
          name: "Asimetrix — monitoreo inteligente en granja",
          description:
            "Recorrido por la operación de una granja monitoreada con cámaras inteligentes y sensores Asimetrix.",
          contentUrl: "/images/home_hero.mp4",
          thumbnailUrl: "/images/home_produccion_fotograma.webp",
        })}
      />
    </>
  );
}
