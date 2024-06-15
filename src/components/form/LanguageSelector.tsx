"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import type { ControllerRenderProps } from "react-hook-form";
import { languageSkillLevels, languages } from "@/config/languages";

interface Props {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

function renderSelectValuesFromObj(obj: Object, formName: string) {
  return Object.entries(obj).map(([key, value]) => (
    <SelectItem key={`${formName}_${key}`} value={value}>
      {value}
    </SelectItem>
  ));
}
export function LanguageSelector({ field, placeholder = "Select" }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {renderSelectValuesFromObj(languages, field.name)}
      </SelectContent>
    </Select>
  );
}

export function LanguageLevelSelector({
  field,
  placeholder = "Select",
}: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {languageSkillLevels.map((skillLevel) => {
          return (
            <SelectItem key={`${field.name}_${skillLevel}`} value={skillLevel}>
              {skillLevel}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
