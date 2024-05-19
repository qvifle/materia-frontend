"use client";

export const dynamicParams = false;
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import TaskCard from "../cards/TaskCard";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import { useReorderTasksContext } from "@/context/ReorderTasksContextProvider";
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
  const { activeTask } = useReorderTasksContext();
  const tasksIds = useMemo(() => tasks.map((item) => item.id), [tasks]);

  if (!tasks || tasks.length === 0) {
    return null;
  }

  return (
    <Droppable droppableId={desk.id}>
      {(provider) => (
        <div
          ref={provider.innerRef}
          {...provider.droppableProps}
          className="flex flex-col"
        >
          {tasks.map((task, index) => (
            <Draggable index={index} key={task.orderId} draggableId={task.id}>
              {(dragProvider) => (
                <div
                  ref={dragProvider.innerRef}
                  {...dragProvider.draggableProps}
                  {...dragProvider.dragHandleProps}
                >
                  <TaskCard
                    task={task}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TasksContainer;
