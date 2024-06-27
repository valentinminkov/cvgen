import type { EducationFormValue } from "@/stores/educationStore";
import { shuffleString } from "@/lib/utils";

interface EducationProps {
  data: EducationFormValue[];
}

export default function Education({ data }: EducationProps) {
  return (
    <div>
      <h2>Educations</h2>
      <div>
        {data.map((education) => (
          <div
            key={shuffleString(
              education.title + education.name + education.startDate
            )}
          >
            {education.name}
          </div>
        ))}
      </div>
    </div>
  );
}
