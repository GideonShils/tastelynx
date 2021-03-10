import { IArtist } from '@lib/spotify';
import { model, Schema, Document, models } from 'mongoose';

export interface IConfig extends Document {
  artists: IArtist[];   // Fav artists
  userId: string;       // Key into the accounts table to get oauth token, etc.
  playlistId: string;   // ID of playlist we're storing new data in
}

const ConfigSchema: Schema = new Schema({
  artists: [{name: String, image: String, spotifyId: String}],
  userId: String,
  playlistId: String,
})

const Config = models.Config || model('Config', ConfigSchema);


export default Config;

export const getConfig = async (userId: string): Promise<IConfig | null> => {
  return Config.findOne({
    userId: userId
  })
}

export const getAllConfigs = async (): Promise<IConfig[]> => {
  return Config.find();
};

export const createConfig = async(userId: string): Promise<IConfig> => {
  return await Config.create({
    userId,
  })
}

export const saveArtistToConfig = async (userId: string, artist: IArtist): Promise<IConfig | null> => {
  let existingConfig: IConfig | null =  await getConfig(userId);

  if (!existingConfig) {
    existingConfig = await createConfig(userId);
  }

  existingConfig.artists.push(artist);

  return existingConfig.save();
}

export const removeArtistFromConfig = async (userId: String, artist: IArtist): Promise<IConfig | null> => {
  const existingConfig: IConfig | null =  await Config.findOne({
    userId: userId
  })

  if (!existingConfig) {
    throw new Error("No existing configuration was found for this user")
  }
/*
  existingConfig.artists.id
  const oldArtist = existingConfig.artists.find(existingArtist => existingArtist.artistName == artist.artistName);
  oldArtist*/

  return existingConfig.save();
}
