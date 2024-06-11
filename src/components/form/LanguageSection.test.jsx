import { render, screen } from "@testing-library/react";
import LanguageSection from "@/components/form/LanguageSection";
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
      LanguageSection: {
        MOTHER_LANGUAGES,
        LANGUAGE,
        LISTENING,
        READING,
        WRITING,
        SUBMIT,
        ENTRIES,
      },
    },
  },
} = content;

test("Language Section", async function () {
  window.ResizeObserver = ResizeObserver;

  render(<LanguageSection />);

  const motherLanguageInput = screen.getByText(MOTHER_LANGUAGES);
  const languageInput = screen.getByText(LANGUAGE);
  const listeningInput = screen.getByText(LISTENING);
  const readingInput = screen.getByText(READING);
  const writingInput = screen.getByText(WRITING);
  const submitButton = screen.getByText(SUBMIT);

  expect(screen.queryByText(ENTRIES)).not.toBeInTheDocument;
  await userEvent.type(motherLanguageInput, "Mandarin");
  await userEvent.type(languageInput, "German");
  await userEvent.type(listeningInput, "A2");
  await userEvent.type(readingInput, "B1");
  await userEvent.click(writingInput, "C1");
  await userEvent.click(submitButton);
  expect(screen.queryByText(ENTRIES)).exist;
  expect(screen.findByText("Mandarin")).exist;
  await userEvent.type(motherLanguageInput, "Hindi");
  expect(screen.findByText("Hindi")).exist;
});
