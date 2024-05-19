"use client";
import React, { HTMLAttributes, useState } from "react";
import { Plus, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import taskService from "@/services/TaskService";
import { IDesk } from "@/types/desk.types";

interface IAddTaskButton extends HTMLAttributes<HTMLButtonElement> {
  desk: IDesk;
}

const AddTaskButton: React.FC<IAddTaskButton> = ({ desk, ...rest }) => {
  const [isInit, setInit] = useState(true);
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["tasks", desk.id],
    mutationFn: async () => {
      const { data } = await taskService.createTask(desk.id, { title: value });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      setValue("");
      setInit(true);
    },
  });

  const createNewTask = () => {
    if (value === "") {
      setInit(true);
      return;
    }
    mutate();
  };

  if (isInit) {
    return (
      <button
        onClick={() => setInit(false)}
        className="flex gap-1 items-center bg-card shadow-sm px-2 py-1 rounded-sm hover:bg-secondary duration-200"
        {...rest}
      >
        <Plus size={14} />
        <span className="text-sm text-card-foreground">Add task</span>
      </button>
    );
  }

  return (
    <>
      <div className="relative">
        <Input
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createNewTask();
            }
          }}
          className="z-30 mx-1 max-w-[348px] py-0 h-[28px]"
          autoFocus
        />
        <Button
          className="z-30 h-5 w-5 p-1 absolute top-1 right-[3px]"
          onClick={createNewTask}
          size="icon"
        >
          <Check size={16} />
        </Button>
      </div>
      <div
        onClick={() => setInit(true)}
        className="absolute top-0 left-0 h-screen w-screen"
      ></div>
    </>
  );
};

export default AddTaskButton;
