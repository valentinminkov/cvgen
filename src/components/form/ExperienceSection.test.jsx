import { render, screen } from "@testing-library/react";
import { continentWithCountries } from "@/config/countries";
import ExperienceSection from "@/components/form/ExperienceSection";
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
      ExperienceSection: {
        COMPANY_NAME,
        LOCATION,
        WORK_DESCRIPTION,
        START_DATE,
        ONGOING,
        ENTRIES,
        SUBMIT,
      },
    },
  },
} = content;

test("Experience Section", async function () {
  window.ResizeObserver = ResizeObserver;

  render(<ExperienceSection />);

  const TEST_COMPANY_NAME = "Test company";

  const companyNameInput = screen.getByText(COMPANY_NAME);
  const locationInput = screen.getByText(LOCATION);
  const workDescriptionInput = screen.getByText(WORK_DESCRIPTION);
  const startDateInput = screen.getByText(START_DATE);
  const ongoingToggle = screen.getByText(ONGOING);
  const submitButton = screen.getByText(SUBMIT);

  expect(screen.queryByText(ENTRIES)).not.toBeInTheDocument;
  await userEvent.type(companyNameInput, TEST_COMPANY_NAME);
  await userEvent.type(locationInput, continentWithCountries[0].countries[0]);
  await userEvent.type(workDescriptionInput, "Test description");
  await userEvent.type(startDateInput, new Date().toDateString());
  await userEvent.click(ongoingToggle);
  await userEvent.click(submitButton);
  expect(screen.queryByText(ENTRIES)).exist;
  expect(screen.queryByText(TEST_COMPANY_NAME)).exist;
});
