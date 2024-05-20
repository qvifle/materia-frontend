"use client";
import React from "react";
import { Button } from "../ui/button";
import { Check, Pause, StepForward, Ban } from "lucide-react/";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/TaskService";
import { ITaskStatusFormFields, TaskStatus } from "@/types/task.types";

const ChangeStatusButtonsGroup = ({ taskId }: { taskId: string }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [`task/${taskId}`],
    mutationFn: async (fields: ITaskStatusFormFields) => {
      const { data } = await taskService.changeStatusById(taskId, fields);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
  });

  const changeTaskStatus = (status: TaskStatus) => {
    mutate({ status });
  };

  return (
    <>
      <Button
        onClick={() => changeTaskStatus(TaskStatus.COMPLETED)}
        size="icon"
        variant="ghost"
      >
        <Check size={12} className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => changeTaskStatus(TaskStatus.PENDING)}
        size="icon"
        variant="ghost"
      >
        <StepForward size={12} className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => changeTaskStatus(TaskStatus.PAUSED)}
        size="icon"
        variant="ghost"
      >
        <Pause size={12} className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => changeTaskStatus(TaskStatus.CANCELED)}
        size="icon"
        variant="ghost"
      >
        <Ban size={12} className="w-4 h-4" />
      </Button>
    </>
  );
};

export default ChangeStatusButtonsGroup;
