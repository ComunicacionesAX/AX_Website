import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InsyloPage } from "@/components/insylo/InsyloPage";

export const metadata = {
  title: "Insylo | Sensor 3D para monitoreo de alimento en silos",
  description:
    "Insylo mide el nivel de alimento en silos de hasta 12 metros con 97% de precisión, con alertas configurables y topografía 3D.",
};

export default function Insylo() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <InsyloPage />
      </main>
      <Footer />
    </>
  );
}
