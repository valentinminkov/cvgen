import { shuffleString } from "@/lib/utils";
import type { EducationViewProps } from "@/types";
import { educationStyles } from "@/components/theme/themes/default/styles";

export default function Education({ data, darkMode }: EducationViewProps) {
  const { darkThemeStyles, lightThemeStyles } = educationStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className="space-y-6">
          {data.map((education) => (
            <div
              key={shuffleString(
                education.title +
                  education.name +
                  education.startDate.toString()
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
          ))}
        </div>
      </div>
    </div>
  );
}
