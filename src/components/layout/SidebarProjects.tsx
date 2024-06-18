"use client";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import projectService from "@/services/ProjectService";
import { IProject } from "@/types/project.types";
import { useSession } from "next-auth/react";
import sortProjects from "@/lib/utils/sortProjects";

const SidebarProjects = ({ isOpen }: { isOpen: boolean }) => {
  const { data: session } = useSession();
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects();
      return data;
    },
  });

  const sortedProjects = useMemo(
    () => sortProjects(projects, session?.user.email || ""),
    [projects, session],
  );

  if (isLoading) {
    return "Loading";
  }

  if (!sortedProjects) {
    return;
  }

  if (isError) {
    return "Error";
  }

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Link href={"/home/projects"}>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isOpen ? "block" : "hidden",
            )}
          >
            {"My projects"}
          </p>
        </Link>
        {sortedProjects.myProjects.map((project, key: number) => (
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
            <Link href={`/home/projects/${project.id}`} className="text-left">
              <div className="flex items-center gap-2">
                {project.iconUrl ? unifiedToEmoji(project.iconUrl) : null}
                {isOpen ? <span>{project.title}</span> : null}
              </div>
            </Link>
          </Button>
        ))}
      </div>
      <div>
        <Link href={"/home/projects"}>
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isOpen ? "block" : "hidden",
            )}
          >
            {"Other"}
          </p>
        </Link>
        {sortedProjects.otherProjects.map((project, key: number) => (
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
            <Link href={`/home/projects/${project.id}`} className="text-left">
              <div className="flex items-center gap-2">
                {project.iconUrl ? unifiedToEmoji(project.iconUrl) : null}
                {isOpen ? <span>{project.title}</span> : null}
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SidebarProjects;
