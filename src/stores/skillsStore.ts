import { persistentMap } from "@nanostores/persistent";

interface SkillGroup {
  type: string;
  level: string;
  skills?: string[];
}

export interface SkillsFormValue {
  skills: SkillGroup[];
}

type PersistentSkillsStore = Record<string, any> & {
  skills: SkillGroup[];
};

const storeSkills = persistentMap<PersistentSkillsStore>(
  "skills_",
  { skills: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addSkill(newEntry: SkillGroup) {
  const state = storeSkills.get();

  state.experiences.push(newEntry);

  storeSkills.set({ skills: state.skills });

  return true;
}

function removeSkill(index: number) {
  const newItems = storeSkills.get().skills.filter((_, i) => i !== index);

  storeSkills.set({ skills: newItems });
}

export { storeSkills, addSkill, removeSkill, type SkillGroup };
