"use client"
import React from "react"
import Modal from "../Dialog"
import MembersTabs from "@/components/tabs/MembersTabs"
import { ModalContent } from "@nextui-org/react"

const InviteProjectDialog = () => {
  return (
    <Modal searchParam="invite-project">
      <ModalContent>
        <MembersTabs />
      </ModalContent>
    </Modal>
  )
}

export default InviteProjectDialog
