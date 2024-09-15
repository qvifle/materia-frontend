import api from "@/lib/utils/api"
import { IInvite, IMyInvite, IProjectInvite } from "@/types/invite.types"

export interface InviteUserFormFields {
  recipientEmail: string
}

class InviteService {
  private baseUrl = "/invites"

  async getMyInvites() {
    return api.get<IMyInvite[]>(`${this.baseUrl}`)
  }

  async getProjectInvites(projectId: string) {
    return api.get<IProjectInvite[]>(`${this.baseUrl}/${projectId}`)
  }

  async sendInvite(projectId: string, data: InviteUserFormFields) {
    return api.post(`${this.baseUrl}/${projectId}`, data)
  }

  async acceptInvite(inviteId: string) {
    return api.patch(`${this.baseUrl}/${inviteId}/accept`)
  }

  async rejectInvite(inviteId: string) {
    return api.delete(`${this.baseUrl}/${inviteId}/reject`)
  }

  async cancelInvite(inviteId: string) {
    return api.delete(`${this.baseUrl}/${inviteId}`)
  }

  async leaveProject(projectId: string) {
    return api.delete(`${this.baseUrl}/leave-project/${projectId}`)
  }
}

const inviteService = new InviteService()
export default inviteService
