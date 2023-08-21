import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "User already exists!"],
    required: [true, "Email is required!"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
