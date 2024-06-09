import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";

export interface ExperienceFormValue {
  title: string;
  country: string;
  workDescription: string;
  startDate: Date;
  ongoing?: boolean;
  endDate?: Date;
}

type PersistentExperienceStore = Record<string, any> & {
  experiences: ExperienceFormValue[];
};

const storeExperiences = persistentMap<PersistentExperienceStore>(
  getStoreKey("experience"),
  { experiences: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addExperience(newEntry: ExperienceFormValue) {
  const state = storeExperiences.get();

  state.experiences.push(newEntry);

  storeExperiences.set({ experiences: state.experiences });

  return true;
}

function removeExperience(index: number) {
  const newItems = storeExperiences
    .get()
    .experiences.filter((_, i) => i !== index);

  storeExperiences.set({ experiences: newItems });
}

export { storeExperiences, addExperience, removeExperience };
