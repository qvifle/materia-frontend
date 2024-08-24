"use client"
import React from "react"
import CreateDeskCard from "@/components/cards/CreateDeskCard"
import DesksContainer from "@/components/containers/DesksContainer"

const DesksWidget = ({ projectId }: { projectId: string }) => {
  return (
    <div className="max-w-screen flex h-full flex-grow gap-1 overflow-auto px-4">
      <DesksContainer projectId={projectId} />
      <CreateDeskCard projectId={projectId} />
    </div>
  )
}

export default DesksWidget
