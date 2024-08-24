"use client"
import SidebarButton from "@/components/buttons/SidebarButton"
import SidebarDropdown from "@/components/buttons/SidebarDropdown"
import Emoji from "@/lib/utils/Emoji"
import { IProject } from "@/types/project.types"
import { Library } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { FC, ReactNode } from "react"

interface SidebarProjectSectionProps {
  title: string
  projects: IProject[] | undefined
  visible: boolean
  toggleVisibility: () => void
  icon: ReactNode
}

const SidebarProjectSection: FC<SidebarProjectSectionProps> = ({
  title,
  projects,
  visible,
  toggleVisibility,
  icon,
}) => {
  const { push } = useRouter()

  if (!projects) {
    return null
  }

  return (
    <>
      <SidebarDropdown
        visible={visible}
        toggleVisible={toggleVisibility}
        icon={icon}
      >
        {title}
      </SidebarDropdown>
      {visible &&
        !!projects &&
        projects.map((project, key) => (
          <SidebarButton
            onClick={() => push(`/home/projects/${project.id}`)}
            variant="light"
            key={key}
            icon={
              project.iconUrl ? (
                <Emoji unifiedCode={project.iconUrl} />
              ) : (
                project.title
              )
            }
          >
            {project.title}
          </SidebarButton>
        ))}
    </>
  )
}

export default SidebarProjectSection
