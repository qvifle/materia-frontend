import api from "@/lib/utils/api";
import { IInvite, IMyInvite, IProjectInvite } from "@/types/invite.types";

class InviteService {
  private baseUrl = "/invites";

  async getMyInvites() {
    return api.get<IMyInvite[]>(`${this.baseUrl}`);
  }

  async getProjectInvites(projectId: string) {
    return api.get<IProjectInvite[]>(`${this.baseUrl}/${projectId}`);
  }

  async sendInvite(projectId: string, data: { recipientEmail: string }) {
    return api.post(`${this.baseUrl}/${projectId}`, data);
  }

  async acceptInvite(inviteId: string) {
    return api.patch(`${this.baseUrl}/${inviteId}/accept`);
  }

  async rejectInvite(inviteId: string) {
    return api.delete(`${this.baseUrl}/${inviteId}/reject`);
  }

  async cancelInvite(inviteId: string) {
    return api.delete(`${this.baseUrl}/${inviteId}`);
  }
}

const inviteService = new InviteService();
export default inviteService;
