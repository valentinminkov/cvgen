import type { ThemeComponents } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { lazy } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomString = (length: number) =>
  Array.from({ length }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");

// TODO Make it dynamic
export const loadThemeComponents = async (
  theme: string
): Promise<ThemeComponents> => {
  const themeComponents: ThemeComponents = {
    personal: null,
    experiences: null,
    educations: null,
    languages: null,
    skills: null,
  };

  switch (theme) {
    case "default":
      themeComponents.personal = lazy(
        () => import(`@/components/theme/themes/default/personal`)
      );
      themeComponents.experiences = lazy(
        () => import(`@/components/theme/themes/default/experiences`)
      );
      themeComponents.educations = lazy(
        () => import(`@/components/theme/themes/default/educations`)
      );
      themeComponents.skills = lazy(
        () => import(`@/components/theme/themes/default/skills`)
      );
      themeComponents.languages = lazy(
        () => import(`@/components/theme/themes/default/languages`)
      );
      break;
    default:
      break;
  }

  return themeComponents;
};

export function shuffleString(str: string) {
  // Convert the string into an array of characters
  let arr = str.split("");

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Convert the array back to a string
  return arr.join("");
}
