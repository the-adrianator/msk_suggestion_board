// Bulk operations component for MSK Suggestion Management Board

"use client";
import { useState } from "react";
import { Suggestion } from "@/types";
import { useSuggestions } from "@/hooks/useSuggestions";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { TrashIcon } from "@heroicons/react/24/outline";

interface BulkOperationsProps {
  selectedSuggestions: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  suggestions: Suggestion[];
}

export const BulkOperations: React.FC<BulkOperationsProps> = ({
  selectedSuggestions,
  onSelectionChange,
  suggestions,
}) => {
  const { bulkChangeStatus, removeSuggestion, loading } = useSuggestions();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "status" | "delete";
    status?: Suggestion["status"];
    message: string;
    confirmText: string;
    danger?: boolean;
  } | null>(null);

  const selectedCount = selectedSuggestions.length;
  const isAllSelected =
    selectedCount === suggestions.length && suggestions.length > 0;
  const isPartiallySelected =
    selectedCount > 0 && selectedCount < suggestions.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(suggestions.map((s) => s.id));
    }
  };

  const handleBulkStatusUpdate = (status: Suggestion["status"]) => {
    const statusLabels = {
      pending: "Pending",
      in_progress: "In Progress",
      completed: "Completed",
      dismissed: "Dismissed",
      overdue: "Overdue",
    };

    setConfirmAction({
      type: "status",
      status,
      message: `Are you sure you want to mark ${selectedCount} suggestion${
        selectedCount !== 1 ? "s" : ""
      } as ${statusLabels[status].toLowerCase()}?`,
      confirmText: `Mark as ${statusLabels[status]}`,
    });
    setShowConfirmDialog(true);
  };

  const handleBulkDelete = () => {
    setConfirmAction({
      type: "delete",
      message: `Are you sure you want to permanently delete ${selectedCount} suggestion${
        selectedCount !== 1 ? "s" : ""
      }? This action cannot be undone.`,
      confirmText: "Delete Suggestions",
      danger: true,
    });
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === "status" && confirmAction.status) {
        await bulkChangeStatus(selectedSuggestions, confirmAction.status);
      } else if (confirmAction.type === "delete") {
        // Delete suggestions one by one (could be optimised with bulk delete)
        for (const id of selectedSuggestions) {
          await removeSuggestion(id);
        }
      }
      onSelectionChange([]);
    } catch (error) {
      console.error("Bulk operation failed:", error);
    } finally {
      setShowConfirmDialog(false);
      setConfirmAction(null);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  if (selectedCount === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(input) => {
                if (input) input.indeterminate = isPartiallySelected;
              }}
              onChange={handleSelectAll}
              className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
            />
            <span className="text-sm font-medium text-foreground">
              Select all suggestions ({suggestions.length})
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-primary">
              {selectedCount} suggestion{selectedCount !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => onSelectionChange([])}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Status Update Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleBulkStatusUpdate("pending")}
                disabled={loading}
                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700 disabled:opacity-50"
              >
                Mark Pending
              </button>
              <button
                onClick={() => handleBulkStatusUpdate("in_progress")}
                disabled={loading}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 rounded hover:bg-blue-200 dark:hover:bg-blue-700 disabled:opacity-50"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => handleBulkStatusUpdate("completed")}
                disabled={loading}
                className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded hover:bg-green-200 dark:hover:bg-green-700 disabled:opacity-50"
              >
                Mark Completed
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={handleBulkDelete}
              disabled={loading}
              className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-700 disabled:opacity-50 flex items-center space-x-1"
            >
              <TrashIcon className="h-3 w-3" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirmAction}
        title={
          confirmAction?.type === "delete"
            ? "Delete Suggestions"
            : "Update Status"
        }
        message={confirmAction?.message || ""}
        confirmText={confirmAction?.confirmText || "Confirm"}
        type={confirmAction?.danger ? "danger" : "warning"}
        loading={loading}
      />
    </>
  );
};
