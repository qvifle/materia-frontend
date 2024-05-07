"use client";

import { cn } from "@/lib/utils";
import getStatusColor from "@/lib/utils/getStatusColor";
import { TaskStatus } from "@/types/task.types";
import React, { HTMLAttributes, useEffect, useState } from "react";

interface ITaskStatusIndicator extends HTMLAttributes<HTMLDivElement> {
  status: TaskStatus;
}

const TaskStatusIndicator: React.FC<ITaskStatusIndicator> = ({
  status,
  ...rest
}) => {
  return (
    <div
      style={{ backgroundColor: `var(--${getStatusColor(status)})` }}
      className={cn("rounded-full w-2 h-2")}
      {...rest}></div>
  );
};

export default TaskStatusIndicator;
