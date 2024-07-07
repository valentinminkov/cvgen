import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { ExperienceFormValue, PersistentExperienceStore } from "@/types";

const defaultExperiences: PersistentExperienceStore = { experiences: [] };

const $experiences = persistentMap<PersistentExperienceStore>(
  getStoreKey("experiences"),
  defaultExperiences,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addExperience(newEntry: ExperienceFormValue) {
  const state = $experiences.get();

  state.experiences.push(newEntry);

  $experiences.set({ experiences: state.experiences });

  return true;
}

function removeExperience(index: number) {
  const newItems = $experiences.get().experiences.filter((_, i) => i !== index);

  $experiences.set({ experiences: newItems });
}

function resetExperiences() {
  $experiences.set(defaultExperiences);
}

export { $experiences, addExperience, removeExperience, resetExperiences };
