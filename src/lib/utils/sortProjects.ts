import { IProject } from "@/types/project.types";

const sortProjects = (projects: IProject[] | undefined, userEmail: string) => {
  if (!projects) {
    return;
  }

  const myProjects: IProject[] = [];
  const otherProjects: IProject[] = [];

  projects.map((project) => {
    if (project?.creator?.email === userEmail) {
      myProjects.push(project);
      return;
    }
    otherProjects.push(project);
  });

  return { myProjects, otherProjects };
};

export default sortProjects;
