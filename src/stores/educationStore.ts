import { persistentMap } from "@nanostores/persistent";

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
  education: EducationFormValue[];
};

const storeEducation = persistentMap<PersistentEducationStore>(
  "education_",
  { education: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addEducation(newEntry: EducationFormValue) {
  const state = storeEducation.get();

  state.education.push(newEntry);

  storeEducation.set({ education: state.education });

  return true;
}

function removeEducation(index: number) {
  const newItems = storeEducation.get().education.filter((_, i) => i !== index);

  storeEducation.set({ education: newItems });
}

export { storeEducation, addEducation, removeEducation };
