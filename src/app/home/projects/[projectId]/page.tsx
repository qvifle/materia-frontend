import ProjectModule from "@/modules/ProjectModule"
import { divider } from "@nextui-org/react"
import React from "react"
const Page = ({ params }: { params: { projectId: string } }) => {
  return <ProjectModule projectId={params.projectId} />
}

export default Page
