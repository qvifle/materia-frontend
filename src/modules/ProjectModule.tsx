"use client";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import DesksWidget from "@/widgets/DesksWidget";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProjectModule = ({ projectId }: { projectId: string }) => {

  const { data, isPending, isError } = useQuery<IProject>({
    queryKey: [`project/${projectId}`],
    queryFn: async () => {
      const { data } = await projectService.getProjectById(projectId);
      return data;
    },
  });

  if (isPending) {
    return "Loading";
  }

  if (isError) {
    return "Error";
  }

  return (
    <div className="flex flex-col h-full">
      <div className="">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {data.iconUrl ? unifiedToEmoji(data.iconUrl) : null}
          {data.title}
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2 mb-[50px]">
          {data.description}
        </p>
      </div>
      <div className="overflow-x-auto flex-grow custom-scroll">
        <DesksWidget projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectModule;
