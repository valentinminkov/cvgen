import { persistentMap } from "@nanostores/persistent";

// type SkillLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface LanguageSkills {
  listening: string;
  reading: string;
  writing: string;
}

interface Language {
  language: string;
  skills: LanguageSkills;
}

interface LanguageSubmitFormPayload {
  language: string;
  listening: string;
  reading: string;
  writing: string;
}

interface LanguageFormValue {
  motherLanguage: string;
  otherLanguages?: Language[];
}

type PersistentLanguageStore = Record<string, any> & {
  language: LanguageFormValue;
};

const storeLanguage = persistentMap<PersistentLanguageStore>(
  "language_",
  { language: { motherLanguage: "", otherLanguages: [] } },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addLanguage(newLanguage: LanguageSubmitFormPayload) {
  const newLanguageEntry: Language = {
    language: newLanguage.language,
    skills: {
      reading: newLanguage.reading,
      writing: newLanguage.writing,
      listening: newLanguage.listening,
    },
  };

  const state = storeLanguage.get();

  state.language.otherLanguages?.push(newLanguageEntry);

  return true;
}

function addMotherLanguage(language: string) {
  const state = storeLanguage.get();

  storeLanguage.set({
    language: {
      motherLanguage: language,
      otherLanguages: state.language.otherLanguages,
    },
  });

  return true;
}

function removeLanguage(index: number) {
  const newItems = storeLanguage
    .get()
    .language.otherLanguages?.filter((_, i) => i !== index);

  storeLanguage.set({
    language: {
      motherLanguage: storeLanguage.get().language.motherLanguage,
      otherLanguages: newItems,
    },
  });
}

export {
  addLanguage,
  removeLanguage,
  storeLanguage,
  type LanguageFormValue,
  addMotherLanguage,
  type LanguageSubmitFormPayload,
  type Language,
};
