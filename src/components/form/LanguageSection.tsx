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
import {
  LanguageLevelSelector,
  LanguageSelector,
} from "@/components/form/LanguageSelector";
import { useStore } from "@nanostores/react";
import {
  addLanguage,
  removeLanguage,
  $language,
  type LanguageSubmitFormPayload,
} from "@/stores/languageStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { content } from "@/config/content";
import { sectionClasses } from "./config";
import { ListEntryCard, ListEntryContainer, ListEntryTitle } from "./ListEntry";

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
    <div className="flex gap-10">
      {languagesStore?.language.otherLanguages &&
        languagesStore.language.otherLanguages?.length > 0 && (
          <ListEntryContainer>
            <>
              <ListEntryTitle
                entriesLength={languagesStore.language.otherLanguages.length}
              />
              {languagesStore?.language?.otherLanguages.map(
                (curLang, index: number) => {
                  return (
                    <Accordion type="single" collapsible key={curLang.language}>
                      <AccordionItem value={curLang.language}>
                        <AccordionTrigger>{curLang.language}</AccordionTrigger>
                        <AccordionContent>
                          <ListEntryCard
                            content={[
                              {
                                label: LanguageSection.LANGUAGE,
                                value: curLang.language,
                              },
                              {
                                label: LanguageSection.READING,
                                value: curLang.skills.reading,
                              },
                              {
                                label: LanguageSection.LISTENING,
                                value: curLang.skills.listening,
                              },
                              {
                                label: LanguageSection.WRITING,
                                value: curLang.skills.writing,
                              },
                            ]}
                            removeEntry={removeLanguage}
                            index={index}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }
              )}
            </>
          </ListEntryContainer>
        )}
      <div className="w-full">
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
                <FormItem className="w-full">
                  <FormLabel>{LanguageSection.MOTHER_LANGUAGES}</FormLabel>
                  <FormControl>
                    <LanguageSelector field={field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                defaultValue=""
                control={languageForm.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{LanguageSection.LANGUAGE}</FormLabel>
                    <FormControl>
                      <LanguageSelector field={field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex py-2 gap-4 w-full">
                <FormField
                  defaultValue=""
                  control={languageForm.control}
                  name="listening"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{LanguageSection.LISTENING}</FormLabel>
                      <FormControl>
                        <LanguageLevelSelector field={field} />
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
                    <FormItem className="w-full">
                      <FormLabel>{LanguageSection.READING}</FormLabel>
                      <FormControl>
                        <LanguageLevelSelector field={field} />
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
                    <FormItem className="w-full">
                      <FormLabel>{LanguageSection.WRITING}</FormLabel>
                      <FormControl>
                        <LanguageLevelSelector field={field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">{LanguageSection.SUBMIT}</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
