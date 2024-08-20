"use client"

import {
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

const ProjectSettingsDropdown = ({ className }: { className?: string }) => {
  const { open: openDialog } = useDialog()

  return (
    <Dropdown placement="left-start">
      <DropdownTrigger className={className}>
        <Button variant="flat" isIconOnly>
          <Settings />
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
        <DropdownItem
          onClick={() => openDialog("delete-project")}
          startContent={<Trash2 color="var(--error-9)" />}
        >
          <span className="text-danger-600">Delete</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default ProjectSettingsDropdown
