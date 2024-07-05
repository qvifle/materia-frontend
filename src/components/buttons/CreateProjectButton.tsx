"use client"
import React from "react"
import { Button } from "@nextui-org/react"
import { Plus } from "lucide-react"
import useDialog from "@/lib/hooks/useDialog"

const CreateProjectButton = () => {
  const { open: openDialog } = useDialog()
  return (
    <Button
      className="absolute bottom-4 right-4 bg-[#0031d2a0] backdrop-blur-sm sm:hidden"
      size="lg"
      color="primary"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        openDialog("createProject")
      }}
      isIconOnly
    >
      <Plus color="#FFFFFF" />
    </Button>
  )
}

export default CreateProjectButton
