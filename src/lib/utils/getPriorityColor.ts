import { TaskPriority } from "@/types/task.types"

const getPriorityColor = (status: TaskPriority) => {
  switch (status) {
    case TaskPriority.LOW:
      return "succes"
    case TaskPriority.MEDIUM:
      return "warning"
    case TaskPriority.HIGH:
      return "error"
    case TaskPriority.CRITICAL:
      return "critical"
  }
}

export default getPriorityColor
