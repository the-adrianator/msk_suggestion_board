"use client";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSuggestions } from "@/hooks/useSuggestions";
import { getStatusColour, getTypeColour, formatDate } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { stats, getProcessedSuggestions } = useSuggestions();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  const recentSuggestions = getProcessedSuggestions(
    undefined,
    "dateUpdated",
    "desc"
  ).slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage MSK health suggestions for your employees
            </p>
          </div>
          <Link
            href="/suggestions"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colours"
          >
            View All Suggestions
          </Link>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Total Suggestions
            </h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">
              {stats.inProgress}
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">Completed</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {stats.completed}
            </p>
          </div>
        </div>

        {/* Recent suggestions */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Recent Suggestions
          </h2>

          {recentSuggestions.length > 0 ? (
            <div className="space-y-4">
              {recentSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColour(
                          suggestion.status
                        )}`}
                      >
                        {suggestion.status.replace("_", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColour(
                          suggestion.type
                        )}`}
                      >
                        {suggestion.type}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-1">
                      {suggestion.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated: {formatDate(suggestion.dateUpdated)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No suggestions available. Create your first suggestion to get
              started.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
