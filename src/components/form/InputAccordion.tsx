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
import { inputAccordion } from "@/components/form/classes";

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

  const accordionContent = [
    {
      label: PERSONAL_DATA_SECTION,
      triggerContent: (
        <>
          {PERSONAL_DATA_SECTION}
          {isPersonalDataFilled && <p>{FILLED_MARK_PERSONAL_SECTION}</p>}
        </>
      ),
      content: <PersonalSection />,
    },
    {
      label: WORK_EXPERIENCE_SECTION,
      triggerContent: (
        <>
          {WORK_EXPERIENCE_SECTION}
          {!!experiencesEntered && (
            <div>
              {experiencesEntered} {EXPERIENCES_LABEL}
            </div>
          )}
        </>
      ),
      content: <ExperienceSection />,
    },
    {
      label: EDUCATION_TRAINING_SECTION,
      triggerContent: (
        <>
          {EDUCATION_TRAINING_SECTION}
          {!!educationsEntered && (
            <div className="text-white">
              {educationsEntered} {EDUCATIONS_LABEL}
            </div>
          )}
        </>
      ),
      content: <EducationSection />,
    },
    {
      label: LANGUAGE_TRAINING_SECTION,
      triggerContent: (
        <>
          {LANGUAGE_TRAINING_SECTION}
          {!!languagesEntered && (
            <div>
              {languagesEntered} {LANGUAGES_LABEL}
            </div>
          )}
        </>
      ),
      content: <LanguageSection />,
    },
    {
      label: JOB_SKILLS_SECTION,
      triggerContent: (
        <>
          {JOB_SKILLS_SECTION}
          {!!skillsEntered && (
            <div>
              {skillsEntered} {SKILLS_LABEL}
            </div>
          )}
        </>
      ),
      content: <SkillsSection />,
    },
  ];

  return (
    <Accordion type="single" collapsible>
      {accordionContent.map((accordionEntry) => (
        <AccordionItem
          key={accordionEntry.label}
          value={accordionEntry.label}
          className={inputAccordion.accordionItem}
        >
          <AccordionTrigger className={inputAccordion.accordionTrigger}>
            {accordionEntry.triggerContent}
          </AccordionTrigger>
          <AccordionContent>{accordionEntry.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
