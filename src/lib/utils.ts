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
    language: null,
    skills: null,
  };
  switch (theme) {
    case "default":
      themeComponents.personal = lazy(
        () => import(`@/components/theme/themes/default/personal`)
      );
      themeComponents.experiences = lazy(
        () => import(`@/components/theme/themes/default/experience`)
      );
      themeComponents.educations = lazy(
        () => import(`@/components/theme/themes/default/education`)
      );
      themeComponents.skills = lazy(
        () => import(`@/components/theme/themes/default/skills`)
      );
      themeComponents.language = lazy(
        () => import(`@/components/theme/themes/default/languages`)
      );
      break;
    default:
      break;
  }

  return themeComponents;
};
