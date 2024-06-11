import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";

export interface EducationFormValue {
  title: string;
  name: string;
  startDate: Date;
  website?: string;
  country?: string;
  city?: string;
  description?: string;
  ongoing?: boolean;
  endDate?: Date;
}

type PersistentEducationStore = Record<string, any> & {
  educations: EducationFormValue[];
};

const $education = persistentMap<PersistentEducationStore>(
  getStoreKey("education"),
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
