import { computed, type ReadableAtom } from "nanostores";
import { $user, type UserFormValue } from "@/stores/userStore";
import {
  $experiences,
  type ExperienceFormValue,
} from "@/stores/experienceStore";
import { $education, type EducationFormValue } from "@/stores/educationStore";
import { $language, type LanguageFormValue } from "@/stores/languageStore";
import { $skills, type SkillGroup } from "@/stores/skillsStore";
import { $settings } from "@/stores/settingsStore";

export const $isPersonalDataFilled: ReadableAtom<boolean> = computed(
  $user,
  (userData) =>
    Boolean(!!userData.firstName && !!userData.secondName && !!userData.email)
);

export const $experiencesEntered: ReadableAtom<number> = computed(
  $experiences,
  ({ experiences }) => experiences.length ?? 0
);

export const $educationsEntered: ReadableAtom<number> = computed(
  $education,
  ({ educations }) => educations.length ?? 0
);

export const $languagesEntered: ReadableAtom<number> = computed(
  $language,
  ({ language }) => language.otherLanguages?.length ?? 0
);

export const $skillsEntered: ReadableAtom<number> = computed(
  $skills,
  ({ skills }) => skills.length ?? 0
);

export interface FullUserData {
  [key: string]:
    | UserFormValue
    | EducationFormValue[]
    | ExperienceFormValue[]
    | LanguageFormValue
    | SkillGroup[]
    | string[];
}

export const $allEntriesSorted: ReadableAtom<FullUserData> = computed(
  [$user, $experiences, $education, $language, $skills, $settings],
  (user, experiences, educations, language, skills, settings) => {
    const { order } = settings;
    // TO DO Sort data before returning
    // Check if order[sectionKey] exists and if it does sort the arrays before returning

    const sortedData: FullUserData = {
      user: user,
      experiences: experiences.experiences,
      educations: educations.educations,
      language: {
        motherLanguage: language.language.motherLanguage,
        otherLanguages: language.language.otherLanguages,
      },
      skills: skills.skills,
      sectionsOrder: order.sections,
    };

    return sortedData;
  }
);
