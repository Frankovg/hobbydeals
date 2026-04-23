"use client";

import { Button } from "@hobbydeals/ui/button";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => { };

export function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        &nbsp;
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </Button>
  );
}
