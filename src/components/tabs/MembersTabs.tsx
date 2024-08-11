"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InviteTab from "./InviteTab"
import MembersTab from "./MembersTab"

const MembersTabs = () => {
  return (
    <Tabs defaultValue="members" className="mt-4 w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="invite">Invite</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <MembersTab />
      </TabsContent>
      <TabsContent value="invite">
        <InviteTab />
      </TabsContent>
    </Tabs>
  )
}

export default MembersTabs
