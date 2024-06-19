import { persistentMap } from "@nanostores/persistent";
import { toast } from "@/components/ui/use-toast";
import { getStoreKey } from "@/stores/config";
import type { UseFormReturn } from "react-hook-form";
import type { PersonalFormType } from "@/components/form/PersonalSection";

export interface SocialMedia {
  name: string;
  url: string;
  icon?: string;
}

export interface UserFormValue {
  firstName: string;
  secondName: string;
  email: string;
  nationality: string;
  phoneNumber: string;
  addressType: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  gender: string;
  city: string;
  country: string;
  website?: string;
  socialMedia?: SocialMedia[];
  aboutMe?: string;
  picture?: string;
  dateOfBirth?: Date | string;
}

type PersistentUserFormValue = UserFormValue & Record<string, any>;

const initialState: PersistentUserFormValue = {
  firstName: "",
  secondName: "",
  phoneNumber: "",
  gender: "",
  nationality: "",
  website: "",
  addressType: "",
  addressLine1: "",
  addressLine2: "",
  postCode: "",
  city: "",
  country: "",
  aboutMe: "",
  picture: "",
  email: "",
  socialMedia: [],
};

export const $user = persistentMap<PersistentUserFormValue>(
  getStoreKey("user"),
  initialState,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export function addNewSocialMedia(socialMedia: SocialMedia) {
  const store = $user.get();
  if (!store.socialMedia?.find((media) => media.name === socialMedia.name)) {
    $user.set({
      ...store,
      socialMedia: [...(store?.socialMedia ?? []), socialMedia],
    });
    return true;
  } else {
    toast({ title: "Social media with the same name already exists." });
    return false;
  }
}

export function removeSocialMediaByName(socialMediaName: string) {
  const store = $user.get();
  const updatedSocialMedias = store.socialMedia?.filter(
    (socialMediaEntry) => socialMediaEntry.name !== socialMediaName
  );
  $user.set({ ...store, socialMedia: updatedSocialMedias });
}

export function removeSocialMediaByIndex(indexToRemove: number) {
  const store = $user.get();

  if (
    store.socialMedia &&
    indexToRemove >= 0 &&
    indexToRemove < store.socialMedia.length
  ) {
    const updatedSocialMedias = store.socialMedia.splice(indexToRemove, 1);
    $user.set({ ...store, socialMedia: updatedSocialMedias });
    return true;
  }
  return false;
}

export function updateUserData(newData: Partial<UserFormValue>) {
  const formattedUserData = {
    ...newData,
    dateOfBirth: newData.dateOfBirth?.toString(),
  };

  $user.set({ ...$user.get(), ...formattedUserData });
  // To do confirm it has been saved
  return true;
}

export function resetUserData(htmlForm: UseFormReturn<PersonalFormType>) {
  $user.set(initialState);

  htmlForm.reset(initialState as PersonalFormType);
}
