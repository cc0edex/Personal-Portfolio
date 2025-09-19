import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  FileText,
  FolderOpen,
  Settings,
  Users,
  LogOut,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import Link from "../Link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    href: "/admin/dashboard",
  },
  {
    id: "blog-posts",
    label: "Blog Posts",
    icon: FileText,
    href: "/admin/dashboard/blogs",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    href: "/admin/dashboard/projects",
  },
  {
    id: "about",
    label: "About",
    icon: Users,
    href: "/admin/dashboard/about",
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    href: "/admin/dashboard/messages",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/admin/dashboard/settings",
  },
];

export function AdminSideBar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const isActive = (href: any) => {
    // Exact match for dashboard root
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    // For other routes, check if current path starts with the href
    return pathname.startsWith(href);
  };
  const handleMenuClick = () => {
    // Close sidebar on mobile when menu item is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    className={
                      isActive(item.href)
                        ? "!text-indigo-600 !dark:text-indigo-400 !bg-indigo-50 !dark:bg-indigo-900/20"
                        : "!text-slate-800 dark:!text-neutral-200 hover:!text-indigo-600 dark:hover:!text-indigo-400 hover:!bg-gray-50 dark:hover:!bg-gray-800/50"
                    }
                    onClick={handleMenuClick}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
