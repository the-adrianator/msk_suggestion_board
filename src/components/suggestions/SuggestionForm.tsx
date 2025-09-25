// Suggestion form component for MSK Suggestion Management Board

"use client";
import { useState } from "react";
import { useSuggestions } from "@/hooks/useSuggestions";
import { Employee, Suggestion } from "@/types";

interface SuggestionFormProps {
  employees: Employee[];
  onSuccess?: () => void;
}

export const SuggestionForm: React.FC<SuggestionFormProps> = ({
  employees,
  onSuccess,
}) => {
  const { createSuggestion, loading, error } = useSuggestions();

  const [employeeId, setEmployeeId] = useState("");
  const [type, setType] = useState<Suggestion["type"]>("exercise");
  const [priority, setPriority] = useState<Suggestion["priority"]>("medium");
  const [description, setDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [notes, setNotes] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    if (!employeeId) {
      setFormError("Please select an employee.");
      return false;
    }
    if (!description || description.trim().length < 10) {
      setFormError(
        "Please provide a meaningful description (at least 10 characters)."
      );
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    try {
      await createSuggestion({
        employeeId,
        type,
        description: description.trim(),
        status: "pending",
        priority,
        source: "admin",
        createdBy: "Health & Safety Manager",
        notes: notes.trim(),
        estimatedCost: estimatedCost.trim(),
      });
      onSuccess?.();
      // reset
      setEmployeeId("");
      setType("exercise");
      setPriority("medium");
      setDescription("");
      setEstimatedCost("");
      setNotes("");
      setSubmitted(false);
    } catch {
      // error is handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-200">
          {formError}
        </div>
      )}
      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-foreground"
          >
            Employee
          </label>
          <select
            id="employee"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
            required
          >
            <option value="">Select an employee...</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} — {emp.department}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-foreground"
          >
            Suggestion Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as Suggestion["type"])}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
          >
            <option value="exercise">Exercise</option>
            <option value="equipment">Equipment</option>
            <option value="behavioural">Behavioural</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-foreground"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as Suggestion["priority"])
            }
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="estimatedCost"
            className="block text-sm font-medium text-foreground"
          >
            Estimated Cost (optional)
          </label>
          <input
            id="estimatedCost"
            type="text"
            value={estimatedCost}
            onChange={(e) => setEstimatedCost(e.target.value)}
            placeholder="e.g. £150"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the suggested action, equipment, or behaviour change..."
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
          required
        />
        {submitted && description.trim().length < 10 && (
          <p className="mt-1 text-xs text-red-600">
            Description should be at least 10 characters.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-foreground"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional context or constraints..."
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
        />
      </div>

      <div className="flex items-center justify-end space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Suggestion"}
        </button>
      </div>
    </form>
  );
};
