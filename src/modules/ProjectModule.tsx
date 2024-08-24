"use client"
import ProjectSettingsDropdown from "@/components/dropdowns/ProjectSettingsDropdown"
import Skeleton from "@/components/skeleton/Skeleton"
import Emoji from "@/lib/utils/Emoji"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import DesksWidget from "@/widgets/DesksWidget"
import { useQuery } from "@tanstack/react-query"
import React from "react"

const ProjectModule = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useQuery<IProject>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await projectService.getProjectById(projectId)
      return data
    },
  })

  return (
    <div className="flex h-full w-full flex-col overflow-y-hidden">
      <div className="mb-6 mt-4 px-4">
        {!isLoading && !!data ? (
          <>
            <div className="group flex w-full items-center justify-between md:w-max">
              <h1 className="flex gap-1 text-4xl font-bold tracking-tight lg:text-5xl">
                <span className="ml-[-6px] flex h-[48px] w-[48px] justify-center text-center">
                  <Emoji unifiedCode={data.iconUrl ?? ""} />
                </span>

                <span>{data.title}</span>
              </h1>
              <ProjectSettingsDropdown className="ml-2" />
            </div>

            {!!data.description && (
              <p className="text-gray-11 mt-2">{data.description}</p>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Skeleton width="50px">
              <div className="h-[50px] rounded-lg"></div>
            </Skeleton>
            <Skeleton width="150px">
              <div className="h-[50px] rounded-lg"></div>
            </Skeleton>
          </div>
        )}
      </div>

      <DesksWidget projectId={projectId} />
    </div>
  )
}

export default ProjectModule
