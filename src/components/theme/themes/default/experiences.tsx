import { shuffleString } from "@/lib/utils";
import type { ExperienceFormValue } from "@/types";

export interface ExperiencesProps {
  data: ExperienceFormValue[];
}

export default function Experiences({ data }: ExperiencesProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Experiences
        </h2>
        <div className="space-y-6">
          {data.map((experience) => (
            <div
              key={shuffleString(
                experience.title + experience.startDate.toString()
              )}
              className="bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium text-gray-800">
                {experience.title}
              </h3>
              <p className="text-gray-600">
                {new Date(experience.startDate).toLocaleDateString()} -{" "}
                {experience.ongoing
                  ? "Ongoing"
                  : experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : "Unknown End Date"}
              </p>
              <p className="text-gray-600">{experience.country}</p>
              <p className="text-gray-600">{experience.workDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
