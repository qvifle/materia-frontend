"use client"
import React, { FC, HTMLAttributes, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import inviteService from "@/services/InviteService"
import toast from "react-hot-toast"
import validateEmail from "@/lib/utils/testEmail"
import { Button, Input } from "@nextui-org/react"
import { UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface InviteFormProps extends HTMLAttributes<HTMLDivElement> {
  projectId: string
}

const InviteForm: FC<InviteFormProps> = ({ projectId, className, ...rest }) => {
  const queryClient = useQueryClient()
  const [value, setValue] = useState("")

  const { mutate: sendInvite } = useMutation({
    mutationFn: async (data: string) =>
      inviteService.sendInvite(projectId, { recipientEmail: data }),
    onSuccess: () => {
      toast.success("Invite sent!")
      queryClient.invalidateQueries({
        queryKey: ["project-invites", projectId],
      })
      setValue("")
    },
    onError: () => {
      toast.error("Something went wrong")
      setValue("")
    },
  })

  const onSubmit = () => {
    console.log("hello")
    if (!validateEmail(value)) {
      toast.error("Is not valid!")
      return
    }

    sendInvite(value)
  }

  return (
    <div className={cn("flex w-full items-center gap-2", className)} {...rest}>
      <Input
        type="email"
        value={value}
        placeholder="member@gmail.com"
        label="Invite email"
        size="lg"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        isIconOnly
        type="submit"
        color="primary"
        className="h-16 w-16 min-w-16"
        onClick={() => onSubmit()}
      >
        <UserPlus size={22} />
      </Button>
    </div>
  )
}

export default InviteForm
