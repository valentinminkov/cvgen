"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonalSection from "@/components/form/PersonalSection";

export function InputAccordion() {
  return (
    <Accordion type="single" collapsible>
      {/* Personal data */}
      <AccordionItem value="item-1">
        <AccordionTrigger>Personal data</AccordionTrigger>
        <AccordionContent>
          <PersonalSection />
        </AccordionContent>
      </AccordionItem>
      {/* Work experience */}
      <AccordionItem value="item-2">
        <AccordionTrigger>Work Experience</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur .
        </AccordionContent>
      </AccordionItem>
      {/* Education and training */}
      <AccordionItem value="item-3">
        <AccordionTrigger>Education and training</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur .
        </AccordionContent>
      </AccordionItem>
      {/* Language skills */}
      <AccordionItem value="item-4">
        <AccordionTrigger>Language skills</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur
        </AccordionContent>
      </AccordionItem>
      {/* Job skills */}
      <AccordionItem value="item-5">
        <AccordionTrigger>Job skills</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}