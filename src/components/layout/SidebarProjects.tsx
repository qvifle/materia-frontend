import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import CreateProjectButton from "../buttons/CreateProjectButton";

const SidebarProjects = ({ isOpen }: { isOpen: boolean }) => {
  const { data: projects, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects();
      return data;
    },
  });

  return (
    <div key={"index"} className="flex flex-col p-[15px] h-full">
      <CreateProjectButton isOpen={isOpen} />
      {!!projects && !isPending && (
        <>
          <Link href={"/home/my-projects"}>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                isOpen ? "block" : "hidden",
              )}
            >
              {"My projects"}
            </p>
          </Link>
          {projects.map((project, key: number) => (
            <Button
              key={key}
              variant="ghost"
              size={isOpen ? "default" : "icon"}
              className={cn(
                "w-full",
                isOpen ? "justify-start" : "justify-center",
              )}
              asChild
            >
              <Link
                href={`/home/my-projects/${project.id}`}
                className="text-left"
              >
                <div className="flex items-center gap-2">
                  {project.iconUrl ? unifiedToEmoji(project.iconUrl) : null}
                  {isOpen ? <span>{project.title}</span> : null}
                </div>
              </Link>
            </Button>
          ))}
        </>
      )}

      {/* {!!projects &&
        projects.length > 0 &&
        projects.map((project, key: number) => {
          return (
            <Button
              key={key}
              variant="ghost"
              size={isOpen ? "default" : "icon"}
              className={cn(
                "w-full",
                isOpen ? "justify-start" : "justify-center",
              )}
              asChild
            >
              <Link
                href={`/home/my-projects/${project.id}`}
                className="text-left"
              >
                <div className="flex items-center gap-2">
                  {project.iconUrl ? unifiedToEmoji(project.iconUrl) : null}
                  {isOpen ? <span>{project.title}</span> : null}
                </div>
              </Link>
            </Button>
          );
        })} */}
    </div>
  );
};

export default SidebarProjects;
