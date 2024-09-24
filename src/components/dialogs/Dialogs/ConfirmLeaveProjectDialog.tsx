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
import inviteService from "@/services/InviteService"

const ConfirmLeaveProjectDialog = () => {
  const { close: closeDialog } = useDialog()
  const { push } = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const { mutate: deleteProject } = useMutation({
    mutationKey: ["leave-project"],
    mutationFn: () => inviteService.leaveProject(projectId),
    onSuccess: () => {
      push("/home")
    },
    onError: () => {
      closeDialog()
      toast.error("Something went wrong")
    },
  })

  return (
    <Modal  searchParam="leave-project">
      <ModalContent>
        <ModalHeader>Confirm project exit</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-800">
            Are you sure you want to leave this project?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button color="danger" onClick={() => deleteProject()}>
            Exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmLeaveProjectDialog
