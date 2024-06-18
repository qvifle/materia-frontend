"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import Link from "next/link";
import { useMemo, useState } from "react";
import AvatarDropdown from "../dropdowns/AvatarDropdown";
import { useQuery } from "@tanstack/react-query";
import { IProject } from "@/types/project.types";
import projectService from "@/services/ProjectService";
import sortProjects from "@/lib/utils/sortProjects";
import { useSession } from "next-auth/react";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import styles from "@/styles/layout.module.css";
import { cn } from "@nextui-org/react";

const menuItems = [
  "Profile",
  "Dashboard",
  "Activity",
  "Analytics",
  "System",
  "Deployments",
  "My Settings",
  "Team Settings",
  "Help & Feedback",
  "Log Out",
];

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects();
      return data;
    },
  });

  const sortedProjects = useMemo(
    () => sortProjects(projects, session?.user.email || ""),
    [projects, session],
  );

  return (
    <Navbar
      className={cn(styles.header, "bg-gray-2")}
      classNames={{ wrapper: "px-4" }}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBordered
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className="text-lg">Projects</NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <AvatarDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {!!sortedProjects && sortedProjects.myProjects.length > 0 && (
          <>
            <NavbarMenuItem key="my-projects" className="font-medium">
              My projects
            </NavbarMenuItem>
            {sortedProjects.myProjects.map((item, index) => (
              <NavbarMenuItem className="ml-2" key={`${item.title}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  className="w-full flex items-center gap-2"
                  href={`/home/projects/${item.id}`}
                >
                  <span>
                    {item.iconUrl ? unifiedToEmoji(item.iconUrl) : null}
                  </span>
                  <span>{item.title}</span>
                </Link>
              </NavbarMenuItem>
            ))}
          </>
        )}
        {!!sortedProjects && sortedProjects.otherProjects.length > 0 && (
          <>
            <NavbarMenuItem key="my-projects" className="font-medium">
              Other
            </NavbarMenuItem>
            {sortedProjects.otherProjects.map((item, index) => (
              <NavbarMenuItem className="ml-2" key={`${item.title}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  className="w-full flex items-center gap-2"
                  href={`/home/projects/${item.id}`}
                >
                  <span>
                    {item.iconUrl ? unifiedToEmoji(item.iconUrl) : null}
                  </span>
                  <span>{item.title}</span>
                </Link>
              </NavbarMenuItem>
            ))}
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavbar;
