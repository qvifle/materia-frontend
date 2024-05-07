import api from "@/lib/utils/api";
import { IDeskFormFields } from "@/types/desk.types";

class DeskService {
  private baseUrl = "/desks";

  async getDesks(projectId: string) {
    const res = await api.get(`${this.baseUrl}/${projectId}`);
    return res;
  }

  async createDesk(projectId: string, data: IDeskFormFields) {
    const res = await api.post(`${this.baseUrl}/${projectId}`, data);
    return res;
  }

  async updateDeskById(deskId: string, data: Partial<IDeskFormFields>) {
    const res = await api.put(`${this.baseUrl}/${deskId}`, data);
    return res;
  }

  async deleteDeskById(deskId: string) {
    const res = await api.delete(`${this.baseUrl}/${deskId}`);
    return res;
  }
}

const deskService = new DeskService();
export default deskService;
