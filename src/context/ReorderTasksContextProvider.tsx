"use client";
import data from "@/components/containers/data";
import { IDesk } from "@/types/desk.types";
import { ITask } from "@/types/task.types";
import { ReactNode, createContext, useContext, useState } from "react";

export interface IReorderTasksContext {
  activeTask: ITask | null;
  setActiveTask: React.Dispatch<React.SetStateAction<ITask | null>>;
  reorderDesks: IDesk[];
  setReorderDesks: React.Dispatch<React.SetStateAction<IDesk[]>>;
}

export const ReorderTasksContext = createContext<IReorderTasksContext | null>(
  null,
);

const ReorderTasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTask, setActiveTask] = useState<null | ITask>(null);
  const [reorderDesks, setReorderDesks] = useState<IDesk[]>(data);

  const contextValue: IReorderTasksContext = {
    activeTask,
    setActiveTask,
    reorderDesks,
    setReorderDesks,
  };

  return (
    <ReorderTasksContext.Provider value={contextValue}>
      {children}
    </ReorderTasksContext.Provider>
  );
};

export const useReorderTasksContext = () =>
  useContext(ReorderTasksContext) as IReorderTasksContext;

export default ReorderTasksContextProvider;
