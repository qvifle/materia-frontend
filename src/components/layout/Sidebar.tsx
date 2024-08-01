"use client"
import { Button, cn } from "@nextui-org/react"
import React, { useEffect, useMemo, useState } from "react"
import styles from "@/styles/layout.module.css"
import { Library, Globe, SquarePen } from "lucide-react"
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
        "hidden w-full flex-col items-center border-r border-gray-4 sm:flex",
      )}
    >
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
          My projects
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
        <Button
          onClick={() => setOtherProjects((s) => !s)}
          isIconOnly
          variant="light"
          className="w-full"
        >
          <Globe />
        </Button>
      )}
      {isOtherProjects &&
        sortedProjects.otherProjects.map((el, key) => (
          <Button
            className="w-full text-xl"
            key={key}
            isIconOnly
            variant="light"
          >
            {el.iconUrl ? <Emoji unifiedCode={el.iconUrl} /> : el.title}
          </Button>
        ))}
    </aside>
  )
}

export default Sidebar
