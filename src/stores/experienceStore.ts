import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { ExperienceFormValue, PersistentExperienceStore } from "@/types";

const $experiences = persistentMap<PersistentExperienceStore>(
  getStoreKey("experiences"),
  { experiences: [] },
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

export { $experiences, addExperience, removeExperience };
