"use client"

import projectService from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"
import { IMember } from "@/types/members.types"
import UserCard from "../cards/UserCard"
import MemberCard from "../cards/MemberCard"
import { Spinner } from "@nextui-org/react"
import { Loader } from "lucide-react"
import Skeleton from "../skeleton/Skeleton"

const MembersContainer = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["members", projectId],
    queryFn: async () => {
      const { data } = await projectService.getMembers(projectId)
      return data
    },
  })

  const sortMembers = () => {
    if (!data) {
      return
    }

    let creator
    const newMembers: IMember[] = []
    const { members, creatorId } = data

    for (let i = 0; i < members.length; i++) {
      if (members[i].id === creatorId) {
        creator = members[i]
      } else {
        newMembers.push(members[i])
      }
    }

    if (!creator) {
      return
    }

    newMembers.unshift(creator)
    return newMembers
  }

  const sortedMembers: IMember[] | undefined = useMemo(
    () => sortMembers(),
    [data],
  )

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <Skeleton width="100%">
          <div className="h-[64px] rounded-[14px]"></div>
        </Skeleton>
        <Skeleton width="100%">
          <div className="h-[64px] rounded-[14px]"></div>
        </Skeleton>
      </div>
    )
  }

  if (data && data.members.length === 0) {
    return "no members"
  }

  if (!data || !sortedMembers || isError) {
    return "error"
  }

  return (
    <ul className="flex flex-col gap-1">
      {sortedMembers.map((member, key) => (
        <MemberCard
          key={key}
          member={member}
          projectId={projectId}
          isAdmin={member.id === data.creatorId}
        />
      ))}
    </ul>
  )
}

export default MembersContainer
