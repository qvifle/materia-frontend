"use client"
import React, { HTMLAttributes, useState } from "react"
import TaskCard from "../cards/TaskCard"
import { IDesk } from "@/types/desk.types"
import { ITask } from "@/types/task.types"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import SortableItem from "../dnd/SortableItem"
import { motion } from "framer-motion"
interface ITasksContainer extends HTMLAttributes<HTMLDivElement> {
  tasks: ITask[]
  desk: IDesk
}

const TasksContainer: React.FC<ITasksContainer> = ({ tasks, desk }) => {
  if (!tasks || tasks.length === 0) {
    return null
  }

  return (
    <SortableContext
      id={desk.id}
      items={tasks}
      strategy={verticalListSortingStrategy}
    >
      <div className="relative flex flex-col gap-1">
        {tasks.map((task, index) => (
          <SortableItem key={task.id} id={task.id}>
            <TaskCard task={task} />
          </SortableItem>
        ))}
      </div>
    </SortableContext>
  )
}

export default TasksContainer
