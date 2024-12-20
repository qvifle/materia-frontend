"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import AvatarDropdown from "../dropdowns/AvatarDropdown"
import { useQuery } from "@tanstack/react-query"
import { IProject } from "@/types/project.types"
import projectService from "@/services/ProjectService"
import sortProjects from "@/lib/utils/sortProjects"
import { useSession } from "next-auth/react"
import Emoji from "@/lib/utils/Emoji"
import styles from "@/styles/layout.module.css"
import { cn } from "@nextui-org/react"
import { Span } from "next/dist/trace"
import useDialog from "@/lib/hooks/useDialog"

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { open: openDialog } = useDialog()
  const { data: session } = useSession()

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects()
      return data
    },
  })

  const sortedProjects = useMemo(
    () => sortProjects(projects, session?.user.email || ""),
    [projects, session],
  )

  return (
    <Navbar
      className={cn(styles.header, "bg-gray-2")}
      classNames={{ wrapper: "px-4" }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBordered
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand className="text-lg">Projects</NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <AvatarDropdown />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {!sortedProjects?.myProjects.length &&
          !sortedProjects?.otherProjects.length && (
            <p>
              <span>You have no projects yet.</span>{" "}
              <span
                onClick={() => openDialog("create-project")}
                className="text-primary-500"
              >
                Create!
              </span>
            </p>
          )}
        {!!sortedProjects && sortedProjects.myProjects.length > 0 && (
          <>
            <NavbarMenuItem key="my-projects" className="font-medium">
              My projects
            </NavbarMenuItem>
            {sortedProjects.myProjects.map((item, index) => (
              <NavbarMenuItem className="ml-2" key={`${item.title}-${index}`}>
                <Link
                  className="flex w-full items-center gap-2"
                  href={`/home/projects/${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>
                    {item.iconUrl ? <Emoji unifiedCode={item.iconUrl} /> : null}
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
              Collaborates
            </NavbarMenuItem>
            {sortedProjects.otherProjects.map((item, index) => (
              <NavbarMenuItem className="ml-2" key={`${item.title}-${index}`}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className="flex w-full items-center gap-2"
                  href={`/home/projects/${item.id}`}
                >
                  <span>
                    {item.iconUrl ? <Emoji unifiedCode={item.iconUrl} /> : null}
                  </span>
                  <span>{item.title}</span>
                </Link>
              </NavbarMenuItem>
            ))}
          </>
        )}
      </NavbarMenu>
    </Navbar>
  )
}

export default CustomNavbar
