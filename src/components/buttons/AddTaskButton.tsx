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
import { ITask, TaskPriority, TaskStatus } from "@/types/task.types"

interface IAddTaskButton extends ButtonProps {
  desk: IDesk
}

const AddTaskButton: React.FC<IAddTaskButton> = ({ desk, ...rest }) => {
  const [isInit, setInit] = useState(true)
  const [value, setValue] = useState("")
  const [backupState, setBackupState] = useState<IDesk[]>([])
  const { setDesks: setMockDesks, desks } = useDesksContext()

  const addMockTask = (title: string) => {
    setBackupState(desks)
    setMockDesks((desks) => {
      return desks.map((d) => {
        if (d.id === desk.id) {
          return {
            ...d,
            tasks: [
              ...d.tasks,
              {
                id: `mock-${d.id}-${d.tasks.length}`,
                title: title,
                createdAt: new Date(),
                deskId: d.id,
                orderId: d.tasks.length,
                status: TaskStatus.PAUSED,
                priority: TaskPriority.LOW,
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
      const res = await taskService.createTask(desk.id, { title: value })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
      reset()
    },
    onError: (err: any) => {
      console.log(err)
      if (!!err.response.data) {
        toast.error(err.response.data)
      } else {
        toast.error("Something went wrong")
      }
      setMockDesks(backupState)
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
            style={{ borderColor: `var(--succes-7)` }}
          >
            <div
              style={{
                backgroundColor: `var(--succes-9)`,
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
