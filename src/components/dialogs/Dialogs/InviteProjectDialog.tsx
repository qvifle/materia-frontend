"use client";
import React from "react";
import Dialog from "../Dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MembersTabs from "@/components/tabs/MembersTabs";

const InviteProjectDialog = () => {
  return (
    <Dialog searchParam="invite-project">
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
          <DialogDescription>
            Here you can manage project &apos;s members and invite new users.
          </DialogDescription>
        </DialogHeader> */}
        <MembersTabs />
      </DialogContent>
    </Dialog>
  );
};

export default InviteProjectDialog;
