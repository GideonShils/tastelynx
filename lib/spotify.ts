import { NextApiRequest } from "next"
import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyOauthToken } from '@lib/db';

const spotifyApi = new SpotifyWebApi();

const setAuthToken = async (req: NextApiRequest) => {
  const spotifyOauthToken = await getSpotifyOauthToken(req);
  spotifyApi.setAccessToken(spotifyOauthToken);
}

export const getTopArtists = async (req: NextApiRequest) => {
  await setAuthToken(req);

  const response = await spotifyApi.getMyTopArtists();
  return response.body;
}