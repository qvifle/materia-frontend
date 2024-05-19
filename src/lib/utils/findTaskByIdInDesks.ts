import { IDesk } from "@/types/desk.types";

const findTaskByIdInDesks = (desks: IDesk[], taskId: string) => {
  const desk = desks.find((desk) =>
    desk.tasks.some((task) => task.id === taskId),
  );

  if (!desk) {
    return;
  }

  const task = desk.tasks.find((task) => task.id === taskId);

  return task;
};

export default findTaskByIdInDesks;
