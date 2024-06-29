"use client";

import { $user } from "@/stores/userStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/arrange/classes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { translations } from "@/config/content";

interface Props {}

const {
  containerClass,
  headerClass,
  subheaderClass,
  paragraphClass,
  labelClass,
  flexRowClass,
} = viewComponentStyles;

export default function PersonalView({}: Props) {
  const user = useStore($user);

  return (
    <div className={`${containerClass}`}>
      <div className={flexRowClass}>
        <div>
          <h1 className={headerClass}>{translations.PERSONAL_INFORMATION}</h1>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.FIRST_NAME}:</span>
            {user.firstName}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.SECOND_NAME}:</span>{" "}
            {user.secondName}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.EMAIL_ADDRESS}:</span>{" "}
            {user.email}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.PHONE_NUMBER}:</span>{" "}
            {user.phoneNumber}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.WEBSITE}:</span>{" "}
            {user.website}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.GENDER}:</span>{" "}
            {user.gender}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.DATE_OF_BIRTH}:</span>{" "}
            {user?.dateOfBirth?.toString()}
          </p>
        </div>
        {user.picture && (
          <div className="w-[80px]">
            <AspectRatio ratio={16 / 9}>
              <img
                src={user.picture}
                alt="Image"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        )}
      </div>
      {user?.socialMedia && !!user.socialMedia.length && (
        <div
          className={`${flexRowClass} flex flex-col gap-2 border-solid border-y-2 p-2`}
        >
          <h3>{translations.SOCIAL_MEDIAL_URL}</h3>
          <>
            {user.socialMedia.map((socialMedia) => (
              <div>
                <a href={socialMedia.url}>{socialMedia.name}</a>
              </div>
            ))}
          </>
        </div>
      )}
      <div className={flexRowClass}>
        <div>
          <h2 className={subheaderClass}>{translations.ADDRESS}</h2>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.ADDRESS_TYPE}</span>{" "}
            {user.addressType}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.ADDRESS_LINE_1}:</span>{" "}
            {user.addressLine1}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.ADDRESS_LINE_2}:</span>{" "}
            {user.addressLine2}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.POSTAL_CODE}:</span>{" "}
            {user.postCode}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.CITY}:</span> {user.city}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.COUNTRY}:</span>{" "}
            {user.country}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>{translations.NATIONALITY}:</span>{" "}
            {user.nationality}
          </p>
        </div>
        {user.aboutMe && (
          <div>
            <h2 className={subheaderClass}>{translations.ABOUT}</h2>
            <p className={paragraphClass}>{user.aboutMe}</p>
          </div>
        )}
      </div>
    </div>
  );
}
