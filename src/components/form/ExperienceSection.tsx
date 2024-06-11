"use client";

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
import { DatePicker } from "@/components/form/Datepicker";
import { CountrySelector } from "@/components/form/CountrySelector";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { content } from "@/config/content";

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

function ExperienceCard({
  index,
  experience: { workDescription, title, startDate, endDate, ongoing },
}: {
  index: number;
  experience: ExperienceFormValue;
}) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeExperience(index);
        }}
        className="cursor-pointer hover:opacity-50 p-2"
      >
        <CrossCircledIcon />
      </div>
      <div className="px-2 pb-2 ">
        <span>
          {startDate?.toString()}{" "}
          {ongoing ? "- ongoing" : ` - ${endDate?.toString()}`}
        </span>
      </div>

      <h1 className="flex flex-col gap-2 px-2">
        <Label>{components.ExperienceSection.COMPANY_NAME}</Label>
        {title}
      </h1>
      <p className="flex flex-col gap-2 px-2">
        <Label>{components.ExperienceSection.WORK_DESCRIPTION}</Label>
        {workDescription}
      </p>
    </div>
  );
}

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
    <div>
      {experiencesStore?.experiences.length > 0 && (
        <div className="bg-gray-500 p-4">
          <p className="pb-4">{components.ExperienceSection.ENTRIES}</p>
          {experiencesStore?.experiences.map((experience, index: number) => {
            return (
              <Accordion type="single" collapsible key={experience.title}>
                <AccordionItem value={experience.title}>
                  <AccordionTrigger>{experience.title}</AccordionTrigger>
                  <AccordionContent>
                    <ExperienceCard experience={experience} index={index} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 "
        >
          <FormField
            defaultValue=""
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>{components.ExperienceSection.LOCATION}</FormLabel>
                <FormControl>
                  <CountrySelector field={field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{components.ExperienceSection.START_DATE}</FormLabel>
                <FormControl>
                  <DatePicker placeholder="" field={field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ongoing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{components.ExperienceSection.ONGOING}</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      setIsWorkOngoing(checked);
                      field.onChange(checked);
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isWorkOngoing && (
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{components.ExperienceSection.END_DATE}</FormLabel>
                  <FormControl>
                    <DatePicker placeholder="" field={field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">{components.ExperienceSection.SUBMIT}</Button>
        </form>
      </Form>
    </div>
  );
}
