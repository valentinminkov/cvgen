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
import { continentWithCountries } from "@/config/countries";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

interface Props {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

export function CountrySelector({ field, placeholder = "Select" }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {continentWithCountries.map(({ continent, countries }) => (
          <SelectGroup>
            <SelectLabel> {continent}</SelectLabel>
            {countries.map((country) => (
              <SelectItem value={country.toLowerCase().replace(" ", "_")}>
                {country}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
