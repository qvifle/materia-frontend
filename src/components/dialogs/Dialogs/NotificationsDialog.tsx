import React from "react"
import Modal from "../Dialog"
import MyInvitesContainer from "@/components/containers/NotificationsContainer"
import { ModalContent, ModalHeader } from "@nextui-org/react"

const NotificationsDialog = () => {
  return (
    <Modal searchParam="notifications" className="">
      <ModalContent>
        <ModalHeader>Notifications</ModalHeader>
        <MyInvitesContainer />
      </ModalContent>
    </Modal>
  )
}

export default NotificationsDialog
