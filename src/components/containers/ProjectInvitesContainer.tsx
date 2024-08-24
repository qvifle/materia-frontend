"use client"
import inviteService from "@/services/InviteService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
import toast from "react-hot-toast"
import InviteCard from "../cards/InviteCard"

const ProjectInvitesContainer = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient()
  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project-invites", projectId],
    queryFn: async () => {
      const { data } = await inviteService.getProjectInvites(projectId)
      console.log(data)

      return data
    },
  })

  const { mutate: cancelInvite } = useMutation({
    mutationFn: async (args: any) => {
      const { data } = await inviteService.cancelInvite(args.inviteId)
      return data
    },
    onSuccess: () => {
      toast("Invite canceled")
      queryClient.invalidateQueries({
        queryKey: ["project-invites", projectId],
      })
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  if (isLoading) {
    return "loading"
  }

  if (isError || !invites) {
    return "error"
  }

  if (invites.length === 0) {
    return "no invites"
  }

  return (
    <ul className="flex max-h-[300px] flex-col gap-1 overflow-y-auto">
      {invites.map((invite, key) => (
        <InviteCard invite={invite} key={key} />
      ))}
    </ul>
  )
}

export default ProjectInvitesContainer
