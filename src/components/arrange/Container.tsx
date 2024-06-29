"use client";
import Education from "@/components/arrange/Education";
import Experience from "@/components/arrange/Experience";
import Language from "@/components/arrange/Language";
import Skills from "@/components/arrange/Skills";
import Personal from "@/components/arrange/Personal";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemWrapper from "./SortableItemWrapper";
import { useEffect } from "react";
import { viewContainerStyles } from "@/components/arrange/classes";
import {
  $settings,
  setSectionOrderItems,
  setSectionUnordableItems,
} from "@/stores/settingsStore";
import { useStore } from "@nanostores/react";

interface Sections {
  [key: string]: React.ReactNode;
}

const { containerClass } = viewContainerStyles;

const notSortableSections: Sections = {
  personal: <Personal />,
};

const sortableSections: Sections = {
  educations: <Education />,
  languages: <Language />,
  skills: <Skills />,
  experiences: <Experience />,
};

export default function Container() {
  const settings = useStore($settings);
  const {
    order: { sections, staticSections },
  } = settings;

  useEffect(() => {
    // TO DO this shouldn't be done here :D
    // Set sections order
    if (
      !sections?.length ||
      sections.length !== Object.keys(sortableSections).length
    )
      setSectionOrderItems(Object.keys(sortableSections));

    if (
      !staticSections?.length ||
      staticSections.length !== Object.keys(notSortableSections).length
    )
      setSectionUnordableItems(Object.keys(notSortableSections));
  }, [sortableSections, notSortableSections]);

  return (
    <div className={containerClass}>
      <Personal />
      {sections && sections.length && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections?.map((sectionKey: string) => (
              <SortableItemWrapper id={sectionKey} key={sectionKey}>
                {sortableSections[sectionKey]}
              </SortableItemWrapper>
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      // @ts-ignore
      const oldIndex = sections.indexOf(active.id as unknown as string);
      // @ts-ignore
      const newIndex = sections.indexOf(over.id as unknown as string);
      setSectionOrderItems(arrayMove(sections, oldIndex, newIndex));
    }
  }
}
