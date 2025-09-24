// Suggestion filters component for MSK Suggestion Management Board
// Following British spelling conventions throughout

"use client";
import { useState } from "react";
import { useSuggestions } from "@/hooks/useSuggestions";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export const SuggestionFilters: React.FC = () => {
  const { filters, updateFilters, resetFilters, suggestions, employees } =
    useSuggestions();
  const [isOpen, setIsOpen] = useState(false);

  // Get filter options with counts
  const getStatusOptions = (): FilterOption[] => {
    const statuses = [
      "pending",
      "in_progress",
      "completed",
      "dismissed",
      "overdue",
    ];
    return statuses.map((status) => ({
      value: status,
      label: status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      count: suggestions.filter((s) => s.status === status).length,
    }));
  };

  const getTypeOptions = (): FilterOption[] => {
    const types = ["exercise", "equipment", "behavioural", "lifestyle"];
    return types.map((type) => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      count: suggestions.filter((s) => s.type === type).length,
    }));
  };

  const getPriorityOptions = (): FilterOption[] => {
    const priorities = ["low", "medium", "high"];
    return priorities.map((priority) => ({
      value: priority,
      label: priority.charAt(0).toUpperCase() + priority.slice(1),
      count: suggestions.filter((s) => s.priority === priority).length,
    }));
  };

  const getEmployeeOptions = (): FilterOption[] => {
    return employees.map((employee) => ({
      value: employee.id,
      label: employee.name,
      count: suggestions.filter((s) => s.employeeId === employee.id).length,
    }));
  };

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => {
    const currentFilters = filters[filterType];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((f) => f !== value)
      : [...currentFilters, value];

    updateFilters({ [filterType]: newFilters });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce(
      (total, filterArray) => total + filterArray.length,
      0
    );
  };

  const hasActiveFilters = getActiveFilterCount() > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
            >
              <XMarkIcon className="h-4 w-4" />
              <span>Clear all</span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronDownIcon
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className={`space-y-4 ${isOpen ? "block" : "hidden lg:block"}`}>
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {getStatusOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange("status", option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colours ${
                  filters.status.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {getTypeOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange("type", option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colours ${
                  filters.type.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {getPriorityOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange("priority", option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colours ${
                  filters.priority.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>

        {/* Employee Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Employee
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {getEmployeeOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange("employee", option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colours ${
                  filters.employee.includes(option.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
