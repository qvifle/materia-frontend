"use client"
import React, { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"
import getHeightOfChangeDescriptionInput from "@/lib/utils/getHeightOfChangeDescriptionInput"
import { ITask } from "@/types/task.types"
import useClickOutside from "@/lib/hooks/useClickOutside"
import { Button } from "@nextui-org/react"

const ChangeTaskDescriptionInput = ({
  toggle,
  description,
  setDescription,
  task,
}: {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  toggle: React.Dispatch<React.SetStateAction<boolean>>
  task: ITask
}) => {
  const queryClient = useQueryClient()
  const textAreaRef = useRef<null | any>(null)
  const mainRef = useRef<null | any>(null)

  useClickOutside(mainRef, () => {
    toggle(false)
  })

  const { mutate } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: async () => {
      const { data } = await taskService.updateTaskById(task.id, {
        description: description,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const changeDescription = async () => {
    mutate()
    toggle(false)
  }

  useEffect(() => {
    const length = textAreaRef.current.value.length
    textAreaRef.current.setSelectionRange(length, length)
  }, [])

  return (
    <div
      className="relative flex h-min w-full flex-col items-end gap-2"
      ref={mainRef}
    >
      <textarea
        id="task-description-edit"
        style={{ height: getHeightOfChangeDescriptionInput(description) }}
        className="w-full resize-none bg-transparent text-sm text-gray-11 outline-none"
        ref={textAreaRef}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            changeDescription()
          } else if (e.key === "Escape") {
            toggle(false)
          }
        }}
      />
      <Button
        className="h-6 w-6 min-w-6 p-0 outline-none"
        size="sm"
        color="primary"
        onClick={changeDescription}
      >
        <Check color="#fcfcfd" size={14} />
      </Button>
    </div>
  )
}

export default ChangeTaskDescriptionInput
