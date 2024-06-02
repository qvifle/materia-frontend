"use client";
import inviteService from "@/services/InviteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const MyInvitesContainer = () => {
  const queryClient = useQueryClient();
  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-invites"],
    queryFn: async () => {
      const { data } = await inviteService.getMyInvites();
      return data;
    },
  });

  const { mutate: acceptInvite } = useMutation({
    mutationKey: ["accept-invite"],
    mutationFn: async (inviteId: string) => {
      const { data } = await inviteService.acceptInvite(inviteId);
      return data;
    },
    onSuccess: () => {
      toast.success("Invite accepted!");
      queryClient.invalidateQueries({ queryKey: ["my-invites", "projects"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { mutate: rejectInvite } = useMutation({
    mutationKey: ["accept-invite"],
    mutationFn: async (inviteId: string) => {
      const { data } = await inviteService.rejectInvite(inviteId);
      return data;
    },
    onSuccess: () => {
      toast("Invite rejected");
      queryClient.invalidateQueries({ queryKey: ["my-invites"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  if (isLoading) {
    return "loading";
  }

  if (isError || !invites) {
    return "error";
  }

  if (invites.length === 0) {
    return (
      <div className="flex justify-center items-center text-2xl font-medium py-[40px]">
        No notifications yet!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto">
      {invites.map((invite, key) => (
        <Card key={key}>
          <CardHeader className="p-3 flex flex-row items-center justify-between">
            <span>
              <span className="text-primary"> {invite?.sender?.email}</span>{" "}
              invites you to <b>{invite.project.title}</b>
            </span>
            <div className="flex flex-row items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="p-0 h-7 w-7"
                onClick={() => acceptInvite(invite.id)}
              >
                <Check color="var(--green)" size={16} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="p-0 h-7 w-7"
                onClick={() => rejectInvite(invite.id)}
              >
                <X color="var(--red)" size={16} />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default MyInvitesContainer;
