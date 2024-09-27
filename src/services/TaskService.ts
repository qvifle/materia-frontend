import api from "@/lib/utils/api"
import {
  IAddToDeskFields,
  IOrderIdFormFields,
  ITaskFormFields,
  ITaskPriorityFormFields,
  ITaskStatusFormFields,
} from "@/types/task.types"

class TaskService {
  private baseUrl = "/tasks"

  async getTasks(deskId: string) {
    const res = await api.get(`${this.baseUrl}/${deskId}`)
    return res
  }

  async createTask(deskId: string, data: ITaskFormFields) {
    return api.post(`${this.baseUrl}/${deskId}`, data)
  }

  async updateTaskById(taskId: string, data: Partial<ITaskFormFields>) {
    const res = await api.put(`${this.baseUrl}/${taskId}`, data)
    return res
  }

  async changeStatusById(taskId: string, data: ITaskStatusFormFields) {
    const res = await api.patch(`${this.baseUrl}/status/${taskId}`, data)
    return res
  }

  async changePriorityById(taskId: string, data: ITaskPriorityFormFields) {
    const res = await api.patch(`${this.baseUrl}/priority/${taskId}`, data)
    return res
  }

  async changeOrderById(taskId: string, data: IOrderIdFormFields) {
    const res = await api.patch(`${this.baseUrl}/order/${taskId}`, data)
    return res
  }

  async changeDeskById(taskId: string, data: IOrderIdFormFields) {
    const res = await api.patch(`${this.baseUrl}/changeDesk/${taskId}`, data)
    return res
  }

  async addToDesk(taskId: string, data: IAddToDeskFields) {
    return api.patch(`${this.baseUrl}/addToDesk/${taskId}`, data)
  }

  async deleteTaskById(taskId: string) {
    const res = await api.delete(`${this.baseUrl}/${taskId}`)
    return res.data
  }
}

const taskService = new TaskService()
export default taskService
