"use client";
import { $education } from "@/stores/educationStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/arrange/classes";
import SortableItems from "./SortableItems";
import type { EducationFormValue } from "@/types";

interface Props {}
const {
  containerClass,
  dangerButtonClass,
  listEntryContainerClass,
  subheaderClass,
  paragraphClass,
  hyperlinkClass,
  flexContainerClass,
} = viewComponentStyles;

interface EntryProps {
  entry: EducationFormValue | undefined;
  index: number;
  remove: (index: number) => void;
}

const Entry = ({ entry, index, remove }: EntryProps) => {
  if (!entry) return;
  return (
    <li key={index} className={listEntryContainerClass}>
      <div className={flexContainerClass}>
        <div>
          <h2 className={subheaderClass}>{entry.title}</h2>
          <p className={paragraphClass}>{entry.name}</p>
          <p className={paragraphClass}>
            {entry.startDate?.toString()} -{" "}
            {entry.ongoing ? "Present" : entry.endDate?.toString()}
          </p>
          {entry.city && entry.country && (
            <p
              className={paragraphClass}
            >{`${entry.city}, ${entry.country}`}</p>
          )}
          {entry.website && (
            <a
              href={entry.website}
              target="_blank"
              rel="noopener noreferrer"
              className={hyperlinkClass}
            >
              {entry.website}
            </a>
          )}
          {entry.description && <p>{entry.description}</p>}
        </div>
        <button onClick={() => remove(index)} className={dangerButtonClass}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default function EducationView({}: Props) {
  const { educations } = useStore($education);

  const removeEntry = (index: number) => alert("Remove education");

  const renderEntry = (education: EducationFormValue, index: number) => (
    <Entry entry={education} index={index} remove={removeEntry} />
  );

  return (
    <div className={`${containerClass}`}>
      {!!educations.length && (
        <SortableItems
          items={educations}
          itemRender={renderEntry}
          itemType="educations"
        />
      )}
    </div>
  );
}
