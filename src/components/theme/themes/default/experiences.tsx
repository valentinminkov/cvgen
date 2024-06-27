import { shuffleString } from "@/lib/utils";
import type { ExperienceFormValue } from "@/types";

export interface ExperiencesProps {
  data: ExperienceFormValue[];
}

export default function Experiences({ data }: ExperiencesProps) {
  return (
    <div>
      <p>Experiences</p>
      <div>
        {data.map((experience) => (
          <div key={shuffleString(experience.title + experience.startDate)}>
            <p>{experience.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
