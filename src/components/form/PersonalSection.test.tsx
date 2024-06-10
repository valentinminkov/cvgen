import { render, screen } from "@testing-library/react";
import PersonalSection from "@/components/form/PersonalSection";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { content } from "@/config/content";
import { type PersonalFormType } from "@/components/form/PersonalSection";
import { nationalities } from "@/config/nationalities";
import { continentWithCountries } from "@/config/countries";

class ResizeObserver {
  observe() {}
  unobserve() {}
}

const {
  content: {
    components: {
      PersonalSection: { FIRST_NAME, SUBMIT },
    },
  },
} = content;

export const testValues: PersonalFormType = {
  firstName: "John",
  secondName: "Doe",
  aboutMe: "About me",
  dateOfBirth: new Date(),
  gender: "Male",
  nationality: nationalities[0],
  email: "johndoe@john.com",
  phoneNumber: "1234123131",
  website: "www.johndoe.com",
  addressType: "Normal",
  addressLine2: "something something",
  addressLine1: "some address or something",
  postCode: "7",
  city: "Berlin",
  country: continentWithCountries[0].countries[0],
};

test("Personal Section", async function () {
  render(<PersonalSection defaultFormValues={testValues} />);
  const firstNameInput = screen.getByText(FIRST_NAME);
  const submitButton = screen.getByText(SUBMIT);
  expect(firstNameInput).exist;
  expect(submitButton).exist;
  await userEvent.type(firstNameInput, "ny");
  await userEvent.click(submitButton);
  expect(screen.getByDisplayValue("Johnny")).exist;
  expect(screen.getByDisplayValue("Doe")).exist;
  expect(screen.getByDisplayValue("Berlin")).exist;
});
