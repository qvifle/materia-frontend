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
import { CheckCircle, Pencil } from "lucide-react/"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import ChangeStatusButtonsGroup from "../buttons/ChangeStatusButtonsGroup"
import EditTaskButtonGroup from "../buttons/EditTaskButtonGroup"
import ChangeTaskTitleInput from "../inputs/ChangeTaskTitleInput"
import ChangeTaskDescriptionInput from "../inputs/ChangeTaskDescriptionInput"
import { ITask } from "@/types/task.types"
import { cn } from "@/lib/utils"
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react"
import UpdateTaskTitleInput from "../inputs/UpdateTaskTitleInput"
import focusOnElementWithoutScroll from "@/lib/utils/focus-on-element-without-scroll"
import EditTaskDropdown from "../dropdowns/EditTaskDropdown"

interface ITaskCard extends HTMLAttributes<HTMLDivElement> {
  task: ITask
  hidden?: boolean
  draggable?: boolean
}

const TaskCard: React.FC<ITaskCard> = ({ task, hidden = false, ...rest }) => {
  const [isTitleEdit, setTitleEdit] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  const [isDescriptionEdit, setDescriptionEdit] = useState(false)
  const [description, setDescription] = useState(task.description ?? "")

  const onSingleClick = (cb: () => void) => {
    console.log(clickTimeout)
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      setClickTimeout(null) // Reset the timeout
    } else {
      const timeout = setTimeout(() => {
        cb()
        setClickTimeout(null)
      }, 300)

      setClickTimeout(timeout)
    }
  }

  const handleEditTitleClick = () => {
    focusOnElementWithoutScroll("update-task-title-input")
    setTitleEdit(true)
  }

  const handleEditDescriptionClick = () => {
    focusOnElementWithoutScroll("task-description-edit")
    setDescriptionEdit(true)
  }

  return (
    <Card
      style={{ touchAction: "none" }}
      isBlurred
      className="w-full bg-gray-4 px-4 py-3 text-base"
    >
      <CardHeader className="w-full p-0 text-gray-12">
        <div className="flex w-full items-center justify-between gap-2">
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
              <button
                onTouchEnd={() => onSingleClick(() => handleEditTitleClick())}
                onDoubleClick={handleEditTitleClick}
              >
                {title}
              </button>
            )}
          </div>
          <EditTaskDropdown
            onTitleEdit={handleEditTitleClick}
            onDescriptionEdit={handleEditDescriptionClick}
            taskId={task.id}
          />
        </div>
      </CardHeader>
      {(!!description || isDescriptionEdit) && (
        <CardBody className="pt-0">
          {isDescriptionEdit ? (
            <ChangeTaskDescriptionInput
              toggle={setDescriptionEdit}
              description={description}
              setDescription={setDescription}
              task={task}
            />
          ) : (
            <span
              onTouchEnd={() =>
                onSingleClick(() => handleEditDescriptionClick())
              }
              onDoubleClick={handleEditDescriptionClick}
              className="cursor-pointer text-sm text-gray-11"
            >
              {description}
            </span>
          )}
        </CardBody>
      )}
    </Card>
  )
}

export default TaskCard
