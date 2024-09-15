"use client"
import React from "react"
import InviteTab from "./InviteTab"
import MembersTab from "./MembersTab"
import { ModalBody, ModalHeader, Tab, Tabs } from "@nextui-org/react"

const MembersTabs = () => {
  return (
    <Tabs size="lg" className="flex w-full justify-center">
      <Tab key="members" title="Members">
        <MembersTab />
      </Tab>
      <Tab key="invite" title="Invite">
        <InviteTab />
      </Tab>
    </Tabs>
  )
}

export default MembersTabs
