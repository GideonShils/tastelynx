import { getSession } from 'next-auth/client';
import { NextApiRequest } from "next";
import mongoose from 'mongoose';
import Account from '../models/Account';
import Session from '../models/Session';

export const getSpotifyOauthToken = async (req: NextApiRequest) => {
  await connectToDatabase();

  const userSession = await getSession({ req });

  if (userSession?.accessToken) {
    const accessToken = userSession.accessToken
    
    const sessionObject = await Session.findOne({
      accessToken: accessToken
    });

    if (sessionObject) {
      const account = await Account.findOne({
        userId: sessionObject.userId
      });

      if (account) {
        return account.accessToken;
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