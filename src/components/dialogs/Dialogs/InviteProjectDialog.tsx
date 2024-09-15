import React from "react"
import Modal from "../Dialog"
import MembersTabs from "@/components/tabs/MembersTabs"
import { ModalBody, ModalContent } from "@nextui-org/react"

const InviteProjectDialog = () => {
  return (
    <Modal searchParam="invite-project">
      <ModalContent>
        <ModalBody>
          <MembersTabs />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default InviteProjectDialog
