"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import {
  SidebarItem,
  isSidebarItemWithMultiple,
  isSidebarItemWithSingle,
} from "@/lib/sidebar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function Header({ items = [] }: { items: SidebarItem[] }) {
  const session = useSession();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader className="p-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo.svg" alt="logo" width={150} height={150} />
            </Link>
          </SheetHeader>
          <nav className="grid gap-2 text-lg font-medium">
            {items.map((item) => {
              if (isSidebarItemWithMultiple(item)) {
                return (
                  <Accordion type="single" collapsible key={item.heading}>
                    <AccordionItem value={item.heading} className="border-none">
                      <AccordionTrigger className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:no-underline flex-initial">
                        <div className="[&[data-state=open]>svg]:-rotate-180">
                          {item.headingIcon}
                        </div>
                        {item.heading}
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                          >
                            {subItem.icon}
                            {subItem.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              } else if (isSidebarItemWithSingle(item)) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                );
              }
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {session?.data?.user.image && (
              <Image
                src={session?.data?.user?.image!}
                alt="User avatar"
                width={45}
                height={45}
                className="rounded-full cursor-pointer"
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Settings</DropdownMenuItem>
            <DropdownMenuItem disabled>Support</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (): Promise<void> =>
                await signOut({
                  callbackUrl: "/",
                })
              }
              className="cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
