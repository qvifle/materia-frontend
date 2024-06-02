"use client";
import inviteService from "@/services/InviteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import toast from "react-hot-toast";

const ProjectInvitesContainer = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project-invites", projectId],
    queryFn: async () => {
      const { data } = await inviteService.getProjectInvites(projectId);
      console.log(data);

      return data;
    },
  });

  const { mutate: cancelInvite } = useMutation({
    mutationFn: async (args: any) => {
      const { data } = await inviteService.cancelInvite(args.inviteId);
      return data;
    },
    onSuccess: () => {
      toast("Invite canceled");
      queryClient.invalidateQueries({
        queryKey: ["project-invites", projectId],
      });
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
    return "no invites";
  }

  return (
    <ul className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
      {invites.map((invite, key) => (
        <Card key={key} className="flex justify-between items-center p-2">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage alt="avatar"></AvatarImage>
              <AvatarFallback>
                <div className="bg-border rounded-full p-1">
                  <User />
                </div>
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col ">
              <h4 className="text-md font-medium">{invite.recipient.name}</h4>
              <h5 className="text-sm">{invite.recipient.email}</h5>
            </div>
          </div>
          <Button
            variant="destructive"
            className="h-[32px]"
            onClick={() => cancelInvite({ inviteId: invite.id })}
          >
            Cancel
          </Button>
        </Card>
      ))}
    </ul>
  );
};

export default ProjectInvitesContainer;
