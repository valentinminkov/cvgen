import type { PersonalViewProps } from "@/types";
import { personalStyles } from "@/components/theme/themes/default/styles";

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
            Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <h3 className={styles.sectionHeader}>Contact Information</h3>
            <p className={styles.text}>Email: {data.email}</p>
            <p className={styles.text}>Phone: {data.phoneNumber}</p>
            {data.website && (
              <p className={styles.text}>Website: {data.website}</p>
            )}
          </div>
          <div>
            <h3 className={styles.sectionHeader}>Address</h3>
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
            <h3 className={styles.sectionHeader}>Personal Details</h3>
            <p className={styles.text}>Nationality: {data.nationality}</p>
            <p className={styles.text}>Gender: {data.gender}</p>
          </div>
          {data.socialMedia && data.socialMedia.length > 0 && (
            <div>
              <h3 className={styles.sectionHeader}>Social Media</h3>
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
              <h3 className={styles.sectionHeader}>About Me</h3>
              <p className={styles.text}>{data.aboutMe}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
