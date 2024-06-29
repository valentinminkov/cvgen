import { shuffleString } from "@/lib/utils";
import type { SkillsViewsProps } from "@/types";
import { skillsStyles } from "@/components/theme/themes/default/styles";
import { translations } from "@/config/content";

export default function Skills({ data, darkMode }: SkillsViewsProps) {
  const { darkThemeStyles, lightThemeStyles } = skillsStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1 className={styles.sectionTitle}>{translations.SKILLS}</h1>
        <div className="space-y-6">
          {data.map((skillSet) => (
            <div
              key={shuffleString(skillSet.type + skillSet.level)}
              className={styles.card}
            >
              <p className={styles.cardTitle}>
                <span className="font-semibold">
                  {translations.SKILL_TYPE}:{" "}
                </span>{" "}
                {skillSet.type}
              </p>
              <p className={styles.text}>
                <span className="font-semibold">
                  {translations.SKILL_LEVEL}:{" "}
                </span>{" "}
                {skillSet.level}
              </p>
              {skillSet.skills && skillSet.skills.length > 0 && (
                <div className="mt-2">
                  <p className={styles.cardTitle}>{translations.SKILLS}:</p>
                  <ul className={styles.list}>
                    {skillSet.skills.map((curSkill) => (
                      <li key={shuffleString(curSkill)}>{curSkill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
