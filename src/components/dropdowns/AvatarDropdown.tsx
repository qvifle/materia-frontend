"use client"
import React from "react"
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { Bell, Sun, LogOut, Moon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import useDialog from "@/lib/hooks/useDialog"
import { useQuery } from "@tanstack/react-query"
import inviteService from "@/services/InviteService"

const AvatarDropdown = () => {
  const { data: sessionData } = useSession()
  const { theme, setTheme } = useTheme()
  const { open: openDialog } = useDialog()

  const {
    data: invites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-invites"],
    queryFn: async () => {
      const { data } = await inviteService.getMyInvites()
      return data
    },
  })

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      return
    }
    setTheme("light")
  }
  return (
    <Dropdown placement="bottom-end">
      <Badge
        isInvisible={!invites?.length}
        content={invites?.length}
        color="primary"
      >
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="primary"
            name={sessionData?.user.email}
            size="sm"
          />
        </DropdownTrigger>
      </Badge>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{sessionData?.user.email}</p>
        </DropdownItem>
        <DropdownItem
          onClick={() => openDialog("notifications")}
          startContent={<Bell size={16} />}
          endContent={invites?.length}
          key="analytics"
        >
          Notifications
        </DropdownItem>
        <DropdownItem
          onClick={toggleTheme}
          startContent={
            theme === "light" ? <Moon size={16} /> : <Sun size={16} />
          }
          key="settings"
        >
          Theme
        </DropdownItem>
        <DropdownItem
          onClick={() => signOut()}
          key="team_settings"
          startContent={<LogOut size={16} />}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default AvatarDropdown
