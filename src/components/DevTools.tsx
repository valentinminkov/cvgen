import { Button } from "@/components/ui/button";
import { resetUserData, updateUserData } from "@/stores/userStore";
import { addExperience, resetExperiences } from "@/stores/experienceStore";
import { addEducation, resetEducation } from "@/stores/educationStore";
import { addLanguage, resetLanguages } from "@/stores/languageStore";
import { addSkill, resetSkills } from "@/stores/skillsStore";
import {
  dummyEducations,
  dummyExperiences,
  dummyLanguages,
  dummySkills,
  dummyUser,
} from "@/config/dummyData";

interface Props {}

export default function TestingControl({}: Props) {
  const setDummyFormData = () => {
    updateUserData(dummyUser);
    dummyExperiences.forEach((exp) => addExperience(exp));
    dummyEducations.forEach((edu) => addEducation(edu));
    dummyLanguages.forEach((lang) => addLanguage(lang));
    dummySkills.forEach((skil) => addSkill(skil));
  };

  const clearFormData = () => {
    resetUserData();
    resetExperiences();
    resetLanguages();
    resetEducation();
    resetSkills();
  };

  return (
    <div className="pt-4 flex flex-col gap-2 opacity-10 hover:opacity-100 fixed bottom-10 right-10 bg-zinc-500 p-4">
      <h2 className="text-sm">dev tools</h2>
      <div className="flex gap-2">
        <Button type="submit" className="" onClick={(e) => setDummyFormData()}>
          Fill form
        </Button>
        <Button onClick={(e) => clearFormData()}>Clear data</Button>
      </div>
    </div>
  );
}
