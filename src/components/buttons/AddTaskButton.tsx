"use client"
import React, { useState } from "react"
import { Plus, Check } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"
import { IDesk } from "@/types/desk.types"
import { useDroppable } from "@dnd-kit/core"
import { Button, ButtonProps, Card, CardHeader, cn } from "@nextui-org/react"
import { useClickAway } from "@uidotdev/usehooks"
import toast from "react-hot-toast"
import { useDesksContext } from "@/context/DesksContext"
import { ITask, TaskStatus } from "@/types/task.types"

interface IAddTaskButton extends ButtonProps {
  desk: IDesk
}

const AddTaskButton: React.FC<IAddTaskButton> = ({ desk, ...rest }) => {
  const [isInit, setInit] = useState(true)
  const [value, setValue] = useState("")
  const { setDesks: setMockDesks } = useDesksContext()

  const addMockTask = (title: string) => {
    setMockDesks((desks) => {
      return desks.map((d) => {
        if (d.id === desk.id) {
          return {
            ...d,
            tasks: [
              ...d.tasks,
              {
                id: "mock",
                title: title,
                createdAt: new Date(),
                deskId: d.id,
                orderId: d.tasks.length,
                status: TaskStatus.PAUSED,
              },
            ],
          }
        }
        return d
      })
    })
  }

  const reset = () => {
    setInit(true)
    setValue("")
  }
  const ref = useClickAway(() => reset())

  const { setNodeRef } = useDroppable({
    id: desk.id,
    disabled: desk.tasks.length > 0,
  })

  const queryClient = useQueryClient()
  const { mutate: createTask } = useMutation({
    mutationKey: ["tasks", desk.id],
    mutationFn: async () => {
      const { data } = await taskService.createTask(desk.id, { title: value })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
      reset()
    },
    onError: (err: any) => {
      if (!!err.response.data) {
        toast.error(err.response.data)
        return
      }
      toast.error("Что-то пошло не так")
    },
  })

  const createNewTask = () => {
    if (value === "") {
      reset()
      return
    }
    setInit(true)
    addMockTask(value)
    createTask()
  }

  if (isInit) {
    return (
      <Button
        variant="flat"
        ref={setNodeRef}
        onClick={() => setInit(false)}
        startContent={<Plus size={15} />}
        {...rest}
      >
        New task
      </Button>
    )
  }

  return (
    <Card
      style={{ touchAction: "none" }}
      isBlurred
      className="w-full bg-gray-4 px-4 py-3 text-base md:max-w-[350px]"
    >
      <CardHeader className="w-full p-0 text-gray-12">
        <div className="grid w-full grid-cols-[16px,1fr] items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 min-w-4 border-[1px] p-0"
            style={{ borderColor: `var(--info-7)` }}
          >
            <div
              style={{
                backgroundColor: `var(--info-9)`,
              }}
              className={cn("h-2 w-2 rounded-full")}
            ></div>
          </Button>

          <div
            ref={ref as any}
            className="flex w-full items-center justify-between gap-2"
          >
            <input
              autoFocus
              id="update-task-title-input"
              className="w-full bg-transparent leading-5 outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createNewTask()
                } else if (e.key === "Escape") {
                  reset()
                }
              }}
            />
            <Button
              className="h-5 w-5 min-w-5 p-0 outline-none"
              size="sm"
              color="primary"
              onClick={() => createNewTask()}
            >
              <Check color="#fcfcfd" size={14} />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default AddTaskButton
