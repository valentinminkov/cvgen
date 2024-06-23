"use client";
import { viewComponentStyles } from "@/components/dataView/config";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemWrapper from "./SortableItemWrapper";
import { useState } from "react";

type ItemType = "education" | "skills" | "language" | "experiences";

interface Props {
  items: any;
  itemRender: (item: any, index: number) => JSX.Element;
  itemType: ItemType;
}

const { headerClass, listContainerClass } = viewComponentStyles;

export default function SortableItems({ items, itemRender, itemType }: Props) {
  const itemsSortableEntries = Object.fromEntries(
    items.map((item: any, index: number) => [index, item])
  );

  const [itemKeys, setItemKeys] = useState(Object.keys(itemsSortableEntries));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      setItemKeys((items: any) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <h1 className={`${headerClass} capitalize`}>{itemType}</h1>
      {itemKeys.length === 0 ? (
        <p>No {itemType} entries available.</p>
      ) : (
        <ul className={listContainerClass}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={itemKeys}
              strategy={verticalListSortingStrategy}
            >
              {itemKeys.map((itemKey: any, index: number) => {
                return (
                  <SortableItemWrapper id={itemKey} key={itemKey}>
                    {itemRender(items[itemKey], index)}
                  </SortableItemWrapper>
                );
              })}
            </SortableContext>
          </DndContext>
        </ul>
      )}
    </>
  );
}
