"use client";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import { Trash, User } from "lucide-react";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IProject } from "@/types/project.types";
import truncate from "@/lib/utils/truncate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectCardDropdown from "../dropdowns/ProjectCardDropdown";

interface IProjectCard extends HTMLAttributes<HTMLAnchorElement> {
  project: IProject;
}

const ProjectCard: React.FC<IProjectCard> = ({ project, ...rest }) => {
  const { isTruncated: isDescriptionTruncated, value: truncatedDesctiption } =
    truncate(project.description || undefined, 50);

  const formatedData = new Date(project.createdAt);

  return (
    <Link href={`my-projects/${project.id}`} className="h-full" {...rest}>
      <Card className="flex flex-col justify-between bg-[#9a9a9a20] hover:bg-[#64646420] duration-100 backdrop-blur-md h-full">
        <CardHeader>
          <div>
            <CardTitle>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {project.iconUrl && unifiedToEmoji(project.iconUrl)}
                  <span>{project.title}</span>
                </div>
                <ProjectCardDropdown projectId={project.id} />
              </div>
            </CardTitle>
            <CardDescription>
              {isDescriptionTruncated ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{truncatedDesctiption}</span>
                    </TooltipTrigger>
                    <TooltipContent>{project.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                project.description
              )}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {formatedData.toDateString()}
            </span>
            <Avatar>
              <AvatarImage alt="avatar"></AvatarImage>
              <AvatarFallback>
                <div className="bg-border rounded-full p-1">
                  <User />
                </div>
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
