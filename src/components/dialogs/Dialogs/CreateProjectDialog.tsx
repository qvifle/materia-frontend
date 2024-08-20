import React from "react"
import Modal from "../Dialog"
import CreateProjectForm from "@/components/forms/CreateProjectForm"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
const CreateProject = () => {
  return (
    <Modal searchParam="createProject">
      <ModalContent>
        <ModalHeader>Create new project</ModalHeader>
       
          <CreateProjectForm />
      
      </ModalContent>
      {/* <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            {`Let's start new project here`}
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm />
      </DialogContent> */}
    </Modal>
  )
}

export default CreateProject
