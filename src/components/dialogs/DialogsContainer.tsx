import React, { Suspense } from "react"
import CreateProject from "./Dialogs/CreateProjectDialog"
import EditProjectDialog from "./Dialogs/EditProjectDialog"
import ConfirmDeleteProjectDialog from "./Dialogs/ConfirmDeleteProjectDialog"
import NotificationsDialog from "./Dialogs/NotificationsDialog"
import InviteProjectDialog from "./Dialogs/InviteProjectDialog"

const DialogsContainer = () => {
  return (
    <>
      <CreateProject />
      {/* <EditProjectDialog />
      <ConfirmDeleteProjectDialog />
      <NotificationsDialog />
      <InviteProjectDialog /> */}
    </>
  )
}

export default DialogsContainer
