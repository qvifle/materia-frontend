import React, { ReactNode } from "react"
import {
  cn,
  Skeleton as NSkeleton,
  SkeletonProps as NSkeletonProps,
} from "@nextui-org/react"
import otherStyles from "@/styles/other.module.css"

interface SkeletonProps extends NSkeletonProps {
  width?: string
}

const Skeleton = ({ width, children, className, ...rest }: SkeletonProps) => {
  return (
    <NSkeleton
      style={{ width: width }}
      className={cn(
        "rounded-lg !bg-gray-4 duration-1000 before:border-gray-4",
        otherStyles.slowAnimation,
        className,
      )}
      {...rest}
    >
      {children}
    </NSkeleton>
  )
}

export default Skeleton
