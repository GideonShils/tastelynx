import { model, Schema, Document, Types, models, Model } from 'mongoose';

interface ISession extends Document {
  userId: string;
  expires: number;
  sessionToken: string;
  accessToken: string;
  createdAt: number;
  updatedAt: number;
}

const SessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  expires: {
    type: Number,
  },
  sessionToken: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
})

const Session = models.Session || model<ISession>('Session', SessionSchema);

export default Session;

export const findSession = async (accessToken: string): Promise<ISession | null> => {
  return Session.findOne({
    accessToken: accessToken
  })
};
