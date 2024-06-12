"use client";

import { $user } from "@/stores/userStore";
import { useStore } from "@nanostores/react";
import { viewComponentStyles } from "@/components/dataView/config";

interface Props {}

const { containerClass } = viewComponentStyles;

export default function PersonalView({}: Props) {
  const user = useStore($user);

  return (
    <div className={`${containerClass}`}>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Personal Section
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">First Name:</span> {user.firstName}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Second Name:</span> {user.secondName}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Phone Number:</span> {user.phoneNumber}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Website:</span> {user.website}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Gender:</span> {user.gender}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Date of Birth:</span>{" "}
            {user?.dateOfBirth?.toString()}
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Address</h2>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Address Type:</span> {user.addressType}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Address Line 1:</span>{" "}
            {user.addressLine1}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Address Line 2:</span>{" "}
            {user.addressLine2}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Post Code:</span> {user.postCode}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">City:</span> {user.city}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Country:</span> {user.country}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-bold">Nationality:</span> {user.nationality}
          </p>
        </div>
      </div>
      {user.aboutMe && (
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-700">{user.aboutMe}</p>
        </div>
      )}
    </div>
  );
}
