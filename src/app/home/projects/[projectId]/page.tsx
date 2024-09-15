import { serverApi } from "@/lib/utils/api"
import ProjectModule from "@/modules/ProjectModule"
import { IProject } from "@/types/project.types"
import { redirect } from "next/navigation"
import React from "react"

export async function generateMetadata({
  params: { projectId },
}: {
  params: { projectId: string }
}) {
  try {
    const { status, data } = await serverApi.get<IProject>(
      `/projects/${projectId}`,
    )

    if (status != 200) {
      redirect("/home/projects")
    }

    return {
      title: data.title,
    }
  } catch (err) {
    console.log(err)
  }
}

const Page = async ({ params }: { params: { projectId: string } }) => {
  return <ProjectModule projectId={params.projectId} />
}

export default Page
