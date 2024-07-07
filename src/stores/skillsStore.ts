import { persistentMap } from "@nanostores/persistent";
import { toast } from "@/components/ui/use-toast";
import { getStoreKey } from "@/stores/config";
import type { PersistentSkillsStore, SkillGroup } from "@/types";

const defaultSkills: PersistentSkillsStore = { skills: [], sectionSkills: [] };

const $skills = persistentMap<PersistentSkillsStore>(
  getStoreKey("skills"),
  defaultSkills,
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

function resetSkills() {
  $skills.set(defaultSkills);
}

export {
  $skills,
  addSkill,
  removeSkill,
  addSectionSkill,
  removeSectionSkill,
  resetSectionSkills,
  resetSkills,
};
