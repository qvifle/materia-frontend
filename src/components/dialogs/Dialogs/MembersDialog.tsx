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

const MembersDialog = () => {
  return (
    <Dialog searchParam="members">
      <DialogContent>
        <MembersTabs />
      </DialogContent>
    </Dialog>
  );
};

export default MembersDialog;
