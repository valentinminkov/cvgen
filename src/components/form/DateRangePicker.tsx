import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/form/Datepicker";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { content, translations } from "@/config/content";
import type { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<any>;
}

export default function DateRangePicker({ form }: Props) {
  const [isWorkOngoing, setIsWorkOngoing] = useState(false);
  const {
    content: { components },
  } = content;
  const formItemClass = "flex flex-col";
  return (
    <div className="flex items-center gap-5 ">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className={formItemClass}>
            <FormLabel>{components.DateRangePicker.START_DATE}</FormLabel>
            <FormControl>
              <DatePicker placeholder="" field={field} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ongoing"
        render={({ field }) => (
          <FormItem className={formItemClass}>
            <FormLabel>{translations.ONGOING}</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => {
                  setIsWorkOngoing(checked);
                  field.onChange(checked);
                }}
              />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {!isWorkOngoing && (
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className={formItemClass}>
              <FormLabel>{translations.END_DATE}</FormLabel>
              <FormControl>
                <DatePicker placeholder="" field={field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
