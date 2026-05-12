import { Topbar } from "@/components/layout/Topbar";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
