"use client";

import { $skills } from "@/stores/skillsStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/arrange/classes";
import SortableItems from "./SortableItems";
import type { SkillGroup } from "@/types";
import { translations } from "@/config/content";

interface Props {
  containerClass?: string;
}

const {
  containerClass,
  headerClass,
  subheaderClass,
  dangerButtonClass,
  listContainerClass,
  listEntryContainerClass,
  labelClass,
} = viewComponentStyles;

interface EntryProps {
  entry: SkillGroup;
  index: number;
  remove: (index: number) => void;
}
const Entry = ({ entry, index, remove }: EntryProps) => {
  return (
    <div key={index} className="py-4">
      <h2 className={subheaderClass}>{entry.type}</h2>
      <div className="flex items-center mt-2">
        <span className={labelClass}>Level:</span>
        <span>{entry.level}</span>
      </div>
      <div>
        <p className={labelClass}>{translations.SKILLS}:</p>
        <ul className={listContainerClass}>
          {entry.skills?.map((skill: any, id: number) => (
            <li key={id} className={listEntryContainerClass}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => remove(index)} className={dangerButtonClass}>
        {translations.REMOVE_SKILL}
      </button>
    </div>
  );
};

export default function SkillsView({}: Props) {
  const { skills, sectionSkills } = useStore($skills);

  const removeEntry = (index: number) => alert("Remove skill");

  const renderEntry = (entry: SkillGroup, index: number) => (
    <Entry entry={entry} index={index} remove={removeEntry} />
  );

  return (
    <div className={`${containerClass}`}>
      {!!skills.length && (
        <SortableItems
          items={skills}
          itemRender={renderEntry}
          itemType="skills"
        />
      )}
    </div>
  );
}
