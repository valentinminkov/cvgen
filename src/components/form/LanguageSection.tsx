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
import { toast } from "@/components/ui/use-toast";
import {
  LanguageLevelSelector,
  LanguageSelector,
} from "@/components/form/LanguageSelector";
import { useStore } from "@nanostores/react";
import { addLanguage, removeLanguage, $language } from "@/stores/languageStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { content, translations } from "@/config/content";
import { sectionClasses } from "./classes";
import { ListEntryCard, ListEntryContainer, ListEntryTitle } from "./ListEntry";
import type { LanguageSubmitFormPayload } from "@/types";

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
    <div className={sectionClasses.sectionSplitContentContainer}>
      <div className="w-full">
        <Form {...languageForm}>
          <form
            className={sectionClasses.form}
            onSubmit={languageForm.handleSubmit(onLanguageSubmit)}
          >
            <div className={sectionClasses.sectionCol}>
              <FormField
                defaultValue={languagesStore.language.motherLanguage}
                control={languageForm.control}
                name="motherLanguage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{translations.MOTHER_LANGUAGES}</FormLabel>
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
                      <FormLabel>{translations.LANGUAGE}</FormLabel>
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
                        <FormLabel>{translations.LISTENING}</FormLabel>
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
                        <FormLabel>{translations.READING}</FormLabel>
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
                        <FormLabel>{translations.WRITING}</FormLabel>
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
              <div className={sectionClasses.controlBtnContainer}>
                <Button type="submit">{translations.SUBMIT}</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {languagesStore?.language.otherLanguages &&
        languagesStore.language.otherLanguages?.length > 0 && (
          <ListEntryContainer>
            <div className={sectionClasses.listEntryContainerContent}>
              <ListEntryTitle
                entriesLength={languagesStore.language.otherLanguages.length}
              />
              <div className={sectionClasses.listEntryAccordionContainer}>
                {languagesStore?.language?.otherLanguages.map(
                  (curLang, index: number) => {
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={curLang.language}
                      >
                        <AccordionItem value={curLang.language}>
                          <AccordionTrigger>
                            {curLang.language}
                          </AccordionTrigger>
                          <AccordionContent>
                            <ListEntryCard
                              content={[
                                {
                                  label: translations.LANGUAGE,
                                  value: curLang.language,
                                },
                                {
                                  label: translations.READING,
                                  value: curLang.skills.reading,
                                },
                                {
                                  label: translations.LISTENING,
                                  value: curLang.skills.listening,
                                },
                                {
                                  label: translations.WRITING,
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
              </div>
            </div>
          </ListEntryContainer>
        )}
    </div>
  );
}
