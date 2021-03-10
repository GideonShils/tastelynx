import { getFavoriteArtists } from '@lib/db';
import { updatePlaylist } from '@lib/spotify';
import { getAllConfigs } from '@models/Config';
import { NextApiRequest, NextApiResponse } from 'next';

// Will be hit via API by cron job
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const base64AuthEncoding = req.headers.authorization;

  if (base64AuthEncoding) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, pass] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (username == process.env.UPDATE_ALL_AUTH_USER && pass == process.env.UPDATE_ALL_AUTH_PASS) {
      const allConfigs = await getAllConfigs();

      const playlistUpdatePromises = allConfigs.map(async (config) => {
        const userId = config.userId;
        const playlistId = config.playlistId;

        const favoriteArtists = await getFavoriteArtists(userId);

        if (playlistId) {
          // TODO: Ensure playlist actually exists
          updatePlaylist(userId, playlistId, favoriteArtists);
        }
      });

      Promise.all(playlistUpdatePromises);

      return res.status(200).end();
    } else {
      throw new Error('Incorrect auth');
    }
  } else {
    throw new Error('Incorrect auth');
  }
};
