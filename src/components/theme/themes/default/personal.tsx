import type { UserFormValue } from "@/types";

interface PersonalProps {
  data: UserFormValue;
}

export default function Personal({ data }: PersonalProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-md overflow-hidden">
      <div className="p-6">
        {data.picture && (
          <div className="flex justify-center mb-4">
            <img
              src={data.picture}
              alt={`${data.firstName} ${data.secondName}`}
              className="w-32 h-32 rounded-full border-2 border-indigo-500"
            />
          </div>
        )}
        <h2 className="text-2xl font-semibold text-center text-indigo-600">
          {data.firstName} {data.secondName}
        </h2>
        {data.dateOfBirth && (
          <p className="text-center text-gray-600 mb-4">
            Date of Birth: {new Date(data.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Contact Information
            </h3>
            <p className="text-gray-600">Email: {data.email}</p>
            <p className="text-gray-600">Phone: {data.phoneNumber}</p>
            {data.website && (
              <p className="text-gray-600">Website: {data.website}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Address</h3>
            <p className="text-gray-600">{data.addressType}</p>
            <p className="text-gray-600">{data.addressLine1}</p>
            {data.addressLine2 && (
              <p className="text-gray-600">{data.addressLine2}</p>
            )}
            <p className="text-gray-600">
              {data.city}, {data.postCode}, {data.country}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Personal Details
            </h3>
            <p className="text-gray-600">Nationality: {data.nationality}</p>
            <p className="text-gray-600">Gender: {data.gender}</p>
          </div>
          {data.socialMedia && data.socialMedia.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Social Media
              </h3>
              <ul className="list-disc list-inside text-gray-600">
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
              <h3 className="text-lg font-medium text-gray-700">About Me</h3>
              <p className="text-gray-600">{data.aboutMe}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
