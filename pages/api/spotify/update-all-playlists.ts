import { getFavoriteArtists } from '@lib/db';
import { updatePlaylist } from '@lib/spotify';
import { getAllConfigs } from '@models/Config';
import { NextApiRequest, NextApiResponse } from 'next';

// Will be hit via API by cron job
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const allConfigs = await getAllConfigs();

  const playlistUpdatePromises = allConfigs.map(async config => {
    const userId = config.userId;
    const playlistId = config.playlistId;

    const favoriteArtists = await getFavoriteArtists(userId);

    if (playlistId) {
      // TODO: Ensure playlist actually exists
      updatePlaylist(userId, playlistId, favoriteArtists);
    }
  });

  await Promise.all(playlistUpdatePromises);

  return res.status(200).end();
};
