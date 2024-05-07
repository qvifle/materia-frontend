import React, { HTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import Ellipsis from "../ui/icons/Ellipsis";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import projectService from "@/services/ProjectService";
import toast from "react-hot-toast";

interface IProjectCardDropdown extends HTMLAttributes<HTMLDivElement> {
  projectId: string;
}

const ProjectCardDropdown: React.FC<IProjectCardDropdown> = ({
  projectId,
  ...rest
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProject } = useMutation({
    mutationKey: ["project", "delete"],
    mutationFn: () => projectService.deleteProjectById(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project succesfully deleted!");
    },
    onError: () => toast.error("Something went wrong"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteProject();
              }}
              className="w-full"
              variant="destructive"
              size="icon"
            >
              <Trash />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectCardDropdown;
