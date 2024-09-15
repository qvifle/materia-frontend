"use client"

import { cn } from "@/lib/utils"
import getStatusColor from "@/lib/utils/getStatusColor"
import { ITask, TaskStatus } from "@/types/task.types"
import React, { HTMLAttributes } from "react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown"
import { Check, Pause, ArrowBigRightDash, Ban } from "lucide-react"
import { Button } from "@nextui-org/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import taskService from "@/services/TaskService"

interface ITaskStatusIndicator extends HTMLAttributes<HTMLDivElement> {
  task: ITask
}

const TaskStatusIndicator: React.FC<ITaskStatusIndicator> = ({
  task,
  ...rest
}) => {
  const queryClient = useQueryClient()
  const { mutate: changeStatus } = useMutation({
    mutationKey: ["change-status"],
    mutationFn: async (status: TaskStatus) => {
      const res = await taskService.changeStatusById(task.id, { status })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["desks"] }),
  })

  return (
    <Dropdown placement="right-start" closeOnSelect>
      <DropdownTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 min-w-4 border-[1px] p-0"
          style={{ borderColor: `var(--${getStatusColor(task.status)}-7)` }}
        >
          <div
            style={{
              backgroundColor: `var(--${getStatusColor(task.status)}-9)`,
            }}
            className={cn("h-2 w-2 rounded-full")}
            {...rest}
          ></div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        selectionMode="single"
        selectedKeys={[task.status]}
        onSelectionChange={(key) => changeStatus(key.currentKey as TaskStatus)}
      >
        <DropdownSection title="Select task status">
          <DropdownItem
            startContent={<Check size={15} color="var(--succes-9)" />}
            key={TaskStatus.COMPLETED}
          >
            Completed
          </DropdownItem>
          <DropdownItem
            startContent={
              <ArrowBigRightDash size={15} color="var(--warning-9)" />
            }
            key={TaskStatus.PENDING}
          >
            Pending
          </DropdownItem>
          <DropdownItem
            startContent={<Pause size={15} color="var(--info-9)" />}
            key={TaskStatus.PAUSED}
          >
            Paused
          </DropdownItem>
          <DropdownItem
            startContent={<Ban size={15} color="var(--error-9)" />}
            key={TaskStatus.CANCELED}
          >
            Canceled
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default TaskStatusIndicator
