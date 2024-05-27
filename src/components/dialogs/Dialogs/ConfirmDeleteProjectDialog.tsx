"use client";

import React from "react";
import Dialog from "../Dialog";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDialog from "@/lib/hooks/useDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import projectService from "@/services/ProjectService";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ConfirmDeleteProjectDialog = () => {
  const { close: closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  const { mutate } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: () => projectService.deleteProjectById(projectId),
    onSuccess: () => {
      toast.success("Project succesfully deleted!");
      closeDialog();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      push("/home");
    },
    onError: () => {
      closeDialog();
      toast.error("Something went wrong");
    },
  });
  return (
    <Dialog searchParam="delete-project">
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 items-center">
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => mutate()}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteProjectDialog;
