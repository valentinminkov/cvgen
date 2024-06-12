"use client";

import { $skills } from "@/stores/skillsStore";
import { useStore } from "@nanostores/react";

interface Props {}

export default function SkillsView({}: Props) {
  const { skills, sectionSkills } = useStore($skills);

  const removeSkill = (index: number) => alert("Remove skill");

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Skills</h1>
      {skills.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {skills.map((skillGroup, index) => (
            <div key={index} className="py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {skillGroup.type}
              </h2>
              <div className="flex items-center mt-2">
                <span className="mr-2 text-gray-700">Level:</span>
                <span>{skillGroup.level}</span>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">Skills:</p>
                <ul className="list-disc list-inside">
                  {skillGroup.skills?.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => removeSkill(index)}
                className="mt-4 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
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
