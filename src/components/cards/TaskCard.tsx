"use client"
import React, { HTMLAttributes, useState } from "react"
import TaskStatusIndicator from "../indicators/TaskStatusIndicator"
import ChangeTaskDescriptionInput from "../inputs/ChangeTaskDescriptionInput"
import { ITask } from "@/types/task.types"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
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
    setTitleEdit(true)
    focusOnElementWithoutScroll("update-task-title-input")
  }

  const handleEditDescriptionClick = () => {
    setDescriptionEdit(true)
    focusOnElementWithoutScroll("task-description-edit")
  }

  return (
    <Card
      style={{ touchAction: "none" }}
      isBlurred
      className="group w-full bg-gray-4 px-4 py-3 text-base md:max-w-[350px]"
    >
      <CardHeader className="w-full p-0 text-gray-12">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="grid w-full grid-cols-[16px,1fr] items-center gap-2">
            <TaskStatusIndicator task={task} />
            {isTitleEdit ? (
              <UpdateTaskTitleInput
                task={task}
                setTitle={setTitle}
                title={title}
                setTitleEdit={setTitleEdit}
              />
            ) : (
              <button
                className="max-w-full text-balance text-start ileading-[18px]"
                onTouchEnd={() => onSingleClick(() => handleEditTitleClick())}
                onDoubleClick={handleEditTitleClick}
              >
                {title}
              </button>
            )}
          </div>
          <EditTaskDropdown
            className="duration-100 md:opacity-0 md:group-hover:opacity-100"
            onTitleEdit={handleEditTitleClick}
            onDescriptionEdit={handleEditDescriptionClick}
            taskId={task.id}
          />
        </div>
      </CardHeader>
      {(!!description || isDescriptionEdit) && (
        <CardBody className="px-4 pt-1">
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
