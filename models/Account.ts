import { model, Schema, Document, Types, models } from 'mongoose';

interface IAccount extends Document {
  compoundId: string;
  userId: Types.ObjectId;
  providerType: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: number;
  createdAt: number;
  updatedAt: number;
}

const AccountSchema: Schema = new Schema({
  compoundId: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  providerType: {
    type: String,
  },
  providerAccountId: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  accessTokenExpires: {
    type: Number,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
})

export default models.Account || model<IAccount>('Account', AccountSchema);