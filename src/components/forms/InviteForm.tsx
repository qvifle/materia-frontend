"use client"
import React, { FC, HTMLAttributes, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import inviteService, { InviteUserFormFields } from "@/services/InviteService"
import toast from "react-hot-toast"
import { Button, Input } from "@nextui-org/react"
import { UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Controller, useForm } from "react-hook-form"
import emailRegex from "@/lib/constants/emailRegex"

interface InviteFormProps extends HTMLAttributes<HTMLFormElement> {
  projectId: string
}

const InviteForm: FC<InviteFormProps> = ({ projectId, className, ...rest }) => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InviteUserFormFields>()

  const { mutate: sendInvite } = useMutation({
    mutationFn: async (data: InviteUserFormFields) =>
      inviteService.sendInvite(projectId, data),
    onSuccess: () => {
      toast.success("Invite sent!")
      queryClient.invalidateQueries({
        queryKey: ["project-invites", projectId],
      })
      reset({ recipientEmail: "" })
    },
    onError: (error: any) => {
      toast.error(error.request.response)

      reset({ recipientEmail: "" })
    },
  })

  const onSubmit = (data: InviteUserFormFields) => {
    sendInvite(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex w-full items-start gap-2", className)}
      {...rest}
    >
      <Controller
        control={control}
        name="recipientEmail"
        rules={{
          required: "Input email",
          pattern: { value: emailRegex, message: "Not valid email" },
        }}
        render={({ field }) => (
          <Input
            placeholder="member@gmail.com"
            label="Invite email"
            id="email"
            size="lg"
            isInvalid={!!errors.recipientEmail}
            errorMessage={errors.recipientEmail?.message}
            {...field}
          />
        )}
      />

      <Button
        isIconOnly
        type="submit"
        color="primary"
        className="h-16 w-16 min-w-16"
      >
        <UserPlus size={22} />
      </Button>
    </form>
  )
}

export default InviteForm
