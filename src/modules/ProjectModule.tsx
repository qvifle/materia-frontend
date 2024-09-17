"use client"
import ProjectSettingsDropdown from "@/components/dropdowns/ProjectSettingsDropdown"
import Skeleton from "@/components/skeleton/Skeleton"
import Emoji from "@/lib/utils/Emoji"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import DesksWidget from "@/widgets/DesksWidget"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"

const ProjectModule = ({ projectId }: { projectId: string }) => {
  const { push } = useRouter()

  const { data, isLoading, isError } = useQuery<IProject | undefined>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      try {
        const res = await projectService.getProjectById(projectId)

        return res.data
      } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 404) {
          push("/home/projects")
        }
      }
    },
  })

  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-4">
        {!isLoading && !!data ? (
          <>
            <div className="flex items-center">
              <span className="ml-[-6px] flex h-[48px] w-[48px] items-center justify-center text-center text-4xl">
                <Emoji unifiedCode={data.iconUrl ?? ""} />
              </span>
              <h1 className="hidden h-max max-w-full gap-1 break-all text-4xl font-bold tracking-tight lg:block lg:text-5xl">
                {data.title}
              </h1>
              <ProjectSettingsDropdown project={data} className="sm:ml-2" />
            </div>
            <h1 className="h-max max-w-full gap-1 break-all text-4xl font-bold tracking-tight lg:hidden lg:text-5xl">
              {data.title}
            </h1>

            {!!data.description && (
              <p className="mt-2 break-all text-gray-11">{data.description}</p>
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
