import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel