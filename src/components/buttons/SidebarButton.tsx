"use client"
import { cn } from "@/lib/utils"
import {
  Button,
  ButtonProps,
  InternalForwardRefRenderFunction,
} from "@nextui-org/react"
import React, { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface SidebarButtonProps extends ButtonProps {
  icon: React.ReactNode
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  className,
  ...rest
}) => {
  const isDesktop = useMediaQuery("only screen and (min-width : 1024px)")

  return (
    <Button
      isIconOnly={!isDesktop}
      className={cn(
        "juistify-center flex w-full items-center lg:justify-start lg:gap-2 lg:pl-1 lg:pr-4",
        className,
      )}
      {...rest}
    >
      <span className="flex h-7 w-7 items-center justify-center text-xl">
        {icon}
      </span>
      <span className="hidden w-full text-start lg:block">{children}</span>
    </Button>
  )
}

export default SidebarButton
