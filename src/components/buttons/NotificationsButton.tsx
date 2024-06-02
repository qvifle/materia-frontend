"use client";
import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import useDialog from "@/lib/hooks/useDialog";
import { useQuery } from "@tanstack/react-query";
import inviteService from "@/services/InviteService";

const NotificationsButton = () => {
  const { open } = useDialog();

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

  if (isLoading || isError || !invites) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="link"
      className="rounded-full relative"
      onClick={() => open("notifications")}
    >
      <Bell />
      {invites.length > 0 && (
        <div className="absolute flex items-center justify-center bg-destructive text-background text-xs h-4 w-4 px-1 rounded-full right-0 top-0">
          {invites?.length}
        </div>
      )}
    </Button>
  );
};

export default NotificationsButton;
