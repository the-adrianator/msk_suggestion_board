// Suggestions list component for MSK Suggestion Management Board
// Following British spelling conventions throughout

"use client";
import { useState } from "react";
import { Suggestion } from "@/types";
import { SuggestionCard } from "./SuggestionCard";
import { useSuggestions } from "@/hooks/useSuggestions";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface SuggestionsListProps {
  suggestions: Suggestion[];
  searchTerm?: string;
}

type SortField = "dateCreated" | "dateUpdated" | "priority" | "status" | "type";
type SortOrder = "asc" | "desc";

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  searchTerm,
}) => {
  const { changeStatus, employees } = useSuggestions();
  const [sortField, setSortField] = useState<SortField>("dateUpdated");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <ArrowUpIcon className="h-4 w-4 text-muted-foreground opacity-50" />
      );
    }
    return sortOrder === "asc" ? (
      <ArrowUpIcon className="h-4 w-4 text-foreground" />
    ) : (
      <ArrowDownIcon className="h-4 w-4 text-foreground" />
    );
  };

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee?.name || "Unknown Employee";
  };

  const handleStatusUpdate = async (
    suggestionId: string,
    status: Suggestion["status"]
  ) => {
    try {
      await changeStatus(suggestionId, status);
    } catch (error) {
      console.error("Failed to update suggestion status:", error);
    }
  };

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          {searchTerm ? (
            <>
              <p className="text-lg font-medium mb-2">No suggestions found</p>
              <p>Try adjusting your search terms or filters</p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium mb-2">
                No suggestions available
              </p>
              <p>Create your first suggestion to get started</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {suggestions.length} suggestion
          {suggestions.length !== 1 ? "s" : ""}
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Sort options */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Sort by:</span>
          <div className="flex items-center space-x-1">
            {(["dateUpdated", "priority", "status", "type"] as SortField[]).map(
              (field) => (
                <button
                  key={field}
                  onClick={() => handleSort(field)}
                  className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-accent transition-colours"
                >
                  <span className="capitalize">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  {getSortIcon(field)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Suggestions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            employeeName={getEmployeeName(suggestion.employeeId)}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
};
