import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { EducationFormValue, PersistentEducationStore } from "@/types";

const educationDefault: PersistentEducationStore = { educations: [] };

const $education = persistentMap<PersistentEducationStore>(
  getStoreKey("educations"),
  educationDefault,
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

function resetEducation() {
  $education.set(educationDefault);
}

export { $education, addEducation, removeEducation, resetEducation };
