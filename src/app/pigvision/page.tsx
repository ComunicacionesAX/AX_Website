import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PigVisionPage } from "@/components/pigvision/PigVisionPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, productSchema, videoSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const TITLE = "PigVision | Cámara inteligente para pesar cerdos en ceba";
const DESCRIPTION =
  "PigVision calcula el peso de tus lotes sin contacto ni estrés, de 30Kg a 150Kg, con 97% de precisión.";

export const metadata = pageMetadata({
  path: "/pigvision",
  title: TITLE,
  description: DESCRIPTION,
});

export default function PigVision() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PigVisionPage />
      </main>
      <Footer />
      <JsonLd
        data={productSchema({
          path: "/pigvision",
          name: "PigVision",
          description: DESCRIPTION,
          image: "/images/home_render_pigvision-768x536.webp",
          precision: 97,
        })}
      />
      <JsonLd data={breadcrumbSchema({ name: "PigVision", path: "/pigvision" })} />
      <JsonLd
        data={videoSchema({
          name: "PigVision en operación",
          description:
            "Cámara inteligente PigVision estimando el peso de cerdos en ceba sin contacto ni estrés.",
          contentUrl: "/images/pigvision/pigvision_hero.mp4",
          thumbnailUrl: "/images/pigvision/pv_problem.webp",
        })}
      />
    </>
  );
}
