// Suggestion card component for MSK Suggestion Management Board
// Following British spelling conventions throughout

"use client";
import { useState } from "react";
import { Suggestion } from "@/types";
import {
  getStatusColour,
  getTypeColour,
  getPriorityColour,
  formatDate,
} from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SuggestionCardProps {
  suggestion: Suggestion;
  employeeName: string;
  onStatusUpdate?: (suggestionId: string, status: Suggestion["status"]) => void;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  employeeName,
  onStatusUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions: Array<{ value: Suggestion["status"]; label: string }> = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "dismissed", label: "Dismissed" },
    { value: "overdue", label: "Overdue" },
  ];

  const handleStatusChange = (newStatus: Suggestion["status"]) => {
    if (onStatusUpdate) {
      onStatusUpdate(suggestion.id, newStatus);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColour(
                suggestion.status
              )}`}
            >
              {suggestion.status
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColour(
                suggestion.type
              )}`}
            >
              {suggestion.type.charAt(0).toUpperCase() +
                suggestion.type.slice(1)}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColour(
                suggestion.priority
              )}`}
            >
              {suggestion.priority.charAt(0).toUpperCase() +
                suggestion.priority.slice(1)}
            </span>
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            {employeeName}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {suggestion.description}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-1 text-muted-foreground hover:text-foreground transition-colours"
        >
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Status Update Dropdown */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Update Status
        </label>
        <select
          value={suggestion.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as Suggestion["status"])
          }
          className="w-full px-3 py-1 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-3 space-y-3">
          {/* Source and Created Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Source:</span>
              <span className="ml-1 font-medium">
                {suggestion.source === "vida" ? "VIDA" : "Admin"}
              </span>
            </div>
            {suggestion.createdBy && (
              <div>
                <span className="text-muted-foreground">Created by:</span>
                <span className="ml-1 font-medium">{suggestion.createdBy}</span>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <span className="ml-1 font-medium">
                {formatDate(suggestion.dateCreated)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Updated:</span>
              <span className="ml-1 font-medium">
                {formatDate(suggestion.dateUpdated)}
              </span>
            </div>
          </div>

          {suggestion.dateCompleted && (
            <div className="text-xs">
              <span className="text-muted-foreground">Completed:</span>
              <span className="ml-1 font-medium">
                {formatDate(suggestion.dateCompleted)}
              </span>
            </div>
          )}

          {/* Cost */}
          <div className="text-xs">
            <span className="text-muted-foreground">Estimated Cost:</span>
            <span className="ml-1 font-medium">{suggestion.estimatedCost}</span>
          </div>

          {/* Notes */}
          {suggestion.notes && (
            <div>
              <span className="text-xs text-muted-foreground">Notes:</span>
              <p className="text-xs text-foreground mt-1 p-2 bg-muted rounded-md">
                {suggestion.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
