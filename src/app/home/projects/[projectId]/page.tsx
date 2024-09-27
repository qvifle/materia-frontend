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
    const res = await serverApi.get<IProject>(`/projects/${projectId}`)

    if (!res) {
      return
    }

    if (res.status != 200) {
      redirect("/home/projects")
    }

    return {
      title: res.data.title,
    }
  } catch (err) {
    console.log(err)
  }
}

const Page = async ({ params }: { params: { projectId: string } }) => {
  return <ProjectModule projectId={params.projectId} />
}

export default Page
