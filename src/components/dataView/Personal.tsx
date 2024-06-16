"use client";

import { $user } from "@/stores/userStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
          <h1 className={headerClass}>Personal Information</h1>
          <p className={paragraphClass}>
            <span className={labelClass}>First Name:</span> {user.firstName}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Second Name:</span> {user.secondName}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Email:</span> {user.email}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Phone Number:</span> {user.phoneNumber}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Website:</span> {user.website}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Gender:</span> {user.gender}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Date of Birth:</span>{" "}
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
          <h3>Social Medias</h3>
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
          <h2 className={subheaderClass}>Address</h2>
          <p className={paragraphClass}>
            <span className={labelClass}>Address Type:</span> {user.addressType}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Address Line 1:</span>{" "}
            {user.addressLine1}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Address Line 2:</span>{" "}
            {user.addressLine2}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Post Code:</span> {user.postCode}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>City:</span> {user.city}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Country:</span> {user.country}
          </p>
          <p className={paragraphClass}>
            <span className={labelClass}>Nationality:</span> {user.nationality}
          </p>
        </div>
        {user.aboutMe && (
          <div>
            <h2 className={subheaderClass}>About Me</h2>
            <p className={paragraphClass}>{user.aboutMe}</p>
          </div>
        )}
      </div>
    </div>
  );
}
