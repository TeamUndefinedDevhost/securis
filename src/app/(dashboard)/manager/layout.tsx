"use client";

import DashboardLayout from "../_components/DashboardLayout";
import { Briefcase, Coins, Home, Package, Save, Search } from "lucide-react";
import { USERROLE } from "@prisma/client";
import Image from "next/image";
import { Building } from "lucide-react";
import { SidebarItem } from "@/lib/sidebar";
import { useSession } from "next-auth/react";

const sidebarItems: SidebarItem[] = [
  {
    icon: <Home className="h-4 w-4" />,
    title: "Dashboard",
    href: "/company",
  },
  {
    icon: <Briefcase className="h-4 w-4" />,
    title: "Jobs",
    href: "/company/jobs",
  }
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession({
    required: true,
  });

  if (session?.user.role !== USERROLE.MANAGER) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Image
            src="https://http.cat/images/403.jpg"
            alt="403 Forbidden"
            width={500}
            height={500}
          />
          <p className="text-lg">You are not allowed to access this page.</p>
        </div>
      </div>
    );
  }
  return (
    <DashboardLayout sidebarItems={sidebarItems}>{children}</DashboardLayout>
  );
}
