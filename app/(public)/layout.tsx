import { Topbar } from "@/components/blocks/topbar";
import { Navbar } from "@/components/blocks/navbar";
import { Footer } from "@/components/blocks/footer";

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
