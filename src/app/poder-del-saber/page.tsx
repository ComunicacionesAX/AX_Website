import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SaberPage } from "@/components/saber/SaberPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/poder-del-saber",
  title: "El poder del saber | Asimetrix",
  description:
    "Información técnica, análisis y datos que explican cómo el monitoreo continuo mejora la rentabilidad en granja.",
});

export default function PoderDelSaber() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <SaberPage />
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbSchema({
          name: "El poder del saber",
          path: "/poder-del-saber",
        })}
      />
    </>
  );
}
