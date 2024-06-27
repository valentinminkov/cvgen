import { shuffleString } from "@/lib/utils";
import type { LanguageFormValue } from "@/types";

interface LanguagesProps {
  data: LanguageFormValue;
}
export default function Languages({ data }: LanguagesProps) {
  return (
    <div>
      <h1>Languages </h1>
      {
        <div>
          <div>
            <h3>{data.motherLanguage}</h3>
          </div>
          <div>
            {data.otherLanguages.map((languages) => (
              <div key={shuffleString(languages.language)}>
                {languages.language}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}
