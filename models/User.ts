import { model, Schema, Document, models } from 'mongoose';

interface IUser extends Document {
  name: string;
  image: string;
  createdAt: number;
  updatedAt: number;
}


const UserSchema: Schema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
})

export default models.User || model<IUser>('User', UserSchema);
