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
import countriesList from "@/config/countries";

interface Props {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

export function CountrySelector({ field, placeholder = "Select" }: Props) {
  console.log(countriesList);
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="m@example.com">German</SelectItem>
        <SelectItem value="m@google.com">Not german</SelectItem>
        <SelectItem value="m@support.com">
          Other
          {/* To do expand functionality */}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
