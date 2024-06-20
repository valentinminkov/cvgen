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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { nationalities } from "@/config/nationalities";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@nanostores/react";
import {
  $user,
  updateUserData,
  addNewSocialMedia,
  resetUserData,
  type SocialMedia,
  removeSocialMediaByName,
  removeSocialMediaByIndex,
} from "@/stores/userStore";
import { content } from "@/config/content";
import { useState, type ChangeEvent } from "react";
import { sectionClasses } from "@/components/form/config";
import AddSocialMedia from "@/components/form/AddSocialMedia";
import { ListEntryCard, ListEntryContainer, ListEntryTitle } from "./ListEntry";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  secondName: z.string().min(2, {
    message: "",
  }),
  picture: z.string().optional(),
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

export type PersonalFormType = z.infer<typeof FormSchema>;

interface Props {
  defaultFormValues?: PersonalFormType;
}

export default function PersonalSection({ defaultFormValues }: Props) {
  const {
    content: {
      components: { PersonalSection },
    },
  } = content;
  const userStore = useStore($user);
  const form = useForm<PersonalFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const [fileData, setFileData] = useState<string>("");

  function onSubmit(data: PersonalFormType) {
    const updatedData: PersonalFormType = { ...data, picture: fileData };
    const saved = updateUserData(updatedData);
    toast({
      title: saved ? "Saved" : "Couldn't save data.",
    });
  }

  function onReset(e: any) {
    resetUserData(form);
  }

  function addSocialMedia(newSocialMedia: SocialMedia) {
    const added = addNewSocialMedia(newSocialMedia);
    return added;
  }

  function handlePictureFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.length && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64String = e?.target?.result as string;

        if (base64String) {
          setFileData(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const sectionRow = "flex justify-between";
  const sectionCol = "flex flex-col gap-2 w-full bg-gray-800 p-6";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={sectionClasses.form}
      >
        <div className={`flex flex-col gap-4 ${sectionCol}`}>
          <div className="flex">
            {userStore?.picture && (
              <div className="w-[250px] h-[250px]">
                <AspectRatio ratio={1 / 1}>
                  <img
                    src={userStore.picture}
                    alt="Image"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            )}
          </div>
          <FormField
            defaultValue={""}
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{PersonalSection.PICTURE}</FormLabel>
                <FormControl onChange={handlePictureFileChange}>
                  <Input id="picture" type="file" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={sectionRow}>
          <div className={`${sectionCol}`}>
            <FormField
              defaultValue={
                !!userStore.firstName
                  ? userStore.firstName
                  : defaultFormValues?.firstName
              }
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
              defaultValue={
                !!userStore.secondName
                  ? userStore.secondName
                  : defaultFormValues?.secondName
              }
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
              defaultValue={
                typeof userStore.dateOfBirth === "string"
                  ? new Date(userStore.dateOfBirth)
                  : undefined ?? defaultFormValues?.dateOfBirth
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
          </div>

          <div className={sectionCol}>
            <FormField
              control={form.control}
              name="gender"
              defaultValue={
                !!userStore.gender
                  ? userStore.gender
                  : defaultFormValues?.gender
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalSection.GENDER}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">
                        {PersonalSection.MALE}
                      </SelectItem>
                      <SelectItem value="female">
                        {PersonalSection.FEMALE}
                      </SelectItem>
                      <SelectItem value="other">
                        {PersonalSection.OTHER}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              defaultValue={
                !!userStore.nationality
                  ? userStore.nationality
                  : defaultFormValues?.nationality
              }
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalSection.NATIONALITY}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              defaultValue={
                !!userStore.phoneNumber
                  ? userStore.phoneNumber
                  : defaultFormValues?.phoneNumber
              }
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
          </div>
        </div>
        <div className={sectionRow}>
          <div className={sectionCol}>
            <FormField
              defaultValue={
                !!userStore.email ? userStore.email : defaultFormValues?.email
              }
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
          </div>
          <div className={sectionCol}>
            <FormField
              defaultValue={
                !!userStore.website
                  ? userStore.website
                  : defaultFormValues?.website
              }
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
          </div>
        </div>
        <div className={sectionRow}>
          <div className={sectionCol}>
            <FormField
              defaultValue={
                !!userStore.addressType
                  ? userStore.addressType
                  : defaultFormValues?.addressType
              }
              control={form.control}
              name="addressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalSection.ADDRESS_TYPE}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. House / Mountain  / Dog"
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
                !!userStore.addressLine1
                  ? userStore.addressLine1
                  : defaultFormValues?.addressLine1
              }
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalSection.ADDRESS_LINE_1}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First line of your address"
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
                !!userStore.addressLine2
                  ? userStore.addressLine2
                  : defaultFormValues?.addressLine2
              }
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{PersonalSection.ADDRESS_LINE_2}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Second line of your address"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={sectionCol}>
            <FormField
              defaultValue={
                !!userStore.postCode
                  ? userStore.postCode
                  : defaultFormValues?.postCode
              }
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
              defaultValue={
                !!userStore.city ? userStore.city : defaultFormValues?.city
              }
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
              defaultValue={
                !!userStore.country
                  ? userStore.country
                  : defaultFormValues?.country
              }
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
          </div>
        </div>

        <div className={`${sectionRow}`}>
          <div className={`h-auto	${sectionCol}`}>
            <FormField
              defaultValue={
                !!userStore.aboutMe
                  ? userStore.aboutMe
                  : defaultFormValues?.aboutMe
              }
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className="h-4/5">
                  <FormLabel>{PersonalSection.ABOUT}</FormLabel>
                  <FormControl className="h-4/5">
                    <Textarea
                      className="h-4/5"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla qui rem necessitatibus porro eveniet commodi officiis nam, quam atque quisquam non illo similique laudantium eius beatae quibusdam consequuntur explicabo error."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 pt-4 self-start">
              <Button type="submit">{PersonalSection.SUBMIT}</Button>
              <Button type="reset" variant={"ghost"} onClick={onReset}>
                {PersonalSection.RESET}
              </Button>
            </div>
          </div>
          <div className={sectionCol}>
            <div className="flex justify-between">
              <AddSocialMedia addSocialMedia={addSocialMedia} />

              <ListEntryContainer>
                <>
                  {userStore?.socialMedia && !!userStore.socialMedia.length && (
                    <div className="">
                      <ListEntryTitle
                        entriesLabel={PersonalSection.SOCIAL_MEDIA_ENTRIES}
                        entriesLength={userStore.socialMedia.length}
                      />
                      <div className="flex flex-col gap-5  max-h-56	p-4 relative overflow-y-auto">
                        {userStore.socialMedia?.map((socialMediaEntry, i) => {
                          return (
                            <ListEntryCard
                              removeEntry={removeSocialMediaByIndex}
                              index={i}
                              content={[
                                { label: "Name", value: socialMediaEntry.name },
                                { label: "url", value: socialMediaEntry.url },
                              ]}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              </ListEntryContainer>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
