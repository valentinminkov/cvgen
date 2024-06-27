import { shuffleString } from "@/lib/utils";
import type { LanguagesViewProps } from "@/types";

export default function Languages({ data }: LanguagesViewProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
          Languages
        </h1>
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-800">
              Mother Language
            </h3>
            <p className="text-gray-600">{data.motherLanguage}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-gray-800">
              Other Languages
            </h3>
            {data.otherLanguages.map((language) => (
              <div
                key={shuffleString(language.language)}
                className="bg-gray-100 p-4 rounded-lg shadow-sm mt-4"
              >
                <p className="text-gray-600">{language.language}</p>
                <p className="text-gray-600">
                  Skills: {JSON.stringify(language.skills)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
