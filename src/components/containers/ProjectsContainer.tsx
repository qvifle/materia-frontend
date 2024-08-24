"use client"
import { IProject } from "@/types/project.types"
import { ReactNode } from "react"
import ProjectCard from "../cards/ProjectCard"

interface ProjectsContainerProps {
  title: ReactNode
  items: IProject[]
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  title,
  items,
}) => {
  return (
    <>
      {items.length > 0 && (
        <div>
          <h2 className="mb-2 w-full text-2xl font-bold">{title}</h2>
          <div className="grid w-full grid-flow-col grid-rows-3 gap-2 overflow-x-auto py-2 min-[420px]:grid-flow-row min-[420px]:grid-cols-2 min-[420px]:grid-rows-none md:grid-flow-row md:grid-cols-4 md:grid-rows-none xl:grid-cols-5">
            {items.map((project: IProject, key: number) => (
              <ProjectCard key={key} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsContainer
