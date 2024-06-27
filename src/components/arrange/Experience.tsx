"use client";
import { $experiences } from "@/stores/experienceStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/arrange/config";
import SortableItems from "./SortableItems";
import type { ExperienceFormValue } from "@/types";

const {
  paragraphClass,
  containerClass,
  dangerButtonClass,
  listEntryContainerClass,
  subheaderClass,
} = viewComponentStyles;

interface EntryProps {
  entry: ExperienceFormValue;
  index: number;
  remove: (index: number) => void;
}
const Entry = ({ entry, index, remove }: EntryProps) => {
  return (
    <li key={index} className={listEntryContainerClass}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className={subheaderClass}>{entry.title}</h2>
          <p className={paragraphClass}>{entry.country}</p>
          <p className={paragraphClass}>
            {entry.startDate.toString()} -{" "}
            {entry.ongoing ? "Present" : entry.endDate?.toString()}
          </p>
          <p>{entry.workDescription}</p>
        </div>
        <button onClick={() => remove(index)} className={dangerButtonClass}>
          Remove
        </button>
      </div>
    </li>
  );
};

interface Props {}

export default function ExperienceView({}: Props) {
  const { experiences } = useStore($experiences);

  const removeEntry = (index: number) => alert("remove experience");

  const renderEntry = (experience: ExperienceFormValue, index: number) => (
    <Entry entry={experience} index={index} remove={removeEntry} />
  );

  return (
    <div className={`${containerClass}`}>
      {!!experiences.length && (
        <SortableItems
          items={experiences}
          itemRender={renderEntry}
          itemType="experiences"
        ></SortableItems>
      )}
    </div>
  );
}
