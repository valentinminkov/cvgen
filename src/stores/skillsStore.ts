import { persistentMap } from "@nanostores/persistent";
import { toast } from "@/components/ui/use-toast";
import { getStoreKey } from "@/stores/config";

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
  sectionSkills: string[];
};

const storeSkills = persistentMap<PersistentSkillsStore>(
  getStoreKey("skills"),
  { skills: [], sectionSkills: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addSkill(newEntry: SkillGroup) {
  const state = storeSkills.get();

  const newSkill: SkillGroup = { ...newEntry, skills: state.sectionSkills };

  storeSkills.set({ skills: [...state.skills, newSkill], sectionSkills: [] });

  return true;
}

function removeSkill(index: number) {
  const skillsObj = storeSkills.get();
  const newItems = skillsObj.skills.filter((_, i) => i !== index);

  storeSkills.set({ skills: newItems, sectionSkills: skillsObj.sectionSkills });
}

function addSectionSkill(sectionSkill: string) {
  const skillsObj = storeSkills.get();

  if (!skillsObj.sectionSkills.includes(sectionSkill)) {
    storeSkills.set({
      skills: skillsObj.skills,
      sectionSkills: [...skillsObj.sectionSkills, sectionSkill],
    });
  } else {
    toast({ title: "Skill already exists." });
  }
}

function removeSectionSkill(sectionSkillForRemoval: string) {
  const skillsObj = storeSkills.get();
  storeSkills.set({
    skills: skillsObj.skills,
    sectionSkills: skillsObj.sectionSkills.filter(
      (curSectionSkill) => sectionSkillForRemoval !== curSectionSkill
    ),
  });
}

function resetSectionSkills() {
  storeSkills.set({ skills: storeSkills.get().skills, sectionSkills: [] });
}
export {
  storeSkills,
  addSkill,
  removeSkill,
  type SkillGroup,
  addSectionSkill,
  removeSectionSkill,
  resetSectionSkills,
};
