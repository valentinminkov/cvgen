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

export interface SocialMedia {
  name: string;
  url: string;
  icon?: string;
}

// Persistent store props

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

export type PersistentUserFormValue = UserFormValue & Record<string, any>;

export interface SkillGroup {
  type: string;
  level: string;
  skills?: string[];
}

export interface SkillsFormValue {
  skills: SkillGroup[];
}

export type PersistentSkillsStore = Record<string, any> & {
  skills: SkillGroup[];
  sectionSkills: string[];
};

export interface IOrder {
  sections: Sections[];
  staticSections: Sections[];
  [key: string]: string[];
}

export type SettingsStore = Record<string, any> & {
  order: IOrder;
  theme: string;
  darkMode?: boolean;
};

// type SkillLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface LanguageSkills {
  listening: string;
  reading: string;
  writing: string;
}

export interface Language {
  language: string;
  skills: LanguageSkills;
}

export interface LanguageSubmitFormPayload {
  language: string;
  listening: string;
  reading: string;
  writing: string;
  motherLanguage?: string;
}

export interface LanguageFormValue {
  motherLanguage: string;
  otherLanguages: Language[];
}

export type PersistentLanguageStore = Record<string, any> & {
  language: LanguageFormValue;
};

export interface ExperienceFormValue {
  title: string;
  country: string;
  workDescription: string;
  startDate: Date;
  ongoing?: boolean;
  endDate?: Date;
}

export type PersistentExperienceStore = Record<string, any> & {
  experiences: ExperienceFormValue[];
};

export interface EducationFormValue {
  title: string;
  name: string;
  startDate: Date;
  website?: string;
  country?: string;
  city?: string;
  description: string;
  ongoing?: boolean;
  endDate?: Date;
}

export type PersistentEducationStore = Record<string, any> & {
  educations: EducationFormValue[];
};

// View theme component props

export interface ViewThemeComponentDefaultProps {
  darkMode?: boolean;
}

export interface PersonalViewProps extends ViewThemeComponentDefaultProps {
  data: UserFormValue;
}

export interface SkillsViewsProps extends ViewThemeComponentDefaultProps {
  data: SkillGroup[];
}

export interface LanguagesViewProps extends ViewThemeComponentDefaultProps {
  data: LanguageFormValue;
}

export interface ExperiencesViewProps extends ViewThemeComponentDefaultProps {
  data: ExperienceFormValue[];
}

export interface EducationViewProps extends ViewThemeComponentDefaultProps {
  data: EducationFormValue[];
}

// Styles / Theme

export interface CustomStyles {
  light: Partial<ThemeStyles>;
  dark: Partial<ThemeStyles>;
}

export interface ThemeStyles {
  container: string;
  innerContainer: string;
  sectionTitle: string;
  sectionHeader: string;
  card: string;
  cardTitle: string;
  text: string;
  list: string;
  picture?: string;
  pictureContainer?: string;
  name?: string;
  dateOfBirth?: string;
  link?: string;
}
