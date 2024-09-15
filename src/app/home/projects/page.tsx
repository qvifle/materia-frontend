import ProjectsModule from "@/modules/ProjectsModule"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
}

const Page = () => {
  return <ProjectsModule />
}

export default Page
