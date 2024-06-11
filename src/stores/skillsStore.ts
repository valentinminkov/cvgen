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

const $skills = persistentMap<PersistentSkillsStore>(
  getStoreKey("skills"),
  { skills: [], sectionSkills: [] },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

function addSkill(newEntry: SkillGroup) {
  const state = $skills.get();

  const newSkill: SkillGroup = { ...newEntry, skills: state.sectionSkills };

  $skills.set({ skills: [...state.skills, newSkill], sectionSkills: [] });

  return true;
}

function removeSkill(index: number) {
  const skillsObj = $skills.get();
  const newItems = skillsObj.skills.filter((_, i) => i !== index);

  $skills.set({ skills: newItems, sectionSkills: skillsObj.sectionSkills });
}

function addSectionSkill(sectionSkill: string) {
  const skillsObj = $skills.get();

  if (!skillsObj.sectionSkills.includes(sectionSkill)) {
    $skills.set({
      skills: skillsObj.skills,
      sectionSkills: [...skillsObj.sectionSkills, sectionSkill],
    });
  } else {
    toast({ title: "Skill already exists." });
  }
}

function removeSectionSkill(sectionSkillForRemoval: string) {
  const skillsObj = $skills.get();
  $skills.set({
    skills: skillsObj.skills,
    sectionSkills: skillsObj.sectionSkills.filter(
      (curSectionSkill) => sectionSkillForRemoval !== curSectionSkill
    ),
  });
}

function resetSectionSkills() {
  $skills.set({ skills: $skills.get().skills, sectionSkills: [] });
}
export {
  $skills,
  addSkill,
  removeSkill,
  type SkillGroup,
  addSectionSkill,
  removeSectionSkill,
  resetSectionSkills,
};
