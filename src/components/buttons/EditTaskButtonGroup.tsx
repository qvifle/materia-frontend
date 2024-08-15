import React, { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/TaskService";
import { ITask } from "@/types/task.types";

interface IEditTaskButtonGroup extends HTMLAttributes<HTMLDivElement> {
  setDescriptionEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}

const EditTaskButtonGroup: React.FC<IEditTaskButtonGroup> = ({
  setDescriptionEdit,
  setTitleEdit,
  task,
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: async () => {
      const { data } = await taskService.deleteTaskById(task.id);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
  });
  
  return (
    <div className="flex flex-col gap-2">
      <Button size="sm" variant="ghost" onClick={() => setTitleEdit(true)}>
        Title
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setDescriptionEdit(true)}
      >
        Description
      </Button>
      <Button size="sm" variant="destructive" onClick={() => mutate()}>
        Delete
      </Button>
    </div>
  );
};

export default EditTaskButtonGroup;
