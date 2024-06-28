import { shuffleString } from "@/lib/utils";
import type { ExperiencesViewProps } from "@/types";
import { experiencesStyles } from "@/components/theme/themes/default/styles";

export default function Experiences({ data, darkMode }: ExperiencesViewProps) {
  const { darkThemeStyles, lightThemeStyles } = experiencesStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.sectionTitle}>Experiences</h2>
        <div className="space-y-6">
          {data.map((experience) => (
            <div
              key={shuffleString(
                experience.title + experience.startDate.toString()
              )}
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
          ))}
        </div>
      </div>
    </div>
  );
}
