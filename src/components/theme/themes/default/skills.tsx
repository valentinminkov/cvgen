import { shuffleString } from "@/lib/utils";
import type { SkillGroup } from "@/types";

interface SkillsProps {
  data: SkillGroup[];
}

export default function Skills({ data }: SkillsProps) {
  return (
    <div>
      <h1>Skills</h1>
      <div>
        {data.map((skillSet) => (
          <div key={shuffleString(skillSet.type + skillSet.level)}>
            <p>
              <span>Skill level: </span> {skillSet.level}
            </p>
            <div>
              <span>Skill type: </span>
              {skillSet.type}
            </div>
            {skillSet.skills?.map((curSkill) => (
              <div key={shuffleString(curSkill)}>
                <p>cur skill: {curSkill}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
