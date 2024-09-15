"use client"
import React from "react"
import { usePathname } from "next/navigation"
import ProjectInvitesContainer from "../containers/ProjectInvitesContainer"
import InviteForm from "../forms/InviteForm"

const InviteTab = () => {
  const pathName = usePathname()
  const projectId = pathName.split("/")[3]

  return (
    <section className="flex flex-col pt-4">
      <InviteForm className="mb-4" projectId={projectId} />
      <h2 className="text-md mb-2 font-medium">Pending invites</h2>
      <ProjectInvitesContainer projectId={projectId} />
    </section>
  )
}

export default InviteTab
