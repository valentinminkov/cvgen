import type { LazyExoticComponent } from "react";

export type ThemeComponent = LazyExoticComponent<() => JSX.Element> | null;

export interface ThemeComponents {
  personal: ThemeComponent;
  experiences: ThemeComponent;
  educations: ThemeComponent;
  language: ThemeComponent;
  skills: ThemeComponent;
}

export type Sections =
  | "personal"
  | "skills"
  | "experience"
  | "languages"
  | "education";
