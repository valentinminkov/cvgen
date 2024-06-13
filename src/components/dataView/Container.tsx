"use client";
import Education from "@/components/dataView/Education";
import Experience from "@/components/dataView/Experience";
import Language from "@/components/dataView/Language";
import Skills from "@/components/dataView/Skills";
import Personal from "@/components/dataView/Personal";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemWrapper from "./SortableItemWrapper";
import { useState } from "react";
import { viewContainerStyles } from "@/components/dataView/config";

interface Sections {
  [key: string]: React.ReactNode;
}

const { containerClass } = viewContainerStyles;

const sortableSections: Sections = {
  educaton: <Education />,
  languages: <Language />,
  skills: <Skills />,
  experience: <Experience />,
};

export default function Container() {
  const [items, setItems] = useState(Object.keys(sortableSections));

  return (
    <div className={containerClass}>
      <Personal />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((sectionKey: string) => (
            <SortableItemWrapper id={sectionKey} key={sectionKey}>
              {sortableSections[sectionKey]}
            </SortableItemWrapper>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
