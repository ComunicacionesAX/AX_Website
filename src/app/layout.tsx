import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OnixButton } from "@/components/OnixButton";
import { CookieBannerPreview } from "@/components/CookieBannerPreview";
import { LanguageProvider } from "@/i18n/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asimetrix | Monitoreo inteligente para granjas porcinas y avícolas",
  description:
    "Cámaras inteligentes, sensores y herramientas de IA que transforman datos en rentabilidad para granjas porcinas y avícolas.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} flex min-h-screen flex-col`}>
        <LanguageProvider>
          {children}
          <OnixButton />
          {/* CookieBanner sigue desactivado por defecto — pero
              CookieBannerPreview lo activa cuando la URL trae
              ?cookies=1 o ?cookies=preview. Útil para QA/design review
              sin exponer el banner a todos los visitantes.
              El componente CookieBanner real vive en @/components/
              CookieBanner y se activa en producción descomentando su
              montaje aquí. */}
          <CookieBannerPreview />
        </LanguageProvider>
      </body>
    </html>
  );
}
