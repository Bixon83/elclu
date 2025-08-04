import Link from 'next/link';

export default function Home() {
  return (
    <section>
      {/* Hero */}
      <div className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">¡Bienvenido a El Clú del Boardgame!</h1>
            <p className="text-gray-700 mb-4">Tu sitio de juegos de mesa en español.</p>
            <Link
              href="/juegos"
              className="inline-block bg-cluGreen text-white px-6 py-3 rounded hover:bg-cluGreenDark transition"
            >
              Explorar juegos
            </Link>
          </div>
          {/* Opcional: alguna imagen o ilustración */}
          <div className="mt-8 md:mt-0">
            <img src="/hero-juegos.svg" alt="Cartas y meeples" className="h-40 mx-auto" />
          </div>
        </div>
      </div>

      {/* Placeholder de secciones futuras */}
      <div className="container mx-auto px-4 py-12">
        <div className="border-2 border-dashed border-gray-300 p-12 text-center text-gray-400">
          Aquí irán las secciones “¿Qué es El Clú?”, destacados, etc.
        </div>
      </div>
    </section>
  );
}
