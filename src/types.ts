import type { LazyExoticComponent, ComponentType } from "react";

export type ThemeComponent = LazyExoticComponent<ComponentType<any>> | null;

export interface ThemeComponents {
  personal: ThemeComponent | null;
  experiences: ThemeComponent;
  educations: ThemeComponent;
  languages: ThemeComponent;
  skills: ThemeComponent;
}

export type Sections =
  | "personal"
  | "skills"
  | "experiences"
  | "languages"
  | "educations";
