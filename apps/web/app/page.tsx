import { Button } from "@hobbydeals/ui/button";

import { ThemeToggle } from "./theme-toggle";

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">
            <span className="text-brand-primary">Hobby</span>Deals
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 justify-center mt-12">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16">
          Entorno de desarrollo — Fase 1
        </p>
      </div>
    </main>
  );
}
