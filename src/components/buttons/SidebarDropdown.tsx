import React, { FC } from "react"
import SidebarButton, { SidebarButtonProps } from "./SidebarButton"
import { ChevronDown } from "lucide-react"
import { cn } from "@nextui-org/react"

interface SidebarDropdownProps extends SidebarButtonProps {
  visible: boolean
  toggleVisible: () => void
}

const SidebarDropdown: FC<SidebarDropdownProps> = ({
  visible,
  toggleVisible,
  children,
  icon,
}) => {
  return (
    <SidebarButton onClick={toggleVisible} variant="light" icon={icon}>
      <div className="flex w-full items-center justify-between">
        {children}
        <ChevronDown
          size={14}
          className={cn(visible ? "rotate-180" : "", "duration-100")}
        />
      </div>
    </SidebarButton>
  )
}

export default SidebarDropdown
