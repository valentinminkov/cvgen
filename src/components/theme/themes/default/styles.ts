import type { CustomStyles } from "@/types";

const defaultStyles = {
  container: "w-full mx-auto overflow-hidden",
  innerContainer: "p-6",
  sectionTitle: "text-2xl font-semibold text-center mb-6",
  sectionHeader: "text-lg font-medium",
  card: "p-4 rounded-lg shadow-sm",
  cardTitle: "text-lg font-medium",
  text: "text-gray-600",
  list: "list-disc list-inside text-gray-200",
  picture: "w-32 h-32 rounded-full border-2 border-indigo-500",
  pictureContainer: "flex justify-center mb-4",
};

const createStyles = (customStyles: CustomStyles) => ({
  lightThemeStyles: {
    ...defaultStyles,
    ...customStyles.light,
  },
  darkThemeStyles: {
    ...defaultStyles,
    ...customStyles.dark,
  },
});

export const skillsStyles = createStyles({
  light: {
    container: `${defaultStyles.container} bg-white`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-600`,
    card: `${defaultStyles.card} bg-gray-100`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-800`,
    text: "text-gray-600",
  },
  dark: {
    container: `${defaultStyles.container} bg-gray-800`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-400`,
    card: `${defaultStyles.card} bg-gray-700`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-300`,
    text: "text-gray-400",
    list: `${defaultStyles.list} text-gray-400`,
  },
});

export const educationStyles = createStyles({
  light: {
    container: `${defaultStyles.container} bg-white`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-600`,
    card: `${defaultStyles.card} bg-gray-100`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-800`,
    link: "text-gray-400",
    text: "text-gray-600",
  },
  dark: {
    container: `${defaultStyles.container} bg-gray-800`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-400`,
    card: `${defaultStyles.card} bg-gray-700`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-300`,
    text: "text-gray-400",
    link: "text-gray-400",
  },
});

export const languagesStyles = createStyles({
  light: {
    container: `${defaultStyles.container} bg-white`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-600`,
    card: `${defaultStyles.card} bg-gray-100`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-800`,
    text: "text-gray-600",
  },
  dark: {
    container: `${defaultStyles.container} bg-gray-800`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-400`,
    card: `${defaultStyles.card} bg-gray-700`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-300`,
    text: "text-gray-400",
  },
});

export const personalStyles = createStyles({
  light: {
    container: `${defaultStyles.container} bg-white`,
    name: "text-2xl font-semibold text-center text-indigo-600",
    dateOfBirth: "text-center text-gray-600 mb-4",
    text: "text-gray-600",
    sectionHeader: `${defaultStyles.sectionHeader} text-gray-700`,
    list: `${defaultStyles.list} text-gray-600`,
  },
  dark: {
    container: `${defaultStyles.container} bg-gray-800`,
    name: "text-2xl font-semibold text-center text-indigo-400",
    dateOfBirth: "text-center text-gray-400 mb-4",
    text: "text-gray-400",
    sectionHeader: `${defaultStyles.sectionHeader} text-gray-300`,
    list: `${defaultStyles.list} text-gray-400`,
  },
});

export const experiencesStyles = createStyles({
  light: {
    container: `${defaultStyles.container} bg-white`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-600`,
    card: `${defaultStyles.card} bg-gray-100`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-800`,
    text: "text-gray-600",
  },
  dark: {
    container: `${defaultStyles.container} bg-gray-800`,
    sectionTitle: `${defaultStyles.sectionTitle} text-indigo-400`,
    card: `${defaultStyles.card} bg-gray-700`,
    cardTitle: `${defaultStyles.cardTitle} text-gray-300`,
    text: "text-gray-400",
  },
});
