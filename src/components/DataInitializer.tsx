// Data initialisation component for MSK Suggestion Management Board

"use client";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export const DataInitializer: React.FC = () => {
  const { initialiseData, employees, suggestions } = useAppStore();

  useEffect(() => {
    // Only initialise data if we don't have any data yet
    if (employees.length === 0 && suggestions.length === 0) {
      initialiseData();
    }
  }, [initialiseData, employees.length, suggestions.length]);

  return null;
};
