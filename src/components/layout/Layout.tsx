"use client";
import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16 px-4 bg-card border-b border-border">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">
              MSK Management
            </h1>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full flex flex-col">
            <Header />
            <div className="flex-1 p-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};
