import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SidebarItem,
  isSidebarItemWithMultiple,
  isSidebarItemWithSingle,
} from "@/lib/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export function Sidebar({
  items = [],
}: {
  items: SidebarItem[];
  notifications: { title: string; description: string }[];
}) {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo.svg" alt="logo" className="w-96 lg:[w-100px]" width={150} height={150}/>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto h-8 w-8"
                disabled
              >
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex justify-between p-0 w-[400px] sm:w-[540px]">
              <SheetHeader className="p-4">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>Important notifications</SheetDescription>
              </SheetHeader>
              {/**
               * TODO: Add notifications list
               */}
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
        </div>
      </div>
    </div>
  );
}