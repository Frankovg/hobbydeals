type TemperatureLevel = "cold" | "neutral" | "warm" | "hot" | "burning" | "fire";

export function getTemperatureLabel(temp: number): string {
  if (temp >= 100) return "En llamas";
  if (temp >= 50) return "Muy caliente";
  if (temp >= 20) return "Caliente";
  if (temp >= 5) return "Tibio";
  if (temp >= 0) return "Frío";
  return "Congelado";
}

export function getTemperatureColor(temp: number): TemperatureLevel {
  if (temp >= 100) return "fire";
  if (temp >= 50) return "burning";
  if (temp >= 20) return "hot";
  if (temp >= 5) return "warm";
  if (temp >= 0) return "neutral";
  return "cold";
}
