import { Header } from "@/components/widgets/header";
import { Footer } from "@/components/widgets/footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
      <Footer />
    </div>
  );
}
