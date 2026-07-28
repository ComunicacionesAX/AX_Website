import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CotizarPage } from "@/components/cotizar/CotizarPage";

export const metadata = {
  title: "Cuéntanos sobre tu operación | Asimetrix",
  description:
    "Cuéntanos sobre tu operación y te ayudaremos a encontrar la mejor solución de monitoreo para tu granja.",
};

export default function Cotizar() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <CotizarPage />
      </main>
      <Footer />
    </>
  );
}
