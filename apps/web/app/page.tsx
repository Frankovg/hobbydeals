import { Badge } from "@hobbydeals/ui/badge";
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

        <div className="mt-12 space-y-6">
          <h2 className="text-center font-display text-lg font-semibold">Badges</h2>

          <div className="flex flex-wrap gap-3 justify-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="burning">342°</Badge>
            <Badge variant="hot">187°</Badge>
            <Badge variant="warm">85°</Badge>
            <Badge variant="cold">12°</Badge>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="board-games">Juegos de Mesa</Badge>
            <Badge variant="gaming">Gaming</Badge>
            <Badge variant="collectibles">Coleccionismo</Badge>
            <Badge variant="airsoft">Airsoft</Badge>
            <Badge variant="music">Música</Badge>
            <Badge variant="modeling">Modelismo</Badge>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="discount">-43%</Badge>
            <Badge variant="discount">-20%</Badge>
            <Badge variant="discount">-75%</Badge>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16">
          Entorno de desarrollo — Fase 1
        </p>
      </div>
    </main>
  );
}
