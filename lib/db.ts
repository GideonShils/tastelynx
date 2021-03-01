import { getSession } from 'next-auth/client';
import { NextApiRequest } from "next";
import mongoose from 'mongoose';
import moment from 'moment';
import querystring from 'querystring';

import { IAccount, findAccount, addNewAccessToken } from '@models/Account';
import { findSession } from '@models/Session';

const SPOTIFY_AUTHORIZATION_URL = "https://accounts.spotify.com/api/token";

export const refreshSpotifyOauthToken = async (account: IAccount) => {
  const encodedClientString = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const body = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: account.refreshToken,
  });
  
  const tokenResponse = await fetch(SPOTIFY_AUTHORIZATION_URL, {
    headers: {
      "Authorization": `Basic ${encodedClientString}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST",
    body: body
  });

  const tokenJson = await tokenResponse.json();

  console.log(tokenJson);

  await addNewAccessToken(account, tokenJson.access_token);

  return tokenJson.access_token;
}

export const getSpotifyOauthToken = async (req: NextApiRequest) => {
  await connectToDatabase();

  const userSession = await getSession({ req });

  if (userSession?.accessToken) {
    const accessToken = userSession.accessToken
    
    const sessionObject = await findSession(accessToken)

    if (sessionObject) {
      const account = await findAccount(sessionObject.userId);

      if (account) {
        const lastTokenIssueDate = moment(account.updatedAt);
        const now = moment();

        if (lastTokenIssueDate.add(59, 'minutes') < now) {
          return refreshSpotifyOauthToken(account);
        } else {
          return account.accessToken;
        }
      }
    }
  }

  throw new Error('No access token found');
}

export default async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  if (process.env.DB_URI) {
    return mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  } else {
    throw new Error('No DB_URI is defined');
  }
}