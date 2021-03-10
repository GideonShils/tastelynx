import { Session } from 'next-auth/client';
import mongoose, { Mongoose } from 'mongoose';
import moment from 'moment';
import querystring from 'querystring';

import { IAccount, findAccount, addNewAccessToken } from '@models/Account';
import { findSession } from '@models/Session';

const SPOTIFY_AUTHORIZATION_URL = 'https://accounts.spotify.com/api/token';

export const refreshSpotifyOauthToken = async (account: IAccount): Promise<string> => {
  const encodedClientString = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const body = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: account.refreshToken
  });

  const tokenResponse = await fetch(SPOTIFY_AUTHORIZATION_URL, {
    headers: {
      Authorization: `Basic ${encodedClientString}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: body
  });

  const tokenJson = await tokenResponse.json();

  await addNewAccessToken(account, tokenJson.access_token);

  return tokenJson.access_token;
};

export const getUserIdFromSession = async (userSession: Session): Promise<string> => {
  await connectToDatabase();

  if (userSession?.accessToken) {
    const accessToken = userSession.accessToken;
    const sessionObject = await findSession(accessToken);

    if (sessionObject) {
      return sessionObject.userId;
    }
  }

  throw new Error('No access token found');
};

export const getSpotifyOauthTokenFromSession = async (userSession: Session): Promise<string> => {
  await connectToDatabase();

  const userId = await getUserIdFromSession(userSession);

  const account = await findAccount(userId);

  if (account) {
    const lastTokenIssueDate = moment(account.updatedAt);
    const now = moment();

    if (lastTokenIssueDate.add(59, 'minutes') < now) {
      return refreshSpotifyOauthToken(account);
    } else {
      return account.accessToken;
    }
  }

  throw new Error('No access token found');
};

export const getSpotifyOauthTokenFromUserId = async (userId: string): Promise<string> => {
  await connectToDatabase();

  const account = await findAccount(userId);

  if (account) {
    const lastTokenIssueDate = moment(account.updatedAt);
    const now = moment();

    if (lastTokenIssueDate.add(59, 'minutes') < now) {
      return refreshSpotifyOauthToken(account);
    } else {
      return account.accessToken;
    }
  }

  throw new Error('No access token found');
};

export default async function connectToDatabase(): Promise<Mongoose | void> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (process.env.DB_URI) {
    return mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  } else {
    throw new Error('No DB_URI is defined');
  }
}
