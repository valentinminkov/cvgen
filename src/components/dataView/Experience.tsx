"use client";
import { $experiences } from "@/stores/experienceStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}

const { containerClass } = viewComponentStyles;

export default function ExperienceView({}: Props) {
  const { experiences } = useStore($experiences);

  const removeExperience = (index: number) => alert("remove experience");

  return (
    <div className={`${containerClass}`}>
      <h1 className="text-2xl font-bold mb-4">Experience</h1>
      {experiences.length === 0 ? (
        <p>No experience entries available.</p>
      ) : (
        <ul className="space-y-4">
          {experiences.map((experience, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{experience.title}</h2>
                  <p className="text-gray-600">{experience.country}</p>
                  <p className="text-gray-500">
                    {experience.startDate.toString()} -{" "}
                    {experience.ongoing
                      ? "Present"
                      : experience.endDate?.toString()}
                  </p>
                  <p className="mt-2">{experience.workDescription}</p>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
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
