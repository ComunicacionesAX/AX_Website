import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PigVisionPage } from "@/components/pigvision/PigVisionPage";

export const metadata = {
  title: "PigVision | Cámara inteligente para pesar cerdos en ceba",
  description:
    "PigVision calcula el peso de tus lotes sin contacto ni estrés, de 30Kg a 150Kg, con 97% de precisión.",
};

export default function PigVision() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PigVisionPage />
      </main>
      <Footer />
    </>
  );
}
