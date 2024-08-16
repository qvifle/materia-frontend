import projectService from "@/services/ProjectService"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"
import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Ban, User } from "lucide-react"
import { Button } from "../ui/button"
import { IMember } from "@/types/members.types"
import toast from "react-hot-toast"

const MembersContainer = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["members", projectId],
    queryFn: async () => {
      const { data } = await projectService.getMembers(projectId)
      return data
    },
  })

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
    return "loading"
  }

  if (data && data.members.length === 0) {
    return "no members"
  }

  if (!data || !sortedMembers || isError) {
    return "error"
  }

  return (
    <>
      {sortedMembers.map((member, key) => (
        <Card key={key} className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt="avatar"></AvatarImage>
              <AvatarFallback>
                <div className="rounded-full bg-border p-1">
                  <User />
                </div>
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h4 className="text-md font-medium">{member.name}</h4>
              <h5 className="text-sm">{member.email}</h5>
            </div>
          </div>
          {data.creatorId === member.id ? (
            <div className="rounded-sm bg-green-500 px-3 py-1 text-background">
              Admin
            </div>
          ) : (
            <Button
              variant="destructive"
              className="h-[32px]"
              size="icon"
              onClick={() => removeMember(member.id)}
            >
              <Ban size={16} />
            </Button>
          )}
        </Card>
      ))}
    </>
  )
}

export default MembersContainer
