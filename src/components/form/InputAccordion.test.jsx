import { render, screen } from "@testing-library/react";
import InputAccordion from "@/components/form/InputAccordion";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { content } from "@/config/content";

class ResizeObserver {
  observe() {}
  unobserve() {}
}

const {
  content: {
    components: {
      InputAccordion: {
        PERSONAL_DATA_SECTION,
        WORK_EXPERIENCE_SECTION,
        EDUCATION_TRAINING_SECTION,
        LANGUAGE_TRAINING_SECTION,
        JOB_SKILLS_SECTION,
      },
    },
  },
} = content;

test("Input accordion", async function () {
  window.ResizeObserver = ResizeObserver;

  render(<InputAccordion />);

  const personalDataSection = screen.getByText(PERSONAL_DATA_SECTION);
  const workExperienceSection = screen.getByText(WORK_EXPERIENCE_SECTION);
  const educationSection = screen.getByText(EDUCATION_TRAINING_SECTION);
  const languageSkills = screen.getByText(LANGUAGE_TRAINING_SECTION);
  const jobSkills = screen.getByText(JOB_SKILLS_SECTION);

  expect(personalDataSection).exist;
  expect(workExperienceSection).exist;
  expect(educationSection).exist;
  expect(languageSkills).exist;
  expect(jobSkills).exist;
  await userEvent.click(personalDataSection);
  expect(screen.getByText("First name")).exist;
  await userEvent.click(workExperienceSection);
  expect(screen.getByText("Company name")).exist;
  expect(screen.queryByText("First name")).not.toBeInTheDocument();
});
