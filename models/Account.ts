import { model, Schema, Document, models } from 'mongoose';
import moment from 'moment';

export interface IAccount extends Document {
  compoundId: string;
  userId: string;
  providerType: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  accessTokenExpires: number;
  createdAt: number;
  updatedAt: string;
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
    type: String,
  },
})


const Account = models.Account || model<IAccount>('Account', AccountSchema);

export default Account;

export const findAccount = async (userId: string): Promise<IAccount | null> => {
  return Account.findOne({
    userId: userId
  })
};

export const addNewAccessToken = async (account: IAccount, newAccessToken: string,) => {
  account.accessToken = newAccessToken;
  account.updatedAt = moment().format();

  return await account.save();
}
