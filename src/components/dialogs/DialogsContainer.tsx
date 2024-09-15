import React, { Suspense } from "react"
import CreateProject from "./Dialogs/CreateProjectDialog"
import EditProjectDialog from "./Dialogs/EditProjectDialog"
import ConfirmDeleteProjectDialog from "./Dialogs/ConfirmDeleteProjectDialog"
import NotificationsDialog from "./Dialogs/NotificationsDialog"
import InviteProjectDialog from "./Dialogs/InviteProjectDialog"
import ConfirmLeaveProjectDialog from "./Dialogs/ConfirmLeaveProjectDialog"

const DialogsContainer = () => {
  return (
    <Suspense>
      <CreateProject />
      <EditProjectDialog />
      <ConfirmDeleteProjectDialog />
      <NotificationsDialog />
      <InviteProjectDialog />
      <ConfirmLeaveProjectDialog />
    </Suspense>
  )
}

export default DialogsContainer
