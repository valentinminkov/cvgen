import { computed, type ReadableAtom } from "nanostores";
import { $user } from "@/stores/userStore";

export const $isPersonalDataFilled: ReadableAtom<boolean> = computed(
  $user,
  (userData) =>
    Boolean(!!userData.firstName && !!userData.secondName && !!userData.email)
);
