import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyOauthToken } from '@lib/dbUtils';
import { Session } from 'next-auth/client';

export interface IArtist {
  name: string;
  image: string;
  spotifyId: String;
}

const spotifyApi = new SpotifyWebApi();

const setAuthToken = async (session: Session) => {
  const spotifyOauthToken = await getSpotifyOauthToken(session);
  spotifyApi.setAccessToken(spotifyOauthToken);
}

export const getTopArtists = async (session: Session) => {
  await setAuthToken(session);

  const response = await spotifyApi.getMyTopArtists();
  
  const artists: IArtist[] = response.body.items.map((artist) => ({
    name: artist.name,
    image: artist.images[0].url,
    spotifyId: artist.id,
  }));

  return artists
}