import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OnixButton } from "@/components/OnixButton";
import { CookieBannerPreview } from "@/components/CookieBannerPreview";
import { LanguageProvider } from "@/i18n/context";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Base para resolver canonical y Open Graph relativos. Se define una sola
  // vez acá; las páginas sólo declaran su path (ver src/lib/seo.ts).
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
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
        {/* Datos estructurados globales. No renderizan nada visible. */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </body>
    </html>
  );
}
