import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";


interface SearchResult { bggId: number; name: string; year?: number; }

const Search: NextPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults([]);

    const res = await fetch(`/api/bgg?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Error inesperado");
      return;
    }

    const data = await res.json();
    setResults(data.results);
  };

  const fetchAndSave = async (bggId: number) => {
  try {
    const res = await fetch(`/api/bgg?query=${bggId}`);
    const game = await res.json();

    if (res.ok && game.id) {
      router.push(`/games/${game.id}`);
    } else {
      alert("No se pudo redirigir al juego");
    }
  } catch (err) {
    alert("Error al buscar el juego");
    console.error(err);
  }
};

  
  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input type="text" placeholder="Buscar juego..." value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded" />
        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {results.map((r) => (
        <div key={r.bggId} className="border p-3 mb-2 rounded hover:bg-gray-100 cursor-pointer"
             onClick={() => fetchAndSave(r.bggId)}>
          <strong>{r.name}</strong> {r.year && `(${r.year})`}
        </div>
      ))}
    </div>
  );
};

export default Search;
