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
import { translations } from "@/config/content";
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

  const accordionTriggerLabel = (
    label: string,
    sublabel: string,
    sublabelType: "success" | "normal" = "normal"
  ) => {
    const accordionClassesTriggerClasses = "text-base";
    const accordionTriggerLabelClasses = {
      success: "text-base bg-zinc-600 rounded-md p-2 text-amber-200",
      normal: "text-base bg-zinc-600 p-2 rounded-md text-amber-200",
      container: "min-w-96 flex justify-end",
    };
    return (
      <>
        <p className={accordionClassesTriggerClasses}>{label}</p>
        {isPersonalDataFilled && (
          <div className={accordionTriggerLabelClasses.container}>
            <p className={accordionTriggerLabelClasses[sublabelType]}>
              {sublabel}
            </p>
          </div>
        )}
      </>
    );
  };

  const accordionContent = [
    {
      label: translations.PERSONAL_INFORMATION,
      triggerContent: accordionTriggerLabel(
        translations.PERSONAL_INFORMATION,
        translations.FILLED,
        "success"
      ),
      content: <PersonalSection />,
    },
    {
      label: translations.EXPERIENCES,
      triggerContent: accordionTriggerLabel(
        translations.WORK_EXPERIENCE,
        !!experiencesEntered
          ? `${experiencesEntered} ${translations.EXPERIENCES}`
          : ""
      ),
      content: <ExperienceSection />,
    },
    {
      label: translations.EDUCATIONS,
      triggerContent: accordionTriggerLabel(
        translations.EDUCATIONS,
        !!educationsEntered
          ? `${educationsEntered} ${translations.EDUCATIONS}`
          : ""
      ),
      content: <EducationSection />,
    },
    {
      label: translations.LANGUAGE_TRAINING,
      triggerContent: accordionTriggerLabel(
        translations.LANGUAGE_TRAINING,
        !!languagesEntered ? `${languagesEntered} ${translations.LANGUAGE}` : ""
      ),
      content: <LanguageSection />,
    },
    {
      label: translations.JOB_SKILLS,
      triggerContent: accordionTriggerLabel(
        translations.JOB_SKILLS,
        !!skillsEntered ? `${skillsEntered} ${translations.SKILLS}` : ""
      ),
      content: <SkillsSection />,
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="flex flex-col gap-2 bg-slate-700 p-12 rounded-md"
    >
      {accordionContent.map((accordionEntry) => (
        <AccordionItem
          key={accordionEntry.label}
          value={accordionEntry.label}
          className={`${inputAccordion.accordionItem} border-b-slate-600`}
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
