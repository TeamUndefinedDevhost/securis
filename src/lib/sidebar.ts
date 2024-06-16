export interface SidebarItemBase {
  icon: React.ReactNode;
  title?: never;
  href?: never;
  items?: never;
}

export interface SidebarItemWithSingle {
  icon: React.ReactNode;
  title: string;
  href: string;
  items?: never;
}

export interface SidebarItemWithMultiple {
  items: Array<{
    icon: React.ReactNode;
    title: string;
    href: string;
  }>;
  heading: string;
  headingIcon: React.ReactNode;
}

export type SidebarItem =
  | SidebarItemBase
  | SidebarItemWithSingle
  | SidebarItemWithMultiple;

export function isSidebarItemWithSingle(
  item: SidebarItem
): item is SidebarItemWithSingle {
  return (
    (item as SidebarItemWithSingle).title !== undefined &&
    (item as SidebarItemWithSingle).href !== undefined
  );
}

export function isSidebarItemWithMultiple(
  item: SidebarItem
): item is SidebarItemWithMultiple {
  return Array.isArray((item as SidebarItemWithMultiple).items);
}
