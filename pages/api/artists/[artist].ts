import { removeArtist, saveArtist } from '@lib/db';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserIdFromSession } from '@lib/dbUtils';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error('No session found');
  }

  const { artist } = req.body;

  const userId = await getUserIdFromSession(session);

  if (req.method == 'POST') {
    await saveArtist(userId, artist);
  } else if (req.method == 'DELETE') {
    await removeArtist(userId, artist);
  } else {
    throw new Error('Invalid request method');
  }

  res.status(200).end();
};
