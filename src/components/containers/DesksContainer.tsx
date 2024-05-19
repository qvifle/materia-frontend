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
import data from "./data";
import findTaskByIdInDesks from "@/lib/utils/findTaskByIdInDesks";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

interface IDesksContainer {
  projectId: string;
}

interface IChangeTaskOrderId {
  taskId: string;
  overTaskId: string;
}

const DesksContainer: React.FC<IDesksContainer> = ({ projectId }) => {
  // const queryClient = useQueryClient();
  const { activeTask, setActiveTask, reorderDesks, setReorderDesks } =
    useReorderTasksContext();

  // const { mutate: reorderQuery } = useMutation({
  //   mutationKey: ["changeOrderId"],
  //   mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
  //     taskService.changeOrderById(taskId, { overTaskId: overTaskId }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["desks"] });
  //   },
  // });

  // const { mutate: changeDesk } = useMutation({
  //   mutationKey: ["changeDesk"],
  //   mutationFn: async ({ taskId, overTaskId }: IChangeTaskOrderId) =>
  //     taskService.changeDeskById(taskId, { overTaskId: overTaskId }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["desks"] });
  //   },
  // });

  const handleDragEnd = (e: DropResult) => {
    console.log(e);
  };

  useEffect(() => {
    if (data) {
      setReorderDesks(data);
    }
  }, [data]);

  // if (isPending) {
  //   return "Loading";
  // }

  // if (desks?.length === 0) {
  //   return null;
  // }

  // if (isError) {
  //   return "Error";
  // }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {reorderDesks.map((desk, key) => (
          <DeskCard key={key} desk={desk} tasks={desk.tasks} />
        ))}
      </DragDropContext>
    </>
  );
};

export default DesksContainer;
