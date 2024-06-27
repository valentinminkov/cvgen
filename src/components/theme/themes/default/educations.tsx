import { shuffleString } from "@/lib/utils";
import type { EducationViewProps } from "@/types";

export default function Education({ data }: EducationViewProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Education
        </h2>
        <div className="space-y-6">
          {data.map((education) => (
            <div
              key={shuffleString(
                education.title +
                  education.name +
                  education.startDate.toString()
              )}
              className="bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-medium text-gray-800">
                {education.title}
              </h3>
              <p className="text-gray-600">{education.name}</p>
              <p className="text-gray-600">
                {new Date(education.startDate).toLocaleDateString()} -{" "}
                {education.ongoing
                  ? "Ongoing"
                  : education.endDate
                  ? new Date(education.endDate).toLocaleDateString()
                  : "Unknown End Date"}
              </p>
              {education.website && (
                <p className="text-blue-600">
                  <a
                    href={education.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {education.website}
                  </a>
                </p>
              )}
              {education.city && education.country && (
                <p className="text-gray-600">
                  {education.city}, {education.country}
                </p>
              )}
              <p className="text-gray-600">{education.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
