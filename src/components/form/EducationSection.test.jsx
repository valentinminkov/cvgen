import { render, screen } from "@testing-library/react";
import { continentWithCountries } from "@/config/countries";
import EducationSection from "@/components/form/EducationSection";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { content } from "@/config/content";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const {
  content: {
    components: {
      EducationSection: {
        TITLE,
        NAME,
        WEBSITE,
        COUNTRY,
        CITY,
        DESCRIPTION,
        START_DATE,
        ONGOING,
        END_DATE,
        SUBMIT,
        ENTRIES,
      },
    },
  },
} = content;

test("Education section", async function () {
  window.ResizeObserver = ResizeObserver;

  render(<EducationSection />);

  const titleInput = screen.getByText(TITLE);
  const nameInput = screen.getByText(NAME);
  const websiteInput = screen.getByText(WEBSITE);
  const countryInput = screen.getByText(COUNTRY);
  const cityInput = screen.getByText(CITY);
  const descriptionInput = screen.getByText(DESCRIPTION);
  const startDateInput = screen.getByText(START_DATE);
  const ongoingToggle = screen.getByText(ONGOING);
  const endDateInput = screen.getByText(START_DATE);
  const submitButton = screen.getByText(SUBMIT);

  const TITLE_TEST_VALUE = "Test title of education";
  expect(screen.queryByText(ENTRIES)).not.toBeInTheDocument;
  await userEvent.type(titleInput, TITLE_TEST_VALUE);
  await userEvent.type(nameInput, "University name");
  await userEvent.type(websiteInput, "Website name");
  await userEvent.type(countryInput, continentWithCountries[0].countries[0]);
  await userEvent.type(descriptionInput, "Profession description");
  await userEvent.type(cityInput, "Berlin");
  await userEvent.click(ongoingToggle);
  expect(endDateInput).not.toBeInTheDocument;
  await userEvent.type(startDateInput, new Date().toString());
  await userEvent.click(submitButton);
  expect(screen.queryByText(ENTRIES)).exist;
  expect(screen.queryByText(TITLE_TEST_VALUE)).exist;
});
