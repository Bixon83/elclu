// pages/games/[id].tsx
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { prisma } from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string
  const game = await prisma.game.findUnique({ where: { id } })
  if (!game) return { notFound: true }

  // Serialize Dates → strings
  const cleanGame = JSON.parse(JSON.stringify(game))
  return { props: { game: cleanGame } }
}

export default function GamePage({ game }: { game: any }) {
  // 1) Reemplazamos los &#10; por saltos de línea
  // 2) Reemplazamos &amp; y &quot; si los tuvieras
  const raw = game.description || ''
  const decoded = raw
    .replace(/&#10;/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')

  // Partimos en párrafos por cada salto de línea
  const paragraphs = decoded
    .split(/\n+/)
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{game.name}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          {game.image && (
            <div className="relative w-full h-64 rounded shadow-md overflow-hidden">
              <Image
                src={game.image}
                alt={game.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 bg-cluGreen text-white px-4 py-2 rounded hover:bg-cluGreenDark transition">
              Seguir
            </button>
            <button className="flex-1 border border-cluGreen text-cluGreen px-4 py-2 rounded hover:bg-cluGreen/10 transition">
              + Lista
            </button>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-4">
          {paragraphs.map((p: string, i: number) => (
            <p key={i} className="text-gray-700 leading-relaxed">
              {p}
            </p>
          ))}
          <p className="text-sm text-gray-500">
            Creado el:&nbsp;
            {new Date(game.createdAt).toLocaleDateString('es-AR', {
              day: '2-digit',
              month: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
