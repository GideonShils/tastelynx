import { removeArtist, saveArtist } from '@lib/db';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error('No session found');
  }

  const { artist } = req.body;

  if (req.method == 'POST') {
    await saveArtist(session, artist);
  } else if (req.method == 'DELETE') {
    await removeArtist(session, artist);
  } else {
    throw new Error('Invalid request method');
  }

  res.status(200).end();
};
