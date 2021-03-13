import { updateAllPlaylists } from '@lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';

// Will be hit via API by cron job
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const base64AuthEncoding = req.headers.authorization;

  if (base64AuthEncoding) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, pass] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (username == process.env.UPDATE_ALL_AUTH_USER && pass == process.env.UPDATE_ALL_AUTH_PASS) {
      updateAllPlaylists();
      return res.status(200).end();
    }
  }

  return res.status(401).end();
};
