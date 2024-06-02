"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InviteTab from "./InviteTab";

const MembersTabs = () => {
  return (
    <Tabs defaultValue="members" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="invite">Invite</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="invite">
        <InviteTab />
      </TabsContent>
    </Tabs>
  );
};

export default MembersTabs;
