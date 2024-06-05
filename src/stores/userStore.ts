import { persistentMap } from "@nanostores/persistent";

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
  "user_",
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
