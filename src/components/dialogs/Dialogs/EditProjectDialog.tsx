import React from "react";
import Dialog from "../Dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProjectForm from "@/components/forms/EditProjectForm";
const EditProjectDialog = () => {

  return (
    <Dialog searchParam="edit-project">
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            You can change any field of this project that you want
          </DialogDescription>
        </DialogHeader>
        <EditProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectDialog;
