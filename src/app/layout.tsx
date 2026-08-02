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
          
          <CookieBannerPreview />
        </LanguageProvider>
      </body>
    </html>
  );
}
