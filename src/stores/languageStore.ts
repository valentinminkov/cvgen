import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";

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
  motherLanguage?: string;
}

interface LanguageFormValue {
  motherLanguage: string;
  otherLanguages: Language[];
}

type PersistentLanguageStore = Record<string, any> & {
  language: LanguageFormValue;
};

const $language = persistentMap<PersistentLanguageStore>(
  getStoreKey("language"),
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

  const state = $language.get();

  state.language.otherLanguages?.push(newLanguageEntry);

  $language.set({
    language: {
      motherLanguage:
        newLanguage?.motherLanguage &&
        newLanguage.motherLanguage !== state.language.motherLanguage
          ? newLanguage.motherLanguage
          : state.language.motherLanguage,
      otherLanguages: state.language.otherLanguages,
    },
  });
  return true;
}

function addMotherLanguage(language: string) {
  const state = $language.get();

  $language.set({
    language: {
      motherLanguage: language,
      otherLanguages: state.language.otherLanguages,
    },
  });

  return true;
}

function removeLanguage(index: number) {
  const newItems = $language
    .get()
    .language.otherLanguages?.filter((_, i) => i !== index);

  $language.set({
    language: {
      motherLanguage: $language.get().language.motherLanguage,
      otherLanguages: newItems,
    },
  });
}

export {
  addLanguage,
  removeLanguage,
  $language,
  type LanguageFormValue,
  addMotherLanguage,
  type LanguageSubmitFormPayload,
  type Language,
};
