import type {
  EducationFormValue,
  ExperienceFormValue,
  LanguageSubmitFormPayload,
  SkillGroup,
  UserFormValue,
} from "@/types";

export const dummyUser: UserFormValue = {
  firstName: "John",
  secondName: "Doe",
  email: "john.doe@example.com",
  nationality: "American",
  phoneNumber: "+1 555-1234",
  addressType: "Home",
  addressLine1: "123 Main St",
  addressLine2: "Apt 4B",
  postCode: "90210",
  gender: "Male",
  city: "Los Angeles",
  country: "USA",
  website: "https://johndoe.com",
  socialMedia: [
    { name: "Twitter", url: "https://twitter.com/johndoe" },
    { name: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
  ],
  aboutMe:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  picture: "https://example.com/johndoe.jpg",
  dateOfBirth: "1985-06-15",
};

export const dummyExperiences: ExperienceFormValue[] = [
  {
    title: "Software Engineer",
    country: "USA",
    workDescription:
      "Developed and maintained web applications using React and Node.js.",
    startDate: new Date("2018-01-15"),
    ongoing: true,
  },
  {
    title: "Project Manager",
    country: "Canada",
    workDescription:
      "Led a team of developers to deliver enterprise solutions for clients.",
    startDate: new Date("2015-05-01"),
    endDate: new Date("2017-12-31"),
  },
  {
    title: "Data Analyst",
    country: "UK",
    workDescription:
      "Analyzed large datasets to provide insights and support business decisions.",
    startDate: new Date("2013-09-01"),
    endDate: new Date("2015-04-30"),
  },
];

export const dummyEducations: EducationFormValue[] = [
  {
    title: "Bachelor of Science in Computer Science",
    name: "Massachusetts Institute of Technology",
    startDate: new Date("2010-09-01"),
    endDate: new Date("2014-06-15"),
    website: "https://www.mit.edu",
    country: "USA",
    city: "Cambridge",
    description:
      "Focused on software engineering, algorithms, and data structures.",
  },
  {
    title: "Master of Business Administration",
    name: "Harvard Business School",
    startDate: new Date("2015-09-01"),
    endDate: new Date("2017-06-15"),
    website: "https://www.hbs.edu",
    country: "USA",
    city: "Boston",
    description: "Specialized in entrepreneurship and business strategy.",
  },
  {
    title: "Ph.D. in Artificial Intelligence",
    name: "Stanford University",
    startDate: new Date("2018-09-01"),
    ongoing: true,
    website: "https://www.stanford.edu",
    country: "USA",
    city: "Stanford",
    description:
      "Researching machine learning techniques and their applications.",
  },
];

export const dummyLanguages: LanguageSubmitFormPayload[] = [
  {
    language: "English",
    listening: "Advanced",
    reading: "Advanced",
    writing: "Advanced",
    motherLanguage: "German",
  },
  {
    language: "Spanish",
    listening: "Intermediate",
    reading: "Intermediate",
    writing: "Intermediate",
  },
  {
    language: "French",
    listening: "Basic",
    reading: "Basic",
    writing: "Basic",
  },
];

export const dummySkills: SkillGroup[] = [
  {
    type: "Programming Languages",
    level: "Advanced",
    skills: ["JavaScript", "Python", "TypeScript"],
  },
  {
    type: "Web Development",
    level: "Intermediate",
    skills: ["HTML", "CSS", "React", "Node.js"],
  },
  {
    type: "Data Analysis",
    level: "Basic",
    skills: ["Excel", "SQL", "Tableau"],
  },
];
