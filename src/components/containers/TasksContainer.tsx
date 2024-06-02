"use client";
import React, { HTMLAttributes } from "react";
import TaskCard from "../cards/TaskCard";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
interface ITasksContainer extends HTMLAttributes<HTMLDivElement> {
  tasks: ITask[];
  desk: IDesk;
}

const TasksContainer: React.FC<ITasksContainer> = ({
  tasks,
  desk,
  ...rest
}) => {
  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task, index) => (
        <Draggable index={index} key={task.id} draggableId={task.id}>
          {(dragProvider) => (
            <div
              ref={dragProvider.innerRef}
              {...dragProvider.draggableProps}
              {...dragProvider.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TasksContainer;
