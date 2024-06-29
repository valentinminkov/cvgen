"use client";
import { viewComponentStyles } from "@/components/arrange/classes";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemWrapper from "./SortableItemWrapper";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $settings, setOrderItems } from "@/stores/settingsStore";

type ItemType = "educations" | "skills" | "languages" | "experiences";

interface Props {
  items: any;
  itemRender: (item: any, index: number) => JSX.Element;
  itemType: ItemType;
}

const { headerClass, listContainerClass } = viewComponentStyles;

export default function SortableItems({ items, itemRender, itemType }: Props) {
  const settings = useStore($settings);
  const order = settings?.order;
  const itemKeys = order && order[itemType] ? order[itemType] : [];
  const itemsSortableEntries = Object.fromEntries(
    items.map((item: any, index: number) => [index, item])
  );

  useEffect(() => {
    if (
      !itemKeys.length ||
      itemKeys.length !== Object.keys(itemsSortableEntries).length
    ) {
      setOrderItems(itemType, Object.keys(itemsSortableEntries));
    }
  }, [itemKeys, itemsSortableEntries]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const oldIndex = itemKeys.indexOf(active.id.toString());
      const newIndex = itemKeys.indexOf(over.id.toString());

      return setOrderItems(itemType, arrayMove(itemKeys, oldIndex, newIndex));
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
