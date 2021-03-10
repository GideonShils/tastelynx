import { removeArtistFromConfig, saveArtistToConfig, getConfig } from './../models/Config';
import { Session } from 'next-auth/client';
import connectToDatabase, { getUserIdFromSession } from './dbUtils';
import { IArtist } from '@lib/spotify';

export const saveArtist = async (session: Session, artist: IArtist) => {
  await connectToDatabase()
  
  const userId = await getUserIdFromSession(session);
  await saveArtistToConfig(userId, artist);
}

export const removeArtist = async (session: Session, artist: IArtist) => {
  await connectToDatabase()
  
  const userId = await getUserIdFromSession(session);
  await removeArtistFromConfig(userId, artist);
}

export const getFavoriteArtists = async (session: Session): Promise<IArtist[]> => {
  await connectToDatabase()
  
  const userId = await getUserIdFromSession(session);
  const config = await getConfig(userId);

  let artists: IArtist[];

  if (config) {
    artists = config.artists.map(artist => {
      return {
        name: artist.name,
        image: artist.image,
        spotifyId: artist.spotifyId
      }
    });
  } else {
    artists = [];
  }

  return artists;
}
