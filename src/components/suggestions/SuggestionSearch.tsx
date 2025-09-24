// Suggestion search component for MSK Suggestion Management Board

"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SuggestionSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SuggestionSearch: React.FC<SuggestionSearchProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search suggestions...",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-10 py-2 border rounded-lg transition-colours
            bg-background text-foreground placeholder-muted-foreground
            border-input focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-opacity-20
            ${isFocused ? "ring-2 ring-ring ring-opacity-20" : ""}
          `}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colours"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
