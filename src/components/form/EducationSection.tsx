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
  storeEducation,
  addEducation,
  removeEducation,
  type EducationFormValue,
} from "@/stores/educationStore";
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
  description: z
    .string()
    .min(2, {
      message: "Must be at least 2 characters",
    })
    .optional(),
  endDate: z.date().optional(),
  ongoing: z.boolean().optional(),
});

// To DO Share with Experience Secion Card
function EntryCard({
  index,
  entry: { description, title, country, name, startDate, endDate, ongoing },
}: {
  index: number;
  entry: EducationFormValue;
}) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeEducation(index);
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
        <Label>Title</Label>
        {title}
      </h1>
      <p className="flex flex-col gap-2 px-2">
        <Label>Description</Label>
        {description}
      </p>
    </div>
  );
}

export default function EducationSection() {
  const [isWorkOngoing, setIsWorkOngoing] = useState(false);

  const education = useStore(storeEducation);
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
    <div>
      {education?.education.length > 0 && (
        <div className="bg-gray-500 p-4">
          <p className="pb-4">entries</p>
          {education?.education.map((education, index: number) => {
            return (
              <Accordion type="single" collapsible key={education.title}>
                <AccordionItem value={education.name}>
                  <AccordionTrigger>{education.title}</AccordionTrigger>
                  <AccordionContent>
                    <EntryCard entry={education} index={index} />
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
                <FormLabel>Title</FormLabel>
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
              <FormItem>
                <FormLabel>Name</FormLabel>
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
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
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelector field={field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            defaultValue=""
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
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
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
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
                <FormLabel>Start date</FormLabel>
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
                <FormLabel>Ongoing</FormLabel>
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
                  <FormLabel>End date</FormLabel>
                  <FormControl>
                    <DatePicker placeholder="" field={field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
