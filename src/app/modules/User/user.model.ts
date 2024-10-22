import { model, Schema } from "mongoose";
import { TUser, User } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, User>({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["passenger", "driver", "admin"],
    required: true
  },
  status: {
    type: String,
    enum: ["warned", "blocked", "good"],
    required: true
  }
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10)
  next();
})

userSchema.statics.isUserExists = async function (email) {
  return await userModel.findOne({ email })
}

userSchema.statics.isPasswordCorrect = async function (plain, hash) {
  return await bcrypt.compare(plain, hash)
}


export const userModel = model<TUser, User>("User", userSchema)