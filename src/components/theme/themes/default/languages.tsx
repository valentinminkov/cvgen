import { shuffleString } from "@/lib/utils";
import type { LanguagesViewProps } from "@/types";
import { languagesStyles } from "@/components/theme/themes/default/styles";
import { translations } from "@/config/content";

export default function Languages({ data, darkMode }: LanguagesViewProps) {
  const { darkThemeStyles, lightThemeStyles } = languagesStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.sectionTitle}>{translations.LANGUAGES}</h1>
        <div className="space-y-6">
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              {translations.MOTHER_LANGUAGES}
            </h3>
            <p className={styles.text}>{data.motherLanguage}</p>
          </div>
          <div>
            <h3 className={styles.cardTitle}>{translations.OTHER_LANGUAGES}</h3>
            {data.otherLanguages.map((language) => (
              <div
                key={shuffleString(language.language)}
                className={`${styles.card} mt-4`}
              >
                <p className={styles.text}>{language.language}</p>
                <p className={styles.text}>
                  Skills: {JSON.stringify(language.skills)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
