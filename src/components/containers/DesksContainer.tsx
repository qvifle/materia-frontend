"use client";

import React, { useEffect, useState } from "react";
import deskService from "@/services/DeskService";
import { IDesk } from "@/types/desk.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeskCard from "../cards/DeskCard";
import { useReorderTasksContext } from "@/context/ReorderTasksContextProvider";
import getIndexOfElementById from "@/lib/utils/getIndexOfElementById";
import taskService from "@/services/TaskService";
import TaskCard from "../cards/TaskCard";
import insert from "@/lib/utils/insert";
import { ITask } from "@/types/task.types";
import data from "./data";
import {
  DndContext,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  defaultDropAnimation,
  DragStartEvent,
  DragEndEvent,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import findTaskByIdInDesks from "@/lib/utils/findTaskByIdInDesks";
import { arrayMove } from "@dnd-kit/sortable";

interface IDesksContainer {
  projectId: string;
}

interface IChangeTaskOrderId {
  taskId: string;
  overTaskId: string;
}

const DesksContainer: React.FC<IDesksContainer> = ({ projectId }) => {
  const queryClient = useQueryClient();
  const { activeTask, setActiveTask, reorderDesks, setReorderDesks } =
    useReorderTasksContext();

  // const {
  //   data: desks,
  //   isPending,
  //   isError,
  // } = useQuery<IDesk[]>({
  //   queryKey: ["desks"],
  //   queryFn: async () => {
  //     const { data } = await deskService.getDesks(projectId);
  //     console.log("get data");
  //     return data;
  //   },
  // });

  const { mutate: reorderQuery } = useMutation({
    mutationKey: ["changeOrderId"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeOrderById(taskId, { overTaskId: overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
  });

  const { mutate: changeDesk } = useMutation({
    mutationKey: ["changeDesk"],
    mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
      taskService.changeDeskById(taskId, { overTaskId: overTaskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
  });

  const handleDragStart = ({ active }: DragStartEvent) => {
    const taskId = active.id.toString();
    const activeTask = findTaskByIdInDesks(reorderDesks, taskId);
    setActiveTask(activeTask || null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) {
      return;
    }

    const activeTaskId = active.id.toString();
    const overTaskId = over.id.toString();

    if (activeTaskId === overTaskId) {
      return;
    }

    const activeTask = findTaskByIdInDesks(reorderDesks, activeTaskId);
    const overTask = findTaskByIdInDesks(reorderDesks, overTaskId);

    const activeDesk = findDeskOfTask(reorderDesks, activeTaskId);
    const overDesk = findDeskOfTask(reorderDesks, overTaskId);

    if (!activeTask || !overTask || !activeDesk || !overDesk) {
      return;
    }

    const activeTaskIndex = getIndexOfElementById(
      activeTaskId,
      activeDesk.tasks,
    );

    const overTaskIndex = getIndexOfElementById(overTaskId, overDesk.tasks);

    if (activeDesk.id === overDesk.id) {
      const deskIndex = getIndexOfElementById(activeDesk.id, reorderDesks);
      setReorderDesks((prev) => {
        const newState = [...prev];
        newState[deskIndex] = {
          ...newState[deskIndex],
          tasks: arrayMove(
            newState[deskIndex].tasks,
            activeTaskIndex,
            overTaskIndex,
          ),
        };

        return newState;
      });

      return;
    }

    console.log("not the same");
  };

  const findDeskOfTask = (desks: IDesk[], taskId: string) => {
    return desks.find((desk) => desk.tasks.some((task) => task.id === taskId));
  };

  // const findDeskOfTask = (taskId: string) => {
  //   const desk = reorderDesks.find((desk) =>
  //     desk.tasks.some((task) => task.id === taskId),
  //   );
  //   if (!desk) {
  //     return;
  //   }

  //   return desk;
  // };

  useEffect(() => {
    if (data) {
      setReorderDesks(data);
    }
  }, [data]);

  useEffect(() => console.log(reorderDesks), [reorderDesks]);

  // if (isPending) {
  //   return "Loading";
  // }

  // if (desks?.length === 0) {
  //   return null;
  // }

  // if (isError) {
  //   return "Error";
  // }
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0",
        },
      },
    }),
    duration: 1000,
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={}
        // measuring={{
        //   droppable: {
        //     strategy: MeasuringStrategy.Always,
        //   },
        // }}
      >
        {reorderDesks.map((desk, key) => (
          <DeskCard key={key} desk={desk} tasks={desk.tasks} />
        ))}
        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default DesksContainer;
