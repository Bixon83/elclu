// pages/games/[id].tsx

import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  const game = await prisma.game.findUnique({ where: { id } });

  if (!game) {
    return { notFound: true };
  }

  return {
    props: {
      game,
    },
  };
};

export default function GameDetail({ game }: { game: any }) {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{game.name} {game.year && `(${game.year})`}</h1>
      {game.image && <img src={game.image} alt={game.name} className="mb-4 w-full max-w-md" />}
      <p className="text-gray-700">{game.description}</p>
      <p className="text-sm text-gray-500 mt-2">BGG ID: {game.bggId}</p>
    </div>
  );
}
