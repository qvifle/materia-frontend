"use client"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Check } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"
import { ITask } from "@/types/task.types"
import { Input } from "@nextui-org/react"
import { useOnClickOutside } from "usehooks-ts"

const ChangeTaskTitleInput = ({
  toggle,
  task,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>
  task: ITask
}) => {
  const queryClient = useQueryClient()
  const [titleValue, setTitleValue] = useState("")

  const ref = useRef<any>(null)
  useOnClickOutside(ref, () => toggle(false))

  const { mutate } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: async () => {
      const { data } = await taskService.updateTaskById(task.id, {
        title: titleValue,
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  const changeTitle = async () => {
    mutate()
    toggle(false)
  }

  return (
    <div className="flex w-full cursor-pointer items-center bg-transparent">
      <Input
        ref={ref}
        onChange={(e) => setTitleValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            changeTitle()
          } else if (e.key === "Escape") {
            toggle(false)
          }
        }}
        autoFocus
        defaultValue={task.title}
        classNames={{
          input:
            "w-full !bg-transparent !focus-ring-0 !focus:outline-none !ring-0",
        }}
        className="z-30 w-full !bg-transparent ring-0"
      />
      <Button
        className="absolute right-0 z-30 h-4 w-4 rounded-[3px] p-1"
        onClick={changeTitle}
        size="icon"
      >
        <Check size={14} />
      </Button>
    </div>
  )
}

export default ChangeTaskTitleInput
