import React from "react";
import Dialog from "../Dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyInvitesContainer from "@/components/containers/MyInvitesContainer";

const NotificationsDialog = () => {
  return (
    <Dialog searchParam="notifications" className="">
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Notification</DialogTitle>
        </DialogHeader>
        <MyInvitesContainer />
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsDialog;
