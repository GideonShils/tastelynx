import { model, Schema, Document, models } from 'mongoose';

interface ISession extends Document {
  userId: string;
  expires: number;
  sessionToken: string;
  accessToken: string;
  createdAt: number;
  updatedAt: number;
}

const SessionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  expires: Number,
  sessionToken: String,
  accessToken: String,
  createdAt: Number,
  updatedAt: Number,
})

const Session = models.Session || model<ISession>('Session', SessionSchema);

export default Session;

export const findSession = async (accessToken: string): Promise<ISession | null> => {
  return Session.findOne({
    accessToken: accessToken
  })
};
