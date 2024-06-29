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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  addSectionSkill,
  removeSkill,
  removeSectionSkill,
  $skills,
  addSkill,
} from "@/stores/skillsStore";
import { getRandomString } from "@/lib/utils";
import { content, translations } from "@/config/content";
import { sectionClasses } from "@/components/form/classes";
import { ListEntryCard, ListEntryContainer, ListEntryTitle } from "./ListEntry";
import type { SkillGroup } from "@/types";

const SkillFormSchema = z.object({
  type: z.string().min(1, { message: "Skills cannot be empty" }),
  level: z.string().min(1, { message: "Level cannot be empty" }),
  skill: z.string().optional(),
});

export default function SkillsSectionComponent() {
  const skillsStore = useStore($skills);

  const skillForm = useForm<z.infer<typeof SkillFormSchema>>({
    resolver: zodResolver(SkillFormSchema),
    defaultValues: {},
  });

  function onSkillSubmit(payload: SkillGroup) {
    const saved = addSkill(payload);
    toast({
      title: saved ? "Language saved" : "Couldn't save data.",
    });
  }

  function insertSkill(e: any, fieldValue: string | undefined) {
    if (e.key === "Enter" && fieldValue) {
      addSectionSkill(fieldValue);
      skillForm.resetField("skill");
    }
  }

  function onFormKeyDown(e: any) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  return (
    <div className={sectionClasses.sectionSplitContentContainer}>
      <div className="w-full">
        <Form {...skillForm}>
          <form
            className={sectionClasses.form}
            onSubmit={skillForm.handleSubmit(onSkillSubmit)}
            onKeyDown={onFormKeyDown}
          >
            <div className={sectionClasses.sectionCol}>
              <div className="flex w-full gap-5">
                <FormField
                  defaultValue=""
                  control={skillForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.TYPE}</FormLabel>
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
                  control={skillForm.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{translations.LEVEL}</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <div className="flex gap-4">
                  {skillsStore?.sectionSkills &&
                    skillsStore.sectionSkills.map((sectionSkill) => (
                      <div
                        key={`${sectionSkill}-${getRandomString(
                          sectionSkill.length
                        )}`}
                      >
                        <div
                          onClick={() => {
                            removeSectionSkill(sectionSkill);
                          }}
                          className="cursor-pointer hover:opacity-50 p-2 flex gap-2 "
                        >
                          <CrossCircledIcon />
                          {sectionSkill}
                        </div>
                      </div>
                    ))}
                </div>
                <FormField
                  defaultValue=""
                  control={skillForm.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{translations.SKILL}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          onKeyDown={(event) => {
                            insertSkill(event, field.value);
                          }}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={sectionClasses.controlBtnContainer}>
                <Button type="submit">{translations.SUBMIT}</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {skillsStore?.skills && skillsStore.skills?.length > 0 && (
        <ListEntryContainer>
          <div className={sectionClasses.listEntryContainerContent}>
            <ListEntryTitle entriesLength={skillsStore.skills.length} />
            <div className={sectionClasses.listEntryAccordionContainer}>
              {skillsStore?.skills?.map((curSkill, index: number) => {
                return (
                  <Accordion type="single" collapsible key={curSkill.type}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{curSkill.type}</AccordionTrigger>
                      <AccordionContent>
                        <ListEntryCard
                          index={index}
                          removeEntry={removeSkill}
                          content={[
                            {
                              label: translations.SKILL,
                              value: curSkill.type,
                            },
                            {
                              label: translations.LEVEL,
                              value: curSkill.level,
                            },
                            {
                              label: translations.SKILLS,
                              value: curSkill.skills?.join(", ") ?? "",
                            },
                          ]}
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
