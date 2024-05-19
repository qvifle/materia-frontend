"use client";

export const dynamicParams = false;
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import TaskCard from "../cards/TaskCard";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import { useReorderTasksContext } from "@/context/ReorderTasksContextProvider";
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
    <div className="flex flex-col gap-2">
      {tasks.map((task, key) => (
        <TaskCard
          hidden={activeTask ? task.id === activeTask.id : false}
          key={key}
          task={task}
        />
      ))}
    </div>
  );
};

export default TasksContainer;
