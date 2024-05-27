import React, { Suspense } from "react";
import CreateProject from "./Dialogs/CreateProjectDialog";
import EditProjectDialog from "./Dialogs/EditProjectDialog";
import ConfirmDeleteProjectDialog from "./Dialogs/ConfirmDeleteProjectDialog";

const DialogsContainer = () => {
  return (
    <Suspense>
      <CreateProject />
      <EditProjectDialog />
      <ConfirmDeleteProjectDialog />
    </Suspense>
  );
};

export default DialogsContainer;
