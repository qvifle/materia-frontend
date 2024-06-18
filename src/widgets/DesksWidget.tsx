"use client";
import React from "react";
import CreateDeskCard from "@/components/cards/CreateDeskCard";
import DesksContainer from "@/components/containers/DesksContainer";

const DesksWidget = ({ projectId }: { projectId: string }) => {
  

  return (
    <div className="flex gap-1 min-h-[74px] w-max">
      <DesksContainer projectId={projectId}/>
      <CreateDeskCard projectId={projectId} />
    </div>
  );
};

export default DesksWidget;
