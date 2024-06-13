"use client";

import { $language } from "@/stores/languageStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}

const {
  containerClass,
  headerClass,
  labelClass,
  dangerButtonClass,
  subheaderClass,
} = viewComponentStyles;

export default function LanguageView({}: Props) {
  const { language } = useStore($language);

  const removeLanguage = (index: number) => alert("remove language");

  return (
    <div className={`${containerClass}`}>
      <h1 className={headerClass}>Language Skills</h1>
      {language.otherLanguages.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {language.otherLanguages.map((language, index) => (
            <div key={index} className="py-4">
              <h2 className={subheaderClass}>{language.language}</h2>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className={labelClass}>Listening:</p>
                  <p>{language.skills.listening}</p>
                </div>
                <div>
                  <p className={labelClass}>Reading:</p>
                  <p>{language.skills.reading}</p>
                </div>
                <div>
                  <p className={labelClass}>Writing:</p>
                  <p>{language.skills.writing}</p>
                </div>
              </div>
              <button
                onClick={() => removeLanguage(index)}
                className={dangerButtonClass}
              >
                Remove Language
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No languages added yet.</p>
      )}
    </div>
  );
}
