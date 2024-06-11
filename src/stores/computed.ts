import { computed, type ReadableAtom } from "nanostores";
import { $user } from "@/stores/userStore";
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
