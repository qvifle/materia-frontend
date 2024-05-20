"use client";
import React, { HTMLAttributes } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Plus } from "lucide-react";
import useOpenDialog from "@/lib/hooks/useDialog";

interface ICreateProjectButton extends ButtonProps {
  isOpen?: boolean;
}

const CreateProjectButton: React.FC<ICreateProjectButton> = ({
  isOpen = true,
  onClick,
  ...rest
}) => {
  const { open: openDialog } = useOpenDialog();

  return (
    <Button
      className="mb-2 flex items-center"
      size={isOpen ? "lg" : "icon"}
      onClick={() => openDialog("createProject")}
      {...rest}
    >
      <Plus className="mb-[2px] h-6 w-6" />
      {isOpen ? <span className="ml-1">Create Project</span> : null}
    </Button>
  );
};

export default CreateProjectButton;
