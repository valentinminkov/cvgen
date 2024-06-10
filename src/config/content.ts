const elementsContent = {
  SUBMIT_BUTTON: "Submit",
};

const componentsContent = {
  InputAccordion: {
    PERSONAL_DATA_SECTION: "Personal data",
    WORK_EXPERIENCE_SECTION: "Work experience",
    EDUCATION_TRAINING_SECTION: "Education and training",
    LANGUAGE_TRAINING_SECTION: "Languages",
    JOB_SKILLS_SECTION: "Job skills",
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
  PersonalSection: {
    FIRST_NAME: "First name",
    SECOND_NAME: "Second name",
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
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
  ExperienceSection: {
    ENTRIES: "ENTRIES",
    COMPANY_NAME: "Company name",
    LOCATION: "Location",
    WORK_DESCRIPTION: "Work description",
    START_DATE: "Start date",
    ONGOING: "Ongoing",
    END_DATE: "End date",
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
  EducationSection: {
    ENTRIES: "Entries",
    TITLE: "Title",
    NAME: "Name",
    WEBSITE: "Website",
    COUNTRY: "Country",
    CITY: "City",
    DESCRIPTION: "Description",
    START_DATE: "Start date",
    ONGOING: "ONGOING",
    END_DATE: "End date",
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
  LanguageSection: {
    ENTRIES: "Entries",
    LANGUAGES: "Languages",
    MOTHER_LANGUAGES: "Mother languages",
    LANGUAGE: "Language",
    LISTENING: "Listening",
    READING: "Reading",
    WRITING: "Writing",
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
  SkillsSection: {
    ENTRIES: "Entries",
    TYPE: "Type",
    LEVEL: "Level",
    SKILL: "Skill",
    SUBMIT: elementsContent.SUBMIT_BUTTON,
  },
};

export const content = {
  content: {
    elements: elementsContent,
    components: componentsContent,
  },
};
