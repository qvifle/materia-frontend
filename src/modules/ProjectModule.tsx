"use client"
import ProjectSettingsDropdown from "@/components/dropdowns/ProjectSettingsDropdown"
import Emoji from "@/lib/utils/Emoji"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import DesksWidget from "@/widgets/DesksWidget"
import { useQuery } from "@tanstack/react-query"
import React from "react"

const ProjectModule = ({ projectId }: { projectId: string }) => {
  const { data, isPending, isError } = useQuery<IProject>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await projectService.getProjectById(projectId)
      return data
    },
  })

  if (isPending) {
    return "Loading"
  }

  if (isError) {
    return "Error"
  }

  if (!data) {
    return
  }

  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div className="px-4 pt-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          <span>
            {data.iconUrl ? <Emoji unifiedCode={data.iconUrl} /> : null}
          </span>
          <span> {data.title}</span>
        </h1>
        <p className="mb-[50px] leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
          {data.description}
        </p>
        <ProjectSettingsDropdown />
      </div>

      <DesksWidget projectId={projectId} />
    </div>
  )
}

export default ProjectModule
