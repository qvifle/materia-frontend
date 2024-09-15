"use client"
import inviteService from "@/services/InviteService"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import InviteCard from "../cards/InviteCard"
import Skeleton from "../skeleton/Skeleton"

const ProjectInvitesContainer = ({ projectId }: { projectId: string }) => {
  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project-invites", projectId],
    queryFn: async () => {
      const { data } = await inviteService.getProjectInvites(projectId)
      return data
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton width="100%">
          <div className="h-[64px] rounded-[14px]"></div>
        </Skeleton>
        <Skeleton width="100%">
          <div className="h-[64px] rounded-[14px]"></div>
        </Skeleton>
        <Skeleton width="100%">
          <div className="h-[64px] rounded-[14px]"></div>
        </Skeleton>
      </div>
    )
  }

  if (isError || !invites) {
    return "error"
  }

  if (invites.length === 0) {
    return "no invites"
  }

  return (
    <ul className="flex max-h-[300px] flex-col gap-1">
      {invites.map((invite, key) => (
        <InviteCard invite={invite} key={key} />
      ))}
    </ul>
  )
}

export default ProjectInvitesContainer
