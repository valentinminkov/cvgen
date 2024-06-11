import { persistentMap } from "@nanostores/persistent";
import { getStoreKey } from "@/stores/config";
import type { UseFormReturn } from "react-hook-form";
import type { PersonalFormType } from "@/components/form/PersonalSection";

export interface UserFormValue {
  firstName: string;
  secondName: string;
  email: string;
  nationality: string;
  phoneNumber: string;
  website: string;
  addressType: string;
  addressLine1: string;
  addressLine2: string;
  postCode: string;
  gender: string;
  city: string;
  country: string;
  aboutMe?: string;
  dateOfBirth?: Date | string;
}

type PersistentUserFormValue = UserFormValue &
  Record<string, string | undefined>;

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
  email: "",
};

export const $user = persistentMap<PersistentUserFormValue>(
  getStoreKey("user"),
  initialState
);

export function updateUserData(newData: Partial<UserFormValue>) {
  const formattedUserData = {
    ...newData,
    dateOfBirth: newData.dateOfBirth?.toString(),
  };

  $user.set({ ...$user.get(), ...formattedUserData });
  // To do confirm it has been saved
  return true;
}

function convertPersistentUserformValueToPersonalFormType(
  formToConvert: PersistentUserFormValue
): PersonalFormType {
  const converted: PersonalFormType = {
    ...formToConvert,
    dateOfBirth: new Date(),
  };
  return formToConvert as PersonalFormType;
}

export function resetUserData(htmlForm: UseFormReturn<PersonalFormType>) {
  $user.set(initialState);

  htmlForm.reset(
    convertPersistentUserformValueToPersonalFormType(initialState)
  );
}
