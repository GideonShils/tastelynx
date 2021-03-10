import { getFavoriteArtists } from '@lib/db';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error('No session found');
  }

  const artists = await getFavoriteArtists(session);

  return res.status(200).json(artists);
};
