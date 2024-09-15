"use client"
import React, { FC } from "react"
import Skeleton from "./Skeleton"
import getArray from "@/lib/utils/get-array"
import { cn } from "@/lib/utils"
import styles from "@/styles/other.module.css"
import { motion } from "framer-motion"

interface SkeletonDeskWidgetProps {
  tasks: number
}

const SkeletonDeskWidget: FC<SkeletonDeskWidgetProps> = ({ tasks }) => {
  return (
    <div className="flex h-max min-w-[calc(100vw-18px-16px)] flex-col min-[500px]:min-w-[350px]">
      {/* <DeskCard desk={desk} /> */}
      <Skeleton className="mb-1 h-[64px] rounded-[14px]" />

      <div className="flex w-full flex-col gap-1">
        <div className="relative flex flex-col gap-1">
          {getArray(tasks).map((el, key) => (
            <Skeleton
              key={key}
              className="h-[48px] w-full rounded-[14px] before:delay-100 md:max-w-[350px]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonDeskWidget
