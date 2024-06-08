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
import { Label } from "@/components/ui/label";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  removeSkill,
  storeSkills,
  addSkill,
  type SkillGroup,
} from "@/stores/skillsStore";

const SkillFormSchema = z.object({
  type: z.string().min(1, { message: "Skills cannot be empty" }),
  level: z.string().min(1, { message: "Level cannot be empty" }),
  skill: z.string(),
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

      <h1 className="flex flex-col gap-2 px-2">
        <Label>Skill</Label>
      </h1>
    </div>
  );
}

export default function SkillsSection() {
  const skills = useStore(storeSkills);

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

  return (
    <div>
      {skills?.skills && skills.skills?.length > 0 && (
        <div className="bg-gray-500 p-4">
          <p className="pb-4">entries</p>
          {skills?.skills?.map((curSkill, index: number) => {
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
          className="w-2/3 space-y-6"
          onSubmit={skillForm.handleSubmit(onSkillSubmit)}
        >
          <FormField
            defaultValue=""
            control={skillForm.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
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
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input placeholder="Acme" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
