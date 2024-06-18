"use client";
import projectService from "@/services/ProjectService";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import MembersContainer from "../containers/MembersContainer";

const MembersTab = () => {
  const pathName = usePathname();
  const projectId = pathName.split("/")[3];

  return (
    <section className="pt-4 flex flex-col gap-4">
      <ul className="flex flex-col gap-1">
        <MembersContainer projectId={projectId} />
      </ul>
    </section>
  );
};

export default MembersTab;
