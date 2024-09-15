"use client"

import React, { FC } from "react"
import UserCard from "./UserCard"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Button, Tooltip } from "@nextui-org/react"
import inviteService from "@/services/InviteService"
import { IProjectInvite } from "@/types/invite.types"
import { X } from "lucide-react"

interface InviteCardProps {
  invite: IProjectInvite
}

const InviteCard: FC<InviteCardProps> = (props) => {
  return (
    <UserCard
      {...props.invite.recipient}
      content={<InviteCardContent {...props} />}
    />
  )
}

const InviteCardContent: FC<InviteCardProps> = ({ invite }) => {
  const queryClient = useQueryClient()
  const { mutate: cancelInvite } = useMutation({
    mutationFn: async () => {
      const { data } = await inviteService.cancelInvite(invite.id)
      return data
    },
    onSuccess: () => {
      toast("Invite canceled")
      queryClient.invalidateQueries({
        queryKey: ["project-invites", invite.projectId],
      })
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  return (
    <div className="flex justify-end">
      <Tooltip content="Cancel">
        <Button
          onClick={() => cancelInvite()}
          type="button"
          color="danger"
          isIconOnly
        >
          <X size={16} />
        </Button>
      </Tooltip>
    </div>
  )
}

export default InviteCard
