import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OnixButton } from "@/components/OnixButton";

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
    icon: "/images/logo_ax_isotipo_blue.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} flex min-h-screen flex-col`}>
        {children}
        <OnixButton />
      </body>
    </html>
  );
}
