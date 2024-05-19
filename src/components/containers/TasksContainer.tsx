"use client";

export const dynamicParams = false;
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import TaskCard from "../cards/TaskCard";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import { useReorderTasksContext } from "@/context/ReorderTasksContextProvider";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Droppable from "../dnd/Droppable";
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
    <SortableContext
      id={desk.id}
      items={tasksIds}
      strategy={verticalListSortingStrategy}
    >
      <Droppable id={desk.id}>
        <div className="flex flex-col gap-2">
          {tasks.map((task, key) => (
            <TaskCard
              hidden={activeTask ? task.id === activeTask.id : false}
              key={key}
              task={task}
            />
          ))}
        </div>
      </Droppable>
    </SortableContext>
  );
};

export default TasksContainer;
