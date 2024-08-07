"use client";

import { sectionClasses } from "@/components/form/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@nanostores/react";
import {
  $experiences,
  addExperience,
  removeExperience,
} from "@/stores/experienceStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountrySelector } from "@/components/form/CountrySelector";
import { Textarea } from "@/components/ui/textarea";
import { content, translations } from "@/config/content";
import {
  ListEntryCard,
  ListEntryContainer,
  ListEntryTitle,
} from "@/components/form/ListEntry";
import DateRangePicker from "@/components/form/DateRangePicker";
import type { ExperienceFormValue } from "@/types";

const {
  content: { components },
} = content;
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be a country that is a country",
  }),
  workDescription: z.string().min(2, {
    message: "Must be at least 2 characters",
  }),
  startDate: z.date(),
  endDate: z.date().optional(),
  ongoing: z.boolean().optional(),
});

export default function ExperienceSection() {
  const experiencesStore = useStore($experiences);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: ExperienceFormValue) {
    const saved = addExperience(data);
    toast({
      title: saved ? "Saved" : "Couldn't save data.",
    });
  }

  return (
    <div className={sectionClasses.sectionSplitContentContainer}>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={sectionClasses.form}
          >
            <div className={`flex w-full gap-10 ${sectionClasses.sectionCol}`}>
              <FormField
                defaultValue=""
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{translations.COMPANY_NAME}</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {components.ExperienceSection.LOCATION}
                    </FormLabel>
                    <FormControl>
                      <CountrySelector field={field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={sectionClasses.sectionCol}>
              <FormField
                control={form.control}
                name="workDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translations.WORK_DESCRIPTION}</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Work description" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DateRangePicker form={form} />
              <div className={sectionClasses.controlBtnContainer}>
                <Button type="submit">{translations.SUBMIT}</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <ListEntryContainer>
        <>
          {experiencesStore?.experiences.length > 0 && (
            <div className={sectionClasses.listEntryContainerContent}>
              <ListEntryTitle
                entriesLength={experiencesStore.experiences.length}
              />
              <div className={`${sectionClasses.listEntryAccordionContainer}`}>
                {experiencesStore?.experiences.map(
                  (experience, index: number) => {
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={experience.title}
                      >
                        <AccordionItem value={experience.title}>
                          <AccordionTrigger>
                            {experience.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ListEntryCard
                              date={{
                                startDate: experience.startDate,
                                ongoing: experience.ongoing,
                                endDate: experience.endDate,
                              }}
                              content={[
                                {
                                  value: experience.title,
                                  label: translations.COMPANY_NAME,
                                },
                                {
                                  value: experience.workDescription,
                                  label: translations.DESCRIPTION,
                                },
                              ]}
                              removeEntry={removeExperience}
                              index={index}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </>
      </ListEntryContainer>
    </div>
  );
}
