"use client"
import deskService from "@/services/DeskService"
import taskService from "@/services/TaskService"
import { IDesk } from "@/types/desk.types"
import { ITask } from "@/types/task.types"
import { Button } from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useClickAway } from "@uidotdev/usehooks"
import { Check } from "lucide-react"
import React, { FC } from "react"

interface UpdateTaskTitleInputProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>
  task: ITask
}

const UpdateTaskTitleInput: FC<UpdateTaskTitleInputProps> = ({
  title,
  setTitle,
  setTitleEdit,
  task,
}) => {
  const queryClient = useQueryClient()

  const reset = () => {
    setTitle(task.title)
    setTitleEdit(false)
  }

  const ref = useClickAway(() => reset())

  const changeTaskTitleQuery = async (taskId: string, newTitle: string) => {
    try {
      if (newTitle === "") {
        reset()
        return
      }
      const { data } = await taskService.updateTaskById(taskId, {
        title: newTitle,
      })
      return data
    } catch (err) {
      console.error(err)
    }
  }

  const { mutate: updateTitle } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: () => changeTaskTitleQuery(task.id, title),
    onSuccess: () => {
      setTitleEdit(false)
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
    onError: (err) => {
      setTitleEdit(false)
      console.error(err)
    },
  })

  return (
    <div
      ref={ref as any}
      className="flex w-full items-center justify-between gap-2"
    >
      <input
        id="update-task-title-input"
        className="w-full bg-transparent outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateTitle()
          } else if (e.key === "Escape") {
            setTitleEdit(false)
          }
        }}
      />
      <Button
        className="h-6 w-6 min-w-6 p-0 outline-none"
        size="sm"
        color="primary"
        onClick={() => updateTitle()}
      >
        <Check size={14} />
      </Button>
    </div>
  )
}

export default UpdateTaskTitleInput
