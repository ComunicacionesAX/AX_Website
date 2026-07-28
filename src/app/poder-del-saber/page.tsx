import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SaberPage } from "@/components/saber/SaberPage";

export const metadata = {
  title: "El poder del saber | Asimetrix",
  description:
    "Información técnica, análisis y datos que explican cómo el monitoreo continuo mejora la rentabilidad en granja.",
};

export default function PoderDelSaber() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <SaberPage />
      </main>
      <Footer />
    </>
  );
}
