"use client"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import MembersContainer from "../containers/MembersContainer"

const MembersTab = () => {
  const pathName = usePathname()
  const projectId = pathName.split("/")[3]

  return (
    <section className="flex flex-col gap-4 pt-4">
      <MembersContainer projectId={projectId} />
    </section>
  )
}

export default MembersTab
