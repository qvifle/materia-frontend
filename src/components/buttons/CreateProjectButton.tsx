"use client"
import React from "react"
import { Button } from "@nextui-org/react"
import { Plus } from "lucide-react"
import useDialog from "@/lib/hooks/useDialog"

const CreateProjectButton = () => {
  const { open: openDialog } = useDialog()
  return (
    <Button
      className="fixed bottom-4 right-4 z-30 rounded-[14px] bg-[#0031d2a0] backdrop-blur-sm sm:hidden"
      size="lg"
      color="primary"
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        openDialog("create-project")
      }}
      isIconOnly
    >
      <Plus color="#FFFFFF" />
    </Button>
  )
}

export default CreateProjectButton
