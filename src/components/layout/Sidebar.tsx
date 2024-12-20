"use client"
import { cn } from "@nextui-org/react"
import React from "react"
import styles from "@/styles/layout.module.css"
import { SquarePen } from "lucide-react"
import useDialog from "@/lib/hooks/useDialog"
import SidebarButton from "../buttons/SidebarButton"
import SidebarHeader from "./Sidebar/SidebarHeader"
import SidebarProjects from "./Sidebar/SidebarProjects"

const Sidebar = () => {
  const { open: openDialog } = useDialog()

  return (
    <aside className={cn(styles.sidebar)}>
      <div className="sticky top-4 flex flex-col  items-center lg:items-start">
        <SidebarHeader />

        <SidebarButton
          onClick={() => openDialog("create-project")}
          variant="light"
          color="primary"
          icon={<SquarePen />}
        >
          Create project
        </SidebarButton>

        <SidebarProjects />
      </div>
    </aside>
  )
}

export default Sidebar
