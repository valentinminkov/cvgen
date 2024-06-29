import type { PersonalViewProps } from "@/types";
import { personalStyles } from "@/components/theme/themes/default/styles";
import { translations } from "@/config/content";

export default function Personal({ data, darkMode }: PersonalViewProps) {
  const { darkThemeStyles, lightThemeStyles } = personalStyles;
  const styles = darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {data.picture && (
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
                {data.socialMedia.map((account, index) => (
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
    </div>
  );
}
