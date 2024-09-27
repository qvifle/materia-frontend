"use client"
import { useSortable } from "@dnd-kit/sortable"
import React, { ReactNode, useEffect } from "react"
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  children: ReactNode
  id: string
}

const SortableItem = ({ children, id }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div
      // className="touch-none"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export default SortableItem
