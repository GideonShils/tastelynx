import {
  removeArtistFromConfig,
  saveArtistToConfig,
  getConfig,
  IConfig,
  getPlaylistIdFromConfig
} from '@models/Config';
import connectToDatabase from '@lib/dbUtils';
import { IArtist } from '@lib/spotify';

export const saveArtist = async (userId: string, artist: IArtist): Promise<IConfig | null> => {
  await connectToDatabase();
  return await saveArtistToConfig(userId, artist);
};

export const removeArtist = async (userId: string, artist: IArtist): Promise<IConfig | null> => {
  await connectToDatabase();
  return await removeArtistFromConfig(userId, artist);
};

export const getFavoriteArtists = async (userId: string): Promise<IArtist[]> => {
  await connectToDatabase();

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

export const getPlaylistId = async (userId: string): Promise<string | null> => {
  await connectToDatabase();
  return await getPlaylistIdFromConfig(userId);
};
