"use client"
import inviteService from "@/services/InviteService"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { ModalFooter } from "@nextui-org/react"
import NotificationsCard from "../cards/NotificationsCard"
import Skeleton from "../skeleton/Skeleton"

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

  if (isError) {
    return "error"
  }

  if (!!invites && invites.length === 0) {
    return (
      <div className="flex items-center justify-center py-9 text-2xl font-medium">
        No notifications yet!
      </div>
    )
  }

  return (
    <ModalFooter className="pt-0">
      <div className="flex w-full flex-col gap-2 bg-transparent">
        {isLoading || !invites ? (
          <>
            <Skeleton width="100%">
              <div className="h-[56px] rounded-[14px]"></div>
            </Skeleton>
            <Skeleton width="100%">
              <div className="h-[56px] rounded-[14px]"></div>
            </Skeleton>{" "}
          </>
        ) : (
          invites.map((invite, key) => (
            <NotificationsCard invite={invite} key={key} />
          ))
        )}
      </div>
    </ModalFooter>
  )
}

export default NotificationsContainer
