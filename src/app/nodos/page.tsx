import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NodosPage } from "@/components/nodos/NodosPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, productSchema, videoSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE =
  "Nodos ambientales | Monitoreo continuo de las condiciones ambientales";
const DESCRIPTION =
  "Nodos ambientales monitorean temperatura, humedad, CO₂ y luz en la granja con 99% de precisión para anticipar riesgos.";

export const metadata = pageMetadata({
  path: "/nodos",
  title: TITLE,
  description: DESCRIPTION,
});

export default function Nodos() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <NodosPage />
      </main>
      <Footer />
      <JsonLd
        data={productSchema({
          path: "/nodos",
          name: "Nodos ambientales",
          description: DESCRIPTION,
          image: "/images/home_render_nodos-768x536.webp",
          precision: 99,
        })}
      />
      <JsonLd
        data={breadcrumbSchema({
          name: "Sensores ambientales",
          path: "/nodos",
        })}
      />
      <JsonLd
        data={videoSchema({
          name: "Nodos ambientales en operación",
          description:
            "Sensores ambientales Asimetrix monitoreando temperatura, humedad, CO₂ y luz dentro del galpón.",
          contentUrl: "/images/nodos/nodos_hero.mp4",
          thumbnailUrl: "/images/nodos/nodos_problem.webp",
        })}
      />
    </>
  );
}
