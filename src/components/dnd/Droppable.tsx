"use client";
import { useDroppable } from "@dnd-kit/core";
import React, { HTMLAttributes } from "react";

interface IDroppable extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

const Droppable: React.FC<IDroppable> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return <div ref={setNodeRef}>{children}</div>;
};

export default Droppable;
