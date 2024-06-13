"use client";
import { $education } from "@/stores/educationStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}
const {
  containerClass,
  headerClass,
  listContainerClass,
  dangerButtonClass,
  listEntryContainerClass,
  subheaderClass,
  paragraphClass,
  hyperlinkClass,
  flexContainerClass,
} = viewComponentStyles;

export default function EducationView({}: Props) {
  const { educations } = useStore($education);

  const removeEducation = (index: number) => alert("Remove education");

  return (
    <div className={`${containerClass}`}>
      <h1 className={headerClass}>Education</h1>
      {educations.length === 0 ? (
        <p>No education entries available.</p>
      ) : (
        <ul className={listContainerClass}>
          {educations.map((education, index) => (
            <li key={index} className={listEntryContainerClass}>
              <div className={flexContainerClass}>
                <div>
                  <h2 className={subheaderClass}>{education.title}</h2>
                  <p className={paragraphClass}>{education.name}</p>
                  <p className={paragraphClass}>
                    {education.startDate?.toString()} -{" "}
                    {education.ongoing
                      ? "Present"
                      : education.endDate?.toString()}
                  </p>
                  {education.city && education.country && (
                    <p
                      className={paragraphClass}
                    >{`${education.city}, ${education.country}`}</p>
                  )}
                  {education.website && (
                    <a
                      href={education.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={hyperlinkClass}
                    >
                      {education.website}
                    </a>
                  )}
                  {education.description && <p>{education.description}</p>}
                </div>
                <button
                  onClick={() => removeEducation(index)}
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
