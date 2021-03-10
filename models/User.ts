import { model, Schema, Document, models } from 'mongoose';

interface IUser extends Document {
  name: string;
  image: string;
  createdAt: number;
  updatedAt: number;
}


const UserSchema: Schema = new Schema({
  name: String,
  image: String,
  createdAt: Number,
  updatedAt: Number,
})

export default models.User || model<IUser>('User', UserSchema);
