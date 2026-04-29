import { Badge } from "@hobbydeals/ui/badge";
import { Button } from "@hobbydeals/ui/button";
import { Input } from "@hobbydeals/ui/input";
import { SelectNative, SelectNativeOption } from "@hobbydeals/ui/select-native";
import { Textarea } from "@hobbydeals/ui/textarea";

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

        <div className="mt-12 space-y-6">
          <h2 className="text-center font-display text-lg font-semibold">Form fields</h2>

          <div className="flex justify-between gap-3 w-full mx-auto">
            <div className="space-y-2 w-full">
              <label className="text-sm font-medium" htmlFor="example-input">
                Título de la oferta
              </label>
              <Input id="example-input" placeholder="Ej: Catan a mitad de precio" type="text" />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm font-medium" htmlFor="example-textarea">
                Descripción
              </label>
              <Textarea
                id="example-textarea"
                placeholder="Contá los detalles de la oferta…"
                rows={4}
              />
            </div>

            <div className="space-y-2 w-full">
              <label className="text-sm font-medium" htmlFor="example-select">
                Categoría
              </label>
              <SelectNative defaultValue="" id="example-select">
                <SelectNativeOption disabled value="">
                  Elegí una categoría
                </SelectNativeOption>
                <SelectNativeOption value="board-games">Juegos de Mesa</SelectNativeOption>
                <SelectNativeOption value="gaming">Gaming</SelectNativeOption>
                <SelectNativeOption value="collectibles">Coleccionismo</SelectNativeOption>
                <SelectNativeOption value="airsoft">Airsoft</SelectNativeOption>
                <SelectNativeOption value="music">Música</SelectNativeOption>
                <SelectNativeOption value="modeling">Modelismo</SelectNativeOption>
              </SelectNative>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-16">
          Entorno de desarrollo — Fase 1
        </p>
      </div>
    </main>
  );
}
