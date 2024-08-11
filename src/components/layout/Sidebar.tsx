"use client"
import { Button, cn, Link } from "@nextui-org/react"
import React, { useEffect, useMemo, useState } from "react"
import styles from "@/styles/layout.module.css"
import { Library, Globe, SquarePen, ChevronDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import sortProjects from "@/lib/utils/sortProjects"
import { useSession } from "next-auth/react"
import Emoji from "@/lib/utils/Emoji"
import useDialog from "@/lib/hooks/useDialog"
import { useMediaQuery } from "usehooks-ts"
import SidebarButton from "../buttons/SidebarButton"

const Sidebar = () => {
  const [isClient, setClient] = useState(false)
  const isMobile = useMediaQuery("(max-width: 639px)")
  const isDesktop = useMediaQuery("only screen and (min-width : 1024px)")
  const { open: openDialog } = useDialog()
  const [isMyProjects, setMyProjects] = useState(true)
  const [isOtherProjects, setOtherProjects] = useState(true)
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

  useEffect(() => {
    setClient(true)
  }, [])

  if (!isClient) {
    return <div></div>
  }

  if (isMobile) {
    return null
  }

  if (isLoading) {
    return "..."
  }

  if (isError || !sortedProjects) {
    return "Error"
  }

  return (
    <aside
      className={cn(
        styles.sidebar,
        "hidden w-full flex-col items-center border-r border-gray-4 px-4 pt-4 sm:flex lg:items-start",
      )}
    >
      <Link href="/home">
        <span className="h-[48px] w-full items-center justify-center text-xl font-[800] lg:justify-start lg:text-3xl">
          {isDesktop ? "Matēria" : "Mā"}
        </span>
      </Link>
      <SidebarButton
        onClick={() => openDialog("createProject")}
        variant="light"
        color="primary"
        icon={<SquarePen />}
      >
        Create project
      </SidebarButton>
      {sortedProjects.myProjects.length > 0 && (
        <SidebarButton
          onClick={() => setMyProjects((s) => !s)}
          variant="light"
          icon={<Library />}
        >
          <div className="flex w-full items-center justify-between">
            <span>My projects</span>
            <ChevronDown
              size={14}
              className={cn(isMyProjects ? "rotate-180" : "", "duration-100")}
            />
          </div>
        </SidebarButton>
      )}
      {isMyProjects &&
        sortedProjects.myProjects.map((el, key) => (
          <SidebarButton
            variant="light"
            key={key}
            icon={el.iconUrl ? <Emoji unifiedCode={el.iconUrl} /> : el.title}
          >
            {el.title}
          </SidebarButton>
        ))}
      {sortedProjects.otherProjects.length > 0 && (
        <SidebarButton
          icon={<Globe />}
          variant="light"
          onClick={() => setOtherProjects((s) => !s)}
        >
          <div className="flex w-full items-center justify-between">
            <span>Other projects</span>
            <ChevronDown
              size={14}
              className={cn(
                isOtherProjects ? "rotate-180" : "",
                "duration-100",
              )}
            />
          </div>
        </SidebarButton>
      )}
      {isOtherProjects &&
        sortedProjects.otherProjects.map((el, key) => (
          <SidebarButton
            icon={el.iconUrl ? <Emoji unifiedCode={el.iconUrl} /> : el.title}
            key={key}
            variant="light"
          >
            {el.title}
          </SidebarButton>
        ))}
    </aside>
  )
}

export default Sidebar
