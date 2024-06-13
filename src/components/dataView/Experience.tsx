"use client";
import { $experiences } from "@/stores/experienceStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}

const {
  paragraphClass,
  containerClass,
  headerClass,
  listContainerClass,
  dangerButtonClass,
  listEntryContainerClass,
  subheaderClass,
} = viewComponentStyles;

export default function ExperienceView({}: Props) {
  const { experiences } = useStore($experiences);

  const removeExperience = (index: number) => alert("remove experience");

  return (
    <div className={`${containerClass}`}>
      <h1 className={headerClass}>Experience</h1>
      {experiences.length === 0 ? (
        <p>No experience entries available.</p>
      ) : (
        <ul className={listContainerClass}>
          {experiences.map((experience, index) => (
            <li key={index} className={listEntryContainerClass}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className={subheaderClass}>{experience.title}</h2>
                  <p className={paragraphClass}>{experience.country}</p>
                  <p className={paragraphClass}>
                    {experience.startDate.toString()} -{" "}
                    {experience.ongoing
                      ? "Present"
                      : experience.endDate?.toString()}
                  </p>
                  <p>{experience.workDescription}</p>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className={dangerButtonClass}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
