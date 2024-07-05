"use client"
import { Button, cn } from "@nextui-org/react"
import React, { useMemo, useState } from "react"
import styles from "@/styles/layout.module.css"
import { Library, Globe, SquarePen } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import sortProjects from "@/lib/utils/sortProjects"
import { useSession } from "next-auth/react"
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji"
import useDialog from "@/lib/hooks/useDialog"

const Sidebar = () => {
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
      <Button
        onClick={() => openDialog("createProject")}
        isIconOnly
        variant="light"
        color="primary"
      >
        <SquarePen />
      </Button>
      {sortedProjects.myProjects.length > 0 && (
        <Button
          onClick={() => setMyProjects((s) => !s)}
          isIconOnly
          variant="light"
        >
          <Library />
        </Button>
      )}
      {isMyProjects &&
        sortedProjects.myProjects.map((el, key) => (
          <Button isIconOnly variant="light" key={key}>
            {el.iconUrl ? unifiedToEmoji(el.iconUrl) : el.title}
          </Button>
        ))}
      {sortedProjects.otherProjects.length > 0 && (
        <Button
          onClick={() => setOtherProjects((s) => !s)}
          isIconOnly
          variant="light"
        >
          <Globe />
        </Button>
      )}
      {isOtherProjects &&
        sortedProjects.otherProjects.map((el, key) => (
          <Button key={key} isIconOnly variant="light">
            {el.iconUrl ? unifiedToEmoji(el.iconUrl) : el.title}
          </Button>
        ))}
    </aside>
  )
}

export default Sidebar
