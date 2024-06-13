"use client";

import { $skills } from "@/stores/skillsStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

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

export default function SkillsView({}: Props) {
  const { skills, sectionSkills } = useStore($skills);

  const removeSkill = (index: number) => alert("Remove skill");

  return (
    <div className={`${containerClass}`}>
      <h1 className={headerClass}>Skills</h1>
      {skills.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {skills.map((skillGroup, index) => (
            <div key={index} className="py-4">
              <h2 className={subheaderClass}>{skillGroup.type}</h2>
              <div className="flex items-center mt-2">
                <span className={labelClass}>Level:</span>
                <span>{skillGroup.level}</span>
              </div>
              <div>
                <p className={labelClass}>Skills:</p>
                <ul className={listContainerClass}>
                  {skillGroup.skills?.map((skill, idx) => (
                    <li key={idx} className={listEntryContainerClass}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => removeSkill(index)}
                className={dangerButtonClass}
              >
                Remove Skill Group
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills added yet.</p>
      )}
    </div>
  );
}
