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

  const accordionTriggerLabel = (
    label: string,
    sublabel: string,
    sublabelType: "success" | "normal" = "normal"
  ) => {
    const accordionClassesTriggerClasses = "text-base";
    const accordionTriggerLabelClasses = {
      success: "text-sm text-emerald-500",
      normal: "text-sm text-blue-200",
    };
    return (
      <>
        <p className={accordionClassesTriggerClasses}>{label}</p>
        {isPersonalDataFilled && (
          <p className={accordionTriggerLabelClasses[sublabelType]}>
            {sublabel}
          </p>
        )}
      </>
    );
  };

  const accordionContent = [
    {
      label: PERSONAL_DATA_SECTION,
      triggerContent: accordionTriggerLabel(
        PERSONAL_DATA_SECTION,
        FILLED_MARK_PERSONAL_SECTION,
        "success"
      ),
      content: <PersonalSection />,
    },
    {
      label: WORK_EXPERIENCE_SECTION,
      triggerContent: accordionTriggerLabel(
        WORK_EXPERIENCE_SECTION,
        !!experiencesEntered ? `${experiencesEntered} ${EXPERIENCES_LABEL}` : ""
      ),
      content: <ExperienceSection />,
    },
    {
      label: EDUCATION_TRAINING_SECTION,
      triggerContent: accordionTriggerLabel(
        EDUCATION_TRAINING_SECTION,
        !!educationsEntered ? `${educationsEntered} ${EDUCATIONS_LABEL}` : ""
      ),
      content: <EducationSection />,
    },
    {
      label: LANGUAGE_TRAINING_SECTION,
      triggerContent: accordionTriggerLabel(
        LANGUAGE_TRAINING_SECTION,
        !!languagesEntered ? `${languagesEntered} ${LANGUAGES_LABEL}` : ""
      ),
      content: <LanguageSection />,
    },
    {
      label: JOB_SKILLS_SECTION,
      triggerContent: accordionTriggerLabel(
        JOB_SKILLS_SECTION,
        !!skillsEntered ? `${skillsEntered} ${SKILLS_LABEL}` : ""
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
          <AccordionTrigger
            className={`${inputAccordion.accordionTrigger} font-semibold`}
          >
            {accordionEntry.triggerContent}
          </AccordionTrigger>
          <AccordionContent className="p-4 rounded-b-md">
            {accordionEntry.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
