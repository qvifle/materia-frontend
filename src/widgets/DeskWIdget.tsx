"use client"
import React, { HTMLAttributes } from "react"
import { IDesk } from "@/types/desk.types"
import DeskCard from "@/components/cards/DeskCard"
import TasksContainer from "@/components/containers/TasksContainer"
import AddTaskButton from "@/components/buttons/AddTaskButton"

interface DeskWidgetProps extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk
}

const DeskWidget: React.FC<DeskWidgetProps> = ({ desk, ...rest }) => {
  return (
    <div
      className="flex h-max min-w-[calc(100vw-18px-16px)] flex-col min-[500px]:min-w-[350px]"
      {...rest}
    >
      <DeskCard desk={desk} />

      <div className="flex w-full flex-col gap-1">
        <TasksContainer desk={desk} tasks={desk.tasks} />
        <AddTaskButton desk={desk} />
      </div>
    </div>
  )
}

export default DeskWidget
