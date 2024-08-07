export const translations = {
  SECTION_FORM_SUBMIT_BUTTON: "Save",
  RESET_BUTTON: "Reset",
  GENERATE: "Generate",
  CONTINUE: "Continue",
  ENTRIES: "Entries",
  LANGUAGES: "Languages",
  MOTHER_LANGUAGES: "Mother languages",
  LANGUAGE: "Language",
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SUBMIT: "Submit",
  REMOVE_LANGUAGE: "Remove Language",
  PERSONAL_INFORMATION: "Personal Information",
  WORK_EXPERIENCE: "Work experience",
  EDUCATION_TRAINING: "Education and training",
  LANGUAGE_TRAINING: "Languages",
  JOB_SKILLS: "Job skills",
  FILLED: "Filled",
  CV_GENERATE_FAIL:
    "Coudn't generate CV. Drink a glass of cold water and try again.",
  GENERATE_PDF: "Generate pdf",
  GENERATE_PDF_DESCRIPTION: "Generate pdf lorem ipsum",
  CANCEL: "Cancel",
  EXPERIENCES: "Experiences",
  EDUCATIONS: "Education and trainings",
  SKILLS: "Skill",
  FIRST_NAME: "First name",
  SECOND_NAME: "Second name",
  MALE: "Male",
  LOADING: "Loading",
  PICTURE: "Picture",
  FEMALE: "Female",
  OTHER: "Other",
  OTHER_LANGUAGES: "Other languages",
  ABOUT: "About",
  SKILL_TYPE: "Skill type",
  SKILL_LEVEL: "Skill level",
  ABOUT_ME: "About me",
  DATE_OF_BIRTH: "Date of birth",
  GENDER: "Gender",
  NATIONALITY: "Nationality",
  EMAIL_ADDRESS: "Email address",
  PHONE_NUMBER: "Phone number",
  WEBSITE: "Website",
  ADDRESS: "Address",
  ADDRESS_TYPE: "Address type",
  ADDRESS_LINE_1: "Address line 1",
  ADDRESS_LINE_2: "Address line 2",
  POSTAL_CODE: "Postal code",
  CITY: "City",
  COUNTRY: "Country",
  RESET: "Reset",
  SOCIAL_MEDIA_ENTRIES: "Social media entries",
  ENTER_SOCIAL_MEDIA: "Enter Social Media",
  NAME: "Name",
  URL: "Url",
  SOCIAL_MEDIAL_URL: "Social media",
  ADD_SOCIAL_MEDIA: "Add social media",
  COMPANY_NAME: "Company name",
  LOCATION: "Location",
  WORK_DESCRIPTION: "Work description",
  TITLE: "Title",
  DESCRIPTION: "Description",
  START_DATE: "Start date",
  ONGOING: "Ongoing",
  END_DATE: "End date",
  REMOVE_SKILL: "Remove skill",
  TYPE: "Type",
  LEVEL: "Level",
  SKILL: "Skill",
  CONTACT_INFORMATION: "Contact Information",
};

export const elementsContent = {
  SECTION_FORM_SUBMIT_BUTTON: "Save",
  RESET_BUTTON: "Reset",
  GENERATE: "Generate",
  CONTINUE: "Continue",
  FORM_CONTAINER: "",
};

// to do refactor to use translations
const componentsContent = {
  InputAccordion: {
    PERSONAL_DATA_SECTION: "Personal data",
    WORK_EXPERIENCE_SECTION: "Work experience",
    EDUCATION_TRAINING_SECTION: "Education and training",
    LANGUAGE_TRAINING_SECTION: "Languages",
    JOB_SKILLS_SECTION: "Job skills",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
    FILLED_MARK_PERSONAL_SECTION: "Filled",
    EXPERIENCES_LABEL: "Experiences",
    EDUCATIONS_LABEL: "Education and trainings",
    LANGUAGES_LABEL: "Languages",
    SKILLS_LABEL: "Skill",
  },
  PersonalSection: {
    FIRST_NAME: "First name",
    SECOND_NAME: "Second name",
    MALE: "Male",
    PICTURE: "Picture",
    FEMALE: "Female",
    OTHER: "Other",
    ABOUT: "About",
    DATE_OF_BIRTH: "Date of birth",
    GENDER: "Gender",
    NATIONALITY: "Nationality",
    EMAIL_ADDRESS: "Email address",
    PHONE_NUMBER: "Phone number",
    WEBSITE: "Website",
    ADDRESS_TYPE: "Address type",
    ADDRESS_LINE_1: "Address line 1",
    ADDRESS_LINE_2: "Address line 2",
    POSTAL_CODE: "Postal code",
    CITY: "City",
    COUNTRY: "Country",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
    RESET: elementsContent.RESET_BUTTON,
    SOCIAL_MEDIA_ENTRIES: "Social media entries",
  },
  AddSocialMedia: {
    ENTER_SOCIAL_MEDIA: "Enter Social Media",
    NAME: "Name",
    URL: "Url",
    SOCIAL_MEDIAL_URL: "Social media time",
    ADD_SOCIAL_MEDIA: "Add social media",
  },
  ExperienceSection: {
    ENTRIES: "Entries",
    COMPANY_NAME: "Company name",
    LOCATION: "Location",
    WORK_DESCRIPTION: "Work description",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
  },
  EducationSection: {
    ENTRIES: "Entries",
    TITLE: "Title",
    NAME: "Name",
    WEBSITE: "Website",
    COUNTRY: "Country",
    CITY: "City",
    DESCRIPTION: "Description",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
  },
  LanguageSection: {
    ENTRIES: "Entries",
    LANGUAGES: "Languages",
    MOTHER_LANGUAGES: "Mother languages",
    LANGUAGE: "Language",
    LISTENING: "Listening",
    READING: "Reading",
    WRITING: "Writing",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
  },
  SkillsSection: {
    ENTRIES: "Entries",
    TYPE: "Type",
    LEVEL: "Level",
    SKILL: "Skill",
    SKILLS: "Skills",
    SUBMIT: elementsContent.SECTION_FORM_SUBMIT_BUTTON,
  },
  DateRangePicker: {
    START_DATE: "Start date",
    ONGOING: "Ongoing",
    END_DATE: "End date",
  },
};
// TODO Refactor this, this is uneeded.
export const content = {
  content: {
    elements: elementsContent,
    components: componentsContent,
  },
};
