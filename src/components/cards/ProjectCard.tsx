import { IProject } from "@/types/project.types"
import React from "react"
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import Emoji from "@/lib/utils/Emoji"
import Link from "next/link"

const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <Link href={`/home/projects/${project.id}`} className="h-full">
      <Card
        className="h-full w-[calc(100vw-32px)] min-[420px]:h-[200px] min-[420px]:w-full"
        shadow="none"
      >
        <CardHeader className="flex flex-col pb-0 pt-6">
          <span className="mb-2 text-4xl">
            {project.iconUrl && <Emoji unifiedCode={project.iconUrl} />}
          </span>
          <p className="text-center text-xl font-medium">{project.title}</p>
        </CardHeader>
        <CardBody>
          <p className="truncate text-center leading-5 text-gray-9">
            {project.description}
          </p>
        </CardBody>
        <CardFooter className="flex w-full justify-between">
          <p className="text-sm text-gray-8">08.03.2024</p>
          <Avatar
            className="transition-transform"
            color="primary"
            size="sm"
            name={project.creator?.email}
          />
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProjectCard
