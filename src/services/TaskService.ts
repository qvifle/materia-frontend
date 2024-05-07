import api from "@/lib/utils/api";
import {
  IOrderIdFormFields,
  ITaskFormFields,
  ITaskStatusFormFields,
} from "@/types/task.types";

class TaskService {
  private baseUrl = "/tasks";

  async getTasks(deskId: string) {
    const res = await api.get(`${this.baseUrl}/${deskId}`);
    return res;
  }

  async createTask(deskId: string, data: ITaskFormFields) {
    const res = await api.post(`${this.baseUrl}/${deskId}`, data);
    return res;
  }

  async updateTaskById(taskId: string, data: Partial<ITaskFormFields>) {
    const res = await api.put(`${this.baseUrl}/${taskId}`, data);
    return res;
  }

  async changeStatusById(taskId: string, data: ITaskStatusFormFields) {
    const res = await api.patch(`${this.baseUrl}/status/${taskId}`, data);
    return res;
  }
  async changeOrderById(taskId: string, data: IOrderIdFormFields) {
    const res = await api.patch(`${this.baseUrl}/order/${taskId}`, data);
    return res;
  }

  async deleteTaskById(taskId: string) {
    const res = await api.delete(`${this.baseUrl}/${taskId}`);
    return res.data;
  }
}

const taskService = new TaskService();
export default taskService;
