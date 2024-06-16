"use client";

import DashboardLayout from "../_components/DashboardLayout";
import {
  PaperclipIcon,
  FileSignature,
  Coins,
  Home,
  Package,
  Save,
  Search,
  Image as Im,
  HomeIcon,
} from "lucide-react";
import { USERROLE } from "@prisma/client";
import Image from "next/image";
import { Building } from "lucide-react";
import { SidebarItem } from "@/lib/sidebar";
import { useSession } from "next-auth/react";

const sidebarItems: SidebarItem[] = [
  {
    icon: <HomeIcon className="h-4 w-4" />,
    title: "Signature Authentication",
    href: "/user",
  },
  {
    icon: <PaperclipIcon className="h-4 w-4" />,
    title: "Document Verification",
    href: "/user/pdf",
  },
  {
    icon: <FileSignature className="h-4 w-4" />,
    title: "Physical Sign Verification",
    href: "/company/jobs",
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession({
    required: true,
  });

  if (session?.user.role !== USERROLE.USER) {
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
