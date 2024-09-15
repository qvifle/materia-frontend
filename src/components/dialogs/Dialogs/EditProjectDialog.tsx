import EditProjectForm from "@/components/forms/EditProjectForm"

import React from "react"
import Modal from "../Dialog"
import { ModalContent, ModalHeader } from "@nextui-org/react"

const EditProjectDialog = () => {
  return (
    <Modal searchParam="edit-project">
      <ModalContent>
        <ModalHeader>Edit project</ModalHeader>
        <EditProjectForm />
      </ModalContent>
    </Modal>
  )
}

export default EditProjectDialog
