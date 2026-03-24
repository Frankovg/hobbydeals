type TemperatureLevel = "cold" | "cool" | "neutral" | "warm" | "hot";

export function getTemperatureLabel(temp: number): string {
  if (temp >= 100) return "En llamas";
  if (temp >= 50) return "Muy caliente";
  if (temp >= 20) return "Caliente";
  if (temp >= 5) return "Tibio";
  if (temp >= 0) return "Frío";
  return "Congelado";
}

export function getTemperatureColor(temp: number): TemperatureLevel {
  if (temp >= 50) return "hot";
  if (temp >= 20) return "warm";
  if (temp >= 5) return "neutral";
  if (temp >= 0) return "cool";
  return "cold";
}
