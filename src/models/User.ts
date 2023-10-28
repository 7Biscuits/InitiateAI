import { Schema, model } from "mongoose";
import { IUser } from "src/interfaces/IUser";

const UserModel: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", UserModel);