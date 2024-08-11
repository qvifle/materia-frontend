"use client"
import React, { HTMLAttributes, useRef, useState } from "react"
import {
  Card as ShadcnCard,
  CardDescription,
  CardHeader as ShadcnCardheader,
  CardTitle,
} from "../ui/card"
import capitalize from "@/lib/utils/capitalize"
import TaskStatusIndicator from "../indicators/TaskStatusIndicator"
import { Button } from "../ui/button"
import { CheckCircle, Pencil, Check } from "lucide-react/"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import ChangeStatusButtonsGroup from "../buttons/ChangeStatusButtonsGroup"
import EditTaskButtonGroup from "../buttons/EditTaskButtonGroup"
import ChangeTaskTitleInput from "../inputs/ChangeTaskTitleInput"
import ChangeTaskDescriptionInput from "../inputs/ChangeTaskDescriptionInput"
import { ITask } from "@/types/task.types"
import { cn } from "@/lib/utils"
import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react"
import UpdateTaskTitleInput from "../inputs/UpdateTaskTitleInput"
import preventScrollOnFocusByElementId from "@/lib/utils/focus-on-element-without-scroll"
import focusOnElementWithoutScroll from "@/lib/utils/focus-on-element-without-scroll"

interface ITaskCard extends HTMLAttributes<HTMLDivElement> {
  task: ITask
  hidden?: boolean
  draggable?: boolean
}

const TaskCard: React.FC<ITaskCard> = ({
  task,
  hidden = false,
  draggable = false,
  ...rest
}) => {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [isDescriptionEdit, setDescriptionEdit] = useState(false)

  return (
    <Card isBlurred className="w-full bg-gray-4 px-4 py-3 text-base">
      <CardHeader className="w-full p-0 text-gray-12">
        <div className="flex w-full items-center gap-2">
          <TaskStatusIndicator status={task.status} />
          {isTitleEdit ? (
            <UpdateTaskTitleInput
              task={task}
              setTitle={setTitle}
              title={title}
              setTitleEdit={setTitleEdit}
            />
          ) : (
            <span
              onClick={() => {
                focusOnElementWithoutScroll("update-task-title-input")
                setTitleEdit(true)
              }}
            >
              {title}
            </span>
          )}
        </div>
      </CardHeader>
      {task.description && (
        <CardBody className="pt-0">
          <span className="text-sm text-gray-11">{task.description}</span>
        </CardBody>
      )}
    </Card>
  )

  return (
    <ShadcnCard
      className={cn(
        "group relative z-20 max-w-[350px] px-2 py-1",
        hidden ? "opacity-0" : "",
        draggable && "taskAppear",
      )}
      {...rest}
    >
      <ShadcnCardheader className="px-2 py-1">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-2">
            {/* task status */}

            {/* task title */}

            {isTitleEdit ? (
              <ChangeTaskTitleInput toggle={setTitleEdit} task={task} />
            ) : (
              <span onDoubleClick={() => setTitleEdit(true)}>{task.title}</span>
            )}
          </div>
          <div className="invisible relative z-10 opacity-0 duration-200 group-hover:visible group-hover:opacity-100">
            {/* change task status */}
            <Popover>
              <PopoverTrigger asChild className="z-50">
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <CheckCircle size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-min p-1">
                <div className="flex items-center gap-2">
                  <ChangeStatusButtonsGroup taskId={task.id} />
                </div>
              </PopoverContent>
            </Popover>
            {/* edit task */}
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <Pencil size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-min p-1">
                <EditTaskButtonGroup
                  task={task}
                  setTitleEdit={setTitleEdit}
                  setDescriptionEdit={setDescriptionEdit}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
      </ShadcnCardheader>
      {/* card description */}
      <CardDescription
        className="pl-6"
        onDoubleClick={() => setDescriptionEdit(true)}
      >
        {isDescriptionEdit ? (
          <ChangeTaskDescriptionInput
            key="input-description"
            toggle={setDescriptionEdit}
            task={task}
          />
        ) : (
          <span className="block overflow-hidden text-ellipsis">
            {task.description}
          </span>
        )}
      </CardDescription>
    </ShadcnCard>
  )
}

export default TaskCard
