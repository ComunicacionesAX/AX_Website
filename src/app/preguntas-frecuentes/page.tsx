import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqPage } from "@/components/faq/FaqPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { dictionary } from "@/i18n/dictionary";

const PATH = "/preguntas-frecuentes";

export const metadata = pageMetadata({
  path: PATH,
  // Título descriptivo en vez de "Preguntas frecuentes | Asimetrix": el valor
  // de esta página es long-tail, así que el title carga las keywords que la
  // gente busca (peso, alimento, ambiente) en lugar del nombre de la sección.
  title:
    "Preguntas frecuentes sobre monitoreo de peso, alimento y ambiente en granja",
  description:
    "Respuestas directas sobre precisión, instalación, inversión, datos y soporte de PigVision, Insylo y los sensores ambientales de Asimetrix.",
});

// El JSON-LD se arma desde el diccionario `es` (el idioma del HTML servido,
// ver `lang` en layout.tsx) y aplana las preguntas de todos los grupos: una
// sola entidad FAQPage por URL. La fuente es la misma que renderiza la
// página, así que el marcado no puede desincronizarse del contenido visible
// — requisito de Google y la razón para no duplicar el texto acá.
const faqItems = dictionary.es.faqPage.groups.flatMap((group) =>
  group.sections.flatMap((section) => section.items),
);

export default function PreguntasFrecuentes() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <FaqPage />
      </main>
      <Footer />
      <JsonLd
        data={breadcrumbSchema({
          name: dictionary.es.faqPage.pageLabel,
          path: PATH,
        })}
      />
      <JsonLd data={faqSchema({ path: PATH, items: faqItems })} />
    </>
  );
}
