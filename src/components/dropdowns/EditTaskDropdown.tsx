"use client"
import React from "react"
import { Pencil, Brush, Trash } from "lucide-react/"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownProps,
} from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"

interface EditTaskDropdownProps {
  taskId: string
  onTitleEdit: () => void
  onDescriptionEdit: () => void
}

const EditTaskDropdown = ({
  taskId,
  onTitleEdit,
  onDescriptionEdit,
}: EditTaskDropdownProps) => {
  const queryClient = useQueryClient()

  const { mutate: deleteTask } = useMutation({
    mutationKey: ["task", taskId],
    mutationFn: async () => {
      const { data } = await taskService.deleteTaskById(taskId)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          style={{ minWidth: "16px" }}
          className="h-4 w-4"
          radius="sm"
          isIconOnly
        >
          <Pencil size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onTitleEdit()
          }}
          startContent={<Brush size={12} />}
          key="edit-title"
        >
          Title
        </DropdownItem>
        <DropdownItem
          onClick={() => onDescriptionEdit()}
          startContent={<Brush size={12} />}
          key="edit-description"
        >
          Description
        </DropdownItem>
        <DropdownItem
          onClick={() => deleteTask()}
          startContent={<Trash size={12} color="var(--error-9)" />}
          key="delete"
        >
          <span className="text-danger-600">Delete</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default EditTaskDropdown
