"use client";

import { sectionClasses } from "@/components/form/config";
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
  type ExperienceFormValue,
} from "@/stores/experienceStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CountrySelector } from "@/components/form/CountrySelector";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { content } from "@/config/content";
import {
  ExperienceCard,
  ExperienceCardTitle,
} from "@/components/form/ExperienceCard";
import DateRangePicker from "@/components/form/DateRangePicker";

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
  const [isWorkOngoing, setIsWorkOngoing] = useState(false);

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
    <div className="flex gap-10">
      {experiencesStore?.experiences.length > 0 && (
        <div className="bg-gray-500 p-4 w-4/12">
          <ExperienceCardTitle
            entriesLength={experiencesStore.experiences.length}
          />
          {experiencesStore?.experiences.map((experience, index: number) => {
            return (
              <Accordion type="single" collapsible key={experience.title}>
                <AccordionItem value={experience.title}>
                  <AccordionTrigger>{experience.title}</AccordionTrigger>
                  <AccordionContent>
                    <ExperienceCard
                      date={{
                        startDate: experience.startDate,
                        ongoing: experience.ongoing,
                        endDate: experience.endDate,
                      }}
                      content={[
                        {
                          value: experience.title,
                          label: components.ExperienceSection.COMPANY_NAME,
                        },
                        {
                          value: experience.workDescription,
                          label: components.EducationSection.DESCRIPTION,
                        },
                      ]}
                      removeExperience={removeExperience}
                      index={index}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={sectionClasses.form}
          >
            <div className="flex w-full gap-10">
              <FormField
                defaultValue=""
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      {components.ExperienceSection.COMPANY_NAME}
                    </FormLabel>
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
            <FormField
              control={form.control}
              name="workDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {components.ExperienceSection.WORK_DESCRIPTION}
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Work description" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DateRangePicker form={form} />
            <Button type="submit">{components.ExperienceSection.SUBMIT}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
