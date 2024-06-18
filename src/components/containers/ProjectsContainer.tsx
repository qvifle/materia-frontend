"use client";
import { useQuery } from "@tanstack/react-query";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import sortProjects from "@/lib/utils/sortProjects";
import { Button, Spinner } from "@nextui-org/react";
import ProjectCard from "../cards/ProjectCard";
import Link from "next/link";
import useDialog from "@/lib/hooks/useDialog";

const ProjectsContainer = () => {
  const { open: openDialog } = useDialog();
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
    return <Spinner />;
  }

  if (!sortedProjects || projects?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-2xl font-medium mt-[40px] sm:mt-0 gap-4">
        <span> You doesn't have any project</span>
        <Button
          onClick={() => openDialog("createProject")}
          size="lg"
          color="primary"
        >
          Create new!
        </Button>
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="flex flex-col gap-4">
      {sortedProjects.myProjects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2 w-full">My projects</h2>
          <div className="grid  grid-rows-3 grid-flow-col overflow-x-scroll gap-2 w-full  py-2">
            {sortedProjects.myProjects.map((project: IProject, key: number) => (
              <ProjectCard key={key} project={project} />
            ))}
          </div>
        </div>
      )}
      {sortedProjects.otherProjects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2 w-full">Other</h2>
          <div className="grid  grid-rows-3 grid-flow-col overflow-x-scroll gap-2 w-full  py-2">
            {sortedProjects.otherProjects.map(
              (project: IProject, key: number) => (
                <ProjectCard key={key} project={project} />
              ),
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsContainer;
