"use client";
import { Layout } from "@/components/layout/Layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage MSK health suggestions for your employees
          </p>
        </div>

        {/* Placeholder content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">
              Total Suggestions
            </h3>
            <p className="text-3xl font-bold text-primary mt-2">0</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">0</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-blue-500 mt-2">0</p>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground">Completed</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">0</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Recent Suggestions
          </h2>
          <p className="text-muted-foreground">
            No suggestions available. Create your first suggestion to get
            started.
          </p>
        </div>
      </div>
    </Layout>
  );
}
