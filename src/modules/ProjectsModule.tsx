"use client"
import CreateProjectButton from "@/components/buttons/CreateProjectButton"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import { useSession } from "next-auth/react"
import { useMemo } from "react"
import sortProjects from "@/lib/utils/sortProjects"
import { Button, Skeleton, Spinner } from "@nextui-org/react"
import useDialog from "@/lib/hooks/useDialog"
import ProjectsContainer from "@/components/containers/ProjectsContainer"

const ProjectsModule = () => {
  const { data: session } = useSession()
  const { open: openDialog } = useDialog()

  const {
    data: projects,
    isPending,
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

  if (isPending) {
    return (
      <div>
        <h2 className="mb-2 w-full text-2xl font-bold">My projects</h2>
        <div className="grid w-full grid-cols-1 grid-rows-1 gap-2 overflow-x-auto py-2 min-[420px]:grid-flow-row min-[420px]:grid-cols-2 md:grid-flow-row md:grid-cols-4 md:grid-rows-none xl:grid-cols-5">
          {Array.from(Array(10).keys()).map((index, key: number) => (
            <Skeleton key={key} className="rounded-lg">
              <div className="h-[200px] w-[calc(100vw-32px)] rounded-lg bg-default-300 min-[420px]:w-full"></div>
            </Skeleton>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return <div className="h-full w-full">Error</div>
  }

  if (!sortedProjects || projects?.length === 0) {
    return (
      <div className="mt-[40px] flex h-full w-full flex-col items-center justify-center gap-4 text-2xl font-medium sm:mt-0">
        <span className="text-center"> You doesn&apos;t have any project</span>
        <Button
          onClick={() => openDialog("createProject")}
          size="lg"
          color="primary"
        >
          Create new!
        </Button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <CreateProjectButton />
      <ProjectsContainer
        title="My projects"
        items={sortedProjects.myProjects}
      />
      <ProjectsContainer title="Other" items={sortedProjects.otherProjects} />
    </section>
  )
}

export default ProjectsModule
