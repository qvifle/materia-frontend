"use client";
import ProjectCard from "@/components/cards/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProjectsContainer = () => {
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects();
      return data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!!projects && !projects.length) {
    return <div className="w-full h-full flex items-center justify-center text-3xl font-semibold">No projects yet...</div>;
  }

  if (!projects || isError) {
    return <div>Error</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 w-full auto-rows-[150px] ">
      {projects.map((el: IProject, key: number) => (
        <ProjectCard key={key} project={el} />
      ))}
    </div>
  );
};

export default ProjectsContainer;
