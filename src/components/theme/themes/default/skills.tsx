import { shuffleString } from "@/lib/utils";
import type { SkillsViewsProps } from "@/types";

export default function Skills({ data }: SkillsViewsProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Skills
        </h1>
        <div className="space-y-6">
          {data.map((skillSet) => (
            <div
              key={shuffleString(skillSet.type + skillSet.level)}
              className="bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Skill Type: </span>{" "}
                {skillSet.type}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Skill Level: </span>{" "}
                {skillSet.level}
              </p>
              {skillSet.skills && skillSet.skills.length > 0 && (
                <div className="mt-2">
                  <p className="text-lg font-medium text-gray-800">Skills:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {skillSet.skills.map((curSkill) => (
                      <li key={shuffleString(curSkill)}>{curSkill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
