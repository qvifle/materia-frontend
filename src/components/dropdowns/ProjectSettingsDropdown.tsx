"use client"

import {
  LogOut,
  Pencil,
  Settings,
  Settings2,
  Trash2,
  UserRoundPlus,
} from "lucide-react"
import useDialog from "@/lib/hooks/useDialog"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { IProject } from "@/types/project.types"
import { useSession } from "next-auth/react"
import { ReactNode } from "react"

const ProjectSettingsDropdown = ({
  className,
  project,
  children,
}: {
  className?: string
  project: IProject
  children?: ReactNode
}) => {
  const { open: openDialog } = useDialog()
  const { data: session } = useSession()
  const isAdmin = project.creator?.email === session?.user.email

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger className={className}>
        <Button variant="flat" isIconOnly={!children}>
          <Settings />
          {children}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          onClick={() => openDialog("edit-project")}
          startContent={<Pencil />}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          onClick={() => openDialog("invite-project")}
          startContent={<UserRoundPlus />}
        >
          Invite
        </DropdownItem>
        {isAdmin ? (
          <DropdownItem
            onClick={() => openDialog("delete-project")}
            startContent={<Trash2 color="var(--error-9)" />}
          >
            <span className="text-danger-600">Delete</span>
          </DropdownItem>
        ) : (
          <DropdownItem
            onClick={() => openDialog("leave-project")}
            startContent={<LogOut color="var(--error-9)" size={24} />}
          >
            <span className="text-danger-600">Leave</span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProjectSettingsDropdown
