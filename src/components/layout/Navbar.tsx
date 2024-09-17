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
import { useMemo, useState } from "react"
import AvatarDropdown from "../dropdowns/AvatarDropdown"
import { useQuery } from "@tanstack/react-query"
import { IProject } from "@/types/project.types"
import projectService from "@/services/ProjectService"
import sortProjects from "@/lib/utils/sortProjects"
import { useSession } from "next-auth/react"
import Emoji from "@/lib/utils/Emoji"
import styles from "@/styles/layout.module.css"
import { cn } from "@nextui-org/react"
import useDialog from "@/lib/hooks/useDialog"
import NavbarProjects from "./Navbar/NavbarProjects"

export interface SortedProjects {
  myProjects: IProject[]
  otherProjects: IProject[]
}

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

      <NavbarMenu onClick={() => setIsMenuOpen(false)}>
        <NavbarProjects projects={sortedProjects} />
      </NavbarMenu>
    </Navbar>
  )
}

export default CustomNavbar
