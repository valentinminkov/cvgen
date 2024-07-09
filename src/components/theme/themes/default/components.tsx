import { translations } from "@/config/content";
import {
  educationStyles,
  experiencesStyles,
  languagesStyles,
  personalStyles,
  skillsStyles,
} from "./styles";
import { shuffleString } from "@/lib/utils";

export function getLanguagesHtml(data: any, darkMode: any): JSX.Element[] {
  const { darkThemeStyles, lightThemeStyles } = languagesStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return [
    <h1 className={styles.sectionTitle}>{translations.LANGUAGES}</h1>,
    <div className="space-y-6">
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{translations.MOTHER_LANGUAGES}</h3>
        <p className={styles.text}>{data.motherLanguage}</p>
      </div>
    </div>,
    <h3 className={styles.cardTitle}>{translations.OTHER_LANGUAGES}</h3>,
    ...data.otherLanguages.map((language: any) => (
      <div
        key={shuffleString(language.language)}
        className={`${styles.card} mt-4`}
      >
        <p className={styles.text}>{language.language}</p>
        <p className={styles.text}>Skills: {JSON.stringify(language.skills)}</p>
      </div>
    )),
  ];
}

export function getPersonalHtml(data: any, darkMode: any): JSX.Element[] {
  const { darkThemeStyles, lightThemeStyles } = personalStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return [
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {data?.picture && (
          <div className={styles.pictureContainer}>
            <img
              src={data.picture}
              alt={`${data.firstName} ${data.secondName}`}
              className={styles.picture}
            />
          </div>
        )}
        <h2 className={styles.name}>
          {data.firstName} {data.secondName}
        </h2>
        {data.dateOfBirth && (
          <p className={styles.dateOfBirth}>
            {translations.DATE_OF_BIRTH}:{" "}
            {new Date(data.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <h3 className={styles.sectionHeader}>
              {translations.CONTACT_INFORMATION}
            </h3>
            <p className={styles.text}>
              {translations.EMAIL_ADDRESS}: {data.email}
            </p>
            <p className={styles.text}>
              {translations.PHONE_NUMBER}: {data.phoneNumber}
            </p>
            {data.website && (
              <p className={styles.text}>
                {translations.WEBSITE}: {data.website}
              </p>
            )}
          </div>
          <div>
            <h3 className={styles.sectionHeader}>{translations.ADDRESS}</h3>
            <p className={styles.text}>{data.addressType}</p>
            <p className={styles.text}>{data.addressLine1}</p>
            {data.addressLine2 && (
              <p className={styles.text}>{data.addressLine2}</p>
            )}
            <p className={styles.text}>
              {data.city}, {data.postCode}, {data.country}
            </p>
          </div>
          <div>
            <h3 className={styles.sectionHeader}>
              {translations.PERSONAL_INFORMATION}
            </h3>
            <p className={styles.text}>
              {translations.NATIONALITY}: {data.nationality}
            </p>
            <p className={styles.text}>
              {translations.GENDER}: {data.gender}
            </p>
          </div>
          {data.socialMedia && data.socialMedia.length > 0 && (
            <div>
              <h3 className={styles.sectionHeader}>
                {translations.SOCIAL_MEDIAL_URL}
              </h3>
              <ul className={styles.list}>
                {data.socialMedia.map((account: any, index: number) => (
                  <li key={index}>
                    {account.name}: {account.url}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.aboutMe && (
            <div>
              <h3 className={styles.sectionHeader}>{translations.ABOUT_ME}</h3>
              <p className={styles.text}>{data.aboutMe}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
  ];
}

export function getEducationsHtml(data: any, darkMode: any): JSX.Element[] {
  const { darkThemeStyles, lightThemeStyles } = educationStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return [
    <h2 className={styles.sectionTitle}>{translations.EDUCATIONS}</h2>,
    ...data.map((education: any) => (
      <div
        key={shuffleString(
          education.title + education.name + education.startDate.toString()
        )}
        className={styles.card}
      >
        <h3 className={styles.cardTitle}>{education.title}</h3>
        <p className={styles.text}>{education.name}</p>
        <p className={styles.text}>
          {new Date(education.startDate).toLocaleDateString()} -{" "}
          {education.ongoing
            ? "Ongoing"
            : education.endDate
            ? new Date(education.endDate).toLocaleDateString()
            : "Unknown End Date"}
        </p>
        {education.website && (
          <p className={styles.link}>
            <a
              href={education.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.website}
            </a>
          </p>
        )}
        {education.city && education.country && (
          <p className={styles.text}>
            {education.city}, {education.country}
          </p>
        )}
        <p className={styles.text}>{education.description}</p>
      </div>
    )),
  ];
}

export function getExperiencesHtml(data: any, darkMode: any): JSX.Element[] {
  const { darkThemeStyles, lightThemeStyles } = experiencesStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return [
    <h2 className={styles.sectionTitle}>{translations.EXPERIENCES}</h2>,
    ...data.map((experience: any) => (
      <div
        key={shuffleString(experience.title + experience.startDate.toString())}
        className={styles.card}
      >
        <h3 className={styles.cardTitle}>{experience.title}</h3>
        <p className={styles.text}>
          {new Date(experience.startDate).toLocaleDateString()} -{" "}
          {experience.ongoing
            ? "Ongoing"
            : experience.endDate
            ? new Date(experience.endDate).toLocaleDateString()
            : "Unknown End Date"}
        </p>
        <p className={styles.text}>{experience.country}</p>
        <p className={styles.text}>{experience.workDescription}</p>
      </div>
    )),
  ];
}

export function getSkillsHtml(data: any, darkMode: any): JSX.Element[] {
  const { darkThemeStyles, lightThemeStyles } = skillsStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return [
    <h1 className={styles.sectionTitle}>{translations.SKILLS}</h1>,
    ...data.map((skillSet: any) => (
      <div
        key={shuffleString(skillSet.type + skillSet.level)}
        className={styles.card}
      >
        <p className={styles.cardTitle}>
          <span className="font-semibold">{translations.SKILL_TYPE}: </span>{" "}
          {skillSet.type}
        </p>
        <p className={styles.text}>
          <span className="font-semibold">{translations.SKILL_LEVEL}: </span>{" "}
          {skillSet.level}
        </p>
        {skillSet.skills && skillSet.skills.length > 0 && (
          <div className="mt-2">
            <p className={styles.cardTitle}>{translations.SKILLS}:</p>
            <ul className={styles.list}>
              {skillSet.skills.map((curSkill: any) => (
                <li key={shuffleString(curSkill)}>{curSkill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )),
  ];
}
