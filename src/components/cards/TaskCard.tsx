"use client";
import React, { HTMLAttributes, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import capitalize from "@/lib/utils/capitalize";
import TaskStatusIndicator from "../indicators/TaskStatusIndicator";
import { Button } from "../ui/button";
import { CheckCircle, Pencil, Check } from "lucide-react/";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ChangeStatusButtonsGroup from "../buttons/ChangeStatusButtonsGroup";
import EditTaskButtonGroup from "../buttons/EditTaskButtonGroup";
import { Input } from "../ui/input";
import ChangeTaskTitleInput from "../inputs/ChangeTaskTitleInput";
import ChangeTaskDescriptionInput from "../inputs/ChangeTaskDescriptionInput";
import { ITask } from "@/types/task.types";
import { cn } from "@/lib/utils";

interface ITaskCard extends HTMLAttributes<HTMLDivElement> {
  task: ITask;
  hidden?: boolean;
}

const TaskCard: React.FC<ITaskCard> = ({ task, hidden = false, ...rest }) => {
  const [isTitleEdit, setTitleEdit] = useState(false);
  const [isDescriptionEdit, setDescriptionEdit] = useState(false);
  const log = () => {
    console.log("hello");
  };
  return (
    <Card
      className={cn(
        "max-w-[350px] py-1 px-2 group border-none relative z-20",
        hidden ? "opacity-0" : "",
      )}
      {...rest}
    >
      <CardHeader className="py-1 px-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TaskStatusIndicator status={task.status} />
                </TooltipTrigger>
                <TooltipContent>{capitalize(task.status)}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isTitleEdit ? (
              <ChangeTaskTitleInput toggle={setTitleEdit} task={task} />
            ) : (
              <span onDoubleClick={() => setTitleEdit(true)}>{task.title}</span>
            )}
          </div>
          <div className="group-hover:visible group-hover:opacity-100 invisible opacity-0 duration-200 relative z-10">
            <Popover>
              <PopoverTrigger asChild className="z-50">
                <Button size="icon" variant="ghost" className="w-6 h-6">
                  <CheckCircle size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-min p-1">
                <div className="flex items-center gap-2">
                  <ChangeStatusButtonsGroup taskId={task.id} />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost" className="w-6 h-6">
                  <Pencil size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-min p-1">
                <EditTaskButtonGroup
                  task={task}
                  setTitleEdit={setTitleEdit}
                  setDescriptionEdit={setDescriptionEdit}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
      </CardHeader>
      <CardDescription
        className="pl-6"
        onDoubleClick={() => setDescriptionEdit(true)}
      >
        {isDescriptionEdit ? (
          <ChangeTaskDescriptionInput
            key="input-description"
            toggle={setDescriptionEdit}
            task={task}
          />
        ) : (
          <span className="block text-ellipsis overflow-hidden">
            {task.description}
          </span>
        )}
      </CardDescription>
    </Card>
  );
};

export default TaskCard;
