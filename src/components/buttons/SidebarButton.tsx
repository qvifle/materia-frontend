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

  useEffect(() => {
    console.log(isDesktop)
  }, [isDesktop])

  return (
    <Button
      isIconOnly={!isDesktop}
      className={cn(
        "lg:flex lg:w-full lg:items-center lg:justify-start lg:gap-2",
        className,
      )}
      {...rest}
    >
      {icon}
      <span className="hidden lg:block">{children}</span>
    </Button>
  )
}

export default SidebarButton
