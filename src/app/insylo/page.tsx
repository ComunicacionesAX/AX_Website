import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InsyloPage } from "@/components/insylo/InsyloPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, productSchema, videoSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE = "Insylo | Sensor 3D para monitoreo de alimento en silos";
const DESCRIPTION =
  "Insylo mide el nivel de alimento en silos de hasta 12 metros con 97% de precisión, con alertas configurables y topografía 3D.";

export const metadata = pageMetadata({
  path: "/insylo",
  title: TITLE,
  description: DESCRIPTION,
});

export default function Insylo() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <InsyloPage />
      </main>
      <Footer />
      <JsonLd
        data={productSchema({
          path: "/insylo",
          name: "Insylo",
          description: DESCRIPTION,
          image: "/images/home_render_insylo-1-768x1131.webp",
          precision: 97,
        })}
      />
      <JsonLd data={breadcrumbSchema({ name: "Insylo", path: "/insylo" })} />
      <JsonLd
        data={videoSchema({
          name: "Insylo en operación",
          description:
            "Sensor 3D Insylo midiendo el nivel de alimento dentro de un silo de granja.",
          contentUrl: "/images/insylo/insylo_hero.mp4",
          thumbnailUrl: "/images/insylo/is_problem.webp",
        })}
      />
    </>
  );
}
