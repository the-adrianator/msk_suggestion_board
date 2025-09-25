import { render, screen } from "@testing-library/react";
import { SuggestionCard } from "./SuggestionCard";
import { Suggestion } from "@/types";

const suggestion: Suggestion = {
  id: "s1",
  employeeId: "e1",
  type: "exercise",
  description: "Daily stretching routine",
  status: "pending",
  priority: "medium",
  source: "admin",
  dateCreated: "2024-10-10T10:00:00.000Z",
  dateUpdated: "2024-10-10T10:00:00.000Z",
  notes: "",
  estimatedCost: "£0",
};

describe("SuggestionCard", () => {
  it("renders employee name and description", () => {
    render(
      <SuggestionCard suggestion={suggestion} employeeName="Alice Smith" />
    );

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Daily stretching routine")).toBeInTheDocument();
  });
});
