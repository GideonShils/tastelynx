import {
  removeArtistFromConfig,
  saveArtistToConfig,
  getConfig,
  IConfig,
  getPlaylistIdFromConfig
} from '@models/Config';
import { Session } from 'next-auth/client';
import connectToDatabase, { getUserIdFromSession } from '@lib/dbUtils';
import { IArtist } from '@lib/spotify';

export const saveArtist = async (session: Session, artist: IArtist): Promise<IConfig | null> => {
  await connectToDatabase();

  const userId = await getUserIdFromSession(session);
  return await saveArtistToConfig(userId, artist);
};

export const removeArtist = async (session: Session, artist: IArtist): Promise<IConfig | null> => {
  await connectToDatabase();

  const userId = await getUserIdFromSession(session);
  return await removeArtistFromConfig(userId, artist);
};

export const getFavoriteArtists = async (session: Session): Promise<IArtist[]> => {
  await connectToDatabase();

  const userId = await getUserIdFromSession(session);
  const config = await getConfig(userId);

  let artists: IArtist[];

  if (config) {
    artists = config.artists.map((artist) => {
      return {
        name: artist.name,
        image: artist.image,
        spotifyId: artist.spotifyId
      };
    });
  } else {
    artists = [];
  }

  return artists;
};

export const getPlaylistId = async (session: Session): Promise<string | null> => {
  await connectToDatabase();

  const userId = await getUserIdFromSession(session);
  return await getPlaylistIdFromConfig(userId);
};
