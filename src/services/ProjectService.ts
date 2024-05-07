import api from "@/lib/utils/api";
import { IProjectFormFields } from "@/types/project.types";

class ProjectService {
  private baseUrl = "/projects";

  async getProjects() {
    const res = await api.get(this.baseUrl);
    return res;
  }

  async getProjectById(projectId: string) {
    const res = await api.get(`${this.baseUrl}/${projectId}`);
    return res;
  }

  async createProject(data: IProjectFormFields) {
    const res = await api.post(this.baseUrl, data);
    return res;
  }

  async updateProjectById(
    projectId: string,
    data: Partial<IProjectFormFields>,
  ) {
    const res = await api.put(`${this.baseUrl}/${projectId}`, data);
    return res;
  }

  async deleteProjectById(projectId: string) {
    const res = await api.delete(`${this.baseUrl}/${projectId}`);
    return res;
  }

  async addMembers(projectId: string, newMembers: string[]) {
    const res = await api.put(
      `${this.baseUrl}/${projectId}/addMembers`,
      newMembers,
    );
    return res;
  }

  async removeMembers(projectId: string, newMembers: string[]) {
    const res = await api.put(
      `${this.baseUrl}/${projectId}/removeMembers`,
      newMembers,
    );
    return res;
  }
}

const projectService = new ProjectService();
export default projectService;