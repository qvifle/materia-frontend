import React from "react"
import Modal from "../Dialog"
import CreateProjectForm from "@/components/forms/CreateProjectForm"
import { ModalContent, ModalHeader } from "@nextui-org/react"
const CreateProject = () => {
  return (
    <Modal searchParam="create-project">
      <ModalContent>
        <ModalHeader>Create new project</ModalHeader>
        <CreateProjectForm />
      </ModalContent>
    </Modal>
  )
}

export default CreateProject
