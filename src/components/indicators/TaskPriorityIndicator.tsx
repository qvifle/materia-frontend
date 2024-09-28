"use client"
import { cn } from "@/lib/utils"
import { ITask, TaskPriority } from "@/types/task.types"
import React, { HTMLAttributes, useEffect, useState } from "react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown"
import { Circle, Flame, Square, Triangle } from "lucide-react"
import { Button } from "@nextui-org/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"
import getPriorityColor from "@/lib/utils/getPriorityColor"

interface ITaskPriorityIndicator extends HTMLAttributes<HTMLDivElement> {
  task: ITask
}

const TaskPriorityIndicator: React.FC<ITaskPriorityIndicator> = ({
  task,
  ...rest
}) => {
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const queryClient = useQueryClient()
  const { mutate: changePriority } = useMutation({
    mutationKey: ["change-priority"],
    mutationFn: async (priority: TaskPriority) => {
      setPriority(priority)
      const res = await taskService.changePriorityById(task.id, { priority })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] })
    },
  })

  useEffect(() => {
    setPriority(task.priority)
  }, [task])

  return (
    <Dropdown placement="right-start" closeOnSelect>
      <DropdownTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 min-w-4 border-[1px] p-0"
          style={{ borderColor: `var(--${getPriorityColor(priority)}-7)` }}
        >
          <div
            style={{
              backgroundColor: `var(--${getPriorityColor(priority)}-9)`,
            }}
            className={cn("h-2 w-2 rounded-full")}
            {...rest}
          ></div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        selectionMode="single"
        selectedKeys={[priority]}
        onSelectionChange={(key) =>
          changePriority(key.currentKey as TaskPriority)
        }
      >
        <DropdownSection title="Select task priority">
          <DropdownItem
            startContent={<Circle size={15} color="var(--succes-9)" />}
            key={TaskPriority.LOW}
          >
            Low
          </DropdownItem>
          <DropdownItem
            startContent={<Square size={15} color="var(--warning-9)" />}
            key={TaskPriority.MEDIUM}
          >
            Medium
          </DropdownItem>
          <DropdownItem
            startContent={<Triangle size={15} color="var(--error-9)" />}
            key={TaskPriority.HIGH}
          >
            High
          </DropdownItem>
          <DropdownItem
            className=""
            startContent={<Flame size={15} color="var(--critical-9)" />}
            key={TaskPriority.CRITICAL}
          >
            Critical
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default TaskPriorityIndicator
