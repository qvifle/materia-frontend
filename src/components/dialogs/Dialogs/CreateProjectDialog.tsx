import React from "react";
import Dialog from "../Dialog";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const CreateProject = () => {
  return (
    <Dialog searchParam="createProject">
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            {`Let's start new project here`}
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
