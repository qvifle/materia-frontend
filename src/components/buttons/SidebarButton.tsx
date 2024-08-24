"use client"
import { cn } from "@/lib/utils"
import {
  Button,
  ButtonProps,
  InternalForwardRefRenderFunction,
} from "@nextui-org/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export interface SidebarButtonProps extends ButtonProps {
  icon: React.ReactNode
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  className,
  ...rest
}) => {
  return (
    <>
      <Button
        isIconOnly
        className={cn(
          "juistify-center flex w-full items-center lg:hidden lg:justify-start lg:gap-2 lg:pl-1 lg:pr-4",
          className,
        )}
        {...rest}
      >
        <span className="flex h-7 w-7 items-center justify-center text-xl">
          {icon}
        </span>
        <span className="hidden w-full text-start lg:block">{children}</span>
      </Button>
      <Button
        className={cn(
          "juistify-center flex w-full items-center max-lg:hidden lg:justify-start lg:gap-2 lg:pl-1 lg:pr-4",
          className,
        )}
        {...rest}
      >
        <span className="flex h-7 w-7 items-center justify-center text-xl">
          {icon}
        </span>
        <span className="hidden w-full text-start lg:block">{children}</span>
      </Button>
    </>
  )
}

export default SidebarButton
