"use client";
import ProjectCard from "@/components/cards/ProjectCard";
import { useQuery } from "@tanstack/react-query";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import sortProjects from "@/lib/utils/sortProjects";

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

  const { data: session } = useSession();

  const sortedProjects = useMemo(
    () => sortProjects(projects, session?.user.email || ""),
    [projects, session],
  );

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!sortedProjects) {
    return (
      <div className="w-full h-full flex items-center justify-center text-3xl font-semibold">
        No projects yet...
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-medium mb-2">My projects</h2>
        <div className="grid grid-cols-4 gap-2 w-full auto-rows-[150px] px-2">
          {sortedProjects.myProjects.map((el: IProject, key: number) => (
            <ProjectCard key={key} project={el} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-2">Other</h2>
        <div className="grid grid-cols-4 gap-2 w-full auto-rows-[150px] px-2">
          {sortedProjects.otherProjects.map((el: IProject, key: number) => (
            <ProjectCard key={key} project={el} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
