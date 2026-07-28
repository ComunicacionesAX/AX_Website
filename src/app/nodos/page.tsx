import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NodosPage } from "@/components/nodos/NodosPage";

export const metadata = {
  title: "Nodos ambientales | Monitoreo continuo de las condiciones ambientales",
  description:
    "Nodos ambientales monitorean temperatura, humedad, CO₂ y luz en la granja con 99% de precisión para anticipar riesgos.",
};

export default function Nodos() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <NodosPage />
      </main>
      <Footer />
    </>
  );
}
