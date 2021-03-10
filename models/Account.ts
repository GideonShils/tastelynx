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
  compoundId: String,
  userId: Schema.Types.ObjectId,
  providerType: String,
  providerAccountId: String,
  refreshToken: String,
  accessToken: String,
  accessTokenExpires: String,
  createdAt: String,
  updatedAt: String,
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

  return account.save();
}
