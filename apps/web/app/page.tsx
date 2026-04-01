"use client";

import { Button } from "@hobbydeals/ui/button";
import { Text } from "@hobbydeals/ui/text";

const variants = ["default", "secondary", "destructive", "outline", "ghost"] as const;

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-bg-base">
      <header className="bg-bg-page border-b border-border-light px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">
            <span className="text-brand-primary">Hobby</span>Deals
          </h1>
          <p className="text-sm text-text-secondary">
            Button Component Test
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-title font-bold text-text-primary mb-8">
          Button Variants
        </h2>

        <div className="flex flex-col gap-6">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-row items-center gap-4">
              <span className="w-28 text-caption text-text-secondary capitalize">
                {variant}
              </span>
              <Button variant={variant} size="default">
                <Text>Default</Text>
              </Button>
              <Button variant={variant} size="sm">
                <Text>Small</Text>
              </Button>
              <Button variant={variant} size="default" disabled>
                <Text>Disabled</Text>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-text-tertiary mt-16">
          Entorno de desarrollo — Button Test
        </p>
      </div>
    </main>
  );
}
