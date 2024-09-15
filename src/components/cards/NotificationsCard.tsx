"use client"
import React, { FC } from "react"
import { Button, Card, CardBody } from "@nextui-org/react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import inviteService from "@/services/InviteService"
import { IMyInvite } from "@/types/invite.types"

interface NotificationsCardProps {
  invite: IMyInvite
}

const NotificationsCard: FC<NotificationsCardProps> = ({ invite }) => {
  const queryClient = useQueryClient()

  const { mutate: acceptInvite } = useMutation({
    mutationKey: ["accept-invite"],
    mutationFn: async () => {
      const { data } = await inviteService.acceptInvite(invite.id)
      return data
    },
    onSuccess: () => {
      toast.success("Invite accepted!")
      queryClient.invalidateQueries({ queryKey: ["my-invites"] })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  const { mutate: rejectInvite } = useMutation({
    mutationKey: ["accept-invite"],
    mutationFn: async () => {
      const { data } = await inviteService.rejectInvite(invite.id)
      return data
    },
    onSuccess: () => {
      toast("Invite rejected")
      queryClient.invalidateQueries({ queryKey: ["my-invites"] })
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  return (
    <Card className="bg-default-100">
      <CardBody>
        <div className="flex w-full items-center justify-between gap-2">
          <span>
            <Link
              className="text-primary-9"
              href={`mailto:${invite?.sender?.email}`}
            >
              {invite?.sender?.email}
            </Link>{" "}
            invites you to <b>{invite.project.title}</b>
          </span>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              className="bg-default-200"
              isIconOnly
              onClick={() => acceptInvite()}
            >
              <Check color="var(--succes-10)" size={16} />
            </Button>
            <Button
              size="sm"
              className="bg-default-200"
              isIconOnly
              onClick={() => rejectInvite()}
            >
              <X color="var(--error-10)" size={16} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default NotificationsCard
