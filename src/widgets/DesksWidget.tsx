import React from "react"
import CreateDeskCard from "@/components/cards/CreateDeskCard"
import DesksContainer from "@/components/containers/DesksContainer"
import DesksContextProvider from "@/context/DesksContext"

const DesksWidget = ({ projectId }: { projectId: string }) => {
  return (
    <div className="max-w-screen flex h-max max-h-[80dvh] flex-grow gap-1 overflow-auto px-4 pt-4">
      <DesksContextProvider>
        <DesksContainer projectId={projectId} />
        <CreateDeskCard projectId={projectId} />
      </DesksContextProvider>
    </div>
  )
}

export default DesksWidget
