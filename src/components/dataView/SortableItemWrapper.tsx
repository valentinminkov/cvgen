"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { viewWrapperStyles } from "@/components/dataView/config";

const { containerClass } = viewWrapperStyles;

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function SortableItemWrapper({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${containerClass ?? ""}`}
    >
      {children}
    </div>
  );
}
