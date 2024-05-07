"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import TaskCard from "../cards/TaskCard";
import taskService from "@/services/TaskService";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/app/SortableItem";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0",
      },
    },
  }),
};

interface ITasksContainer extends HTMLAttributes<HTMLDivElement> {
  desk: IDesk;
  setTasksCount: React.Dispatch<React.SetStateAction<number>>;
}

interface IChangeTaskOrderId {
  taskId: string;
  overTaskId: string;
}

const TasksContainer: React.FC<ITasksContainer> = ({
  desk,
  setTasksCount,
  ...rest
}) => {
  const queryClient = useQueryClient();
  const [renderedTasks, setRenderedTasks] = useState<ITask[]>([]);
  const [activeTask, setActiveTask] = useState<null | ITask>(null);
  const tasksIds = useMemo(
    () => renderedTasks.map((item) => item.id),
    [renderedTasks],
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
      delay: 150,
      tolerance: 1,
    },
    onActivation: () => {
      console.log("Ok");
    },
  });
  const sensors = useSensors(mouseSensor);

  const {
    data: tasks,
    isPending,
    isError,
  } = useQuery<ITask[]>({
    queryKey: ["tasks", desk.id],
    queryFn: async () => {
      const { data } = await taskService.getTasks(desk.id);
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["changeOrderId"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeOrderById(taskId, { overTaskId: overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", desk.id] });
    },
  });

  const getIndexOfElementById = (id: string, array: any[]) => {
    return array.findIndex((el) => el.id === id);
  };

  const changeOrderState = (taskId: string, overId: string) => {
    const taskIndex = getIndexOfElementById(taskId, renderedTasks);
    const overIndex = getIndexOfElementById(overId, renderedTasks);

    const movedTasks = arrayMove(renderedTasks, taskIndex, overIndex);
    setRenderedTasks(movedTasks);
  };

  const changeTaskId = async (e: DragEndEvent) => {
    if (!e.over) {
      return;
    }
    const taskId = e.active.id.toString();
    const overTaskId = e.over.id.toString();

    if (taskId === overTaskId) {
      return;
    }
    changeOrderState(taskId, overTaskId);
    // setTimeout(() => mutate({ taskId: taskId, overTaskId: overTaskId }), 2000);
    mutate({ taskId: taskId, overTaskId: overTaskId });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const newActiveTask =
      renderedTasks.find((task) => task.id === event.active.id) || null;
    setActiveTask(newActiveTask);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    changeTaskId(e);
    setActiveTask(null);
  };

  useEffect(() => {
    if (tasks) {
      setRenderedTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (!!tasks) {
      setTasksCount(tasks.length);
    }
  }, [tasks, setTasksCount]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  if (tasks.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col gap-2" {...rest}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {renderedTasks.map((task, key) => {
            return (
              <SortableItem key={task.id} id={tasksIds[key]}>
                <TaskCard
                  hidden={activeTask ? task.id == activeTask.id : false}
                  key={key}
                  task={task}
                />
              </SortableItem>
            );
          })}
        </SortableContext>
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTask ? <TaskCard draggable task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TasksContainer;
