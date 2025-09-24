"use client";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground">
              MSK Suggestion Management
            </h1>
          </div>

          {/* Right side - Theme toggle and user menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {currentUser && (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-muted-foreground">
                  Welcome, {currentUser.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colours"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
