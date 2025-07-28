// pages/api/bgg.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { DOMParser } from '@xmldom/xmldom';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Falta el parámetro ?query=' });
  }

  const parser = new DOMParser();

  try {
    // Si query es un número → buscar por ID
    if (/^\d+$/.test(query)) {
      const bggId = Number(query);

      const existing = await prisma.game.findUnique({ where: { bggId } });
      if (existing) return res.status(200).json(existing);

      const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${bggId}`);
      const xml = await response.text();
      const doc = parser.parseFromString(xml, 'application/xml');

      const item = doc.getElementsByTagName('item')[0];
      if (!item) return res.status(404).json({ error: 'Juego no encontrado por ID' });

      const name = item.getElementsByTagName('name')[0]?.getAttribute('value') || 'Sin nombre';
      const year = parseInt(item.getElementsByTagName('yearpublished')[0]?.getAttribute('value') || '0');
      const image = item.getElementsByTagName('image')[0]?.textContent || '';
      const description = item.getElementsByTagName('description')[0]?.textContent || '';

      const nuevoJuego = await prisma.game.create({
        data: {
          bggId,
          name,
          year,
          image,
          description,
        },
      });

      return res.status(200).json(nuevoJuego);
    }

    // Si no es número → buscar por texto
    const response = await fetch(`https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`);
    const xml = await response.text();
    const doc = parser.parseFromString(xml, 'application/xml');

    const items = Array.from(doc.getElementsByTagName('item')) || [];
    if (items.length === 0) return res.status(404).json({ error: 'No se encontraron resultados' });

    const results = items.map((item) => ({
      bggId: Number(item.getAttribute('id')),
      name: item.getElementsByTagName('name')[0]?.getAttribute('value') || '',
      year: parseInt(item.getElementsByTagName('yearpublished')[0]?.getAttribute('value') || '0'),
    }));

    return res.status(200).json({ results });

  } catch (err: any) {
    return res.status(500).json({ error: 'Error al consultar o guardar el juego', details: err.message });
  }
}
