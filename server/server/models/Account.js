import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    _id: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional public properties for Accounts do so here
    admin: { type: Boolean, default: false },
    dm: { type: Boolean, default: false },
    live: { type: Boolean, default: false },
    characters: { type: Array },
    choices: { type: Array }
  },
  { timestamps: true, _id: false, toJSON: { virtuals: true } }
)
