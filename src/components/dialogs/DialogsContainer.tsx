import React, { Suspense } from "react";
import CreateProject from "./Dialogs/CreateProjectDialog";

const DialogsContainer = () => {
  return (
    <Suspense>
      <CreateProject />
    </Suspense>
  );
};

export default DialogsContainer;
