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
import { $settings } from "@/stores/settingsStore";
import { sortArray } from "@/lib/utils";

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
      experiences: sortArray(experiences.experiences, order["experiences"]),
      educations: sortArray(educations.educations, order["educations"]),
      languages: {
        motherLanguage: language.language.motherLanguage,
        otherLanguages: sortArray(
          language.language.otherLanguages,
          order["languages"]
        ),
      },
      skills: sortArray(skills.skills, order["skills"]),
    };

    return sortedData;
  }
);
