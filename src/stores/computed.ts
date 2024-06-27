import { computed, type ReadableAtom } from "nanostores";
import { $user } from "@/stores/userStore";
import {
  type EducationFormValue,
  type ExperienceFormValue,
  type LanguageFormValue,
  type SkillGroup,
  type UserFormValue,
} from "@/types";
import { $experiences } from "@/stores/experienceStore";
import { $education } from "@/stores/educationStore";
import { $language } from "@/stores/languageStore";
import { $skills } from "@/stores/skillsStore";

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
  [$user, $experiences, $education, $language, $skills],
  (user, experiences, educations, language, skills) => {
    // TO DO Sort data before returning
    // Check if order[sectionKey] exists and if it does sort the arrays before returning

    const sortedData: FullUserData = {
      user: user,
      experiences: experiences.experiences,
      educations: educations.educations,
      languages: {
        motherLanguage: language.language.motherLanguage,
        otherLanguages: language.language.otherLanguages,
      },
      skills: skills.skills,
    };

    return sortedData;
  }
);
