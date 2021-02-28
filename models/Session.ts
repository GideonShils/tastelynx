import { model, Schema, Document, Types, models } from 'mongoose';

interface ISession extends Document {
  userId: Types.ObjectId;
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

export default models.Session || model<ISession>('Session', SessionSchema);
