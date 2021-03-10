// import { getAllConfigs } from './../../../models/Config';
import { getFavoriteArtists, getPlaylistId } from '@lib/db';
import { createPlaylist, updatePlaylist } from '@lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<unknown>> => {
  const session = await getSession({ req });

  if (!session) {
    throw new Error('No session found');
  }

  const favoriteArtists = await getFavoriteArtists(session);
  const existingPlaylistId = await getPlaylistId(session);

  if (existingPlaylistId) {
    // TODO: Ensure playlist actually exists
    updatePlaylist(session, existingPlaylistId, favoriteArtists);
  } else {
    const newPlaylistId = await createPlaylist(session);
    updatePlaylist(session, newPlaylistId, favoriteArtists);
  }

  return res.status(200);
};
