"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOutIcon } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-10">
      <h1 className="text-xl font-bold text-primary">Issue Tracker</h1>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {isAuthenticated && (
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOutIcon className="w-4 h-4 mr-1" />
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
