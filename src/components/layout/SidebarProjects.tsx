import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import useOpenDialog from "@/lib/hooks/useDialog";
import { useQuery } from "@tanstack/react-query";
import unifiedToEmoji from "@/lib/utils/unifiedToEmoji";
import projectService from "@/services/ProjectService";
import { PlusCircle } from "lucide-react";
import { IProject } from "@/types/project.types";

const SidebarProjects = ({ isOpen }: { isOpen: boolean }) => {
  const { open: openDialog } = useOpenDialog();
  const { data: projects, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await projectService.getProjects();
      return data;
    },
  });

  if (isPending) {
    return "loading";
  }

  return (
    <div key={"index"} className="flex flex-col p-[15px] h-full">
      <div className={cn("flex flex-col mb-2", isOpen ? "" : "items-center")}>
        <div
          className={cn(
            "flex items-center justify-between",
            isOpen ? "mr-2" : "",
          )}
        >
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

          <Button
            onClick={() => openDialog("createProject")}
            variant="ghost"
            size="icon"
            className="h-min w-min p-1"
          >
            <PlusCircle size={16} />
          </Button>
        </div>
      </div>
      <div>
        {!!projects &&
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
          })}
      </div>
    </div>
  );
};

export default SidebarProjects;
