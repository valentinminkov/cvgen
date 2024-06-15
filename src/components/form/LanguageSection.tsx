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
  addLanguage,
  removeLanguage,
  $language,
  type Language,
  type LanguageSubmitFormPayload,
} from "@/stores/languageStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { content } from "@/config/content";
import { sectionClasses } from "./config";

const {
  content: {
    components: { LanguageSection },
  },
} = content;

const LanguageFormSchema = z.object({
  motherLanguage: z.string(),
  language: z.string().min(1, { message: "Language cannot be empty" }),
  listening: z.string(),
  reading: z.string(),
  writing: z.string(),
});

function LanguageCard({
  index,
  language: { skills, language },
}: {
  index: number;
  language: Language;
}) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeLanguage(index);
        }}
        className="cursor-pointer hover:opacity-50 p-2"
      >
        <CrossCircledIcon />
      </div>

      <h1 className="flex flex-col gap-2 px-2">
        <Label>{LanguageSection.LANGUAGE}</Label>
        {language}
      </h1>
      <p className="flex flex-col gap-2 px-2">
        {LanguageSection.LANGUAGE}: {skills.listening}
      </p>
      <p className="flex flex-col gap-2 px-2">
        {LanguageSection.READING}: {skills.reading}
      </p>
      <p className="flex flex-col gap-2 px-2">
        {LanguageSection.WRITING}: {skills.writing}
      </p>
    </div>
  );
}

export default function LanguageSectionComponent() {
  const languagesStore = useStore($language);

  const languageForm = useForm<z.infer<typeof LanguageFormSchema>>({
    resolver: zodResolver(LanguageFormSchema),
    defaultValues: {},
  });

  function onLanguageSubmit(payload: LanguageSubmitFormPayload) {
    const saved = addLanguage(payload);
    toast({
      title: saved ? "Language saved" : "Couldn't save data.",
    });
  }

  return (
    <div>
      {languagesStore?.language.otherLanguages &&
        languagesStore.language.otherLanguages?.length > 0 && (
          <div className="bg-gray-500 p-4">
            <p className="pb-4">{LanguageSection.ENTRIES}</p>
            {languagesStore?.language?.otherLanguages.map(
              (curLang, index: number) => {
                return (
                  <Accordion type="single" collapsible key={curLang.language}>
                    <AccordionItem value={curLang.language}>
                      <AccordionTrigger>{curLang.language}</AccordionTrigger>
                      <AccordionContent>
                        <LanguageCard language={curLang} index={index} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }
            )}
          </div>
        )}
      <Form {...languageForm}>
        <form
          className={sectionClasses.form}
          onSubmit={languageForm.handleSubmit(onLanguageSubmit)}
        >
          <FormField
            defaultValue={languagesStore.language.motherLanguage}
            control={languageForm.control}
            name="motherLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LanguageSection.MOTHER_LANGUAGES}</FormLabel>
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
            control={languageForm.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LanguageSection.LANGUAGE}</FormLabel>
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
            control={languageForm.control}
            name="listening"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LanguageSection.LISTENING}</FormLabel>
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
            control={languageForm.control}
            name="reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LanguageSection.READING}</FormLabel>
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
            control={languageForm.control}
            name="writing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{LanguageSection.WRITING}</FormLabel>
                <FormControl>
                  <Input placeholder="Acme" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{LanguageSection.SUBMIT}</Button>
        </form>
      </Form>
    </div>
  );
}
