"use client";
import React from "react";
import { usePathname } from "next/navigation";
import ProjectInvitesContainer from "../containers/ProjectInvitesContainer";
import InviteForm from "../forms/InviteForm";

const InviteTab = () => {
  const pathName = usePathname();
  const projectId = pathName.split("/")[3];

  return (
    <section className="pt-4 flex flex-col gap-4">
      <InviteForm projectId={projectId} />
      <div>
        <h2 className="text-md font-medium">Pending invites</h2>
        <ProjectInvitesContainer projectId={projectId} />
      </div>
    </section>
  );
};

export default InviteTab;
