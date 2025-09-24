// Suggestions page for MSK Suggestion Management Board

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useSuggestions } from "@/hooks/useSuggestions";
import { SuggestionFilters } from "@/components/suggestions/SuggestionFilters";
import { SuggestionSearch } from "@/components/suggestions/SuggestionSearch";
import { SuggestionsList } from "@/components/suggestions/SuggestionsList";

export default function SuggestionsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getProcessedSuggestions, filteredStats } = useSuggestions();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  const filteredSuggestions = getProcessedSuggestions(
    searchTerm,
    "dateUpdated",
    "desc"
  );

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suggestions</h1>
          <p className="text-muted-foreground">
            Manage MSK health suggestions for your employees
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
            <p className="text-2xl font-bold text-foreground">
              {filteredStats.total}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              Pending
            </h3>
            <p className="text-2xl font-bold text-yellow-500">
              {filteredStats.pending}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              In Progress
            </h3>
            <p className="text-2xl font-bold text-blue-500">
              {filteredStats.inProgress}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-muted-foreground">
              Completed
            </h3>
            <p className="text-2xl font-bold text-green-500">
              {filteredStats.completed}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SuggestionFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search */}
            <SuggestionSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search suggestions by description, employee name, or notes..."
            />

            {/* Suggestions List */}
            <SuggestionsList
              suggestions={filteredSuggestions}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
