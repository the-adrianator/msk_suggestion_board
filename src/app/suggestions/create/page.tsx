// Create Suggestion page for MSK Suggestion Management Board

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useSuggestions } from "@/hooks/useSuggestions";
import { SuggestionForm } from "@/components/suggestions/SuggestionForm";

export default function CreateSuggestionPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { employees } = useSuggestions();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Create Suggestion
          </h1>
          <p className="text-muted-foreground">
            Create a new MSK health suggestion for an employee
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <SuggestionForm
            employees={employees}
            onSuccess={() => router.push("/suggestions")}
          />
        </div>
      </div>
    </Layout>
  );
}
