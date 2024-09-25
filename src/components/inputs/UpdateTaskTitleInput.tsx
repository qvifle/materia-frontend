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
import toast from "react-hot-toast"

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
    if (newTitle === "") {
      reset()
      return
    }
    const { data } = await taskService.updateTaskById(taskId, {
      title: newTitle,
    })
    return data
  }

  const { mutate: updateTitle } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: () => changeTaskTitleQuery(task.id, title),
    onSuccess: () => {
      setTitleEdit(false)
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
    onError: (err: any) => {
      reset()
      if (!!err.response.data) {
        toast.error(err.response.data)
        return
      }
      toast.error("Something went wrong")

      console.error(err)
    },
  })

  return (
    <div
      ref={ref as any}
      className="flex w-full items-center justify-between gap-2"
    >
      <input
        autoFocus
        id="update-task-title-input"
        className="w-full bg-transparent leading-[20px] outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateTitle()
          } else if (e.key === "Escape") {
            reset()
          }
        }}
      />
      <Button
        className="h-5 w-5 min-w-5 p-0 outline-none"
        size="sm"
        color="primary"
        onClick={() => updateTitle()}
      >
        <Check color="#fcfcfd" size={14} />
      </Button>
    </div>
  )
}

export default UpdateTaskTitleInput
