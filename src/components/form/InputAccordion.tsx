"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonalSection from "@/components/form/PersonalSection";
import ExperienceSection from "@/components/form/ExperienceSection";
import EducationSection from "@/components/form/EducationSection";
import LanguageSection from "@/components/form/LanguageSection";
import SkillsSection from "@/components/form/SkillsSection";
import { content } from "@/config/content";
import {
  $skillsEntered,
  $educationsEntered,
  $experiencesEntered,
  $isPersonalDataFilled,
  $languagesEntered,
} from "@/stores/computed";
import { useStore } from "@nanostores/react";

export default function InputAccordion() {
  const skillsEntered = useStore($skillsEntered);
  const educationsEntered = useStore($educationsEntered);
  const experiencesEntered = useStore($experiencesEntered);
  const isPersonalDataFilled = useStore($isPersonalDataFilled);
  const languagesEntered = useStore($languagesEntered);

  const {
    content: {
      components: {
        InputAccordion: {
          PERSONAL_DATA_SECTION,
          WORK_EXPERIENCE_SECTION,
          EDUCATION_TRAINING_SECTION,
          LANGUAGE_TRAINING_SECTION,
          JOB_SKILLS_SECTION,
          FILLED_MARK_PERSONAL_SECTION,
          SKILLS_LABEL,
          LANGUAGES_LABEL,
          EDUCATIONS_LABEL,
          EXPERIENCES_LABEL,
        },
      },
    },
  } = content;

  return (
    <Accordion type="single" collapsible>
      {/* Personal data */}
      <AccordionItem value={PERSONAL_DATA_SECTION}>
        <AccordionTrigger>
          {PERSONAL_DATA_SECTION}
          {isPersonalDataFilled && <p>{FILLED_MARK_PERSONAL_SECTION}</p>}
        </AccordionTrigger>
        <AccordionContent>
          <PersonalSection />
        </AccordionContent>
      </AccordionItem>
      {/* Work experience */}
      <AccordionItem value={WORK_EXPERIENCE_SECTION}>
        <AccordionTrigger>
          {WORK_EXPERIENCE_SECTION}
          {!!experiencesEntered && (
            <div>
              {experiencesEntered} {EXPERIENCES_LABEL}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <ExperienceSection />
        </AccordionContent>
      </AccordionItem>
      {/* Education and training */}
      <AccordionItem value={EDUCATION_TRAINING_SECTION}>
        <AccordionTrigger>
          {EDUCATION_TRAINING_SECTION}
          {!!educationsEntered && (
            <div>
              {educationsEntered} {EDUCATIONS_LABEL}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <EducationSection />
        </AccordionContent>
      </AccordionItem>
      {/* Language skills */}
      <AccordionItem value={LANGUAGE_TRAINING_SECTION}>
        <AccordionTrigger>
          {LANGUAGE_TRAINING_SECTION}
          {!!languagesEntered && (
            <div>
              {languagesEntered} {LANGUAGES_LABEL}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <LanguageSection />
        </AccordionContent>
      </AccordionItem>
      {/* Job skills */}
      <AccordionItem value={JOB_SKILLS_SECTION}>
        <AccordionTrigger>
          {JOB_SKILLS_SECTION}
          {!!skillsEntered && (
            <div>
              {skillsEntered} {SKILLS_LABEL}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <SkillsSection />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
