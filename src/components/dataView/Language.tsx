"use client";

import { $language } from "@/stores/languageStore";
import { useStore } from "@nanostores/react";

interface Props {}

export default function LanguageView({}: Props) {
  const { language } = useStore($language);

  const removeLanguage = (index: number) => alert("remove language");

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Language Skills
      </h1>
      {language.otherLanguages.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {language.otherLanguages.map((language, index) => (
            <div key={index} className="py-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {language.language}
              </h2>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <p className="text-gray-700">Listening:</p>
                  <p>{language.skills.listening}</p>
                </div>
                <div>
                  <p className="text-gray-700">Reading:</p>
                  <p>{language.skills.reading}</p>
                </div>
                <div>
                  <p className="text-gray-700">Writing:</p>
                  <p>{language.skills.writing}</p>
                </div>
              </div>
              <button
                onClick={() => removeLanguage(index)}
                className="mt-4 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
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
