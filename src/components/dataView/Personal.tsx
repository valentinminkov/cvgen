"use client";

import { $user } from "@/stores/userStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}

const {
  containerClass,
  headerClass,
  subheaderClass,
  paragraphClass,
  gridContainerClass,
  labelClass,
} = viewComponentStyles;

export default function PersonalView({}: Props) {
  const user = useStore($user);

  return (
    <div className={`${containerClass}`}>
      <div>
        <h1 className={headerClass}>Personal Section</h1>
      </div>
      <div className={gridContainerClass}>
        <div>
          <h2 className={subheaderClass}>Personal Information</h2>
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
      </div>
      {user.aboutMe && (
        <div>
          <h2 className={subheaderClass}>About Me</h2>
          <p className={paragraphClass}>{user.aboutMe}</p>
        </div>
      )}
    </div>
  );
}
