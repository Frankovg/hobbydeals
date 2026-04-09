import { Button } from "@hobbydeals/ui/button";

import { ThemeToggle } from "./theme-toggle";

const categories = [
  { name: "Juegos de Mesa", emoji: "🎲", color: "bg-cat-boardgames" },
  { name: "Gaming", emoji: "🎮", color: "bg-cat-gaming" },
  { name: "Coleccionismo", emoji: "🏆", color: "bg-cat-collectibles" },
  { name: "Airsoft & Paintball", emoji: "🎯", color: "bg-cat-airsoft" },
  { name: "Música", emoji: "🎸", color: "bg-cat-music" },
  { name: "Modelismo & Miniaturas", emoji: "🪆", color: "bg-cat-modeling" },
];

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-brand-primary">Hobby</span>Deals
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Chollos de hobbies, hechos por la comunidad
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofertas verificadas por la comunidad en juegos de mesa, gaming,
            coleccionismo, airsoft, música y modelismo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center hover:shadow-md transition-shadow"
            >
              <div
                className={`${cat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-2xl">{cat.emoji}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            </div>
          ))}
        </div> */}

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
