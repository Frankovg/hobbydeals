const categories = [
  { name: "Juegos de Mesa", emoji: "🎲", color: "bg-[#7F77DD]" },
  { name: "Gaming", emoji: "🎮", color: "bg-[#1D9E75]" },
  { name: "Coleccionismo", emoji: "🏆", color: "bg-[#BA7517]" },
  { name: "Airsoft & Paintball", emoji: "🎯", color: "bg-[#D85A30]" },
  { name: "Música", emoji: "🎸", color: "bg-[#D4537E]" },
  { name: "Modelismo & Miniaturas", emoji: "🪆", color: "bg-[#378ADD]" },
];

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-brand">Hobby</span>Deals
          </h1>
          <p className="text-sm text-gray-500">Los mejores chollos de tus hobbies</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
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
        </div>

        <p className="text-center text-sm text-gray-400 mt-16">
          Entorno de desarrollo — Fase 1
        </p>
      </div>
    </main>
  );
}
