import { IProject } from "@/types/project.types";
import React from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import Link from "next/link";

const ProjectCard = ({ project }: { project: IProject }) => {
  return (
    <Link href={`/home/projects/${project.id}`} className="h-full">
      <Card
        className="w-[calc(100vw-32px)] min-[420px]:w-full h-full min-[420px]:h-[200px]"
        shadow="none"
      >
        <CardHeader className="flex flex-col pt-6 pb-0">
          <span className="text-4xl mb-2 ">
            {project.iconUrl && unifiedToEmoji(project.iconUrl)}
          </span>
          <p className="text-xl font-medium text-center">{project.title}</p>
        </CardHeader>
        <CardBody>
          <p className="text-gray-9 leading-5 text-center truncate">
            {project.description}
          </p>
        </CardBody>
        <CardFooter className="flex justify-between w-full">
          <p className="text-gray-8 text-sm">08.03.2024</p>
          <Avatar
            className="transition-transform"
            color="primary"
            size="sm"
            name={project.creator?.email}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
