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

interface Sections {
  [key: string]: React.ReactNode;
}

const sectionContainerClasses = `border-solid border-2 border-sky-500 p-5`;

const sections: Sections = {
  personal: <Personal />,
  educaton: <Education />,
  languages: <Language />,
  skills: <Skills />,
  experience: <Experience />,
};

const sectionKeys = Object.keys(sections);

export default function Container() {
  const [items, setItems] = useState(Object.keys(sections));

  return (
    <div className="bg-gray-500 p-10">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((sectionKey: string) => (
            <SortableItemWrapper
              id={sectionKey}
              key={sectionKey}
              styleClasses={sectionContainerClasses}
            >
              {sections[sectionKey]}
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
