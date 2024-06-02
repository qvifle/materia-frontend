"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Settings, Trash2, UserRoundPlus } from "lucide-react";
import useDialog from "@/lib/hooks/useDialog";

const ProjectSettingsDropdown = () => {
  const { open: openDialog } = useDialog();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1 mb-2">
          <Settings size={14} /> Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => openDialog("invite-project")}
            className="flex items-center gap-2"
          >
            <UserRoundPlus /> <span>Invite</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => openDialog("edit-project")}
          >
            <Pencil /> <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => openDialog("delete-project")}
          >
            <Trash2 /> <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSettingsDropdown;
