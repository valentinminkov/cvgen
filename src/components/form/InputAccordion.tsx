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
import { $isPersonalDataFilled } from "@/stores/computed";
import { useStore } from "@nanostores/react";

export default function InputAccordion() {
  const isPersonalDataFilled = useStore($isPersonalDataFilled);

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
        <AccordionTrigger>{WORK_EXPERIENCE_SECTION}</AccordionTrigger>
        <AccordionContent>
          <ExperienceSection />
        </AccordionContent>
      </AccordionItem>
      {/* Education and training */}
      <AccordionItem value={EDUCATION_TRAINING_SECTION}>
        <AccordionTrigger>{EDUCATION_TRAINING_SECTION}</AccordionTrigger>
        <AccordionContent>
          <EducationSection />
        </AccordionContent>
      </AccordionItem>
      {/* Language skills */}
      <AccordionItem value={LANGUAGE_TRAINING_SECTION}>
        <AccordionTrigger>{LANGUAGE_TRAINING_SECTION}</AccordionTrigger>
        <AccordionContent>
          <LanguageSection />
        </AccordionContent>
      </AccordionItem>
      {/* Job skills */}
      <AccordionItem value={JOB_SKILLS_SECTION}>
        <AccordionTrigger>{JOB_SKILLS_SECTION}</AccordionTrigger>
        <AccordionContent>
          <SkillsSection />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
