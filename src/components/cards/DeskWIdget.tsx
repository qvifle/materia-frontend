"use client"
import React, { HTMLAttributes } from "react"
import AddTaskButton from "../buttons/AddTaskButton"
import Tasks from "../containers/TasksContainer"
import { IDesk } from "@/types/desk.types"
import { ITask } from "@/types/task.types"
import DeskCard from "./DeskCard"
import { useDroppable } from "@dnd-kit/core"

interface DeskWidgetProps extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk
}

const DeskWidget: React.FC<DeskWidgetProps> = ({ desk, ...rest }) => {
  return (
    <div
      className="flex min-w-[calc(100vw-18px-16px)] flex-col min-[500px]:min-w-[350px]"
      {...rest}
    >
      <DeskCard desk={desk} />

      <div className="flex w-full flex-col gap-1">
        <Tasks desk={desk} tasks={desk.tasks} />
        <AddTaskButton desk={desk} />
      </div>
    </div>
  )
}

export default DeskWidget
