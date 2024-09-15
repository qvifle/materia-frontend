"use client"

import React from "react"
import Modal from "../Dialog"
import useDialog from "@/lib/hooks/useDialog"
import { useMutation } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react"

const ConfirmDeleteProjectDialog = () => {
  const { close: closeDialog } = useDialog()
  const { push } = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const { mutate: deleteProject } = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: () => projectService.deleteProjectById(projectId),
    onSuccess: () => {
      toast.success("Project succesfully deleted!")
      push("/home")
    },
    onError: () => {
      closeDialog()
      toast.error("Something went wrong")
    },
  })

  return (
    <Modal searchParam="delete-project">
      <ModalContent>
        <ModalHeader>Are you absolutely sure?</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-800">
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color="danger" onClick={() => deleteProject()}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDeleteProjectDialog
