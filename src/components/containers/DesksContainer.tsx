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
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

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

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        {reorderDesks.map((desk, key) => (
          <DeskCard key={key} desk={desk} tasks={desk.tasks} />
        ))}
      </DndContext>
    </>
  );
};

export default DesksContainer;
