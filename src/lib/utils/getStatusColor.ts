import { TaskStatus } from "@/types/task.types";

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.PENDING:
      return "yellow";
    case TaskStatus.CANCELED:
      return "red";
    case TaskStatus.COMPLETED:
      return "green";
    case TaskStatus.PAUSED:
      return "blue";
  }
};

export default getStatusColor;
