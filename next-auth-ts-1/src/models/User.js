import mongoose from "mongoose";
import { type } from "os";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: false },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
