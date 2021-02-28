import { getTopArtists } from '../../../lib/spotify';
import { NextApiRequest, NextApiResponse } from "next"

export interface IArtist {
  name: string;
  image: SpotifyApi.ImageObject;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getTopArtists(req);

  const artists: IArtist[] = response.items.map((artist) => ({
    name: artist.name,
    image: artist.images[0],
  }));

  return res.status(200).json(artists);
};