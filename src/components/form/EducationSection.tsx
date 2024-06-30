"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sectionClasses } from "@/components/form/classes";
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
  $education,
  addEducation,
  removeEducation,
} from "@/stores/educationStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountrySelector } from "@/components/form/CountrySelector";
import { Textarea } from "@/components/ui/textarea";
import { content, translations } from "@/config/content";
import { ListEntryCard, ListEntryContainer, ListEntryTitle } from "./ListEntry";
import DateRangePicker from "@/components/form/DateRangePicker";
import type { EducationFormValue } from "@/types";

const {
  content: {
    components: { EducationSection },
  },
} = content;

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name is invalid",
  }),
  startDate: z.date(),
  website: z.string().min(2, { message: "Must be at least 2 characters" }),
  country: z
    .string()
    .min(2, {
      message: "Country must be a country that is a country",
    })
    .optional(),
  city: z.string().min(2, { message: "City must be a city" }).optional(),
  description: z.string().min(2, {
    message: "Must be at least 2 characters",
  }),
  endDate: z.date().optional(),
  ongoing: z.boolean().optional(),
});

export default function EducationSectionComponent() {
  const educationStore = useStore($education);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: EducationFormValue) {
    const saved = addEducation(data);
    toast({
      title: saved ? "Saved" : "Couldn't save data.",
    });
  }

  return (
    <div className={sectionClasses.sectionSplitContentContainer}>
      <div className={`w-full`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={sectionClasses.form}
          >
            <div className={sectionClasses.sectionCol}>
              <div className={`flex gap-10 w-full `}>
                <FormField
                  defaultValue=""
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.TITLE}</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  defaultValue=""
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.NAME}</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-10 w-full">
                <FormField
                  defaultValue=""
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.WEBSITE}</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
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
                      <FormLabel>{translations.COUNTRY}</FormLabel>
                      <FormControl>
                        <CountrySelector field={field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-10 w-full">
                <FormField
                  defaultValue=""
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.CITY}</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.DESCRIPTION}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DateRangePicker form={form} />
              <div className={sectionClasses.controlBtnContainer}>
                <Button type="submit">{translations.SUBMIT}</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {educationStore?.educations.length > 0 && (
        <ListEntryContainer>
          <div className={sectionClasses.listEntryContainerContent}>
            <ListEntryTitle entriesLength={educationStore.educations.length} />
            <div className={sectionClasses.listEntryAccordionContainer}>
              {educationStore?.educations.map((education, index: number) => {
                return (
                  <Accordion type="single" collapsible key={education.title}>
                    <AccordionItem value={education.name}>
                      <AccordionTrigger>{education.title}</AccordionTrigger>
                      <AccordionContent>
                        <ListEntryCard
                          date={{
                            endDate: education.endDate,
                            ongoing: education.ongoing,
                            startDate: education.startDate,
                          }}
                          removeEntry={removeEducation}
                          content={[
                            {
                              label: EducationSection.TITLE,
                              value: education.title,
                            },
                            {
                              label: EducationSection.DESCRIPTION,
                              value: education.description,
                            },
                          ]}
                          index={index}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </ListEntryContainer>
      )}
    </div>
  );
}
