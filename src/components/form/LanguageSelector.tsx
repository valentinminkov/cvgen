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
import { languages } from "@/config/languages";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface Props {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

function renderSelect(formName: string) {
  return Object.entries(languages).map(([key, value]) => (
    <SelectItem key={`${formName}_${key}`} value={value}>
      {value}
    </SelectItem>
  ));
}
export default function LanguageSelector({
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
      <SelectContent>{renderSelect(field.name)}</SelectContent>
    </Select>
  );
}
