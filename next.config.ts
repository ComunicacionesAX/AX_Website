import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },

  // Redirects 301 de la migración WordPress → Next.
  //
  // Las URLs de la izquierda están indexadas hoy en asimetrix.co (ver
  // wp-sitemap.xml) y cambian de ruta en el redesign. Sin estos redirects se
  // pierde la autoridad acumulada y los resultados de búsqueda antiguos
  // devuelven 404.
  //
  // `permanent: true` emite 308 (equivalente permanente de 301 que preserva
  // el método); Google lo trata igual que un 301 para consolidar señales.
  async redirects() {
    return [
      { source: "/nodos-ambientales", destination: "/nodos", permanent: true },
      {
        source: "/cuentanos-sobre-tu-operacion",
        destination: "/cotizar",
        permanent: true,
      },
      {
        source: "/el-poder-del-saber",
        destination: "/poder-del-saber",
        permanent: true,
      },

      // Los dos posts del blog de WordPress no tienen equivalente en el
      // redesign. Ambos eran republicaciones de artículos de prensa que el
      // Footer ya enlaza a la fuente original (BM Editores y Pig Progress),
      // así que se redirigen al hub de contenido en vez de dejarlos en 404.
      // Si se decide migrarlos como contenido propio, reemplazar por la
      // ruta /poder-del-saber/[slug] correspondiente.
      {
        source:
          "/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino",
        destination: "/poder-del-saber",
        permanent: true,
      },
      {
        source: "/wrapping-up-february-whats-new-in-the-world-of-pigs",
        destination: "/poder-del-saber",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
