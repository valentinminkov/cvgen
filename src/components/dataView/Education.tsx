"use client";
import { $education } from "@/stores/educationStore";
import { useStore } from "@nanostores/react";

interface Props {}

export default function EducationView({}: Props) {
  const { educations } = useStore($education);

  const removeEducation = (index: number) => alert("Remove education");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Education</h1>
      {educations.length === 0 ? (
        <p>No education entries available.</p>
      ) : (
        <ul className="space-y-4">
          {educations.map((education, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{education.title}</h2>
                  <p className="text-gray-600">{education.name}</p>
                  <p className="text-gray-500">
                    {education.startDate?.toString()} -{" "}
                    {education.ongoing
                      ? "Present"
                      : education.endDate?.toString()}
                  </p>
                  {education.city && education.country && (
                    <p className="text-gray-500">{`${education.city}, ${education.country}`}</p>
                  )}
                  {education.website && (
                    <a
                      href={education.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {education.website}
                    </a>
                  )}
                  {education.description && (
                    <p className="mt-2">{education.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeEducation(index)}
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
