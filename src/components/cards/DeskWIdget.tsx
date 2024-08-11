import React, { HTMLAttributes } from "react"
import AddTaskButton from "../buttons/AddTaskButton"
import Tasks from "../containers/TasksContainer"
import { IDesk } from "@/types/desk.types"
import { ITask } from "@/types/task.types"
import { Droppable } from "@hello-pangea/dnd"
import DeskCard from "./DeskCard"

interface DeskWidgetProps extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk
  tasks: ITask[]
}

const DeskWidget: React.FC<DeskWidgetProps> = ({ desk, tasks, ...rest }) => {
  return (
    <div className="flex min-w-[calc(100vw-18px-16px)] flex-col" {...rest}>
      <DeskCard desk={desk} />

      <Droppable droppableId={desk.id}>
        {(provider) => (
          <div
            ref={provider.innerRef}
            {...provider.droppableProps}
            className="flex w-full flex-col gap-1"
          >
            <Tasks desk={desk} tasks={tasks} />
            {provider.placeholder}
            <AddTaskButton desk={desk} />
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default DeskWidget
