"use client"

import React, { FC } from "react"
import UserCard from "./UserCard"
import { IMember } from "@/types/members.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import projectService from "@/services/ProjectService"
import toast from "react-hot-toast"
import { Button, Tooltip } from "@nextui-org/react"
import { Ban, Crown } from "lucide-react"

interface MemberCardProps {
  member: IMember
  projectId: string
  isAdmin: boolean
}

const MemberCard: FC<MemberCardProps> = (props) => {
  return (
    <UserCard {...props.member} content={<MemberCardContent {...props} />} />
  )
}

const MemberCardContent: FC<MemberCardProps> = ({
  projectId,
  member,
  isAdmin,
}) => {
  const queryClient = useQueryClient()
  const { mutate: removeMember } = useMutation({
    mutationKey: ["kick-user"],
    mutationFn: async (memberId: string) => {
      const { data } = await projectService.removeMembers(projectId, memberId)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", projectId] })
      toast("Member removed")
    },
    onError: () => {
      toast.error("Something went wrong")
    },
  })

  return (
    <div className="flex justify-end">
      {isAdmin ? (
        <Tooltip content="Admin">
          <Button disableAnimation disabled color="warning" isIconOnly>
            <Crown />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip content={`Kick ${member.name}`}>
          <Button
            color="danger"
            isIconOnly
            onClick={() => removeMember(member.id)}
          >
            <Ban size={16} />
          </Button>
        </Tooltip>
      )}
    </div>
  )
}

export default MemberCard
