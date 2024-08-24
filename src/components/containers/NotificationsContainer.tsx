"use client"
import inviteService from "@/services/InviteService"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { ModalFooter } from "@nextui-org/react"
import NotificationsCard from "../cards/NotificationsCard"

const NotificationsContainer = () => {
  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-invites"],
    queryFn: async () => {
      const { data } = await inviteService.getMyInvites()
      return data
    },
  })

  if (isLoading) {
    return "loading"
  }

  if (isError || !invites) {
    return "error"
  }

  if (invites.length === 0) {
    return (
      <div className="flex items-center justify-center py-[40px] text-2xl font-medium">
        No notifications yet!
      </div>
    )
  }

  return (
    <ModalFooter className="pt-0">
      <div className="flex flex-col gap-2 overflow-y-auto">
        {invites.map((invite, key) => (
          <NotificationsCard invite={invite} key={key} />
        ))}
      </div>
    </ModalFooter>
  )
}

export default NotificationsContainer
