import { getFavoriteArtists, getPlaylistId } from '@lib/db';
import { getUserIdFromSession } from '@lib/dbUtils';
import { createPlaylist, updatePlaylist } from '@lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error('No session found');
  }

  const userId = await getUserIdFromSession(session);

  const favoriteArtists = await getFavoriteArtists(userId);
  const existingPlaylistId = await getPlaylistId(userId);

  if (existingPlaylistId) {
    // TODO: Ensure playlist actually exists
    updatePlaylist(userId, existingPlaylistId, favoriteArtists);
  } else {
    const newPlaylistId = await createPlaylist(session);
    updatePlaylist(userId, newPlaylistId, favoriteArtists);
  }

  return res.status(200).end();
};
