"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import taskService from "@/services/TaskService";
import { ITask } from "@/types/task.types";

const ChangeTaskTitleInput = ({
  toggle,
  task,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}) => {
  const queryClient = useQueryClient();
  const [titleValue, setTitleValue] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: async () => {
      const { data } = await taskService.updateTaskById(task.id, {
        title: titleValue,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const changeTitle = async () => {
    mutate();
    toggle(false);
  };

  return (
    <div className="relative flex items-center h-[25px] ">
      <Input
        onChange={(e) => setTitleValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            changeTitle();
          } else if (e.key === "Escape") {
            toggle(false);
          }
        }}
        defaultValue={task.title}
        className="min-h-5 h-[25px] w-[250px] !ring-transparent !ring-0 border-0 px-0 tracking-tight rounded-none pr-9 z-[30]"
        autoFocus
      />
      <Button
        className="z-30 h-4 w-4 p-1 absolute rounded-[3px] right-0"
        onClick={changeTitle}
        size="icon"
      >
        <Check size={14} />
      </Button>
      <div
        onClick={() => toggle(false)}
        className="fixed top-0 left-0 h-screen w-screen"
      ></div>
    </div>
  );
};

export default ChangeTaskTitleInput;
