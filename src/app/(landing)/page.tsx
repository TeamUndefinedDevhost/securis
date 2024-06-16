import { Features } from "@/components/widgets/features";
import { Hero } from "@/components/widgets/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Hero />
      <Features />
    </main>
  );
}
