import SpotifyWebApi from 'spotify-web-api-node';
import { getSpotifyOauthToken } from '@lib/dbUtils';
import { Session } from 'next-auth/client';
import { PLAYLIST_DESCRIPTION, PLAYLIST_NAME } from '@constants/spotifyConstants';
import { getUserIdFromSession } from '@lib/dbUtils';
import { addPlaylistIdToConfig } from '@models/Config';

export interface IArtist {
  name: string;
  image: string;
  spotifyId: string;
}

const spotifyApi = new SpotifyWebApi();

const setAuthToken = async (session: Session) => {
  const spotifyOauthToken = await getSpotifyOauthToken(session);
  spotifyApi.setAccessToken(spotifyOauthToken);
};

export const getTopArtists = async (session: Session): Promise<IArtist[]> => {
  await setAuthToken(session);

  const response = await spotifyApi.getMyTopArtists();

  const artists: IArtist[] = response.body.items.map((artist) => ({
    name: artist.name,
    image: artist.images[0].url,
    spotifyId: artist.id
  }));

  return artists;
};

export const updatePlaylist = async (
  session: Session,
  playlistId: string,
  artists: IArtist[]
): Promise<void> => {
  await setAuthToken(session);

  const recentTracks = await getRecentTracksForAllArtists(artists);
  const nonAddedTracks = await getNonAddedTracks(playlistId, recentTracks);

  const nonAddedTrackUris = nonAddedTracks.map((track) => track.uri);

  await spotifyApi.addTracksToPlaylist(playlistId, nonAddedTrackUris);
};

export const createPlaylist = async (session: Session): Promise<string> => {
  await setAuthToken(session);

  const response = await spotifyApi.createPlaylist(PLAYLIST_NAME, {
    description: PLAYLIST_DESCRIPTION
  });

  const playlistId = response.body.id;

  const userId = await getUserIdFromSession(session);

  await addPlaylistIdToConfig(userId, playlistId);

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
