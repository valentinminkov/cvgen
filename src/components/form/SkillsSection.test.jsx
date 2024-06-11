import { render, screen } from "@testing-library/react";
import SkillsSection from "@/components/form/SkillsSection";
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
      SkillsSection: { TYPE, LEVEL, SKILL, SUBMIT, ENTRIES },
    },
  },
} = content;

test("Skills Section", async function () {
  window.ResizeObserver = ResizeObserver;

  render(<SkillsSection />);

  const typeInput = screen.getByText(TYPE);
  const levelInput = screen.getByText(LEVEL);
  const skillInput = screen.getByText(SKILL);
  const submitButton = screen.getByText(SUBMIT);

  expect(screen.queryByText(ENTRIES)).not.toBeInTheDocument;
  await userEvent.type(typeInput, "Speaking");
  await userEvent.type(levelInput, "Beginner");
  await userEvent.type(skillInput, "good at speaking and stuff");
  await userEvent.type(skillInput, "{enter}");
  expect(screen.findByText("good at speaking and stuff")).exist;
  await userEvent.click(submitButton);
  expect(screen.queryByText(ENTRIES)).exist;
});
