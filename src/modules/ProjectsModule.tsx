"use client"
import CreateProjectButton from "@/components/buttons/CreateProjectButton"
import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { IProject } from "@/types/project.types"
import { useSession } from "next-auth/react"
import { useMemo } from "react"
import sortProjects from "@/lib/utils/sortProjects"
import { Button, Spinner } from "@nextui-org/react"
import useDialog from "@/lib/hooks/useDialog"
import ProjectsContainer from "@/components/containers/ProjectsContainer"
import ProjectsModuleLoading from "@/components/skeleton/ProjectsModuleLoading"

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

  useEffect(() => {
    console.log(session?.user.accessToken)
  }, [session])

  if (isPending) {
    return <ProjectsModuleLoading />
  }

  if (isError) {
    return <p>Error</p>
  }

  if (!sortedProjects || projects?.length === 0) {
    return (
      <div className="mt-[40px] flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-2xl font-medium sm:mt-0">
        <span className="text-center"> You don&apos;t have any project</span>
        <Button
          onClick={() => openDialog("create-project")}
          size="lg"
          color="primary"
        >
          Create new!
        </Button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <CreateProjectButton />
      <ProjectsContainer
        title="My projects"
        items={sortedProjects.myProjects}
      />
      <ProjectsContainer
        title="Collaborates"
        items={sortedProjects.otherProjects}
      />
    </section>
  )
}

export default ProjectsModule
