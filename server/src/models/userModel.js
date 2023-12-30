import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isVerify: {type: boolean, default:false },
  role: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },
});

export const User = mongoose.model("Users", userSchema);
