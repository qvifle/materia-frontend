import { useSortable } from "@dnd-kit/sortable";
import React, { HTMLAttributes } from "react";
import { CSS } from "@dnd-kit/utilities";

interface ISortable extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

const Sortable: React.FC<ISortable> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
    });
  const style = {
    opacity: 1,
    transition: transition,
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default Sortable;
