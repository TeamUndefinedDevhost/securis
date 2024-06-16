"use client";

import { Sidebar } from "@/app/(dashboard)/_components/Sidebar";
import { Header } from "@/app/(dashboard)/_components/Header";
import { SidebarItem } from "@/lib/sidebar";

export default function DashboardLayout({
  children,
  sidebarItems,
}: {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar items={sidebarItems} notifications={[]} />
      <div className="flex flex-col">
        <Header items={sidebarItems} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
