import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { EducationFormValue, PersistentEducationStore } from "@/types";

const $education = persistentMap<PersistentEducationStore>(
  getStoreKey("educations"),
  { educations: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addEducation(newEntry: EducationFormValue) {
  const state = $education.get();

  state.educations.push(newEntry);

  $education.set({ educations: state.educations });

  return true;
}

function removeEducation(index: number) {
  const newItems = $education.get().educations.filter((_, i) => i !== index);

  $education.set({ educations: newItems });
}

export { $education, addEducation, removeEducation };
