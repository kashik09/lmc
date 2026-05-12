import type { Metadata } from "next";
import { Lato, Raleway } from "next/font/google";
import "@/styles/globals.css";
import { CookieConsent } from "@/components/blocks/cookie-consent";
import { AnalyticsScript } from "@/components/blocks/analytics";
import { Topbar } from "@/components/layout/Topbar";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lifeline Medical Centre",
  description:
    "Quality healthcare services in Gayaza, Kampala. Laboratory, Radiology, Dental, Pharmacy, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Topbar />
        {children}
        <CookieConsent />
        <AnalyticsScript />
      </body>
    </html>
  );
}
