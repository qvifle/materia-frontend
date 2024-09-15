import { TaskStatus } from "@/types/task.types"

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.PENDING:
      return "warning"
    case TaskStatus.CANCELED:
      return "error"
    case TaskStatus.COMPLETED:
      return "succes"
    case TaskStatus.PAUSED:
      return "info"
  }
}

export default getStatusColor
