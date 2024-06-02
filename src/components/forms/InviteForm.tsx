"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import inviteService from "@/services/InviteService";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import validateEmail from "@/lib/utils/testEmail";

const InviteForm = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  const { mutate: sendInvite } = useMutation({
    mutationFn: async (data: string) =>
      inviteService.sendInvite(projectId, { recipientEmail: data }),
    onSuccess: () => {
      toast.success("Invite sent!");
      queryClient.invalidateQueries({
        queryKey: ["project-invites", projectId],
      });
      setValue("");
    },
    onError: () => {
      toast.error("Something went wrong");
      setValue("");
    },
  });

  const onSubmit = () => {
    if (!validateEmail(value)) {
      toast.error("Is not valid!");
      return;
    }

    sendInvite(value);
  };

  return (
    <div className="flex w-full items-end gap-2">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Invite E-mail</Label>
        <Input
          type="email"
          value={value}
          id="email"
          placeholder="member@gmail.com"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button onClick={() => onSubmit()}>Invite</Button>
    </div>
  );
};

export default InviteForm;
