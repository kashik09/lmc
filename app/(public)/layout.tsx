import { Topbar } from "@/components/layout/Topbar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Public layout — Topbar > Header > children > Footer
 *
 * Order matches mockup structure:
 * 1. Topbar (light bg, hidden on mobile)
 * 2. Header (white bg with nav dropdowns, sticky)
 * 3. Page content
 * 4. Footer (navy blue 3-col, includes BackToTop)
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
