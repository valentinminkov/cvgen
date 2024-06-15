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
  type SkillGroup,
} from "@/stores/skillsStore";
import { getRandomString } from "@/lib/utils";
import { content } from "@/config/content";
import { sectionClasses } from "@/components/form/config";

const {
  content: {
    components: { SkillsSection },
  },
} = content;

const SkillFormSchema = z.object({
  type: z.string().min(1, { message: "Skills cannot be empty" }),
  level: z.string().min(1, { message: "Level cannot be empty" }),
  skill: z.string().optional(),
});

function SkillsCard({ index, skill }: { index: number; skill: SkillGroup }) {
  return (
    <div className="bg-gray-600 p-5 flex flex-col gap-6">
      <div
        onClick={() => {
          removeSkill(index);
        }}
        className="cursor-pointer hover:opacity-50 p-2"
      >
        <CrossCircledIcon />
      </div>

      <h1>
        {skill.type} {SkillsSection.SKILL}
      </h1>
      <h2>
        {SkillsSection.LEVEL}: {skill.level}
      </h2>
      <div>
        {skill.skills?.map((curSkill) => (
          <div key={curSkill}>{curSkill}</div>
        ))}
      </div>
    </div>
  );
}

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
    <div>
      {skillsStore?.skills && skillsStore.skills?.length > 0 && (
        <div className="bg-gray-500 p-4">
          <p className="pb-4">{SkillsSection.ENTRIES}</p>
          {skillsStore?.skills?.map((curSkill, index: number) => {
            return (
              <Accordion type="single" collapsible key={curSkill.type}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{curSkill.type}</AccordionTrigger>
                  <AccordionContent>
                    <SkillsCard skill={curSkill} index={index} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      )}
      <Form {...skillForm}>
        <form
          className={sectionClasses.form}
          onSubmit={skillForm.handleSubmit(onSkillSubmit)}
          onKeyDown={onFormKeyDown}
        >
          <FormField
            defaultValue=""
            control={skillForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{SkillsSection.TYPE}</FormLabel>
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
              <FormItem>
                <FormLabel>{SkillsSection.LEVEL}</FormLabel>
                <FormControl>
                  <Input placeholder="Acme" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
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
                    className="cursor-pointer hover:opacity-50 p-2"
                  >
                    <CrossCircledIcon />

                    {sectionSkill}
                  </div>
                </div>
              ))}
            <FormField
              defaultValue=""
              control={skillForm.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{SkillsSection.SKILL}</FormLabel>
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
          <Button type="submit">{SkillsSection.SUBMIT}</Button>
        </form>
      </Form>
    </div>
  );
}
