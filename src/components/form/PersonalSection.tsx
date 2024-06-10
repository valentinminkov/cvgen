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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/form/Datepicker";
import { CountrySelector } from "@/components/form/CountrySelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { nationalities } from "@/config/nationalities";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@nanostores/react";
import { $user, updateUserData } from "@/stores/userStore";
import { content } from "@/config/content";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  secondName: z.string().min(2, {
    message: "",
  }),
  aboutMe: z.string().optional(),
  dateOfBirth: z.date(),
  gender: z.string(),
  nationality: z.string(),
  email: z.string().min(2, {
    message: "Email must be an email",
  }),
  phoneNumber: z.string(),
  // to do social media
  // to do instant messaging
  website: z.string(),
  addressType: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  postCode: z.string(),
  city: z.string(),
  country: z.string(),
});

export default function PersonalSection() {
  const {
    content: {
      components: { PersonalSection },
    },
  } = content;
  const userStore = useStore($user);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const saved = updateUserData(data);
    toast({
      title: saved ? "Saved" : "Couldn't save data.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
        <FormField
          defaultValue={userStore.firstName}
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.FIRST_NAME}</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.secondName}
          control={form.control}
          name="secondName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.SECOND_NAME}</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.aboutMe}
          control={form.control}
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.ABOUT}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla qui rem necessitatibus porro eveniet commodi officiis nam, quam atque quisquam non illo similique laudantium eius beatae quibusdam consequuntur explicabo error."
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={
            typeof userStore.dateOfBirth === "string"
              ? new Date(userStore.dateOfBirth)
              : undefined
          }
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.DATE_OF_BIRTH}</FormLabel>
              <FormControl>
                <DatePicker placeholder="01/08/1935" field={field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          defaultValue={userStore.gender}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.GENDER}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{PersonalSection.MALE}</SelectItem>
                  <SelectItem value="female">
                    {PersonalSection.FEMALE}
                  </SelectItem>
                  <SelectItem value="other">{PersonalSection.OTHER}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.nationality}
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.NATIONALITY}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.email}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.EMAIL_ADDRESS}</FormLabel>
              <FormControl>
                <Input placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.phoneNumber}
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.PHONE_NUMBER}</FormLabel>
              <FormControl>
                <Input placeholder="+123 456 789 10" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.website}
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.WEBSITE}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your website" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.addressType}
          control={form.control}
          name="addressType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.ADDRESS_TYPE}</FormLabel>
              <FormControl>
                <Input placeholder="e.g. House / Mountain  / Dog" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.addressLine1}
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.ADDRESS_LINE_1}</FormLabel>
              <FormControl>
                <Input placeholder="First line of your address" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.addressLine2}
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.ADDRESS_LINE_2}</FormLabel>
              <FormControl>
                <Input placeholder="Second line of your address" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.postCode}
          control={form.control}
          name="postCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.POSTAL_CODE}</FormLabel>
              <FormControl>
                <Input placeholder="1324" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={userStore.city}
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.CITY}</FormLabel>
              <FormControl>
                <Input placeholder="Berlin" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          defaultValue={userStore.country}
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{PersonalSection.COUNTRY}</FormLabel>
              <CountrySelector field={field} placeholder="Select" />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{PersonalSection.SUBMIT}</Button>
      </form>
    </Form>
  );
}
