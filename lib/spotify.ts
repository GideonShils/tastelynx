import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyOauthTokenFromUserId, getSpotifyOauthTokenFromSession } from '@lib/dbUtils';
import { Session } from 'next-auth/client';
import { PLAYLIST_DESCRIPTION, PLAYLIST_NAME } from '@constants/spotifyConstants';
import { getUserIdFromSession } from '@lib/dbUtils';
import { getConfigs, getFavoriteArtists, addPlaylistId } from '@lib/db';

export interface IArtist {
  name: string;
  image: string;
  spotifyId: string;
}

const spotifyApi = new SpotifyWebApi();

const setAuthTokenFromSession = async (session: Session) => {
  const spotifyOauthToken = await getSpotifyOauthTokenFromSession(session);
  spotifyApi.setAccessToken(spotifyOauthToken);
};

const setAuthTokenFromUserId = async (userId: string) => {
  const spotifyOauthToken = await getSpotifyOauthTokenFromUserId(userId);
  spotifyApi.setAccessToken(spotifyOauthToken);
};

export const getTopArtists = async (userId: string): Promise<IArtist[]> => {
  await setAuthTokenFromUserId(userId);

  const response = await spotifyApi.getMyTopArtists();

  const artists: IArtist[] = response.body.items.map((artist) => ({
    name: artist.name,
    image: artist.images[0].url,
    spotifyId: artist.id
  }));

  return artists;
};

export const updateAllPlaylists = async (): Promise<void> => {
  const allConfigs = await getConfigs();

  const playlistUpdatePromises = allConfigs.map(async (config) => {
    const userId = config.userId;
    const playlistId = config.playlistId;

    const favoriteArtists = await getFavoriteArtists(userId);

    if (playlistId) {
      // TODO: Ensure playlist actually exists
      updatePlaylist(userId, playlistId, favoriteArtists);
    }
  });

  await Promise.all(playlistUpdatePromises);
  Promise.resolve();
};

export const updatePlaylist = async (
  userId: string,
  playlistId: string,
  artists: IArtist[]
): Promise<void> => {
  await setAuthTokenFromUserId(userId);

  const recentTracks = await getRecentTracksForAllArtists(artists);
  const nonAddedTracks = await getNonAddedTracks(playlistId, recentTracks);

  const nonAddedTrackUris = nonAddedTracks.map((track) => track.uri);

  await spotifyApi.addTracksToPlaylist(playlistId, nonAddedTrackUris);
};

export const createPlaylist = async (session: Session): Promise<string> => {
  await setAuthTokenFromSession(session);

  const response = await spotifyApi.createPlaylist(PLAYLIST_NAME, {
    description: PLAYLIST_DESCRIPTION
  });

  const playlistId = response.body.id;

  const userId = await getUserIdFromSession(session);

  await addPlaylistId(userId, playlistId);

  return playlistId;
};

const getNonAddedTracks = async (
  playlistId: string,
  recentTracks: SpotifyApi.TrackObjectSimplified[]
) => {
  // TODO: Add pagination / batching. Only fetches first 100
  const existingTrackResponse = await spotifyApi.getPlaylistTracks(playlistId);
  const existingTracks = existingTrackResponse.body.items;

  return recentTracks.filter((track) => {
    const foundIndex = existingTracks.findIndex(
      (existingTrack) => existingTrack.track.id === track.id
    );
    return foundIndex < 0;
  });
};

const getRecentTracksForAllArtists = async (artists: IArtist[]) => {
  const trackResponsePromises = artists.map(async (artist) => {
    return await getRecentTracksForArtist(artist);
  });

  const trackResponses = await Promise.all(trackResponsePromises);

  return trackResponses.reduce((tracksSoFar, newTracks) => {
    tracksSoFar.push(...newTracks);
    return tracksSoFar;
  }, []);
};

const getRecentTracksForArtist = async (artist: IArtist) => {
  // Min 5 tracks (singles), but potentially more if they're full albums
  const albumResponse = await spotifyApi.getArtistAlbums(artist.spotifyId, {
    limit: 3
  });

  const trackResponsePromises = albumResponse.body.items.map(async (album) => {
    const trackResponse = await spotifyApi.getAlbumTracks(album.id);
    return trackResponse.body.items;
  });

  const allTracksResponses = await Promise.all(trackResponsePromises);

  const allTracks = allTracksResponses.reduce((tracksSoFar, newTracks) => {
    tracksSoFar.push(...newTracks);
    return tracksSoFar;
  }, []);

  return allTracks.slice(0, 3);
};
