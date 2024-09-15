"use client"
import { Library, Globe } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import sortProjects from "@/lib/utils/sortProjects"
import { useSession } from "next-auth/react"
import SidebarProjectSection from "./SidebarProjectSection"
import { useMemo, useState } from "react"
import Skeleton from "@/components/skeleton/Skeleton"
import getArray from "@/lib/utils/get-array"

const SidebarProjects = () => {
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
    return (
      <div className="flex w-full flex-col">
        <Skeleton className="mb-3" width="100%">
          <div className="h-[40px] rounded-lg"></div>
        </Skeleton>
        {getArray(4).map((el, key) => (
          <Skeleton key={key} className="mb-2" width="80%">
            <div className="h-[32px] rounded-lg"></div>
          </Skeleton>
        ))}

        <Skeleton className="mb-3 mt-1" width="100%">
          <div className="h-[40px] rounded-lg"></div>
        </Skeleton>
        {getArray(2).map((el, key) => (
          <Skeleton key={key} className="mb-2" width="80%">
            <div className="h-[32px] rounded-lg"></div>
          </Skeleton>
        ))}
      </div>
    )
  }

  return (
    <>
      <SidebarProjectSection
        title="My projects"
        projects={sortedProjects?.myProjects}
        toggleVisibility={() => setMyProjects((s) => !s)}
        visible={isMyProjects}
        icon={<Library />}
      />
      <SidebarProjectSection
        title="Collaborates"
        projects={sortedProjects?.otherProjects}
        toggleVisibility={() => setOtherProjects((s) => !s)}
        visible={isOtherProjects}
        icon={<Globe />}
      />
    </>
  )
}

export default SidebarProjects
