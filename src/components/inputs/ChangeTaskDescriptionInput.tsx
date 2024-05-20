"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Textarea } from "../ui/textarea";
import taskService from "@/services/TaskService";
import getHeightOfChangeDescriptionInput from "@/lib/utils/getHeightOfChangeDescriptionInput";
import { ITask } from "@/types/task.types";
import useClickOutside from "@/lib/hooks/useClickOutside";

const ChangeTaskDescriptionInput = ({
  toggle,
  task,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITask;
}) => {
  const queryClient = useQueryClient();
  const [descriptionValue, setDescriptionValue] = useState(
    task.description || "",
  );
  const textAreaRef = useRef<null | any>(null);
  const mainRef = useRef<null | any>(null);

  useClickOutside(mainRef, () => {
    console.log("hello");
    toggle(false);
  });

  const { mutate } = useMutation({
    mutationKey: ["task", task.id],
    mutationFn: async () => {
      const { data } = await taskService.updateTaskById(task.id, {
        description: descriptionValue,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["desks"] });
    },
  });

  const changeDescription = async () => {
    mutate();
    toggle(false);
  };

  useEffect(() => {
    const length = textAreaRef.current.value.length;
    textAreaRef.current.setSelectionRange(0, length);
  }, []);

  return (
    <div className="w-full h-min relative" ref={mainRef}>
      <Textarea
        style={{ height: getHeightOfChangeDescriptionInput(descriptionValue) }}
        className=" z-[30] !ring-transparent border-none rounded-none w-full min-h-[30px]  scroll-transparent custom-scroll p-0 pr-9"
        onChange={(e) => setDescriptionValue(e.target.value)}
        rows={0}
        ref={textAreaRef}
        value={descriptionValue}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            changeDescription();
          } else if (e.key === "Escape") {
            toggle(false);
          }
        }}
      />
      <Button
        className="z-30 h-4 w-4 p-1 rounded-[3px] absolute top-[2px] right-3"
        onClick={changeDescription}
        size="icon"
      >
        <Check size={14} />
      </Button>
    </div>
  );
};

export default ChangeTaskDescriptionInput;
