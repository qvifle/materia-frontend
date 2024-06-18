import ProjectModule from "@/modules/ProjectModule";
import React from "react";
const Page = ({ params }: { params: { projectId: string } }) => {
  return <ProjectModule projectId={params.projectId} />;
};

export default Page;
